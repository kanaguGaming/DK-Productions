/* ==========================================================================
   DK PRODUCTIONS — CREW MODULE & PROFILE DOSSIER
   Centralized Crew Data Source of Truth & Multi-Role Dynamic System
   ========================================================================== */

'use strict';

// Mail & Gmail helpers
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

  if (typeof showToast === 'function') {
    showToast(`Opening Gmail compose... (${to})`);
  }

  window.open(gmailUrl, '_blank', 'noopener,noreferrer');
}

function getMailtoUrl({ to, cc, subject, body }) {
  const parts = [];
  if (cc) parts.push(`cc=${encodeURIComponent(cc)}`);
  if (subject) parts.push(`subject=${encodeURIComponent(subject)}`);
  if (body) parts.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${to}${parts.length ? '?' + parts.join('&') : ''}`;
}

/* ==========================================================================
   1. CREW PROFILE DATA (Single Source of Truth)
   Add, remove, or edit crew members here. 
   - Supports multiple roles via `roles: [...]` (or single `role: '...'`).
   - Supports multiple categories via `categories: [...]` (or auto-inferred).
   - Zero repetition: Each person has a single profile rendered in the grid,
     but dynamically appears under every category they belong to.
   ========================================================================== */
const crewData = [
  {
    id: 1,
    name: 'Mr KG',
    roles: ['Lead Actor', 'Screenplay', 'Cinematographer'],
    categories: ['actor', 'ad', 'camera', 'music', 'editing', 'sound', 'production', 'costume', 'art'], // Listed under Actors and Direction & Writing without duplicate cards
    portrait: 'assets/images/kg.png',
    badge: 'Lead Cast & Direction',
    shortBio: 'Multi-faceted cinematic artist commanding the screen as lead actor, while steering narrative vision through direction and screenplay.',
    tagline: '"Stories demand honesty — whether behind the lens or in front of it."',
    bio: 'Mr KG is a multi-disciplinary cinematic artist serving as lead actor, cinematographer, and screenwriter. His work is characterised by fearless emotional exposure, razor-sharp narrative instinct, and total creative vision across every stage of production from script to screen.',
    films: ['Troop'],
  },
  {
    id: 9,
    name: 'Pradeeshwar S',
    roles: ['Actor'],
    categories: ['actor'],
    portrait: 'assets/images/pradeeshwar.png',
    badge: 'Actor'  ,
    shortBio: 'Talented CSE engineer did a cameo performance in Troop short film, only for his friends.',
    tagline: '“Butter Kumar rocks, Everyone shocks!”',
    bio: 'Pradeeshwar was featured in Troop, delivering an cameo performance as Butter Kumar.',
    films: ['Troop']
  },  
  {
    id: 2,
    name: 'Valavan',
    roles: ['Cinematographer', 'Actor'],
    categories: ['camera', 'actor'],
    portrait: 'assets/images/valavan.jpeg',
    badge: 'Cinematography & Cast',
    shortBio: 'Cinematographer and actor who handled cinematography on Chidambaram and Adikaathir 02, and featured in cast for Adikaathir 01 and 02.',
    tagline: '“Storytelling through visual craft and performance.”',
    bio: 'Valavan is a key creative contributor to DK Productions, bringing dual expertise behind the camera and in front of it. He served as cinematographer for Chidambaram and Adikaathir 02, while also performing as part of the cast in both Adikaathir 01 and Adikaathir 02.',
    films: ['Chidambaram', 'Adikaathir 02', 'Adikaathir 01']
  },
  {
    id: 3,
    name: 'Gokulrajan',
    roles: ['Cinematographer', 'Actor'],
    categories: ['camera', 'actor'],
    portrait: 'assets/images/gokulrajan.jpeg',
    badge: 'Cinematography & Cast',
    shortBio: 'Cinematographer and actor behind the camera on Adikaathir 01, Oru naal, Sanjaari, and Love at metro sight.',
    tagline: '“Framing emotion and embodying narrative character.”',
    bio: 'Gokulrajan is a prolific collaborator across DK Productions. His camera work defines Adikaathir 01, Oru naal, Sanjaari, and Love at metro sight. He also appears as an actor in Adikaathir 02, Oru naal, and Sanjaari.',
    films: ['Adikaathir 02', 'Adikaathir 01', 'Oru naal', 'Sanjaari', 'Love at metro sight']
  },
  {
    id: 4,
    name: 'Gandhi',
    roles: ['Cinematographer', 'Actor'],
    categories: ['camera', 'actor'],
    portrait: 'assets/images/gandhi.jpeg',
    badge: 'Cinematography & Cast',
    shortBio: 'Cinematographer and cast member on Adikaathir 02.',
    tagline: '“Bringing focus, texture, and character to screen.”',
    bio: 'Gandhi contributed both behind the lens as cinematographer and in front of the camera as actor on the production of Adikaathir 02.',
    films: ['Adikaathir 02']
  },
  {
    id: 5,
    name: 'Akashkumar',
    roles: ['Actor'],
    categories: ['actor'],
    portrait: 'assets/images/akashkumar.jpeg',
    badge: 'Cast Member',
    shortBio: 'Featured actor in Adikaathir 02.',
    tagline: '“Living the scene with quiet intensity.”',
    bio: 'Akashkumar is a featured actor in the cast of Adikaathir 02, bringing dramatic presence to the ensemble.',
    films: ['Adikaathir 02']
  },
  {
    id: 6,
    name: 'Karthika',
    roles: ['Actress'],
    categories: ['actor'],
    portrait: 'assets/images/karthika.jpeg',
    badge: 'Actress',
    shortBio: 'Actress in Sanjaari.',
    tagline: '“Embodying the emotional spirit of the wanderer.”',
    bio: 'Karthika stars in Sanjaari, bringing warmth, depth, and vulnerability to the production.',
    films: ['Sanjaari']
  },
  {
    id: 7,
    name: 'Swetha',
    roles: ['Actress'],
    categories: ['actor'],
    portrait: 'assets/images/swetha.jpeg',
    badge: 'Actress'  ,
    shortBio: 'Actress starring in Love at metro sight.',
    tagline: '“Capturing subtle romance in fleeting moments.”',
    bio: 'Swetha stars in Love at metro sight, delivering an expressive, memorable performance.',
    films: ['Love at metro sight']
  },
  {
    id: 8,
    name: 'Priya Akshay',
    roles: ['Actress'],
    categories: ['actor'],
    portrait: 'assets/images/priyaakshay.jpeg',
    badge: 'Actress'  ,
    shortBio: 'Actress starring in Kavidhaiye.',
    tagline: '“Capturing subtle romance in fleeting moments.”',
    bio: 'Priya Akshay stars in Kavidhaiye, delivering an expressive, memorable performance.',
    films: ['Kavidhaiye']
  },  
  
];

/* Helper to safely escape HTML */
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* Helper to get array of roles for a crew member */
function getPersonRoles(person) {
  if (Array.isArray(person.roles) && person.roles.length > 0) {
    return person.roles;
  }
  if (typeof person.role === 'string' && person.role.trim() !== '') {
    return [person.role];
  }
  return ['Crew Member'];
}

/* Helper to extract all matching category slugs for a crew member */
function getPersonCategories(person) {
  const cats = new Set();

  // 1. Explicit categories (array or comma/space-separated string)
  const rawCats = person.categories || person.category;
  if (Array.isArray(rawCats)) {
    rawCats.forEach(c => cats.add(c.toLowerCase().trim()));
  } else if (typeof rawCats === 'string') {
    rawCats.split(/[\s,]+/).forEach(c => {
      if (c) cats.add(c.toLowerCase().trim());
    });
  }

  // 2. Infer from all declared roles
  const roles = getPersonRoles(person);
  roles.forEach(r => {
    const roleLower = r.toLowerCase();
    if (roleLower.includes('actor') || roleLower.includes('actress') || roleLower.includes('cast')) {
      cats.add('actor');
    }
    if (roleLower.includes('camera') || roleLower.includes('cinematograph') || roleLower.includes('dop') || roleLower.includes('steadicam')) {
      cats.add('camera');
    }
    if (roleLower.includes('music') || roleLower.includes('composer') || roleLower.includes('vocal') || roleLower.includes('lyric')) {
      cats.add('music');
    }
    if (roleLower.includes('direct') || roleLower.includes('ad') || roleLower.includes('screenplay') || roleLower.includes('writer') || roleLower.includes('script')) {
      cats.add('ad'); // 'ad' covers Direction & Writing / AD
    }
    if (roleLower.includes('edit') || roleLower.includes('montage')) {
      cats.add('editor');
    }
    if (roleLower.includes('sound') || roleLower.includes('audio') || roleLower.includes('mix') || roleLower.includes('foley')) {
      cats.add('sound');
    }
    if (roleLower.includes('art') || roleLower.includes('production design')) {
      cats.add('art');
    }
  });

  if (cats.size === 0) cats.add('all');
  return Array.from(cats);
}

/* ==========================================================================
   2. DYNAMIC CREW GRID RENDERING
   Populates #crewGrid directly from crewData without repetition.
   ========================================================================== */
function renderCrewGrid() {
  const grid = document.getElementById('crewGrid');
  if (!grid) return;

  grid.innerHTML = crewData.map(person => {
    const roles = getPersonRoles(person);
    const categories = getPersonCategories(person);
    const categoriesAttr = categories.join(' ');
    const shortBio = person.shortBio || (person.bio ? person.bio.slice(0, 110) + '...' : '');
    const filmsHtml = (person.films || []).map(f => `<span class="crew-film-pill">${escapeHtml(f)}</span>`).join('');
    const badgeHtml = person.badge 
      ? `<span style="font-family:var(--font-ui); font-size:0.6rem; color:var(--text-subtle);">${escapeHtml(person.badge)}</span>` 
      : '';

    // Render individual badge chips for each role
    const roleChipsHtml = roles.map(r => `<span class="badge-chip verified">${escapeHtml(r)}</span>`).join('');

    return `
      <article class="crew-card-glass" data-categories="${escapeHtml(categoriesAttr)}" data-role="${escapeHtml(categoriesAttr)}" data-id="${person.id}" tabindex="0" role="button" aria-label="View profile of ${escapeHtml(person.name)}">
        <div class="crew-portrait-wrap">
          <img src="${escapeHtml(person.portrait)}" alt="${escapeHtml(person.name)}" class="crew-portrait" loading="lazy" decoding="async" />
          <div class="crew-portrait-shade"></div>
          <div class="crew-role-badge-overlay">
            <div style="display:flex; flex-wrap:wrap; gap:0.35rem; align-items:center;">
              ${roleChipsHtml}
            </div>
          </div>
        </div>
        <div class="crew-card-body">
          <h3 class="crew-name">${escapeHtml(person.name)}</h3>
          <p class="crew-bio-short">${escapeHtml(shortBio)}</p>
          <div class="crew-film-pills">
            ${filmsHtml}
          </div>
        </div>
        <div class="crew-card-footer">
          <span class="crew-view-btn">
            View Profile
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
          </span>
          ${badgeHtml}
        </div>
      </article>
    `;
  }).join('');

  // Attach click and keyboard listeners to cards
  grid.querySelectorAll('.crew-card-glass').forEach(card => {
    const id = card.getAttribute('data-id');
    card.addEventListener('click', () => openModal(id));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(id);
      }
    });
  });
}

/* ==========================================================================
   3. MULTI-CATEGORY ROLE FILTERING
   Checks if the card's categories include the active filter.
   ========================================================================== */
function initFilters() {
  const filterPills = document.querySelectorAll('.filter-pill');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');
      const crewCards = document.querySelectorAll('.crew-card-glass');

      crewCards.forEach(card => {
        const cardCats = (card.getAttribute('data-categories') || card.getAttribute('data-role') || '').split(/\s+/);
        const isMatch = filter === 'all' || cardCats.includes(filter);

        if (isMatch) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'translateY(16px)';
          requestAnimationFrame(() => {
            setTimeout(() => {
              card.style.transition = 'opacity 0.4s var(--ease-spring), transform 0.4s var(--ease-spring)';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 30);
          });
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ==========================================================================
   4. PROFILE DOSSIER MODAL
   Displays all roles, quotes, and bio.
   ========================================================================== */
const modalOverlay        = document.getElementById('modalOverlay');
const modalClose          = document.getElementById('modalClose');
const modalPortrait       = document.getElementById('modalPortrait');
const modalRole           = document.getElementById('modalRole');
const modalRolesContainer = document.getElementById('modalRolesContainer');
const modalName           = document.getElementById('modalName');
const modalTagline        = document.getElementById('modalTagline');
const modalBio            = document.getElementById('modalBio');
const modalFilmList       = document.getElementById('modalFilmList');

function openModal(id) {
  // Support lookup by matching person id or numerical index
  const person = crewData.find(p => p.id == id) || crewData[id];
  if (!person) return;

  if (modalPortrait) {
    modalPortrait.src = person.portrait;
    modalPortrait.alt = person.name;
  }

  const roles = getPersonRoles(person);
  if (modalRolesContainer) {
    modalRolesContainer.innerHTML = roles
      .map(r => `<span class="badge-chip verified">${escapeHtml(r)}</span>`)
      .join('');
  } else if (modalRole) {
    modalRole.textContent = roles.join(' · ');
  }

  if (modalName)     modalName.textContent = person.name;
  if (modalTagline)  modalTagline.textContent = person.tagline || '';
  if (modalBio)      modalBio.textContent = person.bio || '';

  if (modalFilmList) {
    modalFilmList.innerHTML = (person.films || [])
      .map(f => `<span class="badge-chip">${escapeHtml(f)}</span>`)
      .join('');
  }

  // Prebuilt personalized Gmail / Mailto setup for this crew member
  const toEmail = 'dk.productions-dir@gmail.com';
  const ccEmail = 'kanagubry@gmail.com';
  const rolesStr = roles.join(', ');
  const emailSubject = `[Casting / Crew Inquiry] Collaboration Request regarding ${person.name} (${rolesStr})`;
  const emailBody = `Dear DK Productions Management & Admin Team,

I am reaching out regarding a collaboration / casting opportunity for crew member ${person.name} (${rolesStr}).

Project Details:
- Production / Project Title: [Your Project Title]
- Production Type (Feature, Short, Series, Commercial, Music Video): [Type]
- Role / Department: [e.g., ${roles[0] || 'Performer / Technician'}]
- Proposed Production Dates: [Tentative Schedule]
- Location / City: [City / Location]

Please let us know their availability, management representation, and the best time to connect for a detailed discussion.

Thank you,
[Your Name]
[Your Organization / Production Company]
[Contact Number / Email]`;

  const crewInquireBtn = document.getElementById('crewInquireBtn');
  if (crewInquireBtn) {
    crewInquireBtn.href = getMailtoUrl({ to: toEmail, cc: ccEmail, subject: emailSubject, body: emailBody });
    crewInquireBtn.onclick = (e) => {
      e.preventDefault();
      openGmailCompose({ to: toEmail, cc: ccEmail, subject: emailSubject, body: emailBody });
    };
  }

  if (modalOverlay) {
    modalOverlay.classList.add('open');
  }
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (modalOverlay) {
    modalOverlay.classList.remove('open');
  }
  document.body.style.overflow = '';
}

window.openModal = openModal;
window.closeModal = closeModal;

if (modalClose) modalClose.addEventListener('click', closeModal);
if (modalOverlay) {
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay?.classList.contains('open')) {
    closeModal();
  }
});

/* ==========================================================================
   5. STAGGERED ENTRANCE ON LOAD
   ========================================================================== */
function animateEntrance() {
  const crewCards = document.querySelectorAll('.crew-card-glass');
  crewCards.forEach((card, i) => {
    if (i < 12) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(16px)';
      setTimeout(() => {
        card.style.transition = 'opacity 0.4s var(--ease-spring), transform 0.4s var(--ease-spring)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        setTimeout(() => {
          card.style.transition = '';
          card.style.transform = '';
          card.style.opacity = '';
        }, 450);
      }, 40 + i * 30);
    }
  });
}

/* ==========================================================================
   6. INITIALIZATION
   ========================================================================== */
function initCrewPage() {
  renderCrewGrid();
  initFilters();
  animateEntrance();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCrewPage);
} else {
  initCrewPage();
}
