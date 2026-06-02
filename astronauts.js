/* ================================================================
   astronauts.js — Astronaut Detail Modal + Scroll Reveals
   ================================================================ */

/* ── ASTRONAUT DATA ─────────────────────────────────────────────── */
const ASTRONAUTS = {

  rakesh: {
    name:    'Rakesh Sharma',
    tagline: 'India\'s First Man in Space',
    badge:   'ISRO · Cosmonaut',
    badgeClass: 'isro-badge',
    photo:   'Images/Rakesh Sharma.jpg',
    stats: [
      { val: 'Apr 3, 1984', label: 'Launch Date' },
      { val: 'Soyuz T-11', label: 'Spacecraft' },
      { val: 'Salyut 7',   label: 'Destination' },
      { val: '7 d 21 h',   label: 'Duration' },
    ],
    overview: `Wing Commander Rakesh Sharma, IAF, became India's first man in space on April 3, 1984, 
    aboard the Soviet spacecraft Soyuz T-11 as part of the Indo-Soviet manned space programme. 
    He spent nearly eight days aboard the Soviet space station Salyut 7, conducting 43 experiments 
    in biomedicine, remote sensing of India, and material processing. His mission was a milestone 
    in India's space ambitions and a beacon of national pride.`,
    achievements: [
      'First Indian citizen to travel to space (April 1984)',
      'Conducted 43 joint Indo-Soviet scientific experiments aboard Salyut 7',
      'Performed yoga in microgravity — a world first',
      'Remote sensing experiments helped identify potential mineral deposits in India',
      'Awarded the Hero of the Soviet Union — the highest Soviet honour — and the Ashoka Chakra',
    ],
    timeline: [
      { date: '1949', text: 'Born in Patiala, Punjab, India' },
      { date: '1970', text: 'Joined Indian Air Force as a pilot' },
      { date: '1982', text: 'Selected for joint Indo-Soviet space mission' },
      { date: 'Apr 1984', text: 'Launched aboard Soyuz T-11 — first Indian in space' },
      { date: 'Apr 1984', text: 'Spent 7 days 21 hours 40 minutes in space' },
      { date: '1984', text: 'Awarded Hero of the Soviet Union and Ashoka Chakra' },
    ],
    didYouKnow: `When Prime Minister Indira Gandhi asked from Earth "How does India look from there?", 
    Rakesh Sharma famously replied "Saare Jahan Se Accha" (Better than the whole world) — a line from 
    the beloved patriotic poem by Muhammad Iqbal. It became one of the most iconic quotes in Indian history.`,
  },

  kalpana: {
    name:    'Kalpana Chawla',
    tagline: 'First Indian-American Woman in Space',
    badge:   'NASA · Mission Specialist',
    badgeClass: 'nasa-badge',
    photo:   'images/Kalpana Chawla.webp',
    stats: [
      { val: 'Nov 1997',  label: 'First Flight' },
      { val: '2 Flights', label: 'Missions' },
      { val: 'STS-87 / STS-107', label: 'Spacecraft' },
      { val: '30+ days',  label: 'In Space' },
    ],
    overview: `Dr. Kalpana Chawla was an Indian-American astronaut and the first woman of Indian origin 
    to travel to space. Born in Karnal, Haryana, India, she earned a PhD in Aerospace Engineering and 
    joined NASA in 1994. She flew on STS-87 in 1997 and STS-107 in 2003. Tragically, she was one of 
    seven crew members who perished in the Space Shuttle Columbia disaster on February 1, 2003, 
    during re-entry into Earth's atmosphere. Her legacy continues to inspire millions of young girls 
    across India and the world to pursue science and engineering.`,
    achievements: [
      'First woman of Indian origin to travel to space (November 1997)',
      'Logged over 376 hours in space across two missions',
      'STS-87 mission deployed the Spartan satellite and studied solar corona',
      'Certified flight instructor for single and multi-engine aircraft',
      'Posthumously awarded the Congressional Space Medal of Honor',
      'Multiple schools, universities, and NASA satellites named in her honour',
    ],
    timeline: [
      { date: '1962',     text: 'Born in Karnal, Haryana, India' },
      { date: '1984',     text: 'Moved to the USA for higher studies' },
      { date: '1988',     text: 'Earned PhD in Aerospace Engineering, University of Colorado' },
      { date: '1994',     text: 'Selected as NASA Astronaut Candidate' },
      { date: 'Nov 1997', text: 'First spaceflight on Space Shuttle Columbia (STS-87)' },
      { date: 'Jan 2003', text: 'Second mission: STS-107 launched' },
      { date: 'Feb 2003', text: 'Tragically lost in Columbia re-entry disaster' },
    ],
    didYouKnow: `Kalpana Chawla logged 376 hours, 34 minutes in space. She once said: 
    "The path from dreams to success does exist. May you have the vision to find it, 
    the courage to get on to it, and the perseverance to follow it." Her name lives on 
    in NASA's Cygnus NG-14 spacecraft, named the SS Kalpana Chawla.`,
  },

  satish: {
    name:    'Satish Dhawan',
    tagline: 'Father of the Indian Space Programme',
    badge:   'ISRO · Chairman',
    badgeClass: 'isro-badge',
    photo: 'images/Satish Dhawan.jpg',
    stats: [
      { val: '1972–84', label: 'ISRO Chief' },
      { date: '1920',  label: 'Born' },
      { val: 'SLV-3',  label: 'First Rocket' },
      { val: '12 yrs', label: 'Led ISRO' },
    ],
    overview: `Professor Satish Dhawan was one of India's most distinguished scientists and engineers, 
    widely regarded as the father of experimental fluid dynamics research in India. As Chairman of ISRO 
    from 1972 to 1984, he transformed India's space programme into a world-class institution. Under his 
    visionary leadership, India successfully launched its first indigenous satellite launch vehicle SLV-3 
    in 1980, placing the Rohini satellite in orbit and making India the sixth nation to achieve orbital 
    launch capability. He was deeply respected for his scientific integrity, leadership style, and humility.`,
    achievements: [
      'Chairman of ISRO from 1972 to 1984 — transformed India\'s space programme',
      'Led successful launch of SLV-3 in 1980 — India\'s first indigenous rocket',
      'India\'s first remote sensing satellite IRS-1A launched under his tenure',
      'Founded the Satish Dhawan Space Centre (SDSC) at Sriharikota — ISRO\'s primary launch site',
      'Pioneered experimental fluid dynamics and turbulence research in India',
      'After SLV-3 failure in 1979, took responsibility publicly — shielding his team',
    ],
    timeline: [
      { date: '1920', text: 'Born in Srinagar, British India' },
      { date: '1951', text: 'Joined Indian Institute of Science (IISc), Bangalore' },
      { date: '1962', text: 'Became Director of IISc — youngest ever at age 42' },
      { date: '1972', text: 'Appointed Chairman of ISRO' },
      { date: '1980', text: 'SLV-3 successfully places Rohini satellite in orbit' },
      { date: '1984', text: 'Retired from ISRO after 12 transformative years' },
      { date: '2002', text: 'Passed away; ISRO\'s Sriharikota range named in his honour' },
    ],
    didYouKnow: `In 1979, when the SLV-3 mission failed, Satish Dhawan faced the press himself and 
    took full responsibility. A year later, when SLV-3 succeeded, he sent A.P.J. Abdul Kalam 
    (the mission director) to address the press instead. Kalam later described this as the greatest 
    lesson in leadership he ever received.`,
  },

  sunita: {
    name:    'Sunita Williams',
    tagline: 'Record-Breaking NASA Commander of Indian Origin',
    badge:   'NASA · Commander',
    badgeClass: 'nasa-badge',
    photo:   'Images/Sunita Williams.webp',
    stats: [
      { val: 'Dec 2006',  label: 'First Flight' },
      { val: '3 Missions', label: 'Flights' },
      { val: '322+ days', label: 'In Space' },
      { val: '50+ hrs',   label: 'Spacewalks' },
    ],
    overview: `Sunita Williams is an Indian-American NASA astronaut and former United States Navy officer 
    of Gujarati Indian and Slovenian descent. Born in Euclid, Ohio, she is one of the most experienced 
    astronauts in history, having served aboard the International Space Station (ISS) on multiple long-duration 
    missions. She served as Flight Engineer and Commander of ISS Expeditions and holds the record (at the time) 
    for the most spacewalks by a woman — 7 spacewalks totalling over 50 hours. In 2024, she flew to the ISS 
    aboard Boeing's Starliner spacecraft as part of the Crew Flight Test.`,
    achievements: [
      'Logged over 322 days in space across three missions',
      'Performed 7 spacewalks — over 50 hours of EVA — a record for a female astronaut at the time',
      'Served as Commander of International Space Station Expedition 33',
      'First person to run a triathlon in space — completed the Nautica Malibu Triathlon from orbit',
      'Ran the Boston Marathon (42.195 km) on a treadmill aboard the ISS in 2007',
      'Flew on Boeing Starliner CFT mission in 2024 — testing the new crewed spacecraft',
      'Received the Legion of Merit, two Navy Commendation Medals, and the NASA Space Flight Medal',
    ],
    timeline: [
      { date: '1965',     text: 'Born in Euclid, Ohio, USA to an Indian-American family' },
      { date: '1987',     text: 'Graduated from US Naval Academy — began Navy aviation career' },
      { date: '1998',     text: 'Selected as NASA Astronaut Candidate' },
      { date: 'Dec 2006', text: 'First spaceflight — STS-116, delivered to ISS Expedition 14/15' },
      { date: '2007',     text: 'Set spacewalk record with 7 EVAs (50 hrs 40 min)' },
      { date: 'Jul 2012', text: 'Second mission — Soyuz TMA-05M, ISS Commander (Expedition 33)' },
      { date: 'Jun 2024', text: 'Third mission — Boeing Starliner CFT to the ISS' },
    ],
    didYouKnow: `During the 2007 Boston Marathon, Sunita Williams ran the full 42.195 km race on a 
    treadmill aboard the ISS — in zero gravity — at the exact same time the race was happening on Earth. 
    She completed it in just under 4 hours and 24 minutes, wearing a bib number 14000 pinned to her 
    spacesuit. She is also known for travelling with a small statue of Lord Ganesha and a copy of the 
    Bhagavad Gita on her missions.`,
  },

};

