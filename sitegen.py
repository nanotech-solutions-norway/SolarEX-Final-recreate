from pathlib import Path

ROOT = Path(__file__).resolve().parent / '_site'
TECH_FORM = 'https://docs.google.com/forms/d/e/1FAIpQLSeENsc9Y8OCrbqvRxTT5CO6oiezhvU7fo2enyZtbPZV9zEGwg/viewform?usp=dialog&hl=en'
COMM_FORM = 'https://docs.google.com/forms/d/e/1FAIpQLSfwuDfW0Q3eY4ePjKZAmZlQ6H1-VxGRkwuT1Z7txlV6IgU_BA/viewform?usp=dialog&hl=en'
EMAIL = 'info@solarex.no'
NAV = [('Home','/'),('Quartz','/quartz/'),('Titan','/titan/'),('Technology','/technology/'),('Projects','/projects/'),('Documentation','/documentation/'),('FAQ','/faq/'),('Contact','/contact/')]

PAGES = {
 'home': {
  'title': 'SolarEX PV Glass Coatings | SiO₂ & TiO₂ Surface Engineering',
  'meta': 'SolarEX Quartz and Titan nanocoatings for PV glass: passive SiO₂ protection and active TiO₂ photocatalytic surface engineering.',
  'h1': 'SolarEX — Surface Engineering for PV Glass',
  'lead': 'Nanocoating solutions for photovoltaic glass: passive SiO₂ Quartz for UV-independent easy-clean surface protection and active TiO₂ Titan for UV-supported photocatalytic surface behavior.',
  'sections': [
   ('Why Surface Engineering Matters','PV glass surfaces accumulate dust, pollen, bird lime, salt, industrial pollutants and biological residues over their operational life. Contaminant adhesion directly affects the optical interface. Targeted surface engineering addresses the adhesion mechanism — not just the symptom.', [('Optical Interface Protection','Cleaner glass surfaces support more stable PV operation by reducing contaminant accumulation and bonding.'),('Reduced Contaminant Adhesion','Quartz works through hydrophobic/oleophobic adhesion reduction; Titan works through UV-supported photocatalytic hydrophilicity.'),('Lower Cleaning Burden','SolarEX supports faster, less abrasive and less water-intensive maintenance cycles.')]),
   ('Two Pathways. Different Mechanisms.','SolarEX is not a single generic coating. It is a surface-engineering platform with two distinct product pathways, each targeting a different physical and chemical mechanism.', [('SolarEX Quartz — SiO₂','Ultra-thin 100–150 nm SiO₂ nano-scale layer. Passive hydrophobic and oleophobic easy-clean mechanism. No UV activation required.'),('SolarEX Titan — TiO₂','Alcohol-based TiO₂ nanoparticle coating. UV/natural-sunlight activated photocatalysis supports hydrophilic water sheeting and organic contaminant decomposition.')]),
   ('Validated Evidence and Commercial Value','SolarEX evidence combines documented studies, field observations, technical validation and commercial models.', [('Titan PV³ Expert Study','360-day monitored field study with +5.15% average yield uplift, 63 coated modules and 15-minute interval monitoring.'),('Quartz Regional ROI Model','European model uses 90 W/m², 2,335 sunshine hours/year, €0.289/kWh and €2.44/m² coating cost, producing an indicative 147-day payback scenario.')])
  ]},
 'quartz': {
  'title': 'SolarEX Quartz SiO₂ Coating | Passive PV Glass Protection',
  'meta': 'Passive SiO₂ nanocoating for PV glass: hydrophobic, oleophobic, UV-independent easy-clean surface engineering.',
  'h1': 'SolarEX Quartz — Passive SiO₂ Surface Engineering for Solar Glass',
  'lead': 'A transparent SiO₂ nano-film engineered to reduce adhesion of dust, pollen, mineral particulates, water and grime on photovoltaic glass — without requiring UV activation.',
  'sections': [
   ('The Passive Pathway for Soiling Control','Quartz requires no UV activation, no photocatalytic trigger and no on-site energy input. It delivers passive surface repellence from point of cure.', [('No UV Activation Required','Viable at any latitude and in diffuse-light environments where photocatalytic routes underperform.'),('Hydrophobic + Oleophobic Behavior','Water beads and rolls off. Oily particulates and grime exhibit reduced adhesion energy.'),('Reduced Cleaning Burden','Lower adhesion supports longer cleaning intervals, faster cleaning and reduced water input.')]),
   ('Quartz Technical Profile','Source specifications support procurement, application planning and site-specific project scoping.', [('Film Thickness','100–150 nm transparent SiO₂ film.'),('Coverage Rate','Approximately 15–20 mL/m², process-dependent.'),('Application Method','HVLP spray or pre-impregnated wipe / lint-free cloth.'),('Cure Profile','Pre-cure about 30 seconds; full cure about 24 hours.')]),
   ('Where Quartz Performs Best','Quartz is the no-UV pathway and is preferred where passive surface repellence matches the site profile.', [('Dust, Pollen and Mineral Soiling','Optimized for inorganic and mineral particulate soiling.'),('Low-UV / High-Latitude Sites','Preferred for northern European, Scottish, Nordic and overcast-climate installations.'),('Water-Scarce Sites','Supports reduced cleaning burden in arid and semi-arid operating environments.')])
  ]},
 'titan': {
  'title': 'SolarEX Titan TiO₂ Coating | Active Photocatalytic PV Glass',
  'meta': 'Active TiO₂ photocatalytic coating for PV glass with UV-supported hydrophilic rinse behavior and validated 360-day study evidence.',
  'h1': 'SolarEX Titan — Active TiO₂ Photocatalytic Surface Engineering',
  'lead': 'UV-triggered TiO₂ surface chemistry with validated 360-day study evidence. Engineered for sites where UV availability and contamination profile support an active photocatalytic pathway.',
  'sections': [
   ('Active Surface Chemistry','Titan is engineered for sites where UV availability is sufficient and contamination profiles include organic matter, biological fouling or complex industrial atmospheric loads.', [('UV-Triggered ROS Generation','TiO₂ nanoparticles absorb UV photons and generate reactive oxygen species at the surface interface.'),('Organic Contaminant Decomposition','Photocatalytic activity targets organic films, VOC-like residues and biological loads.'),('Superhydrophilic Rinse Behavior','Under UV exposure, water sheets uniformly across the glass for improved rinse-off.')]),
   ('Titan Technical Profile','Typical process parameters support controlled site application planning and technical project scoping.', [('Coverage Rate','Approximately 10–25 mL/m², process-dependent.'),('Processing Temperature','Typically +5°C to +25°C.'),('UV Dependency','Required — the photocatalytic mechanism does not activate without UV.'),('Full Effect Development','Approximately 24–48 hours outdoors depending on climate and UV.')]),
   ('Titan Rooftop Study','The 360-day rooftop study provides validated performance evidence for Titan under monitored operating conditions.', [('+5.15% Average Uplift','Measured across all monitored strings.'),('63 Coated Modules','Photovoltaic modules treated with Titan in the rooftop study.'),('360 Monitored Days','Continuous monitoring with 15-minute interval data.')])
  ]},
 'technology': {
  'title': 'SolarEX Technology | Quartz and Titan Surface Pathways',
  'meta': 'Compare SolarEX Quartz SiO₂ and Titan TiO₂ technologies by mechanism, UV dependency, contamination profile, and operating environment.',
  'h1': 'Surface Science for Solar Assets',
  'lead': 'SolarEX is built on two distinct nanocoating pathways for photovoltaic glass — passive SiO₂ repellence and active TiO₂ photocatalysis.',
  'sections': [
   ('Surface Engineering Is a Technical Decision','The mechanism must be matched to contamination profile, UV availability and operating environment.', [('Optical Interface Protection','Nanocoating modifies the glass-air interface at molecular scale.'),('Adhesion-Energy Control','SiO₂ and TiO₂ alter surface energy through different mechanisms.'),('Environment-Matched Mechanism','The correct pathway is determined by site data, not generic product preference.')]),
   ('Pathway Selection by Environment','Quartz and Titan are selected through a mechanism-led decision process.', [('Dust / Pollen / Mineral Soiling','Quartz recommended.'),('Organic / Biological Fouling','Titan recommended where UV is sufficient.'),('Low-UV / High-Latitude Sites','Quartz preferred.'),('High-Irradiance / Desert / Tropical Sites','Titan often favored, but contamination profile remains decisive.')])
  ]},
 'projects': {
  'title': 'SolarEX Projects | Evidence and Pilot Review',
  'meta': 'SolarEX coating evidence, Titan rooftop study, Quartz field observations, ROI models, and pilot measurement framework.',
  'h1': 'Projects — Contextualized Evidence for SolarEX Coatings',
  'lead': 'SolarEX project references are presented as engineering evidence: controlled comparisons, study-specific rooftop data, model-based commercial scenarios and field observations.',
  'sections': [
   ('Proof Must Match the Site Context','Outcomes depend on climate, contamination profile, UV irradiance, cleaning regime, module type and application quality.', [('Scandinavian Quartz Controlled Test','High-latitude controlled comparison supporting the UV-independent Quartz pathway.'),('Titan Expert Rooftop Study','63 coated modules, 360 monitored days and +5.15% average yield uplift.'),('Middle East Cleanliness Reference','Field observation showing improved post-rain cleanliness in a high-dust operating context.')]),
   ('Pilot Measurement Framework','A site-specific pilot generates defensible data for scale-up decisions.', [('Baseline Yield','Minimum 30-day pre-coating baseline, irradiance-normalized.'),('Coated vs. Control Modules','Matched module pairs or strings with equivalent age, orientation and tilt.'),('Monitoring Interval and Duration','15-minute data intervals recommended; 360 days preferred for seasonal representativeness.')])
  ]},
 'documentation': {
  'title': 'SolarEX Documentation | Technical Files and Studies',
  'meta': 'SolarEX technical files, application instructions, studies, regional presentations, and guided documentation review.',
  'h1': 'SolarEX Documentation',
  'lead': 'Technical files, studies and application references structured for engineering teams, EPC partners, O&M specialists and procurement reviewers.',
  'sections': [
   ('Read the Right Document for the Right Question','The SolarEX document library is organized by function and evidence type.', [('Application Instructions','Step-by-step procedural guidance for applying Quartz or Titan to solar module surfaces.'),('Study Documents','Contextualized evidence under defined conditions and documented methodology.'),('Reference Presentations','Regional and product-level decks for commercial positioning and partner briefings.'),('Evidence Context','Guidance on how each document category should be interpreted.')]),
   ('Available Documentation Set','The supplied source package includes Quartz/Titan application instructions, Quartz regional references, Titan product presentations, Titan study documents, InterCos/Hochdorf references and a SolarEX FAQ.', [('Quartz Technical Package','Application instructions, regional models and field observations.'),('Titan Technical Package','Application instructions, photocatalytic mechanism details and 360-day study data.'),('Pilot Review Package','Site assessment framework, monitoring protocol design and evidence interpretation.')])
  ]},
 'faq': {
  'title': 'SolarEX FAQ | Quartz vs Titan Solar Coating Questions',
  'meta': 'Answers to SolarEX technical questions: Quartz vs Titan, UV activation, application, coverage, cleaning and performance evidence.',
  'h1': 'SolarEX FAQ — Technical Questions, Precise Answers',
  'lead': 'Two distinct surface-engineering pathways. Precise mechanism selection. Evidence-led deployment.',
  'sections': [
   ('Quartz — Frequently Asked Questions','Quartz is the passive SiO₂ pathway.', [('What is SolarEX Quartz?','A transparent 100–150 nm SiO₂ film that modifies surface energy to reduce adhesion of dust and non-organic soiling.'),('Does Quartz require UV?','No. Quartz functions independently of UV availability.'),('Does Quartz eliminate cleaning?','No. It reduces cleaning burden and supports optimized O&M schedules.')]),
   ('Titan — Frequently Asked Questions','Titan is the active TiO₂ pathway.', [('What is SolarEX Titan?','A TiO₂ photocatalytic coating designed for UV-supported decomposition of organic, biological and industrial contamination.'),('Why does Titan require UV?','UV photons generate reactive oxygen species in the TiO₂ layer.'),('What does the Titan study show?','+5.15% average uplift over 360 monitored days in the study context.')])
  ]},
 'contact': {
  'title': 'Contact SolarEX | Technical Review and Pilot Assessment',
  'meta': 'Contact SolarEX for pathway selection, technical review, pilot planning, documentation, and commercial discussion.',
  'h1': 'Contact SolarEX — Start a Technical Review',
  'lead': 'SolarEX supports pathway selection, pilot design, technical documentation and commercial discussion for solar nanocoating applications.',
  'sections': [
   ('Choose the Right Inquiry Route','Use the technical route for pathway selection, pilot planning, performance monitoring, application guidance and documentation requests. Use the commercial route for procurement, distribution, partnership and volume planning.', [('Technical Request','Use for site assessment, product pathway, pilot design and documentation review.'),('Commercial Inquiry','Use for procurement, distribution, partnership, volume planning and commercial terms.'),('Email','Direct contact: info@solarex.no')]),
   ('What to Include in Your Inquiry','A structured first message enables a substantive first response.', [('Site Conditions','Location, climate zone, irradiance and UV context.'),('Contamination Profile','Dust, pollen, organic, biological or industrial soiling profile.'),('Maintenance Context','Current cleaning frequency, water availability and O&M protocol.'),('Project Scope','Module count, installation type, coating interest and pilot timing.')])
  ]}
}

