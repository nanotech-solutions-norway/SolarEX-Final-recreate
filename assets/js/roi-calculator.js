const $ = (id) => document.getElementById(id);

const EUROPE = new Set(['Norway','Sweden','Finland','Denmark','Iceland','United Kingdom','Ireland','France','Germany','Spain','Portugal','Italy','Netherlands','Belgium','Luxembourg','Austria','Switzerland','Poland','Czechia','Czech Republic','Slovakia','Hungary','Slovenia','Croatia','Bosnia and Herzegovina','Serbia','Montenegro','North Macedonia','Albania','Greece','Bulgaria','Romania','Moldova','Ukraine','Belarus','Lithuania','Latvia','Estonia']);
const MIDDLE_EAST = new Set(['Saudi Arabia','United Arab Emirates','UAE','Qatar','Bahrain','Kuwait','Oman','Iraq','Jordan','Israel','Palestine','Egypt','Lebanon','Syria','Yemen']);
const COUNTRY_TO_CURRENCY = {Norway:'NOK',Sweden:'SEK',Denmark:'DKK',Iceland:'ISK','United Kingdom':'GBP',Switzerland:'CHF',Poland:'PLN',Czechia:'CZK','Czech Republic':'CZK',Hungary:'HUF',Romania:'RON',Bulgaria:'BGN','Saudi Arabia':'SAR','United Arab Emirates':'AED',UAE:'AED',Qatar:'QAR',Bahrain:'BHD',Kuwait:'KWD',Oman:'OMR',Jordan:'JOD',Israel:'ILS',Egypt:'EGP'};
const CCA2_TO_CURRENCY = {NO:'NOK',SE:'SEK',DK:'DKK',IS:'ISK',GB:'GBP',CH:'CHF',PL:'PLN',CZ:'CZK',HU:'HUF',RO:'RON',BG:'BGN',SA:'SAR',AE:'AED',QA:'QAR',BH:'BHD',KW:'KWD',OM:'OMR',JO:'JOD',IL:'ILS',EG:'EGP'};
const NORD_POOL_ZONES = {Norway:'NO1',Sweden:'SE3',Finland:'FI',Denmark:'DK1',Estonia:'EE',Latvia:'LV',Lithuania:'LT'};
let currentCurrency = { code:'EUR', rate:1, source:'EUR base', date:'' };

function inferRegion(countryName) { if (MIDDLE_EAST.has(countryName)) return 'ME'; if (EUROPE.has(countryName)) return 'EU'; return 'ROW'; }
function defaultLifeYears(cellType) { if (cellType === 'mono') return 30; if (cellType === 'poly') return 25; return 20; }
function yearsBetween(d1, d2) { return (d2 - d1) / (1000 * 60 * 60 * 24 * 365.25); }
function toM2(area, unit) { return unit === 'ft2' ? area * 0.09290304 : area; }
function format(n, digits = 2) { if (Number.isNaN(n) || !Number.isFinite(n)) return '—'; return Number(n).toLocaleString('en-GB', { maximumFractionDigits: digits, minimumFractionDigits: digits }); }
function money(value, currency = 'EUR', digits = 2) { if (!Number.isFinite(value)) return '—'; try { return new Intl.NumberFormat('en-GB', { style:'currency', currency, maximumFractionDigits:digits, minimumFractionDigits:digits }).format(value); } catch(e) { return `${format(value,digits)} ${currency}`; } }
function selectedCountryCode() { const option = $('country')?.selectedOptions?.[0]; return (option?.dataset?.cca2 || '').toUpperCase(); }
function currencyForCountry(countryName) { return COUNTRY_TO_CURRENCY[countryName] || CCA2_TO_CURRENCY[selectedCountryCode()] || 'EUR'; }
function setStatus(text, type='neutral') { const el = $('dataStatus'); if (!el) return; el.textContent = text; el.style.color = type === 'ok' ? 'var(--roi-green)' : type === 'warn' ? 'var(--roi-gold)' : type === 'error' ? 'var(--roi-danger)' : 'var(--roi-muted)'; }
function setSource(text) { const el = $('sourceBadge'); if (el) el.textContent = text; }

