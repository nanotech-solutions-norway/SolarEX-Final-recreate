from pathlib import Path
import html
import os
import shutil
import sys

OUT = Path(__file__).resolve().parent / "_site"
OWNER, REPO = os.getenv("GITHUB_REPOSITORY", "nanotech-solutions-norway/SolarEX-Final-recreate").split("/", 1)
BASE_PATH = os.getenv("BASE_PATH", f"/{REPO}").rstrip("/")
SITE_URL = os.getenv("SITE_URL", f"https://{OWNER}.github.io{BASE_PATH}").rstrip("/")
EMAIL = "info@solarex.no"
TECH_FORM = "https://docs.google.com/forms/d/e/1FAIpQLSeENsc9Y8OCrbqvRxTT5CO6oiezhvU7fo2enyZtbPZV9zEGwg/viewform?usp=dialog&hl=en"
COMM_FORM = "https://docs.google.com/forms/d/e/1FAIpQLSfwuDfW0Q3eY4ePjKZAmZlQ6H1-VxGRkwuT1Z7txlV6IgU_BA/viewform?usp=dialog&hl=en"

NAV = [
    ("Home", ""),
    ("Quartz", "quartz"),
    ("Titan", "titan"),
    ("Technology", "technology"),
    ("Applications", "applications"),
    ("Proof", "proof"),
    ("ROI", "roi"),
    ("Documentation", "documentation"),
    ("FAQ", "faq"),
    ("Contact", "contact"),
]