CSS = r'''
:root{--bg:#171B21;--panel:#202733;--panel2:#263340;--text:#D6E5EF;--muted:#9CB5C6;--blue:#5E98F1;--blue2:#66A8EE;--green:#5CC97B;--line:rgba(214,229,239,.16);--max:1180px;--radius:24px}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text);font-family:Inter,system-ui,-apple-system,Segoe UI,Arial,sans-serif;line-height:1.62}a{color:inherit;text-decoration:none}a:hover{text-decoration:underline}.site-header{position:sticky;top:0;z-index:10;background:rgba(23,27,33,.86);backdrop-filter:blur(18px);border-bottom:1px solid var(--line)}.nav{max-width:var(--max);margin:auto;display:flex;align-items:center;justify-content:space-between;padding:14px 22px}.logo{font-size:24px;font-weight:900;letter-spacing:-.03em}.logo span{color:var(--blue2)}.links{display:flex;gap:6px;flex-wrap:wrap}.links a{font-size:14px;color:var(--muted);padding:8px 10px;border-radius:999px}.links a.active,.links a:hover{background:rgba(94,152,241,.15);color:var(--text);text-decoration:none}.menu{display:none;background:transparent;border:1px solid var(--line);color:var(--text);border-radius:12px;padding:8px 10px}.hero{min-height:620px;display:flex;align-items:center;position:relative;overflow:hidden;background:radial-gradient(circle at 80% 10%,rgba(94,152,241,.42),transparent 28%),radial-gradient(circle at 18% 22%,rgba(92,201,123,.22),transparent 24%),linear-gradient(135deg,#111821,#202733 52%,#10141a)}.hero:after{content:"";position:absolute;inset:0;background:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700"><g fill="none" stroke="%23D6E5EF" stroke-opacity=".10" stroke-width="2"><path d="M100 530h1000"/><path d="M170 500h850L880 230H300z"/><path d="M300 230l720 270M450 230l450 270M600 230l210 270M750 230l50 270"/><path d="M170 500l130-270M350 500l100-270M530 500l70-270M710 500l40-270M890 500l-10-270"/></g></svg>') center/cover no-repeat}.hero-inner{position:relative;z-index:1;max-width:var(--max);margin:auto;padding:120px 24px 80px}.eyebrow{display:inline-flex;gap:8px;align-items:center;border:1px solid rgba(214,229,239,.24);border-radius:999px;background:rgba(214,229,239,.07);padding:7px 12px;font-size:13px}.eyebrow:before{content:"";width:8px;height:8px;border-radius:50%;background:var(--green)}h1,h2,h3,h4{line-height:1.12;margin:0 0 1rem}h1{font-size:clamp(42px,7vw,80px);letter-spacing:-.055em;max-width:980px}h2{font-size:clamp(30px,4vw,52px);letter-spacing:-.04em}h3{font-size:24px}.lead{font-size:clamp(18px,2vw,23px);max-width:900px;color:#c8d9e6}.section{padding:78px 24px;border-top:1px solid var(--line)}.container{max-width:var(--max);margin:auto}.kicker{color:var(--blue2);text-transform:uppercase;letter-spacing:.16em;font-size:12px;font-weight:850;margin-bottom:12px}.grid{display:grid;gap:22px}.grid.two{grid-template-columns:repeat(2,1fr)}.grid.three{grid-template-columns:repeat(3,1fr)}.grid.four{grid-template-columns:repeat(4,1fr)}.card{background:linear-gradient(180deg,rgba(38,51,64,.94),rgba(32,39,51,.98));border:1px solid var(--line);border-radius:var(--radius);padding:26px;box-shadow:0 24px 70px rgba(0,0,0,.30)}.card.blue{background:linear-gradient(135deg,#3c89db,#204c8e)}.btns{display:flex;flex-wrap:wrap;gap:12px;margin-top:24px}.btn{display:inline-flex;align-items:center;justify-content:center;border-radius:999px;padding:12px 18px;border:1px solid rgba(214,229,239,.23);background:linear-gradient(135deg,var(--blue),#3477d9);color:white;font-weight:800;box-shadow:0 12px 28px rgba(94,152,241,.22)}.btn.secondary{background:rgba(214,229,239,.07);box-shadow:none;color:var(--text)}.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}.stat{border:1px solid var(--line);border-radius:20px;background:rgba(214,229,239,.06);padding:24px}.num{font-size:42px;font-weight:950;letter-spacing:-.04em}.mini{color:var(--muted);font-size:14px}.table-wrap{overflow:auto;border:1px solid var(--line);border-radius:18px}table{width:100%;border-collapse:collapse;min-width:680px}th,td{padding:14px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top}th{background:#D6E5EF;color:#202733}.footer{border-top:1px solid var(--line);background:#10141a;padding:50px 24px}.footer-grid{max-width:var(--max);margin:auto;display:grid;grid-template-columns:1.3fr 1fr 1fr 1fr;gap:28px}.footer a{display:block;color:var(--muted);margin:8px 0}.foot-bottom{max-width:var(--max);margin:28px auto 0;padding-top:18px;border-top:1px solid var(--line);display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;color:var(--muted);font-size:13px}.reveal{opacity:0;transform:translateY(20px);transition:.7s ease}.reveal.visible{opacity:1;transform:none}@media(max-width:900px){.links{display:none;position:absolute;left:16px;right:16px;top:62px;background:#10141a;border:1px solid var(--line);border-radius:18px;padding:12px}.links.open{display:flex;flex-direction:column}.menu{display:block}.grid.two,.grid.three,.grid.four,.stats,.footer-grid{grid-template-columns:1fr}.hero{min-height:560px}.section{padding:58px 20px}}@media(prefers-reduced-motion:reduce){.reveal{opacity:1;transform:none;transition:none}}
'''

