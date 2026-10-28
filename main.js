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
   6. CARD CURSOR SPOTLIGHT TRACKING (Removed for 120fps Scroll Performance)
   ========================================================================== */


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

/**
 * Opens Gmail web compose in a new tab with pre-filled fields (To, CC, Subject, Body).
 * Also copies the primary email and displays a status toast.
 */
function openGmailCompose({ to, cc, subject, body }) {
  const params = new URLSearchParams();
  params.append('view', 'cm');
  params.append('fs', '1');
  if (to) params.append('to', to);
  if (cc) params.append('cc', cc);
  if (subject) params.append('su', subject);
  if (body) params.append('body', body);

  const gmailUrl = `https://mail.google.com/mail/?${params.toString()}`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(to).catch(() => {});
  }

  showToast(`Opening Gmail compose... (${to})`);

  window.open(gmailUrl, '_blank', 'noopener,noreferrer');
}
window.openGmailCompose = openGmailCompose;

/**
 * Builds mailto URL with cc, subject, and body as fallback
 */
function getMailtoUrl({ to, cc, subject, body }) {
  const parts = [];
  if (cc) parts.push(`cc=${encodeURIComponent(cc)}`);
  if (subject) parts.push(`subject=${encodeURIComponent(subject)}`);
  if (body) parts.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${to}${parts.length ? '?' + parts.join('&') : ''}`;
}
window.getMailtoUrl = getMailtoUrl;

/* ==========================================================================
   7B. LIVE ACTIVE & DYNAMICALLY CHANGING BACKGROUND ENGINE
   Ultra-High-Performance GPU-friendly background with zero-jank scroll pause,
   batched particle paths, and silky smooth 120fps motion.
   ========================================================================== */
function setupDynamicBackground() {
  const scene = document.querySelector('.ambient-scene');
  if (!scene) return;

  let canvas = document.getElementById('ambientCanvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'ambientCanvas';
    canvas.className = 'ambient-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    scene.insertBefore(canvas, scene.firstChild);
  }

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let animId = null;
  let isRunning = false;
  let isScrolling = false;
  let scrollTimeout = null;

  // Track scroll state: pause canvas redraws during active scroll for 120fps smooth scrolling!
  window.addEventListener('scroll', () => {
    isScrolling = true;
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
    }, 120);
  }, { passive: true });

  const mouse = {
    x: -9999,
    y: -9999,
    targetX: -9999,
    targetY: -9999,
    active: false,
    radius: 180
  };

  // Lightweight particle count
  const particleCount = window.innerWidth < 768 ? 14 : 22;
  const particles = [];

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    if (particles.length === 0) {
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: 1.5 + Math.random() * 1.8,
          baseAlpha: 0.2 + Math.random() * 0.35,
          phase: Math.random() * Math.PI * 2,
          speed: 0.0012 + Math.random() * 0.0015
        });
      }
    }
  }

  window.addEventListener('resize', resize, { passive: true });

  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
    mouse.active = true;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
  }, { passive: true });

  resize();

  function draw(now) {
    if (!isRunning) return;

    // While user is actively scrolling, skip heavy canvas redraws to give 100% thread to scrolling
    if (isScrolling) {
      animId = requestAnimationFrame(draw);
      return;
    }

    if (mouse.active) {
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;
    } else {
      mouse.x += (-9999 - mouse.x) * 0.05;
      mouse.y += (-9999 - mouse.y) * 0.05;
    }

    ctx.clearRect(0, 0, width, height);

    // 1. Batched Filament Lines (Single Path, Single Stroke!)
    const maxDist = width < 768 ? 110 : 150;
    const maxDistSq = maxDist * maxDist;

    ctx.beginPath();
    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < maxDistSq) {
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
        }
      }
    }
    ctx.lineWidth = 0.8;
    ctx.strokeStyle = 'rgba(37, 99, 235, 0.12)';
    ctx.stroke();

    // 2. Batched Particles (Single Path, Single Fill!)
    ctx.beginPath();
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (mouse.active) {
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mDistSq = mdx * mdx + mdy * mdy;
        if (mDistSq < mouse.radius * mouse.radius && mDistSq > 0) {
          const mDist = Math.sqrt(mDistSq);
          const force = (1 - mDist / mouse.radius) * 0.6;
          p.x += (mdx / mDist) * force;
          p.y += (mdy / mDist) * force;
        }
      }

      if (p.x < -10) p.x = width + 10;
      else if (p.x > width + 10) p.x = -10;
      if (p.y < -10) p.y = height + 10;
      else if (p.y > height + 10) p.y = -10;

      const pulse = Math.sin(now * p.speed + p.phase);
      const r = p.radius * (1 + 0.15 * pulse);

      ctx.moveTo(p.x + r, p.y);
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
    }
    ctx.fillStyle = 'rgba(37, 99, 235, 0.35)';
    ctx.fill();

    // 3. Subtle interactive cursor aura
    if (mouse.active && mouse.x > 0 && mouse.y > 0) {
      const mouseGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 160);
      mouseGrad.addColorStop(0, 'rgba(59, 130, 246, 0.14)');
      mouseGrad.addColorStop(0.6, 'rgba(37, 99, 235, 0.04)');
      mouseGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = mouseGrad;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 160, 0, Math.PI * 2);
      ctx.fill();
    }

    animId = requestAnimationFrame(draw);
  }

  function start() {
    if (!isRunning) {
      isRunning = true;
      animId = requestAnimationFrame(draw);
    }
  }

  function stop() {
    isRunning = false;
    if (animId) {
      cancelAnimationFrame(animId);
      animId = null;
    }
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });

  start();
}

/* ==========================================================================
   8. INITIALIZATION
   ========================================================================== */
function initMain() {
  setupReveal();
  setupSkillBars();
  setupDynamicBackground();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMain);
} else {
  initMain();
}