async function fetchExchangeRate(currency) {
  if (!currency || currency === 'EUR') return { code:'EUR', rate:1, source:'EUR base currency', date:new Date().toISOString().slice(0,10) };
  const endpoints = [`https://api.frankfurter.app/latest?from=EUR&to=${encodeURIComponent(currency)}`, 'https://open.er-api.com/v6/latest/EUR'];
  let lastError = null;
  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      const rate = Number(data?.rates?.[currency]);
      if (!Number.isFinite(rate)) throw new Error('rate missing');
      return { code:currency, rate, source:endpoint.includes('frankfurter') ? 'ECB reference exchange rate' : 'public exchange-rate source', date:data.date || new Date().toISOString().slice(0,10) };
    } catch (error) { lastError = error; }
  }
  return { code:currency, rate:null, source:'Exchange rate unavailable', date:'', warning:lastError?.message || 'unavailable' };
}

async function updateCurrencyForCountry(countryName) {
  const currency = currencyForCountry(countryName);
  currentCurrency = await fetchExchangeRate(currency);
  updateCurrencyPanel(null, null, null);
  return currentCurrency;
}

function updateCurrencyPanel(annualGainEUR, netEUR, priceEUR) {
  const c = currentCurrency?.code || 'EUR';
  const rate = currentCurrency?.rate;
  const currencyOut = $('localCurrencyOut');
  const exchangeOut = $('exchangeRateOut');
  const annualLocal = $('annualGainLocal');
  const netLocal = $('netValueLocalOut');
  if (!currencyOut || !exchangeOut) return;
  if (!rate) {
    currencyOut.textContent = `${c} conversion unavailable`;
    exchangeOut.textContent = 'Euro values are shown. Live exchange-rate lookup failed.';
    if (annualLocal) annualLocal.textContent = 'local conversion unavailable';
    if (netLocal) netLocal.textContent = 'local conversion unavailable';
    return;
  }
  currencyOut.textContent = c === 'EUR' ? 'Local currency: EUR' : `Local currency: ${c}`;
  exchangeOut.textContent = c === 'EUR' ? 'Exchange rate used: 1 EUR = 1 EUR' : `Exchange rate used: 1 EUR = ${format(rate,4)} ${c}${currentCurrency.date ? ' · ' + currentCurrency.date : ''}`;
  if (Number.isFinite(annualGainEUR) && annualLocal) annualLocal.textContent = c === 'EUR' ? '€/year' : `${money(annualGainEUR,'EUR',2)} / ${money(annualGainEUR * rate,c,2)} per year`;
  if (Number.isFinite(netEUR) && netLocal) netLocal.textContent = c === 'EUR' ? money(netEUR,'EUR',2) : `${money(netEUR,'EUR',2)} / ${money(netEUR * rate,c,2)}`;
}

async function loadCountries() {
  const fallback = ['Norway','Sweden','Finland','Denmark','Germany','United Kingdom','France','Spain','Italy','United Arab Emirates','Saudi Arabia','Qatar','Oman','Kuwait'];
  try {
    const res = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,currencies');
    if (!res.ok) throw new Error('Country list failed');
    const data = await res.json();
    data.sort((a,b) => a.name.common.localeCompare(b.name.common));
    $('country').innerHTML = '<option value="">Select country</option>' + data.map(c => {
      const name = c.name?.common || 'Unknown';
      const cca2 = c.cca2 || '';
      const currency = Object.keys(c.currencies || {})[0] || '';
      return `<option value="${name}" data-cca2="${cca2}" data-currency="${currency}">${name}</option>`;
    }).join('');
  } catch(e) {
    $('country').innerHTML = '<option value="">Select country</option>' + fallback.map(name => `<option value="${name}">${name}</option>`).join('');
  }
}

