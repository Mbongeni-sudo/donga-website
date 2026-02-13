// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.getAttribute('data-open') === 'true';
    nav.setAttribute('data-open', String(!isOpen));
    navToggle.setAttribute('aria-expanded', String(!isOpen));
  });
}

// Smooth scroll for same-page anchors
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const targetId = a.getAttribute('href').substring(1);
    if (!targetId) return;
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      nav?.setAttribute('data-open', 'false');
      navToggle?.setAttribute('aria-expanded', 'false');
    }
  });
});

// Dropdown accessibility
document.querySelectorAll('.dropdown').forEach(dd => {
  const btn = dd.querySelector('.dropbtn');
  const menu = dd.querySelector('.dropdown-menu');
  if (!btn || !menu) return;
  const setOpen = (open) => {
    dd.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-expanded', String(open));
  };
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dd.getAttribute('aria-expanded') === 'true';
    setOpen(!isOpen);
  });
  document.addEventListener('click', () => setOpen(false));
  dd.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
});

// Year in footer
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  const apply = (t)=>document.documentElement.setAttribute('data-theme', t);
  const saved = localStorage.getItem('theme');
  if (saved) apply(saved);
  themeToggle.addEventListener('click', ()=>{
    const cur = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = cur === 'dark' ? 'light' : 'dark';
    apply(next); localStorage.setItem('theme', next);
  });
}

// Reveal on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
},{threshold:0.2});

document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Simple slider
const slider = document.querySelector('.hero-slider');
if (slider){
  const slides = Array.from(slider.querySelectorAll('.slide'));
  let i = 0; let t;
  const show = (idx)=>{
    slides.forEach((s, j)=>{ s.style.display = j===idx ? 'grid' : 'none'; });
  };
  const next = ()=>{ i = (i+1)%slides.length; show(i); };
  const prev = ()=>{ i = (i-1+slides.length)%slides.length; show(i); };
  slider.querySelector('.next')?.addEventListener('click', ()=>{ next(); restart(); });
  slider.querySelector('.prev')?.addEventListener('click', ()=>{ prev(); restart(); });
  const autoplay = ()=>{ t = setInterval(next, 5000); };
  const restart = ()=>{ clearInterval(t); autoplay(); };
  show(i); autoplay();
}