JS = """document.addEventListener('DOMContentLoaded',()=>{const m=document.querySelector('.menu'),l=document.querySelector('.links');if(m&&l)m.onclick=()=>{l.classList.toggle('open');m.setAttribute('aria-expanded',String(l.classList.contains('open')))};const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.15});document.querySelectorAll('.reveal').forEach(x=>io.observe(x));});"""

def slug_to_path(slug):
    return ROOT / ('index.html' if slug == 'home' else f'{slug}/index.html')

def nav(slug):
    html=''.join(f'<a class="{("active" if ((slug=="home" and href=="/") or href==f"/{slug}/") else "")}" href="{href}">{name}</a>' for name,href in NAV)
    return f'<header class="site-header"><div class="nav"><a class="logo" href="/">Solar<span>EX</span></a><button class="menu" aria-expanded="false">Menu</button><nav class="links">{html}</nav></div></header>'

def footer():
    return f'<footer class="footer"><div class="footer-grid"><div><h3>SolarEX</h3><p class="mini">Surface engineering solutions for photovoltaic glass. Engineered for asset owners, EPC contractors and O&M operators.</p><a href="mailto:{EMAIL}">{EMAIL}</a></div><div><h4>Platform</h4><a href="/technology/">Technology</a><a href="/quartz/">Quartz (SiO₂)</a><a href="/titan/">Titan (TiO₂)</a></div><div><h4>Evidence</h4><a href="/projects/">Projects</a><a href="/documentation/">Documentation</a><a href="/faq/">FAQ</a></div><div><h4>Contact</h4><a href="/contact/">Contact</a><a href="{TECH_FORM}">Technical Request</a><a href="{COMM_FORM}">Commercial Request</a></div></div><div class="foot-bottom"><span>© 2026 SolarEX. All rights reserved.</span><span>Surface Engineering for Photovoltaic Glass</span></div></footer>'

