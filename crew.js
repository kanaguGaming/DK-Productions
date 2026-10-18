/* =============================================
   DK PRODUCTIONS — CREW PAGE JAVASCRIPT
   Handles: Role filter, modal open/close,
            profile data, card animations
   ============================================= */

'use strict';

/* ========================
   CREW PROFILE DATA
   ======================== */
const crewData = [
  {
    id: 0,
    name: 'Aryan Mehta',
    role: 'Actor',
    portrait: 'assets/images/crew_actor1.jpg',
    tagline: '"Every character holds a mirror to a part of myself I didn\'t know existed."',
    bio: 'Aryan Mehta is a trained method actor with over eight years of stage and screen experience. Known for his ability to disappear completely into a role, he brings an uncanny emotional truth to every character he inhabits. He studied at the National School of Drama and has appeared in numerous independent productions across India.',
    films: ['Echoes of Dusk', 'Still Waters'],
  },
  {
    id: 1,
    name: 'Priya Sen',
    role: 'Actress',
    portrait: 'assets/images/crew_actor2.jpg',
    tagline: '"Vulnerability is the bravest thing an actor can offer an audience."',
    bio: 'Priya Sen is widely regarded as one of the most compelling actresses in the independent short film circuit. Her work is characterised by fearless emotional exposure and razor-sharp instinct. She holds a master\'s degree in performing arts from the Film and Television Institute of India.',
    films: ['Echoes of Dusk', 'Fractured'],
  },
  {
    id: 2,
    name: 'Karan Nair',
    role: 'Actor',
    portrait: 'assets/images/crew_actor1.jpg',
    tagline: '"I don\'t play villains. I play people who made different choices than you."',
    bio: 'Karan Nair specialises in morally complex characters, bringing depth and unpredictability to roles that lesser actors might play one-dimensionally. His background in theatre has given him an exceptional command of physical storytelling and stage presence that translates powerfully on camera.',
    films: ['The Crimson Letter', 'Still Waters'],
  },
  {
    id: 3,
    name: 'Meera Krishnan',
    role: 'Actress',
    portrait: 'assets/images/crew_actor2.jpg',
    tagline: '"Short films demand everything — there\'s no hiding behind a long runtime."',
    bio: 'Meera Krishnan\'s stage training is evident in every performance — precise, physical, fully committed. She has an extraordinary ability to convey internal conflict through the smallest gestures, making her perfect for the intimate, close-up world of short cinema. She is based in Chennai and is an alumna of Kalakshetra Foundation.',
    films: ['Still Waters', 'Fractured'],
  },
  {
    id: 4,
    name: 'Ravi Shankar',
    role: 'Director of Photography',
    portrait: 'assets/images/crew_cinematographer.jpg',
    tagline: '"Light is the language. The camera is just the pen."',
    bio: 'Ravi Shankar is DK Productions\' long-standing cinematographer and co-creative force. His mastery of natural and practical lighting gives every DK Production its signature look: dark, textured, and emotionally charged. He has shot all four of the studio\'s productions and is known for his meticulous pre-production preparation and in-the-moment intuition.',
    films: ['Echoes of Dusk', 'The Crimson Letter', 'Still Waters', 'Fractured'],
  },
  {
    id: 5,
    name: 'Anand Pillai',
    role: 'Camera Operator',
    portrait: 'assets/images/crew_cinematographer.jpg',
    tagline: '"A moving camera breathes life into static moments."',
    bio: 'Anand Pillai is a camera operator known for his instinctive sense of movement and composition. Whether operating a Steadicam through a long take or shooting handheld in tight quarters, Anand adapts seamlessly to the demands of the story. He has collaborated with Ravi Shankar across multiple productions.',
    films: ['Echoes of Dusk', 'The Crimson Letter'],
  },
  {
    id: 6,
    name: 'Nisha Verma',
    role: 'Film Editor',
    portrait: 'assets/images/crew_editor.jpg',
    tagline: '"Editing is not just cutting — it is the final rewrite of the script."',
    bio: 'Nisha Verma is the invisible architect behind every DK production. Her editing rhythms are precise, deliberate, and always emotionally intelligent. She is known for finding unexpected connections between shots and building tension through silence and restraint rather than rapid cutting. She has edited all four DK Productions releases.',
    films: ['Echoes of Dusk', 'The Crimson Letter', 'Still Waters', 'Fractured'],
  },
  {
    id: 7,
    name: 'Rohan Das',
    role: 'Music Composer',
    portrait: 'assets/images/crew_actor1.jpg',
    tagline: '"Music doesn\'t accompany a film — it completes it."',
    bio: 'Rohan Das is a composer and sound artist whose work defies easy categorisation. Drawing from classical Indian music, jazz, and electronic soundscapes, he creates scores that feel both ancient and urgently contemporary. His work on "Echoes of Dusk" was cited by critics as a defining element of the film\'s emotional power.',
    films: ['Echoes of Dusk', 'Fractured', 'Still Waters'],
  },
  {
    id: 8,
    name: 'Divya Menon',
    role: 'Assistant Director',
    portrait: 'assets/images/crew_actor2.jpg',
    tagline: '"The best AD is one the director never has to think about."',
    bio: 'Divya Menon is the operational backbone of every DK Productions shoot. As First AD, she runs the floor with quiet authority, ensuring that Deepak Kumar\'s creative vision is never compromised by logistical chaos. She is meticulous in pre-production, creative under pressure, and universally respected by every crew member she works with.',
    films: ['The Crimson Letter', 'Still Waters', 'Echoes of Dusk'],
  },
  {
    id: 9,
    name: 'Suresh Pillai',
    role: 'Sound Designer',
    portrait: 'assets/images/crew_editor.jpg',
    tagline: '"Half of what you see in a film, you actually hear."',
    bio: 'Suresh Pillai is an award-winning sound designer with a gift for creating sonic environments that feel utterly immersive. His work goes far beyond dialogue and music — he sculpts the ambient world of each film with painstaking care, using field recordings, Foley, and original sound design to build a fully inhabited acoustic reality.',
    films: ['Echoes of Dusk', 'The Crimson Letter', 'Still Waters', 'Fractured'],
  },
  {
    id: 10,
    name: 'Aditya Rao',
    role: 'Art Director',
    portrait: 'assets/images/crew_cinematographer.jpg',
    tagline: '"Every object in frame is a choice. Every choice tells a story."',
    bio: 'Aditya Rao is a production designer with an obsessive eye for detail. He builds film worlds from the inside out — researching obsessively, sourcing authentically, and building environments that characters feel they have always lived in. His work on "Fractured" was particularly praised for its surreal yet grounded design language.',
    films: ['Fractured', 'The Crimson Letter'],
  },
  {
    id: 11,
    name: 'Ananya Roy',
    role: 'Vocalist & Lyricist',
    portrait: 'assets/images/crew_actor2.jpg',
    tagline: '"A voice can say what words alone cannot."',
    bio: 'Ananya Roy is a classically trained vocalist and lyricist whose haunting voice has become a signature sound across DK Productions\' most emotional sequences. She collaborates closely with Rohan Das to create original songs that function as extensions of the narrative, giving audiences a melodic language for feelings that dialogue cannot express.',
    films: ['Echoes of Dusk', 'Still Waters'],
  },
];

