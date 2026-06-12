window.addEventListener('DOMContentLoaded',function(){
var d=document;
var admin='https://forms.nanotech-solutions.com/solarex_admin/login.php';
var base=location.pathname.indexOf('/SolarEX-Final-recreate/')>-1?'/SolarEX-Final-recreate/':'/';
function href(p){return base+p}
function relink(){
d.querySelectorAll('a[href^="/"]').forEach(function(a){
var h=a.getAttribute('href');
if(h.indexOf('/SolarEX-Final-recreate/')!==0){a.setAttribute('href',base+h.replace(/^\//,''))}
});
}
d.querySelectorAll('.reveal').forEach(function(x){x.classList.add('is-visible')});
var nav=d.querySelector('[data-nav]');
if(nav){nav.innerHTML='<a href="'+href('index.html')+'">Home</a><a href="'+href('technology/')+'">Technology</a><a href="'+href('quartz/')+'">Quartz</a><a href="'+href('titan/')+'">Titan</a><a href="'+href('applications/')+'">Applications</a><a href="'+href('markets/')+'">Markets</a><a href="'+href('case-studies/')+'">Case Studies</a><a href="'+href('documentation/')+'">Documentation</a><a href="'+href('technical-review/')+'">Technical Review</a><a href="'+href('contact/')+'">Contact</a>';}
var b=d.querySelector('[data-menu-toggle]');
if(b&&nav){b.addEventListener('click',function(){var o=nav.classList.toggle('is-open');b.setAttribute('aria-expanded',o?'true':'false')});d.addEventListener('click',function(e){if(!b.contains(e.target)&&!nav.contains(e.target)){nav.classList.remove('is-open');b.setAttribute('aria-expanded','false')}})}
var f=d.querySelector('footer');
if(f&&!f.querySelector('.solarex-footer-admin-link')){
var g=f.querySelector('.footer-grid')||f;
g.insertAdjacentHTML('beforeend','<div><h3>Applications</h3><a href="'+href('applications/')+'">Applications</a><a href="'+href('roi-calculator/')+'">ROI Calculator</a><a class="solarex-footer-admin-link" href="'+admin+'" target="_blank" rel="nofollow noopener" title="Admin login" aria-label="SolarEX admin login">🔐</a></div>');
}
d.querySelectorAll('form').forEach(function(form){if(!form.getAttribute('method'))form.setAttribute('method','post')});
relink();
});