def cards(items):
    cls = 'four' if len(items) >= 4 else 'three' if len(items) == 3 else 'two'
    return '<div class="grid '+cls+'">' + ''.join(f'<article class="card reveal"><h3>{h}</h3><p>{p}</p></article>' for h,p in items) + '</div>'

def page(slug,d):
    sections=[]
    for i,(h,p,items) in enumerate(d['sections']):
        sections.append(f'<section class="section"><div class="container"><div class="kicker">SolarEX</div><h2>{h}</h2><p class="lead">{p}</p>{cards(items)}</div></section>')
        if slug in ('home','technology') and i == 1:
            sections.append(table_section())
    if slug == 'projects': sections.append(stats_section())
    if slug == 'contact': sections.append(contact_cta())
    cta=f'<div class="btns"><a class="btn" href="{TECH_FORM}">Request Technical Review</a><a class="btn secondary" href="{COMM_FORM}">Commercial Request</a></div>'
    return f'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{d["title"]}</title><meta name="description" content="{d["meta"]}"><link rel="canonical" href="https://www.solarex.no/{"" if slug=="home" else slug+"/"}"><meta property="og:title" content="{d["title"]}"><meta property="og:description" content="{d["meta"]}"><link rel="stylesheet" href="/assets/css/styles.css"><script defer src="/assets/js/main.js"></script></head><body>{nav(slug)}<main><section class="hero"><div class="hero-inner reveal"><span class="eyebrow">PV glass nanocoatings</span><h1>{d["h1"]}</h1><p class="lead">{d["lead"]}</p>{cta}</div></section>{"".join(sections)}</main>{footer()}</body></html>'