/* ── MODAL LOGIC ─────────────────────────────────────────────────── */
const modal        = document.getElementById('astro-modal');
const modalClose   = document.getElementById('modal-close');
const modalBackdrop= document.getElementById('modal-backdrop');

function openModal(key) {
  const data = ASTRONAUTS[key];
  if (!data) return;

  /* Visual hero */
  const visualWrap = document.getElementById('modal-visual-wrap');
  if (data.photo) {
    visualWrap.innerHTML = `<img src="${data.photo}" alt="${data.name}" />`;
  } else {
    visualWrap.innerHTML = `<div class="modal-visual-bg" style="${data.visualBg || ''}">${data.visual || '👨‍🚀'}</div>`;
  }

  /* Badge */
  const badge = document.getElementById('modal-badge');
  badge.textContent = data.badge;
  badge.className   = data.badgeClass || 'isro-badge';

  /* Title & tagline */
  document.getElementById('modal-title').textContent   = data.name;
  document.getElementById('modal-tagline').textContent = data.tagline;

  /* Stats */
  const statsEl = document.getElementById('modal-stats');
  statsEl.innerHTML = data.stats.map(s => `
    <div class="modal-stat">
      <div class="modal-stat-val">${s.val}</div>
      <div class="modal-stat-label">${s.label}</div>
    </div>
  `).join('');

  /* Overview */
  document.getElementById('modal-overview').textContent = data.overview;

  /* Achievements */
  const achEl = document.getElementById('modal-achievements');
  achEl.innerHTML = data.achievements.map(a => `<li>${a}</li>`).join('');

  /* Timeline */
  const tlEl = document.getElementById('modal-timeline');
  tlEl.innerHTML = data.timeline.map(t => `
    <div class="tl-row">
      <div class="tl-date">${t.date}</div>
      <div class="tl-dot"></div>
      <div class="tl-text">${t.text}</div>
    </div>
  `).join('');

  /* Did You Know */
  document.getElementById('modal-did-you-know').textContent = data.didYouKnow;

  /* Show */
  modal.hidden = false;
  document.body.style.overflow = 'hidden';

  /* Reset scroll */
  document.getElementById('modal-scroll').scrollTop = 0;
}

function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = '';
}

/* Card click / keyboard */
document.querySelectorAll('.astro-card').forEach(card => {
  card.addEventListener('click', () => {
    openModal(card.dataset.astronaut);
  });
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(card.dataset.astronaut);
    }
  });
});

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.hidden) closeModal();
});

/* ── SCROLL REVEAL ───────────────────────────────────────────────── */
const observer = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }),
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
