window.addEventListener('DOMContentLoaded',function(){
var d=document;
d.querySelectorAll('.reveal').forEach(function(x){x.classList.add('is-visible')});
d.querySelectorAll('header nav a').forEach(function(a){if(a.textContent.trim()==='ROI Calculator'){a.remove()}});
var b=d.querySelector('[data-menu-toggle]');
var n=d.querySelector('[data-nav]');
if(b&&n){b.addEventListener('click',function(){var o=n.classList.toggle('is-open');b.setAttribute('aria-expanded',o?'true':'false')})}
var f=d.querySelector('footer');
if(f&&!f.querySelector('.solarex-footer-admin-link')){
var cols=f.querySelectorAll('.footer-grid>div');
var c=cols[cols.length-1];
if(c){c.insertAdjacentHTML('beforeend','<a href="../roi-calculator/">ROI Calculator</a><a class="solarex-footer-admin-link" href="https://forms.nanotech-solutions.com/solarex_admin/login.php" target="_blank" rel="nofollow noopener" title="Admin login" aria-label="SolarEX admin login">🔐</a>')}
}
});