async function geocodeAddress() {
  const address = $('address').value.trim();
  if (!address) { alert('Enter an address first.'); return; }
  setStatus('Geocoding…');
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(address)}&count=1&language=en&format=json`;
  const res = await fetch(url);
  const data = await res.json();
  if (data?.results?.length) {
    const { latitude, longitude, name, country, country_code } = data.results[0];
    $('coordsHint').textContent = `Lat: ${Number(latitude).toFixed(4)}, Lon: ${Number(longitude).toFixed(4)} (${name}, ${country})`;
    $('coordsHint').dataset.lat = latitude;
    $('coordsHint').dataset.lon = longitude;
    const options = Array.from($('country').options);
    const match = options.find(o => o.value === country || o.dataset.cca2 === country_code);
    if (match) $('country').value = match.value;
    await updateCurrencyForCountry($('country').value || country);
    setStatus('Location ready','ok');
    if ($('useOnlineSun').checked) await handleEstimateSun();
  } else { setStatus('Geocode failed','error'); alert('No results for this address.'); }
}

function locateMe() {
  if (!navigator.geolocation) { alert('Geolocation not supported in this browser.'); return; }
  setStatus('Locating…');
  navigator.geolocation.getCurrentPosition(async (pos) => {
    const { latitude, longitude } = pos.coords;
    $('coordsHint').dataset.lat = latitude;
    $('coordsHint').dataset.lon = longitude;
    try {
      const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
      const res = await fetch(url);
      const data = await res.json();
      const name = [data.locality, data.principalSubdivision, data.countryName].filter(Boolean).join(', ');
      $('address').value = name || `Located position (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`;
      $('coordsHint').textContent = `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}${name ? ` (${name})` : ''}`;
      const options = Array.from($('country').options);
      const match = options.find(o => o.dataset.cca2 === data.countryCode || o.value === data.countryName);
      if (match) $('country').value = match.value;
      await updateCurrencyForCountry($('country').value || data.countryName);
      setStatus('Location ready','ok');
      if ($('useOnlineSun').checked) await handleEstimateSun();
    } catch(e) {
      $('address').value = `Located position (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`;
      $('coordsHint').textContent = `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)} (GPS)`;
      setStatus('Location ready','ok');
    }
  }, (err) => { setStatus('GPS failed','error'); alert('Unable to get location: ' + err.message); }, { enableHighAccuracy:true, timeout:10000 });
}

async function estimateSunHours(lat, lon, year) {
  if (!lat || !lon) throw new Error('Missing coordinates for estimation.');
  if (!year) year = new Date().getFullYear() - 1;
  $('sunYear').value = year;
  const start = `${year}-01-01`, end = `${year}-12-31`;
  const url = `https://archive-api.open-meteo.com/v1/era5?latitude=${lat}&longitude=${lon}&daily=sunshine_duration&start_date=${start}&end_date=${end}&timezone=auto`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Sunshine API error');
  const data = await res.json();
  const secs = (data?.daily?.sunshine_duration || []).reduce((a,b) => a + (b || 0), 0);
  return Math.round(secs / 3600);
}

async function handleEstimateSun() {
  if (!$('useOnlineSun').checked) return;
  const lat = parseFloat($('coordsHint').dataset.lat || '');
  const lon = parseFloat($('coordsHint').dataset.lon || '');
  if (!lat || !lon) return;
  const chosenYear = parseInt($('sunYear').value || '') || undefined;
  $('sunHours').value = '…';
  setSource('Open-Meteo sunshine estimate');
  try { $('sunHours').value = await estimateSunHours(lat, lon, chosenYear); }
  catch(e) { $('sunHours').value = ''; alert('Sunshine estimation failed. Enter sunlight hours manually.'); }
}