PAGES = {
    "home": {
        "slug": "",
        "title": "SolarEX PV Glass Coatings | SiO₂ & TiO₂ Engineering",
        "description": "SolarEX Quartz and Titan nanocoatings for PV glass: passive SiO₂ protection and active TiO₂ photocatalytic engineering.",
        "h1": "SolarEX — Surface Engineering for PV Glass",
        "lead": "A mechanism-led PV glass coating platform built around SolarEX Quartz for passive SiO₂ easy-clean behavior and SolarEX Titan for active TiO₂ photocatalytic organic-fouling control.",
        "sections": [
            ("Why surface engineering matters", "PV glass accumulates dust, pollen, bird lime, salt, industrial pollutants and biological residues. SolarEX addresses contaminant adhesion at the glass-air interface.", [("Optical interface protection", "Cleaner glass supports more stable PV operation by reducing contaminant accumulation and bonding."), ("Lower cleaning burden", "Surface treatment supports faster cleaning, lower abrasion exposure and more efficient O&M planning."), ("Mechanism-led selection", "Quartz and Titan are selected by fouling profile, UV availability, climate, cleaning burden and ROI objective.")]),
            ("Two pathways, different mechanisms", "Quartz and Titan are not interchangeable. Each route has a specific material basis, activation logic and operating fit.", [("SolarEX Quartz — SiO₂", "Passive, UV-independent hydrophobic/oleophobic surface architecture for dust, mineral particulates and easy-clean behavior."), ("SolarEX Titan — TiO₂", "Active, UV-dependent photocatalytic surface route for organic contamination, biological fouling and hydrophilic/superhydrophilic rinse behavior.")]),
        ],
    },
    "quartz": {
        "slug": "quartz",
        "title": "SolarEX Quartz | SiO₂ Hydrophobic Nanocoating",
        "description": "Passive SiO₂ PV glass coating for hydrophobic, oleophobic, UV-independent easy-clean surface engineering.",
        "h1": "SolarEX Quartz — Passive SiO₂ Surface Architecture",
        "lead": "Quartz is the UV-independent SolarEX route: an ultrathin transparent SiO₂ layer engineered to reduce contaminant adhesion and support hydrophobic/oleophobic easy-clean behavior on PV glass.",
        "sections": [
            ("Passive easy-clean mechanism", "Quartz modifies surface energy without relying on UV activation, photocatalysis or on-site energy input.", [("Hydrophobic / oleophobic response", "Water, grime and oily particulates exhibit reduced adhesion energy compared with untreated glass."), ("Low-UV operating fit", "Preferred for high-latitude, diffuse-light and low-UV environments where passive repellence is the stronger route."), ("Cleaning optimization", "Designed to support easier rinse-down, faster maintenance and reduced wash intensity.")]),
            ("Quartz technical profile", "Available source specifications support procurement, application planning and site qualification.", [("Film thickness", "100–150 nm transparent SiO₂ film."), ("Application rate", "5–15 mL/m² depending on method and substrate condition."), ("Application method", "HVLP spray or lint-free cloth / wipe process."), ("Cure profile", "Dry around 30 seconds; full cure around 24 hours."), ("Chemical stability", "pH stability reference range 1.5–12.5.")]),
        ],
    },
    "titan": {
        "slug": "titan",
        "title": "SolarEX Titan | TiO₂ Photocatalytic Nanocoating",
        "description": "Active TiO₂ PV glass coating for UV-supported photocatalytic organic-fouling control and hydrophilic rinse behavior.",
        "h1": "SolarEX Titan — Active TiO₂ Photocatalytic Surface Engineering",
        "lead": "Titan is the active SolarEX route for sites where UV availability and contamination profile support organic-fouling control and hydrophilic/superhydrophilic rinse behavior.",
        "sections": [
            ("Active photocatalytic mechanism", "Titan is selected where organic, biological or complex atmospheric contamination is a material performance driver.", [("UV-triggered activation", "TiO₂ absorbs UV photons and supports reactive surface chemistry."), ("Organic contaminant decomposition", "Targets organic films, pollen residues, algae, bird fouling and industrial organic loads."), ("Water-sheeting rinse route", "After activation, the surface supports hydrophilic or superhydrophilic rinse behavior.")]),
            ("Titan study framing", "The monitored study provides a defined evidence context rather than a universal performance guarantee.", [("+5.15% average uplift", "Measured average gain in the 360-day study context."), ("63 coated modules", "Treatment group compared against a larger control population."), ("360 monitored days", "Long-duration monitoring with 15-minute interval context.")]),
        ],
    },
    "technology": {"slug": "technology", "title": "SolarEX Technology | Quartz vs Titan Surface Pathways", "description": "Compare SolarEX Quartz SiO₂ and Titan TiO₂ by mechanism, UV dependency, contamination profile and operating environment.", "h1": "Surface Science for Solar Assets", "lead": "SolarEX technology is built around mechanism fit: passive SiO₂ repellence and active TiO₂ photocatalysis are selected by site conditions, not generic preference.", "sections": [("Mechanism-led selection", "The pathway decision depends on contamination profile, UV availability, climate, cleaning burden and asset-owner objectives.", [("Surface energy control", "Quartz changes adhesion behavior through passive SiO₂ surface architecture."), ("Photocatalytic activation", "Titan relies on UV-supported TiO₂ chemistry for organic contamination control."), ("Operational fit", "Route selection should be tied to actual fouling and O&M economics.")])]},
    "applications": {"slug": "applications", "title": "SolarEX Applications | Climate, Fouling and O&M Fit", "description": "Match SolarEX Quartz and Titan to dust, pollen, algae, bird fouling, industrial contamination and O&M needs.", "h1": "Applications — Fit by Climate, Fouling and O&M Logic", "lead": "SolarEX applications are qualified by the operating environment: contamination type, cleaning burden, UV availability, water constraints and commercial objective.", "sections": [("Fouling profile fit", "Different contaminants require different surface responses, and route selection must remain mechanism-led.", [("Dust and mineral particulate", "Typically points toward Quartz for passive low-adhesion behavior."), ("Organic and biological fouling", "Typically points toward Titan where UV exposure supports activation."), ("Industrial contamination", "Requires review of residue chemistry before route selection.")]), ("O&M fit", "SolarEX is positioned for asset owners, EPC contractors and O&M operators seeking a disciplined coating route.", [("Water-constrained sites", "Prioritize reduced wash intensity and faster cleaning cycles."), ("High cleaning burden", "Assess annual cleaning cost, access cost and downtime risk."), ("Pilot-first deployment", "Use treated-versus-control validation before full rollout.")])]},
    "proof": {"slug": "proof", "title": "SolarEX Proof Results | Performance Metrics and Evidence", "description": "Review SolarEX proof results including Titan monitored uplift, Quartz case framing and evidence-led pilot qualification.", "h1": "Proof / Results — Evidence with Technical Context", "lead": "SolarEX proof is presented as defined evidence: monitored comparative data, controlled field logic, ROI assumptions and project-specific interpretation.", "sections": [("Titan monitored study", "The Titan evidence stack includes a 360-day rooftop study with coated and control populations.", [("+5.15% average uplift", "Average gain reported in the monitored study context."), ("63 coated modules", "Coated group compared against 315 controls in source framing."), ("15-minute intervals", "Monitoring interval supports higher-resolution interpretation.")]), ("Quartz case framing", "Quartz proof is strongest when framed through low-adhesion, cleaning burden and Scandinavian/Northern European operating logic.", [("Up to 10% reference framing", "Use only in source context and not as a universal claim."), ("Maintenance reduction", "Up to 70% fewer manual wash cycles appears as a reference case, subject to site conditions."), ("Empirical validation", "Pilot data should use matched treated and control areas.")])]},
    "roi": {"slug": "roi", "title": "SolarEX ROI Analysis | Payback and O&M Value", "description": "SolarEX ROI combines yield uplift, cleaning reduction, O&M cost, coating cost and site-specific assumptions for Quartz and Titan.", "h1": "ROI Analysis — Yield Plus O&M Economics", "lead": "SolarEX ROI should be calculated from site-specific yield, energy price, coating cost, cleaning cost, water logistics and monitoring assumptions.", "sections": [("Reference scenarios", "The source report provides indicative payback models that must be matched against site data.", [("Quartz Europe", "Approximately 147-day reference payback scenario."), ("Quartz Middle East", "Approximately 218-day reference payback scenario."), ("Titan Europe", "Approximately 292-day reference payback scenario."), ("Titan high-insolation", "Approximately 87-day reference payback scenario.")]), ("Calculation logic", "The commercial model combines energy revenue and maintenance impact.", [("Annual gain", "Baseline kWh/m²/year × uplift percentage × energy price."), ("Payback days", "Coating cost per m² divided by annual gain per m², multiplied by 365."), ("O&M sensitivity", "Cleaning cost, water access and labor constraints can materially change the result.")])]},
    "case-study-norway": {"slug": "case-study-norway", "title": "SolarEX Case Study Norway | Quartz Field Logic", "description": "Norwegian and Scandinavian SolarEX case-study framing for treated-versus-control validation and O&M implications.", "h1": "Case Study Norway — Scandinavian Field Logic", "lead": "The Norway case-study page frames SolarEX through high-latitude operating logic, treated-versus-control comparison and maintenance implications for Scandinavian PV assets.", "sections": [("Scandinavian operating context", "Northern European PV assets often face lower UV, seasonal pollen, moisture, dust and access-related cleaning cost.", [("Quartz relevance", "UV-independent SiO₂ architecture is well matched to high-latitude sites."), ("Control logic", "Compare treated and untreated surfaces with similar tilt, age, orientation and contamination exposure."), ("Operational implication", "Value is assessed through cleanliness retention, easier cleaning and measurable yield impact.")])]},
    "technical-specifications": {"slug": "technical-specifications", "title": "SolarEX Technical Specifications | Quartz and Titan", "description": "SolarEX technical specifications for Quartz SiO₂ and Titan TiO₂ coating selection, application, curing and qualification.", "h1": "Technical Specifications", "lead": "Technical specifications support product selection, application planning and controlled pilot design for SolarEX Quartz and SolarEX Titan.", "sections": [("Quartz parameters", "Quartz is the passive SiO₂ route for hydrophobic/oleophobic easy-clean behavior.", [("Film thickness", "100–150 nm transparent SiO₂ layer."), ("Application rate", "5–15 mL/m² depending on process and surface condition."), ("Application", "HVLP spray or lint-free cloth / wipe route."), ("Cure", "Dry around 30 seconds; full cure around 24 hours.")]), ("Titan parameters", "Titan is the active TiO₂ route for UV-supported photocatalytic behavior.", [("Coverage", "Approximately 10–25 mL/m² depending on method and substrate."), ("Temperature", "Typical processing window +5°C to +25°C."), ("Activation", "UV exposure is required for the photocatalytic mechanism."), ("Effect development", "Approximately 24–48 hours outdoors depending on climate and UV.")])]},
    "application-process": {"slug": "application-process", "title": "SolarEX Application Process | Pilot and Validation Workflow", "description": "SolarEX application workflow from site intake and diagnosis to pilot setup, coating application, validation and reporting.", "h1": "Application Process — From Site Intake to Validated Pilot", "lead": "SolarEX implementation should follow a controlled workflow: diagnose the site, select the pathway, apply under defined conditions, then validate results against control areas.", "sections": [("Workflow", "A disciplined process reduces technical ambiguity and improves scale-up confidence.", [("1. Site intake", "Collect location, capacity, panel type, soiling photos, cleaning method and electricity price."), ("2. Diagnosis", "Match contamination profile and UV availability to Quartz, Titan or mixed review."), ("3. Pilot setup", "Define treated-versus-control areas, measurement interval and validation duration."), ("4. Reporting", "Translate results into yield, O&M and ROI implications.")])]},
    "documentation": {"slug": "documentation", "title": "SolarEX Documentation | Technical Files and Studies", "description": "SolarEX documentation center for technical files, application instructions, studies, references and documentation request workflow.", "h1": "Documentation", "lead": "The documentation page organizes technical files, studies and application references for engineering teams, EPC partners, O&M specialists and procurement reviewers.", "sections": [("Document library structure", "Documents should be selected according to the decision being made.", [("Application instructions", "Route-specific preparation, application and cure guidance."), ("Study documents", "Defined evidence under documented methodology and boundary conditions."), ("Reference presentations", "Commercial and regional context for stakeholder review."), ("Pilot review package", "Site assessment, monitoring protocol and evidence interpretation.")])]},
    "faq": {"slug": "faq", "title": "SolarEX FAQ | Quartz vs Titan Solar Coating Questions", "description": "Answers to SolarEX buyer questions about Quartz vs Titan, UV activation, cleaning, ROI, pilot validation and documentation.", "h1": "SolarEX FAQ — Technical Questions, Precise Answers", "lead": "The FAQ supports buyer due diligence while preserving the mechanism-led distinction between SolarEX Quartz and SolarEX Titan.", "sections": [("Quartz questions", "Quartz is the passive SiO₂ pathway.", [("Does Quartz require UV?", "No. Quartz is UV-independent and functions through passive surface architecture."), ("What contamination does Quartz target?", "Dust, sand, pollen, mineral spotting and low-adhesion cleaning scenarios."), ("Does Quartz eliminate cleaning?", "No. It reduces adhesion and supports better cleaning efficiency; it does not remove O&M planning.")]), ("Titan questions", "Titan is the active TiO₂ pathway.", [("Why does Titan require UV?", "UV exposure activates the TiO₂ photocatalytic mechanism."), ("What contamination does Titan target?", "Organic, biological and atmospheric contamination where UV availability supports activation."), ("What does the Titan study show?", "+5.15% average uplift in the defined 360-day monitored study context.")])]},
    "contact": {"slug": "contact", "title": "Contact SolarEX | Technical Review and Commercial Inquiry", "description": "Contact SolarEX at info@solarex.no for pathway selection, pilot planning, documentation and commercial discussion.", "h1": "Contact SolarEX — Start a Technical Review", "lead": "SolarEX supports pathway selection, pilot design, technical documentation and commercial discussion for solar nanocoating applications.", "sections": [("Choose the right route", "Technical and commercial inquiries should be separated so the first response can be substantive.", [("Technical review", "Use for site assessment, product pathway, pilot design and documentation review."), ("Commercial inquiry", "Use for procurement, distribution, partnership, volume planning and commercial terms."), ("Direct email", "Use info@solarex.no for general SolarEX contact.")]), ("Site-data intake", "Structured site data improves the quality of the first technical response.", [("Site conditions", "Location, climate zone, irradiance and UV context."), ("Contamination profile", "Dust, pollen, organic, biological or industrial soiling."), ("Maintenance context", "Current cleaning frequency, water availability and O&M protocol."), ("Project scope", "Module count, installation type, coating interest and pilot timing.")])]},
}