/* ========================
   FILTER FUNCTIONALITY
   ======================== */
const filterPills = document.querySelectorAll('.filter-pill');
const crewCards   = document.querySelectorAll('.crew-card');

filterPills.forEach(pill => {
  pill.addEventListener('click', () => {
    // Update active pill
    filterPills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');

    const filter = pill.getAttribute('data-filter');

    crewCards.forEach(card => {
      const role = card.getAttribute('data-role');
      if (filter === 'all' || role === filter) {
        card.classList.remove('hidden');
        // Re-trigger reveal animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        requestAnimationFrame(() => {
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        });
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ========================
   MODAL
   ======================== */
const modalOverlay = document.getElementById('modalOverlay');
const modalClose   = document.getElementById('modalClose');
const modalPortrait = document.getElementById('modalPortrait');
const modalRole    = document.getElementById('modalRole');
const modalName    = document.getElementById('modalName');
const modalTagline = document.getElementById('modalTagline');
const modalBio     = document.getElementById('modalBio');
const modalFilmList = document.getElementById('modalFilmList');

function openModal(id) {
  const person = crewData[id];
  if (!person) return;

  modalPortrait.src = person.portrait;
  modalPortrait.alt = person.name;
  modalRole.textContent    = person.role;
  modalName.textContent    = person.name;
  modalTagline.textContent = person.tagline;
  modalBio.textContent     = person.bio;

  // Populate film tags
  modalFilmList.innerHTML = person.films
    .map(f => `<span class="modal-film-tag">${f}</span>`)
    .join('');

  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

// Expose globally for inline onclick
window.openModal = openModal;
window.closeModal = closeModal;

if (modalClose)   modalClose.addEventListener('click', closeModal);
if (modalOverlay) {
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
}

// ESC key close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

/* ========================
   CREW CARD CLICK — also opens modal
   ======================== */
crewCards.forEach(card => {
  card.addEventListener('click', (e) => {
    // Don't re-trigger if the button was the click target (it has its own handler)
    if (e.target.classList.contains('crew-view-btn')) return;
    const id = parseInt(card.getAttribute('data-id'), 10);
    if (!isNaN(id)) openModal(id);
  });
});

/* ========================
   STAGGER CARD ENTRANCE
   ======================== */
document.addEventListener('DOMContentLoaded', () => {
  crewCards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.35s, box-shadow 0.35s, transform 0.35s';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100 + i * 60);
  });
});