async function fetchNordPoolAvgPrice(countryName) {
  const zone = NORD_POOL_ZONES[countryName];
  if (!zone) throw new Error('Auto-price is only available for selected Nord Pool countries. Enter price manually.');
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2,'0');
  const d = String(today.getDate()).padStart(2,'0');
  const candidates = [
    `https://www.hvakosterstrommen.no/api/v1/prices/${y}/${m}-${d}_${zone}.json`,
    `https://www.hvakosterstrommen.no/api/v1/prices/${y}/${m}-${d}_NO1.json`
  ];
  let lastError = null;
  for (const url of candidates) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const rows = await res.json();
      const values = rows.map(r => Number(r.EUR_per_kWh)).filter(Number.isFinite);
      if (!values.length) throw new Error('No EUR price values');
      return values.reduce((a,b) => a + b, 0) / values.length;
    } catch (error) { lastError = error; }
  }
  throw new Error('Auto-price lookup unavailable. Enter price manually.');
}
async function handleFetchPrice() {
  if (!$('useNordPool').checked) { alert('Check "Try Nord Pool auto-price" first.'); return; }
  const countryName = $('country').value || '';
  $('price').value = '…';
  setStatus('Fetching price…');
  try { const p = await fetchNordPoolAvgPrice(countryName); $('price').value = p.toFixed(4); setStatus('Price ready','ok'); }
  catch(e) { $('price').value = ''; setStatus('Manual price needed','warn'); alert(e.message); }
}

function recommendedDefaults(countryName, coating) {
  const region = inferRegion(countryName || '');
  let gain = null, life = null;
  if (coating === 'sio2') { if (region === 'EU') { gain = 10; life = 5; } else if (region === 'ME') { gain = 2; life = 3; } else { gain = 6; life = 5; } }
  else if (coating === 'tio2') { gain = 5.15; life = 5; }
  return { gain, life };
}
function pushDetail(key, val, tbody) { const tr = document.createElement('tr'); const td1 = document.createElement('td'); const td2 = document.createElement('td'); td1.textContent = key; td2.textContent = val; tr.appendChild(td1); tr.appendChild(td2); tbody.appendChild(tr); }