ALIASES = {"quartz.html": "quartz", "titan.html": "titan", "technology.html": "technology", "applications.html": "applications", "proof-results.html": "proof", "roi-analysis.html": "roi", "case-study-norway.html": "case-study-norway", "technical-specifications.html": "technical-specifications", "application-process.html": "application-process", "documentation.html": "documentation", "faq.html": "faq", "contact.html": "contact"}

CSS = r'''
:root{--bg:#171B21;--panel:#202733;--text:#D6E5EF;--muted:#A8BDCB;--blue:#5E98F1;--blue2:#66A8EE;--green:#5CC97B;--line:rgba(214,229,239,.16);--max:1180px;--radius:24px;--shadow:0 24px 70px rgba(0,0,0,.30)}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:radial-gradient(circle at 20% 0,rgba(94,152,241,.12),transparent 28%),var(--bg);color:var(--text);font-family:Inter,system-ui,-apple-system,Segoe UI,Arial,sans-serif;line-height:1.6}a{color:inherit}.skip-link{position:absolute;left:-999px;top:auto}.skip-link:focus{left:16px;top:16px;z-index:1000;background:var(--text);color:var(--bg);padding:10px 14px;border-radius:999px}.site-header{position:sticky;top:0;z-index:20;background:rgba(23,27,33,.9);backdrop-filter:blur(18px);border-bottom:1px solid var(--line)}.nav-shell{max-width:var(--max);margin:auto;display:flex;justify-content:space-between;align-items:center;padding:14px 22px;gap:16px}.brand{font-weight:950;font-size:25px;text-decoration:none;letter-spacing:-.035em}.brand span{color:var(--blue2)}.site-nav{display:flex;gap:6px;flex-wrap:wrap}.site-nav a{text-decoration:none;color:var(--muted);font-size:14px;padding:8px 10px;border-radius:999px}.site-nav a:hover,.site-nav a[aria-current=page]{background:rgba(94,152,241,.15);color:var(--text)}.menu-toggle{display:none;border:1px solid var(--line);background:transparent;color:var(--text);border-radius:12px;padding:8px 12px}.hero{min-height:620px;display:flex;align-items:center;position:relative;overflow:hidden;background:radial-gradient(circle at 80% 10%,rgba(94,152,241,.42),transparent 28%),radial-gradient(circle at 18% 22%,rgba(92,201,123,.22),transparent 24%),linear-gradient(135deg,#111821,#202733 52%,#10141a)}.hero:after{content:"";position:absolute;inset:0;background:linear-gradient(115deg,transparent 10%,rgba(214,229,239,.06) 10.5%,transparent 11%),linear-gradient(160deg,transparent 20%,rgba(214,229,239,.07) 20.5%,transparent 21%);opacity:.7}.hero-inner{position:relative;z-index:1;max-width:var(--max);margin:auto;padding:120px 24px 80px}.eyebrow{display:inline-flex;gap:8px;align-items:center;border:1px solid rgba(214,229,239,.24);border-radius:999px;background:rgba(214,229,239,.07);padding:7px 12px;font-size:13px;margin-bottom:20px}.eyebrow:before{content:"";width:8px;height:8px;border-radius:50%;background:var(--green)}h1,h2,h3,h4{line-height:1.12;margin:0 0 1rem}h1{font-size:clamp(42px,7vw,80px);letter-spacing:-.055em;max-width:1000px}h2{font-size:clamp(30px,4vw,52px);letter-spacing:-.04em}.lead{font-size:clamp(18px,2vw,23px);max-width:920px;color:#c8d9e6}.section{padding:76px 24px;border-top:1px solid var(--line)}.container{max-width:var(--max);margin:auto}.kicker{color:var(--blue2);text-transform:uppercase;letter-spacing:.16em;font-size:12px;font-weight:850;margin-bottom:12px}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}.grid.two{grid-template-columns:repeat(2,1fr)}.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}.card{background:linear-gradient(180deg,rgba(38,51,64,.94),rgba(32,39,51,.98));border:1px solid var(--line);border-radius:var(--radius);padding:26px;box-shadow:var(--shadow)}.card.blue{background:linear-gradient(135deg,#3c89db,#204c8e)}.btn-row{display:flex;flex-wrap:wrap;gap:12px;margin-top:24px}.btn{display:inline-flex;align-items:center;justify-content:center;border-radius:999px;padding:12px 18px;border:1px solid rgba(214,229,239,.23);background:linear-gradient(135deg,var(--blue),#3477d9);color:white;text-decoration:none;font-weight:800;box-shadow:0 12px 28px rgba(94,152,241,.22)}.btn.secondary{background:rgba(214,229,239,.07);box-shadow:none}.stat{border:1px solid var(--line);border-radius:20px;background:rgba(214,229,239,.06);padding:24px}.num{font-size:42px;font-weight:950;letter-spacing:-.04em}.table-wrap{overflow:auto;border:1px solid var(--line);border-radius:18px}table{width:100%;border-collapse:collapse;min-width:680px}th,td{padding:14px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top}th{background:#D6E5EF;color:#202733}.site-footer{border-top:1px solid var(--line);background:#10141a;padding:50px 24px}.footer-grid{max-width:var(--max);margin:auto;display:grid;grid-template-columns:1.3fr 1fr 1fr 1fr;gap:28px}.site-footer a{display:block;color:var(--muted);margin:8px 0}.mini,.muted{color:var(--muted);font-size:14px}.reveal{opacity:0;transform:translateY(20px);transition:.7s ease}.reveal.visible{opacity:1;transform:none}:focus-visible{outline:3px solid var(--green);outline-offset:3px}@media(max-width:980px){.site-nav{display:none;position:absolute;left:16px;right:16px;top:62px;background:#10141a;border:1px solid var(--line);border-radius:18px;padding:12px}.site-nav.open{display:flex;flex-direction:column}.menu-toggle{display:block}.grid,.grid.two,.stats,.footer-grid{grid-template-columns:1fr}.hero{min-height:560px}.section{padding:58px 20px}}@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}.reveal{opacity:1;transform:none;transition:none}*,*:before,*:after{animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important}}
'''

