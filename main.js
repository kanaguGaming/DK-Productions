/* ==========================================================================
   DK PRODUCTIONS — CORE ENGINE & INTERACTION DYNAMICS
   Includes: Floating Nav Scroll Dynamics, Mobile Glass Drawer,
             High-Performance Scroll Reveal, Card Cursor Spotlight,
             Email Copy & Mailto Handlers with Toast Notifications
   ========================================================================== */

'use strict';

/* ==========================================================================
   1. FLOATING NAVBAR SCROLL DYNAMICS (Throttled 60fps/120fps)
   ========================================================================== */
const nav = document.getElementById('mainNav');
let navScrollTicking = false;

function handleNavScroll() {
  if (!nav) return;
  const isScrolled = window.scrollY > 40;
  nav.classList.toggle('scrolled', isScrolled);
}

window.addEventListener('scroll', () => {
  if (!navScrollTicking) {
    window.requestAnimationFrame(() => {
      handleNavScroll();
      navScrollTicking = false;
    });
    navScrollTicking = true;
  }
}, { passive: true });

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
   3. BUTTERY SCROLL REVEAL (IntersectionObserver with unobserve)
   ========================================================================== */
function setupReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Unobserve to eliminate scroll jank
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -30px 0px'
  });

  elements.forEach(el => observer.observe(el));
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
        }, 100);
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.2 });

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
   6. CARD CURSOR SPOTLIGHT TRACKING (Desktop Only, High-Performance Throttled)
   ========================================================================== */
function setupCardSpotlights() {
  // Never run mouse spotlight listeners on mobile/touch screens
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const cards = document.querySelectorAll('.film-card-minimal, .crew-card-glass, .stat-card-glass, .contact-card-glass, .skill-card-glass, .award-card-glass');
  
  cards.forEach(card => {
    let ticking = false;
    let cardRect = null;

    card.addEventListener('mouseenter', () => {
      cardRect = card.getBoundingClientRect();
    }, { passive: true });

    card.addEventListener('mousemove', (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!cardRect) cardRect = card.getBoundingClientRect();
          const x = e.clientX - cardRect.left;
          const y = e.clientY - cardRect.top;
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      cardRect = null;
    }, { passive: true });
  });
}

/* ==========================================================================
   7. STUDIO CONTACT ACTIONS & TOAST FEEDBACK
   ========================================================================== */
let toastTimeout = null;

function showToast(message) {
  const toast = document.getElementById('copyToast');
  const toastText = document.getElementById('copyToastText');
  if (!toast) return;

  if (toastText) toastText.textContent = message;
  toast.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
window.showToast = showToast;

/**
 * Copies email to clipboard and gives visual feedback on the button & toast
 */
function copyEmailAddress(email, btnElement) {
  if (!email) return;

  function onCopied() {
    if (btnElement) {
      btnElement.classList.add('copied');
      const textSpan = btnElement.querySelector('.btn-text');
      const originalText = textSpan ? textSpan.textContent : 'Copy';
      if (textSpan) textSpan.textContent = 'Copied!';

      setTimeout(() => {
        btnElement.classList.remove('copied');
        if (textSpan) textSpan.textContent = originalText;
      }, 2000);
    }
    showToast(`Copied ${email} to clipboard!`);
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email)
      .then(onCopied)
      .catch(() => fallbackCopy(email, onCopied));
  } else {
    fallbackCopy(email, onCopied);
  }
}
window.copyEmailAddress = copyEmailAddress;

function fallbackCopy(text, callback) {
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '-9999px';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    if (callback) callback();
  } catch (err) {
    showToast(`Email address: ${text}`);
  }
}

/**
 * Handles clicking on mailto links:
 * Copies the email to clipboard as an instant guarantee, shows toast,
 * while allowing native mailto action to proceed.
 */
function handleMailClick(event, email, subject) {
  // Copy immediately so if the OS has no email client, the user still has it!
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).catch(() => {});
  }
  showToast(`Opening mail client... (${email} copied)`);
}
window.handleMailClick = handleMailClick;

/* ==========================================================================
   8. INITIALIZATION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  setupReveal();
  setupSkillBars();
  setupCardSpotlights();
});
