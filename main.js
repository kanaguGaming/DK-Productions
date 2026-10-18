/* =============================================
   DK PRODUCTIONS — MAIN JAVASCRIPT
   ============================================= */

'use strict';

/* ========================
   NAV SCROLL EFFECT
   ======================== */
const nav = document.getElementById('mainNav');
function handleNavScroll() {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}
window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();

/* ========================
   MOBILE MENU
   ======================== */
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu   = document.getElementById('mobileMenu');
const mobileClose  = document.getElementById('mobileClose');

function openMobileMenu() {
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}
window.closeMobileMenu = closeMobileMenu;

if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMobileMenu);
if (mobileClose)  mobileClose.addEventListener('click', closeMobileMenu);
if (mobileMenu)   mobileMenu.addEventListener('click', e => { if (e.target === mobileMenu) closeMobileMenu(); });

/* ========================
   SCROLL REVEAL
   ======================== */
function setupReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ========================
   ANIMATED SKILL BARS
   ======================== */
function setupSkillBars() {
  const fills = document.querySelectorAll('.skill-bar-fill');
  if (!fills.length) return;

  fills.forEach(fill => {
    // Read --pct from the style attribute
    const styleAttr = fill.getAttribute('style') || '';
    const match = styleAttr.match(/--pct:\s*([\d.]+%)/);
    const target = match ? match[1] : '0%';
    fill.setAttribute('data-target', target);
    fill.style.width = '0%';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const target = fill.getAttribute('data-target') || '0%';
        // Small delay for visual polish
        setTimeout(() => { fill.style.width = target; }, 150);
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.5 });

  fills.forEach(fill => observer.observe(fill));
}

/* ========================
   SMOOTH ANCHOR SCROLL
   ======================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      closeMobileMenu();
    }
  });
});

/* ========================
   ACTIVE NAV LINK
   ======================== */
function setActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  if (path.includes('director')) {
    document.getElementById('nav-director')?.classList.add('active');
  } else if (path.includes('crew')) {
    document.getElementById('nav-crew')?.classList.add('active');
  } else {
    document.getElementById('nav-home')?.classList.add('active');
  }
}

/* ========================
   INIT
   ======================== */
document.addEventListener('DOMContentLoaded', () => {
  setupReveal();
  setupSkillBars();
  setActiveNav();
});