JS = r'''document.addEventListener('DOMContentLoaded',()=>{const menu=document.querySelector('.menu-toggle');const nav=document.querySelector('#site-navigation');if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}));}const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;function count(el){if(reduce||el.dataset.done)return;el.dataset.done='true';const target=parseFloat(el.dataset.count||'0');const prefix=el.dataset.prefix||'';const suffix=el.dataset.suffix||'';const dec=parseInt(el.dataset.decimals||'0',10);const start=performance.now();function tick(now){const p=Math.min((now-start)/1200,1);const eased=1-Math.pow(1-p,3);el.textContent=prefix+(target*eased).toFixed(dec)+suffix;if(p<1)requestAnimationFrame(tick);else el.textContent=prefix+target.toFixed(dec)+suffix;}requestAnimationFrame(tick);}function reveal(el){el.classList.add('visible');el.querySelectorAll('.num[data-count]').forEach(count);if(el.matches('.num[data-count]'))count(el);}if('IntersectionObserver'in window&&!reduce){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){reveal(e.target);io.unobserve(e.target);}}),{threshold:.15});document.querySelectorAll('.reveal,.num[data-count]').forEach(el=>io.observe(el));}else{document.querySelectorAll('.reveal,.num[data-count]').forEach(reveal);}});'''

ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#171B21"/><text x="80" y="170" fill="#D6E5EF" font-family="Arial" font-size="76" font-weight="800">Solar<tspan fill="#66A8EE">EX</tspan></text><text x="80" y="250" fill="#A8BDCB" font-family="Arial" font-size="32">PV glass surface engineering</text><text x="80" y="330" fill="#5CC97B" font-family="Arial" font-size="30">Quartz SiO₂ • Titan TiO₂</text></svg>'
FAVICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="28" fill="#171B21"/><path d="M25 80h78L88 42H40z" fill="none" stroke="#66A8EE" stroke-width="8"/><circle cx="94" cy="30" r="12" fill="#5CC97B"/></svg>'

