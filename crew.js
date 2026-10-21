/* ==========================================================================
   DK PRODUCTIONS — CREW MODULE & PROFILE DOSSIER
   Centralized Crew Data Source of Truth & Multi-Role Dynamic System
   ========================================================================== */

'use strict';

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
    films: ['Echoes of Dusk', 'Fractured'],
  },
  {
    id: 2,
    name: 'Gokul Raj',
    roles: ['Character Actor'],
    categories: ['actor'],
    portrait: 'assets/images/kg.png',
    badge: 'Theatre Artist',
    shortBio: 'Character actor known for nuanced portrayals of morally ambiguous figures with commanding physicality.',
    tagline: '"I don\'t play villains. I play people who made different choices than you."',
    bio: 'Karan Nair specialises in morally complex characters, bringing depth and unpredictability to roles that lesser actors might play one-dimensionally. His background in theatre has given him an exceptional command of physical storytelling and stage presence that translates powerfully on camera.',
    films: ['The Crimson Letter', 'Still Waters'],
  },
  {
    id: 3,
    name: '',
    roles: ['Lead Actress'],
    categories: ['actor'],
    portrait: 'assets/images/kg.png',
    badge: 'Kalakshetra',
    shortBio: 'Stage-trained actress bringing theatrical depth and internal conflict to intimate short film narratives.',
    tagline: '"Short films demand everything — there\'s no hiding behind a long runtime."',
    bio: 'Meera Krishnan\'s stage training is evident in every performance — precise, physical, fully committed. She has an extraordinary ability to convey internal conflict through the smallest gestures, making her perfect for the intimate, close-up world of short cinema. She is based in Chennai and is an alumna of Kalakshetra Foundation.',
    films: ['Still Waters', 'Fractured'],
  },
  {
    id: 4,
    name: 'Ravi Shankar',
    roles: ['Director of Photography'],
    categories: ['camera'],
    portrait: 'assets/images/kg.png',
    badge: 'DOP · Core Team',
    shortBio: 'Visual storyteller with mastery of natural light, handheld texture, and wide-format anamorphic lenses.',
    tagline: '"Light is the language. The camera is just the pen."',
    bio: 'Ravi Shankar is DK Productions\' long-standing cinematographer and co-creative force. His mastery of natural and practical lighting gives every DK Production its signature look: dark, textured, and emotionally charged. He has shot all four of the studio\'s productions and is known for his meticulous pre-production preparation and in-the-moment intuition.',
    films: ['Echoes of Dusk', 'The Crimson Letter', 'Still Waters', 'Fractured'],
  },
  {
    id: 5,
    name: 'Anand Pillai',
    roles: ['Steadicam & Cam Op'],
    categories: ['camera'],
    portrait: 'assets/images/kg.png',
    badge: 'Camera Dept',
    shortBio: 'Precision camera operator specialising in fluid movement and intricate single-take sequences.',
    tagline: '"A moving camera breathes life into static moments."',
    bio: 'Anand Pillai is a camera operator known for his instinctive sense of movement and composition. Whether operating a Steadicam through a long take or shooting handheld in tight quarters, Anand adapts seamlessly to the demands of the story. He has collaborated with Ravi Shankar across multiple productions.',
    films: ['Echoes of Dusk', 'The Crimson Letter'],
  },
  {
    id: 6,
    name: 'Nisha Verma',
    roles: ['Film Editor'],
    categories: ['editor'],
    portrait: 'assets/images/kg.png',
    badge: 'Lead Editor',
    shortBio: 'Montage virtuoso who sculpts tension, rhythm, and emotional restraint from raw footage.',
    tagline: '"Editing is not just cutting — it is the final rewrite of the script."',
    bio: 'Nisha Verma is the invisible architect behind every DK production. Her editing rhythms are precise, deliberate, and always emotionally intelligent. She is known for finding unexpected connections between shots and building tension through silence and restraint rather than rapid cutting. She has edited all four DK Productions releases.',
    films: ['Echoes of Dusk', 'The Crimson Letter', 'Still Waters', 'Fractured'],
  },
  {
    id: 7,
    name: 'Rohan Das',
    roles: ['Music Composer'],
    categories: ['music'],
    portrait: 'assets/images/kg.png',
    badge: 'Score Artist',
    shortBio: 'Composer of atmospheric, genre-defying scores that blur the line between sound and silence.',
    tagline: '"Music doesn\'t accompany a film — it completes it."',
    bio: 'Rohan Das is a composer and sound artist whose work defies easy categorisation. Drawing from classical Indian music, jazz, and electronic soundscapes, he creates scores that feel both ancient and urgently contemporary. His work on "Echoes of Dusk" was cited by critics as a defining element of the film\'s emotional power.',
    films: ['Echoes of Dusk', 'Fractured', 'Still Waters'],
  },
  {
    id: 8,
    name: 'Divya Menon',
    roles: ['1st Assistant Director'],
    categories: ['ad'],
    portrait: 'assets/images/kg.png',
    badge: 'Floor Producer',
    shortBio: 'Meticulous AD who transforms chaotic sets into well-oiled, highly disciplined creative machines.',
    tagline: '"The best AD is one the director never has to think about."',
    bio: 'Divya Menon is the operational backbone of every DK Productions shoot. As First AD, she runs the floor with quiet authority, ensuring that the director\'s creative vision is never compromised by logistical chaos. She is meticulous in pre-production, creative under pressure, and universally respected by every crew member she works with.',
    films: ['The Crimson Letter', 'Still Waters', 'Echoes of Dusk'],
  },
  {
    id: 9,
    name: 'Suresh Pillai',
    roles: ['Sound Designer'],
    categories: ['sound'],
    portrait: 'assets/images/kg.png',
    badge: 'Foley & Mix',
    shortBio: 'Award-winning sound designer sculpting tactile acoustic realities through Foley, ambience, and spatial sound.',
    tagline: '"Half of what you see in a film, you actually hear."',
    bio: 'Suresh Pillai is an award-winning sound designer with a gift for creating sonic environments that feel utterly immersive. His work goes far beyond dialogue and music — he sculpts the ambient world of each film with painstaking care, using field recordings, Foley, and original sound design to build a fully inhabited acoustic reality.',
    films: ['Echoes of Dusk', 'The Crimson Letter', 'Still Waters', 'Fractured'],
  },
  {
    id: 10,
    name: 'Aditya Rao',
    roles: ['Production Designer'],
    categories: ['art'],
    portrait: 'assets/images/kg.png',
    badge: 'Art Dept',
    shortBio: 'Production designer who builds tactile, detail-rich environments that feel authentic and lived-in.',
    tagline: '"Every object in frame is a choice. Every choice tells a story."',
    bio: 'Aditya Rao is a production designer with an obsessive eye for detail. He builds film worlds from the inside out — researching obsessively, sourcing authentically, and building environments that characters feel they have always lived in. His work on "Fractured" was particularly praised for its surreal yet grounded design language.',
    films: ['Fractured', 'The Crimson Letter'],
  },
  {
    id: 11,
    name: 'Ananya Roy',
    roles: ['Vocalist & Lyricist'],
    categories: ['music'],
    portrait: 'assets/images/kg.png',
    badge: 'Vocals',
    shortBio: 'Classically trained vocalist and lyricist whose haunting timbre anchors the emotional climax of our films.',
    tagline: '"A voice can say what words alone cannot."',
    bio: 'Ananya Roy is a classically trained vocalist and lyricist whose haunting voice has become a signature sound across DK Productions\' most emotional sequences. She collaborates closely with Rohan Das to create original songs that function as extensions of the narrative, giving audiences a melodic language for feelings that dialogue cannot express.',
    films: ['Echoes of Dusk', 'Still Waters'],
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
          <img src="${escapeHtml(person.portrait)}" alt="${escapeHtml(person.name)}" class="crew-portrait" loading="lazy" />
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
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.6s var(--ease-spring), transform 0.6s var(--ease-spring), border-color 0.25s, box-shadow 0.25s';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 80 + i * 45);
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