def table_section():
    rows=[('Mechanism type','Passive','Active'),('UV dependency','None','Required'),('Primary target','Dust, pollen, mineral particulates','Organic, biological and atmospheric contamination'),('Surface response','Hydrophobic / oleophobic','Hydrophilic or superhydrophilic under UV'),('Operating fit','Low-UV, high-latitude, inorganic soiling','UV-sufficient, organic/industrial contamination')]
    body=''.join(f'<tr><td>{a}</td><td>{b}</td><td>{c}</td></tr>' for a,b,c in rows)
    return f'<section class="section"><div class="container"><div class="kicker">Pathway comparison</div><h2>Quartz and Titan selection matrix.</h2><div class="table-wrap reveal"><table><thead><tr><th>Parameter</th><th>Quartz — SiO₂</th><th>Titan — TiO₂</th></tr></thead><tbody>{body}</tbody></table></div></div></section>'

def stats_section():
    return '<section class="section"><div class="container"><div class="kicker">Study metrics</div><h2>Selected evidence metrics.</h2><div class="stats"><div class="stat reveal"><div class="num">+5.15%</div><h3>Titan average uplift</h3><p class="mini">360-day study context.</p></div><div class="stat reveal"><div class="num">63</div><h3>Coated modules</h3><p class="mini">Titan rooftop study.</p></div><div class="stat reveal"><div class="num">360</div><h3>Monitored days</h3><p class="mini">15-minute intervals.</p></div><div class="stat reveal"><div class="num">~10%</div><h3>Quartz reference</h3><p class="mini">Scandinavian controlled context.</p></div></div></div></section>'