def esc(s):
    return html.escape(str(s), quote=True)

def link(slug=""):
    clean = slug.strip("/")
    prefix = BASE_PATH if BASE_PATH else ""
    return f"{prefix}/{clean}/" if clean else f"{prefix}/"

def asset(path):
    clean = path.strip("/")
    prefix = BASE_PATH if BASE_PATH else ""
    return f"{prefix}/{clean}"

def canonical(slug=""):
    return f"{SITE_URL}/{slug.strip('/')}/" if slug else f"{SITE_URL}/"

def header(active):
    links = "".join(f'<a href="{link(slug)}"{(" aria-current=\"page\"" if slug == active else "")}>{name}</a>' for name, slug in NAV)
    return f'<header class="site-header"><div class="nav-shell"><a class="brand" href="{link()}" aria-label="SolarEX homepage">Solar<span>EX</span></a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-navigation">Menu</button><nav id="site-navigation" class="site-nav" aria-label="Primary navigation">{links}</nav></div></header>'

def footer():
    return f'<footer class="site-footer"><div class="footer-grid"><div><a class="brand" href="{link()}">Solar<span>EX</span></a><p class="mini">PV glass surface engineering for asset owners, EPC contractors and O&M operators.</p><a href="mailto:{EMAIL}">{EMAIL}</a></div><div><h3>Platform</h3><a href="{link("technology")}">Technology</a><a href="{link("quartz")}">SolarEX Quartz</a><a href="{link("titan")}">SolarEX Titan</a><a href="{link("technical-specifications")}">Technical Specifications</a></div><div><h3>Evidence</h3><a href="{link("proof")}">Proof / Results</a><a href="{link("roi")}">ROI Analysis</a><a href="{link("case-study-norway")}">Case Study Norway</a><a href="{link("documentation")}">Documentation</a></div><div><h3>Action</h3><a href="{link("application-process")}">Application Process</a><a href="{TECH_FORM}">Technical Review</a><a href="{COMM_FORM}">Commercial Discussion</a><a href="{link("contact")}">Contact</a></div></div></footer>'