function computeROI() {
  const countryName = $('country').value || '';
  const area = parseFloat($('area').value || '0');
  const m2 = toM2(area, $('areaUnit').value);
  const wpm2 = parseFloat($('wPerM2').value || '90');
  const sun = parseFloat($('sunHours').value || '0');
  const price = parseFloat($('price').value || '0');
  const coating = $('coating').value;
  const gainPctInput = $('gainPct').value ? parseFloat($('gainPct').value) : null;
  const coatPrice = parseFloat($('coatPrice').value || '0');
  const coatLifeInput = $('coatLife').value ? parseFloat($('coatLife').value) : null;
  const installed = $('installedDate').value ? new Date($('installedDate').value) : null;
  const cellType = $('cellType').value;
  const consumption = parseFloat($('consumption').value || '0');

  const regionDefaults = recommendedDefaults(countryName, coating);
  const gainPct = gainPctInput != null ? gainPctInput : (regionDefaults.gain || 0);
  const coatLife = coatLifeInput != null ? coatLifeInput : (regionDefaults.life || 5);
  const baselineKwh = m2 * (wpm2 / 1000) * sun;
  const withCoatingKwh = coating === 'none' ? baselineKwh : baselineKwh * (1 + gainPct / 100);
  const annualGainKwh = withCoatingKwh - baselineKwh;
  const annualGainEUR = annualGainKwh * price;
  const coatCapex = m2 * coatPrice;
  const paybackDays = annualGainEUR > 0 ? coatCapex / annualGainEUR * 365 : Infinity;
  const nominalLife = defaultLifeYears(cellType);
  const age = installed ? yearsBetween(installed, new Date()) : 0;
  const remainingLife = Math.max(0, nominalLife - age);
  const analysisHorizon = Math.max(1, Math.min(remainingLife || nominalLife, coatLife || nominalLife));
  const totalGainEUR = annualGainEUR * analysisHorizon;
  const netEUR = totalGainEUR - coatCapex;
  const rate = currentCurrency?.rate;
  const c = currentCurrency?.code || 'EUR';

  $('baselineKwh').textContent = format(baselineKwh, 0);
  $('withCoatingKwh').textContent = format(withCoatingKwh, 0);
  $('annualGain').textContent = money(annualGainEUR, 'EUR', 2);
  $('payback').textContent = Number.isFinite(paybackDays) ? format(paybackDays, 0) : '—';
  $('netValueOut').textContent = money(netEUR, 'EUR', 2);
  updateCurrencyPanel(annualGainEUR, netEUR, price);
  setSource($('useOnlineSun').checked ? 'Open-Meteo sunshine estimate' : 'Manual sunlight input');

  const tbody = $('detailTable').querySelector('tbody');
  tbody.innerHTML = '';
  pushDetail('Area (m²)', format(m2, 2), tbody);
  pushDetail('Sunlight hours / year', format(sun, 0), tbody);
  pushDetail('Panel specific power (W/m²)', format(wpm2, 0), tbody);
  pushDetail('Electricity price (€/kWh)', `${format(price, 4)}${rate && c !== 'EUR' ? ` / ${money(price * rate, c, 4)}` : ''}`, tbody);
  pushDetail('Coating', coating === 'none' ? 'None' : (coating === 'sio2' ? 'SolarEX Quartz SiO₂' : 'SolarEX Titan TiO₂'), tbody);
  if (coating !== 'none') {
    pushDetail('Expected gain (%)', format(gainPct, 2), tbody);
    pushDetail('Annual kWh gain', format(annualGainKwh, 0), tbody);
    pushDetail('Annual gain', `${money(annualGainEUR,'EUR',2)}${rate && c !== 'EUR' ? ` / ${money(annualGainEUR * rate,c,2)}` : ''}`, tbody);
    pushDetail('Coating CAPEX', `${money(coatCapex,'EUR',2)}${rate && c !== 'EUR' ? ` / ${money(coatCapex * rate,c,2)}` : ''}`, tbody);
    pushDetail('Coating service life (y)', format(coatLife, 1), tbody);
    pushDetail('Panel remaining life (y)', format(remainingLife || nominalLife, 1), tbody);
    pushDetail('Analysis horizon (y)', format(analysisHorizon, 1), tbody);
    pushDetail('Cumulative gain over horizon', `${money(totalGainEUR,'EUR',2)}${rate && c !== 'EUR' ? ` / ${money(totalGainEUR * rate,c,2)}` : ''}`, tbody);
    pushDetail('Net gain minus CAPEX', `${money(netEUR,'EUR',2)}${rate && c !== 'EUR' ? ` / ${money(netEUR * rate,c,2)}` : ''}`, tbody);
  }
  if (consumption > 0) pushDetail('Baseline coverage of annual consumption', format((baselineKwh / consumption) * 100, 1) + '%', tbody);
  const notes = $('notes');
  if (notes) notes.innerHTML = '• Baseline method: kWh = Area × (W/m² ÷ 1000) × Sunlight hours/year.<br>• Quartz SiO₂ defaults: Europe 10% gain and 5y life; Middle East 2% gain and 3y life.<br>• Outputs are screening scenarios and should be reviewed against project conditions before procurement decisions.';
  setStatus('Complete','ok');
}

window.addEventListener('DOMContentLoaded', async () => {
  await loadCountries();
  $('sunYear').value = new Date().getFullYear() - 1;
  $('geocodeBtn').addEventListener('click', geocodeAddress);
  $('locateBtn').addEventListener('click', locateMe);
  $('useOnlineSun').addEventListener('change', handleEstimateSun);
  $('fetchPriceBtn').addEventListener('click', handleFetchPrice);
  $('country').addEventListener('change', async () => { await updateCurrencyForCountry($('country').value); });
  $('roiForm').addEventListener('submit', (e) => { e.preventDefault(); computeROI(); });
  const menuButton = $('roiMenuToggle'); const nav = $('roiNav');
  if (menuButton && nav) { menuButton.addEventListener('click', () => { const open = nav.classList.toggle('is-open'); menuButton.setAttribute('aria-expanded', String(open)); }); nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('is-open'); menuButton.setAttribute('aria-expanded','false'); })); }
  document.querySelectorAll('.nav-group-toggle').forEach((button) => button.addEventListener('click', (event) => { event.preventDefault(); const group = button.closest('.nav-group'); const open = group.classList.toggle('is-open'); button.setAttribute('aria-expanded', String(open)); }));
});