def contact_cta():
    return f'<section class="section"><div class="container"><div class="card blue reveal"><h2>Start the review process</h2><p>Submit site location, contamination profile, current cleaning regime, module count, selected pathway interest and target pilot timeline.</p><div class="btns"><a class="btn secondary" href="{TECH_FORM}">Technical Request & Pilot Project</a><a class="btn secondary" href="mailto:{EMAIL}">{EMAIL}</a></div></div></div></section>'

def write():
    if ROOT.exists():
        import shutil; shutil.rmtree(ROOT)
    (ROOT/'assets/css').mkdir(parents=True)
    (ROOT/'assets/js').mkdir(parents=True)
    (ROOT/'assets/img').mkdir(parents=True)
    for slug,d in PAGES.items():
        p=slug_to_path(slug); p.parent.mkdir(parents=True,exist_ok=True); p.write_text(page(slug,d),encoding='utf-8')
    (ROOT/'assets/css/styles.css').write_text(CSS,encoding='utf-8')
    (ROOT/'assets/js/main.js').write_text(JS,encoding='utf-8')
    (ROOT/'404.html').write_text(page('home',{'title':'Page Not Found | SolarEX','meta':'Page not found.','h1':'Page Not Found','lead':'The requested SolarEX page could not be found.','sections':[('Return to SolarEX','Use the navigation to continue.',[])]}),encoding='utf-8')
    (ROOT/'robots.txt').write_text('User-agent: *\nAllow: /\n\nSitemap: https://www.solarex.no/sitemap.xml\n',encoding='utf-8')
    urls=['','quartz/','titan/','technology/','projects/','documentation/','faq/','contact/']
    sm='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">\n' + ''.join(f'<url><loc>https://www.solarex.no/{u}</loc></url>\n' for u in urls) + '</urlset>\n'
    (ROOT/'sitemap.xml').write_text(sm,encoding='utf-8')
    (ROOT/'llms.txt').write_text('SolarEX: PV glass surface engineering using Quartz SiO₂ and Titan TiO₂ nanocoating pathways. Contact info@solarex.no.\n',encoding='utf-8')
    (ROOT/'.nojekyll').write_text('',encoding='utf-8')
    bad=[]
    for p in ROOT.rglob('*'):
        if p.is_file():
            s=p.read_text(encoding='utf-8',errors='ignore')
            for term in ('SiO2','TiO2','mail@solarex.no','Hirec100','Hirec 450'):
                if term in s: bad.append((str(p),term))
    if bad: raise SystemExit(f'Validation failed: {bad}')
    print(f'Generated {len(list(ROOT.rglob("*")))} site entries in {ROOT}')

if __name__ == '__main__':
    write()