def cards(items):
    cls = "two" if len(items) == 2 else ""
    return '<div class="grid '+cls+'">' + "".join(f'<article class="card reveal"><h3>{esc(h)}</h3><p>{esc(p)}</p></article>' for h, p in items) + '</div>'

def stats():
    vals = [("+5.15%", "Titan average uplift", "360-day monitored study context", "5.15", "+", "%", "2"), ("63", "coated modules", "Titan treatment group", "63", "", "", "0"), ("360", "monitored days", "15-minute interval context", "360", "", "", "0"), ("~147", "Quartz payback days", "European reference scenario", "147", "~", "", "0")]
    return '<section class="section"><div class="container"><div class="kicker">Evidence snapshot</div><h2>Proof metrics used with defined context.</h2><div class="stats">' + "".join(f'<article class="stat reveal"><div class="num" data-count="{c}" data-prefix="{pre}" data-suffix="{suf}" data-decimals="{dec}">{v}</div><h3>{h}</h3><p class="mini">{p}</p></article>' for v, h, p, c, pre, suf, dec in vals) + '</div></div></section>'

def matrix():
    rows = [("Mechanism type", "Passive SiO₂", "Active TiO₂"), ("UV dependency", "None", "Required"), ("Primary target", "Dust, pollen, mineral particulates", "Organic, biological and atmospheric contamination"), ("Surface response", "Hydrophobic / oleophobic", "Hydrophilic or superhydrophilic under UV"), ("Operating fit", "Low-UV, high-latitude and inorganic soiling", "UV-sufficient organic or industrial contamination")]
    body = "".join(f"<tr><td>{a}</td><td>{b}</td><td>{c}</td></tr>" for a, b, c in rows)
    return f'<section class="section"><div class="container"><div class="kicker">Selection matrix</div><h2>Quartz and Titan are selected by mechanism fit.</h2><div class="table-wrap reveal" role="region" aria-label="Quartz and Titan comparison" tabindex="0"><table><thead><tr><th>Parameter</th><th>SolarEX Quartz</th><th>SolarEX Titan</th></tr></thead><tbody>{body}</tbody></table></div></div></section>'

