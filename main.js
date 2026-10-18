/* ==========================================================================
   DK PRODUCTIONS — CORE ENGINE & INTERACTION DYNAMICS
   Includes: Floating Nav Scroll Dynamics, Mobile Glass Drawer,
             Buttery Scroll Reveal, Skill Bar Meters, Card Cursor Spotlight
   ========================================================================== */

'use strict';

/* ==========================================================================
   1. FLOATING NAVBAR SCROLL DYNAMICS
   ========================================================================== */
const nav = document.getElementById('mainNav');

function handleNavScroll() {
  if (!nav) return;
  const isScrolled = window.scrollY > 40;
  nav.classList.toggle('scrolled', isScrolled);
}

window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();

/* ==========================================================================
   2. MOBILE GLASS DRAWER CONTROLS
   ========================================================================== */
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu   = document.getElementById('mobileMenu');
const mobileClose  = document.getElementById('mobileClose');

function openMobileMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

window.closeMobileMenu = closeMobileMenu;

if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMobileMenu);
if (mobileClose)  mobileClose.addEventListener('click', closeMobileMenu);
if (mobileMenu) {
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) closeMobileMenu();
  });
}

// Close drawer on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu?.classList.contains('open')) {
    closeMobileMenu();
  }
});

/* ==========================================================================
   3. BUTTERY SCROLL REVEAL (IntersectionObserver)
   ========================================================================== */
function setupReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ==========================================================================
   4. ANIMATED SKILL BARS
   ========================================================================== */
function setupSkillBars() {
  const fills = document.querySelectorAll('.skill-bar-fill');
  if (!fills.length) return;

  fills.forEach(fill => {
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
        setTimeout(() => {
          fill.style.width = target;
        }, 120);
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(fill => observer.observe(fill));
}

/* ==========================================================================
   5. SMOOTH ANCHOR LINK NAVIGATION
   ========================================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      closeMobileMenu();
    }
  });
});

/* ==========================================================================
   6. CARD CURSOR SPOTLIGHT TRACKING
   ========================================================================== */
function setupCardSpotlights() {
  const cards = document.querySelectorAll('.film-card-minimal, .crew-card-glass, .stat-card-glass, .skill-card-glass, .award-card-glass');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ==========================================================================
   7. INITIALIZATION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  setupReveal();
  setupSkillBars();
  setupCardSpotlights();
});