def render(key, page):
    slug = page["slug"]
    title = esc(page["title"])
    meta = esc(page["description"])
    url = canonical(slug)
    head = f'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{title}</title><meta name="description" content="{meta}"><meta name="robots" content="index,follow"><link rel="canonical" href="{url}"><meta property="og:title" content="{title}"><meta property="og:description" content="{meta}"><meta property="og:type" content="website"><meta property="og:url" content="{url}"><meta property="og:image" content="{canonical("assets/media/solarex-og-image-placeholder.svg")}"><meta name="theme-color" content="#171B21"><link rel="icon" href="{asset("assets/media/solarex-favicon.svg")}" type="image/svg+xml"><link rel="stylesheet" href="{asset("assets/css/styles.css")}"><script defer src="{asset("assets/js/site.js")}"></script><script type="application/ld+json">{{"@context":"https://schema.org","@type":"Organization","name":"SolarEX","url":"{SITE_URL}/","email":"{EMAIL}"}}</script></head>'
    hero = f'<body><a class="skip-link" href="#main">Skip to main content</a>{header(slug)}<main id="main"><section class="hero"><div class="hero-inner reveal"><span class="eyebrow">PV glass nanocoatings</span><h1>{esc(page["h1"])}</h1><p class="lead">{esc(page["lead"])}</p><div class="btn-row"><a class="btn" href="{TECH_FORM}">Request Technical Review</a><a class="btn secondary" href="{COMM_FORM}">Commercial Discussion</a></div></div></section>'
    body = ""
    for h, p, items in page["sections"]:
        body += f'<section class="section"><div class="container"><div class="kicker">SolarEX</div><h2>{esc(h)}</h2><p class="lead">{esc(p)}</p>{cards(items)}</div></section>'
    if key in ("home", "technology"):
        body += matrix()
    if key in ("home", "proof", "roi"):
        body += stats()
    body += f'<section class="section"><div class="container"><div class="card blue reveal"><h2>Start a SolarEX technical review.</h2><p>Submit site data and contamination context to select the correct Quartz or Titan pathway.</p><div class="btn-row"><a class="btn secondary" href="{link("contact")}">Contact SolarEX</a><a class="btn secondary" href="mailto:{EMAIL}">{EMAIL}</a></div></div></div></section>'
    return head + hero + body + "</main>" + footer() + "</body></html>"

def redirect(slug):
    url = link(slug)
    can = canonical(slug)
    return f'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Redirecting | SolarEX</title><meta name="robots" content="noindex,follow"><link rel="canonical" href="{can}"><meta http-equiv="refresh" content="0; url={url}"></head><body><p><a href="{url}">Continue to SolarEX</a></p></body></html>'

def write(path, text):
    target = OUT / path
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(text, encoding="utf-8")

def build():
    if OUT.exists():
        shutil.rmtree(OUT)
    for key, page in PAGES.items():
        slug = page["slug"]
        write(Path("index.html") if not slug else Path(slug) / "index.html", render(key, page))
    for alias, slug in ALIASES.items():
        write(Path(alias), redirect(slug))
    not_found = dict(PAGES["home"])
    not_found.update({"slug": "404.html", "title": "Page Not Found | SolarEX", "description": "The requested SolarEX page could not be found.", "h1": "Page not found.", "lead": "Use the navigation or return to the SolarEX homepage.", "sections": []})
    write(Path("404.html"), render("404", not_found).replace("index,follow", "noindex,follow"))
    write(Path("assets/css/styles.css"), CSS)
    write(Path("assets/js/site.js"), JS)
    write(Path("assets/js/main.js"), JS)
    for name, svg in {"solarex-og-image-placeholder.svg": ICON_SVG, "solarex-favicon.svg": FAVICON, "solarex-quartz-sio2-surface-placeholder.svg": ICON_SVG, "solarex-titan-tio2-photocatalytic-placeholder.svg": ICON_SVG}.items():
        write(Path("assets/media") / name, svg)
    urls = [""] + [page["slug"] for page in PAGES.values() if page["slug"]]
    sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">\n' + "".join(f"<url><loc>{canonical(u)}</loc></url>\n" for u in urls) + "</urlset>\n"
    write(Path("sitemap.xml"), sitemap)
    write(Path("robots.txt"), f"User-agent: *\nAllow: /\n\nSitemap: {SITE_URL}/sitemap.xml\n")
    write(Path("llms.txt"), f"SolarEX: PV glass surface engineering using Quartz SiO₂ and Titan TiO₂. Contact {EMAIL}.\n")
    write(Path(".nojekyll"), "")

def validate():
    forbidden = ["Si" + "O2", "Ti" + "O2", "mail" + "@" + "solarex.no", "Hirec" + "100", "Hirec" + " " + "450"]
    required = ["index.html", "quartz/index.html", "titan/index.html", "technology/index.html", "applications/index.html", "proof/index.html", "roi/index.html", "case-study-norway/index.html", "technical-specifications/index.html", "application-process/index.html", "documentation/index.html", "faq/index.html", "contact/index.html", "404.html", "robots.txt", "sitemap.xml", "assets/css/styles.css", "assets/js/site.js"]
    missing = [x for x in required if not (OUT / x).exists()]
    bad = []
    for p in OUT.rglob("*"):
        if p.is_file():
            txt = p.read_text(encoding="utf-8", errors="ignore")
            for term in forbidden:
                if term in txt:
                    bad.append((str(p.relative_to(OUT)), term))
    if missing or bad:
        print("Validation failed", {"missing": missing, "forbidden": bad})
        return 1
    print(f"SolarEX GitHub Pages demo generated for {SITE_URL}/ with base path {BASE_PATH or '/'}")
    return 0

if __name__ == "__main__":
    build()
    sys.exit(validate())
