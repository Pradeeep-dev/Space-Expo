/* ================================================================
   missions.js — Card reveal animations + Mission detail modal
   ================================================================ */

'use strict';

/* ════════════════════════════════════════════════════════════════
   MISSION DATA — rich content for the modal popup
   ════════════════════════════════════════════════════════════════ */
const MISSIONS = {

  apollo11: {
    name:    'Apollo 11',
    tagline: 'The first crewed Moon landing — July 20, 1969',
    badge:   { text: 'NASA · Crewed Lunar', cls: 'apollo-badge' },
    photo:   'Images/Edwin-Aldrin-Moon-July-20-1969.webp',
    photoAlt: 'Buzz Aldrin on the lunar surface during Apollo 11',
    stats: [
      { val: 'Jul 16, 1969', label: 'Launch' },
      { val: 'Jul 20, 1969', label: 'Moon Landing' },
      { val: '8 days 3 hrs', label: 'Total Duration' },
      { val: '384,400 km', label: 'Distance to Moon' },
      { val: '3 Crew', label: 'Astronauts' },
    ],
    overview: `Apollo 11 was the first crewed mission to land on the Moon, achieving one of humanity's greatest milestones. Launched on 16 July 1969 atop the Saturn V rocket — still the most powerful rocket ever flown — the crew of three travelled 384,400 km to reach lunar orbit. Neil Armstrong and Buzz Aldrin descended to the Sea of Tranquility in the Lunar Module "Eagle" while Michael Collins orbited above in the Command Module "Columbia." Armstrong's first steps and the words "That's one small step for man, one giant leap for mankind" were watched live by 600 million people — a fifth of the world's population at the time.`,
    achievements: [
      'First humans to walk on the Moon — Neil Armstrong (Commander) and Buzz Aldrin (Lunar Module Pilot)',
      'Collected 21.5 kg of lunar rock and soil samples returned to Earth for analysis',
      'Deployed the first lunar seismometer and laser retroreflector array — still used today',
      'Completed the goal set by President Kennedy in 1961: "before this decade is out"',
      'The mission flag planted on the Sea of Tranquility is still there today',
    ],
    timeline: [
      { date: '16 Jul',  text: 'Saturn V launches from Kennedy Space Centre, Florida at 09:32 EDT' },
      { date: '19 Jul',  text: 'Apollo 11 enters lunar orbit after a 3-day journey' },
      { date: '20 Jul',  text: 'Eagle undocks and begins descent; "The Eagle has landed" at 20:17 UTC' },
      { date: '20 Jul',  text: 'Neil Armstrong takes humanity\'s first steps on the Moon at 02:56 UTC' },
      { date: '21 Jul',  text: 'Eagle ascent stage lifts off the lunar surface carrying Armstrong & Aldrin' },
      { date: '24 Jul',  text: 'Command module splashes down in the Pacific Ocean; crew safely recovered' },
    ],
    crew: [
      { name: 'Neil Armstrong', role: 'Commander', initials: 'NA' },
      { name: 'Buzz Aldrin', role: 'Lunar Module Pilot', initials: 'BA' },
      { name: 'Michael Collins', role: 'Command Module Pilot', initials: 'MC' },
    ],
    didYouKnow: `The Apollo Guidance Computer that landed Eagle on the Moon had 4 KB of RAM and ran at 0.043 MHz — your smartphone is over 1 billion times more powerful. When an alarm code (1202) flashed during landing, 26-year-old MIT engineer Jack Garman gave the go-ahead from memory, preventing an abort just 30 seconds from the surface.`,
  },

  voyager: {
    name:    'Voyager 1',
    tagline: 'Humanity\'s farthest-travelling spacecraft — still transmitting',
    badge:   { text: 'NASA · Interstellar Probe', cls: 'voyager-badge' },
    photo:   'Images/voyager.webp',
    photoAlt: 'Voyager 1 spacecraft',
    visual:  '🛸',
    visualBg: 'radial-gradient(ellipse at center, #0a1a3a 0%, #03040a 100%)',
    stats: [
      { val: 'Sep 5, 1977', label: 'Launch' },
      { val: '24+ billion km', label: 'Distance from Earth' },
      { val: '61,000 km/h', label: 'Current Speed' },
      { val: '22+ hours', label: 'Signal Travel Time' },
      { val: '46+ years', label: 'Mission Age' },
    ],
    overview: `Voyager 1 launched in 1977 and has been travelling away from our solar system ever since. In August 2012 it became the first human-made object to enter interstellar space — crossing the heliopause, the boundary where the Sun's solar wind gives way to the interstellar medium. It still phones home daily using a 22.4-watt transmitter (about the power of a fridge light bulb), with signals taking over 22 hours to reach Earth. NASA engineers must send commands and wait nearly two days for confirmation they worked.`,
    achievements: [
      'First spacecraft to cross the heliopause and enter true interstellar space (August 2012)',
      'Captured the first detailed images of Jupiter\'s Great Red Spot and its moons Io, Europa, Ganymede, and Callisto',
      'Revealed that Jupiter\'s moon Io has active volcanic eruptions — the first confirmed beyond Earth',
      'Photographed Saturn\'s rings and moon Titan in unprecedented detail',
      'Carl Sagan\'s "Pale Blue Dot" photograph taken from Voyager 1 at 6 billion km, 1990',
    ],
    timeline: [
      { date: 'Sep 1977', text: 'Launches from Cape Canaveral on a Titan III-E/Centaur rocket' },
      { date: 'Mar 1979', text: 'Jupiter flyby — discovers active volcanoes on Io, photographs Great Red Spot' },
      { date: 'Nov 1980', text: 'Saturn flyby — detailed study of the ring system and Titan\'s atmosphere' },
      { date: 'Feb 1990', text: 'Turns camera back for the "Pale Blue Dot" family portrait of the Solar System' },
      { date: 'Aug 2012', text: 'Officially crosses into interstellar space — confirmed by NASA in 2013' },
      { date: '2025',     text: 'Still transmitting from over 24 billion km away; power fading but operational' },
    ],
    crew: [
      { name: 'Edward Stone', role: 'Project Scientist (1972–2022)', initials: 'ES' },
      { name: 'Suzanne Dodd', role: 'Project Manager', initials: 'SD' },
    ],
    didYouKnow: `Voyager 1 carries a Golden Record — a 12-inch gold-plated copper disk containing sounds and images of Earth, greetings in 55 languages, music from Bach to Chuck Berry, and even the sound of rain. It was assembled by a committee chaired by Carl Sagan, intended as a message to any extraterrestrial civilisation that might find it in the distant future.`,
  },

  hubble: {
    name:    'Hubble Space Telescope',
    tagline: 'The telescope that revolutionised our view of the universe',
    badge:   { text: 'NASA/ESA · Space Observatory', cls: 'hubble-badge' },
    photo:   'Images/Hubble.webp',
    photoAlt: 'Hubble Space Telescope',
    visual:  '🔭',
    visualBg: 'radial-gradient(ellipse at center, #1a0a2e 0%, #03040a 100%)',
    stats: [
      { val: 'Apr 24, 1990', label: 'Launch Date' },
      { val: '547 km', label: 'Orbital Altitude' },
      { val: '95 minutes', label: 'Orbital Period' },
      { val: '1.3 million+', label: 'Observations Made' },
      { val: '35+ years', label: 'In Operation' },
    ],
    overview: `Hubble was launched in 1990 aboard Space Shuttle Discovery. Despite an initial flaw in its primary mirror — discovered shortly after launch — a dramatic shuttle servicing mission in 1993 installed corrective optics, turning a near-disaster into triumph. Since then, Hubble has fundamentally changed our understanding of the universe: it confirmed the accelerating expansion of the universe (leading to the 2011 Nobel Prize), measured the age of the universe at 13.8 billion years, and revealed that nearly every major galaxy has a supermassive black hole at its centre.`,
    achievements: [
      'Confirmed the accelerating expansion of the universe, leading to the discovery of dark energy',
      'Produced the iconic "Pillars of Creation" image (1995) and its update (2022)',
      'The Hubble Ultra Deep Field revealed ~10,000 galaxies in a patch of sky smaller than a grain of sand',
      'Measured Cepheid variable stars to accurately calculate the Hubble constant (expansion rate)',
      'Observed the atmosphere of exoplanets for the first time, detecting water and methane',
    ],
    timeline: [
      { date: 'Apr 1990', text: 'Launched on Space Shuttle Discovery — but mirror flaw discovered' },
      { date: 'Dec 1993', text: 'Servicing Mission 1 — astronauts install corrective optics; Hubble reborn' },
      { date: 'Jan 1996', text: 'First Hubble Deep Field image released — changes our view of the cosmos' },
      { date: '2002',     text: 'Advanced Camera for Surveys installed; dramatically increases capability' },
      { date: '2009',     text: 'Final servicing mission (SM4) by Space Shuttle Atlantis — expected to last to 2030+' },
      { date: '2022',     text: 'Updated "Pillars of Creation" image released alongside James Webb images' },
    ],
    crew: [
      { name: 'Story Musgrave', role: 'Lead SM1 Spacewalker', initials: 'SM' },
      { name: 'Jennifer Wiseman', role: 'Senior Project Scientist', initials: 'JW' },
    ],
    didYouKnow: `Hubble has made over 1.3 million observations and its data has been used in more than 21,000 scientific papers. It travels at 27,300 km/h and completes one orbit of Earth every 95 minutes — meaning it has circled Earth over 190,000 times since launch. The light from the most distant galaxies it has observed left them when the universe was less than 700 million years old.`,
  },

  cassini: {
    name:    'Cassini–Huygens',
    tagline: 'The grand explorer of Saturn\'s realm — 1997 to 2017',
    badge:   { text: 'NASA/ESA/ASI · Saturn Orbiter', cls: 'cassini-badge' },
    photo:   'Images/Cassini.jpeg',
    photoAlt: 'Cassini spacecraft orbiting Saturn',
    visual:  '🪐',
    visualBg: 'radial-gradient(ellipse at center, #2a1800 0%, #03040a 100%)',
    stats: [
      { val: 'Oct 15, 1997', label: 'Launch Date' },
      { val: 'Jul 2004', label: 'Saturn Arrival' },
      { val: '13 years', label: 'At Saturn' },
      { val: '294', label: 'Orbits of Saturn' },
      { val: 'Sep 15, 2017', label: 'Grand Finale' },
    ],
    overview: `Cassini–Huygens was a joint NASA/ESA/Italian Space Agency mission that spent 13 years in orbit around Saturn, transforming our understanding of the ringed planet and its moons. The Huygens probe detached from Cassini and landed on Saturn's moon Titan on January 14, 2005 — the most distant landing ever achieved in the Solar System at the time. Cassini's mission ended with a deliberate plunge into Saturn's atmosphere in September 2017, the "Grand Finale," which provided unprecedented close-range data before the spacecraft was destroyed to prevent any biological contamination of potentially habitable moons.`,
    achievements: [
      'Discovered plumes of water ice and vapour erupting from Enceladus — strong evidence for a subsurface liquid water ocean',
      'Huygens probe landed on Titan — first landing in the outer Solar System — and transmitted 72 minutes of data from the surface',
      'Revealed Titan has seas and lakes of liquid methane and ethane on its surface',
      'Discovered six new moons of Saturn including Methone, Pallene, and Polydeuces',
      'Detected complex organic molecules at Enceladus\'s southern plumes — building blocks of life',
    ],
    timeline: [
      { date: 'Oct 1997', text: 'Launches from Cape Canaveral atop a Titan IV-B/Centaur rocket' },
      { date: 'Apr 1999', text: 'Jupiter flyby — 26,000 images captured of Jupiter\'s atmosphere' },
      { date: 'Jul 2004', text: 'Enters Saturn orbit — first spacecraft to do so' },
      { date: 'Jan 2005', text: 'Huygens probe descends through Titan\'s atmosphere, lands on surface' },
      { date: 'Mar 2006', text: 'Discovers active water geysers at Enceladus\'s south pole' },
      { date: 'Sep 2017', text: 'Grand Finale: Cassini makes 22 dives between Saturn and its rings, then plunges in' },
    ],
    crew: [
      { name: 'Linda Spilker', role: 'Project Scientist', initials: 'LS' },
      { name: 'Earl Maize', role: 'Project Manager', initials: 'EM' },
    ],
    didYouKnow: `Enceladus, a small moon of Saturn only 500 km across, has a liquid water ocean beneath its icy surface — and Cassini flew directly through its geysers and detected hydrogen gas, which could fuel life on Earth. Scientists now believe Enceladus may be one of the best places in the Solar System to search for extraterrestrial life.`,
  },

  jwst: {
    name:    'James Webb Space Telescope',
    tagline: 'Peering back 13.5 billion years to the dawn of the universe',
    badge:   { text: 'NASA/ESA/CSA · Infrared Observatory', cls: 'jwst-badge' },
    photo:   'Images/James Webb Space Telescope.jpg',
    photoAlt: 'James Webb Space Telescope',
    visual:  '🌌',
    visualBg: 'radial-gradient(ellipse at center, #001a2a 0%, #03040a 100%)',
    stats: [
      { val: 'Dec 25, 2021', label: 'Launch Date' },
      { val: 'Jan 24, 2022', label: 'L2 Arrival' },
      { val: '6.5 metres', label: 'Mirror Diameter' },
      { val: '1.5 million km', label: 'Distance from Earth' },
      { val: '10+ years', label: 'Mission Design Life' },
    ],
    overview: `The James Webb Space Telescope is the most powerful space observatory ever built. Unlike Hubble, which observes primarily in visible and ultraviolet light, JWST operates in the infrared spectrum — allowing it to see through cosmic dust clouds and observe the most distant (oldest) objects in the universe. Its segmented gold-coated mirror spans 6.5 metres and is kept at -233°C (only 40 degrees above absolute zero) to detect the faint infrared heat of ancient galaxies. JWST is positioned at the Sun-Earth L2 Lagrange point, 1.5 million km from Earth, where it remains in permanent shadow from the Sun.`,
    achievements: [
      'Released first science images in July 2022 — the deepest infrared view of the universe ever captured',
      'Detected the most distant galaxy ever observed: JADES-GS-z14-0, existing just 290 million years after the Big Bang',
      'Directly imaged CO₂ in the atmosphere of exoplanet WASP-39b for the first time',
      'Observed the rings of Uranus and Neptune in unprecedented infrared clarity',
      'Detected water vapour around a rocky exoplanet (GJ 486b) — a step toward finding habitable worlds',
    ],
    timeline: [
      { date: 'Dec 2021', text: 'Launches on Ariane 5 rocket from French Guiana on Christmas Day' },
      { date: 'Jan 2022', text: 'Mirror segments fully unfolded; all 18 hexagonal segments aligned' },
      { date: 'Jan 2022', text: 'Arrives at L2 Lagrange point and begins 6-month commissioning phase' },
      { date: 'Jul 2022', text: 'First full-colour science images released — the world is stunned' },
      { date: 'Dec 2022', text: 'Detects galaxies from just 300 million years after the Big Bang' },
      { date: '2025+',    text: 'Ongoing observations across all areas of astrophysics; fuel for 20+ years' },
    ],
    crew: [
      { name: 'Jane Rigby', role: 'Operations Project Scientist', initials: 'JR' },
      { name: 'Klaus Pontoppidan', role: 'Project Scientist', initials: 'KP' },
    ],
    didYouKnow: `JWST is so sensitive that it could detect the heat signature of a bumblebee at the distance of the Moon. Its sunshield — the size of a tennis court — must keep the telescope at -233°C while the Sun-facing side reaches +85°C. The shield is made of Kapton layers, each thinner than a human hair, and must maintain a temperature gradient of over 300°C across just a few centimetres.`,
  },

  dart: {
    name:    'DART Mission',
    tagline: 'Humanity\'s first planetary defence test — a direct hit',
    badge:   { text: 'NASA · Planetary Defence', cls: 'dart-badge' },
    photo:   'Images/DART Mission.jpg',
    photoAlt: 'DART spacecraft impacting asteroid Dimorphos',
    visual:  '☄️',
    visualBg: 'radial-gradient(ellipse at center, #2a0a0a 0%, #03040a 100%)',
    stats: [
      { val: 'Nov 23, 2021', label: 'Launch Date' },
      { val: 'Sep 26, 2022', label: 'Impact Date' },
      { val: '6.6 km/s', label: 'Impact Speed' },
      { val: '32 minutes', label: 'Orbit Change' },
      { val: '11 million km', label: 'Distance at Impact' },
    ],
    overview: `DART (Double Asteroid Redirection Test) was NASA's proof-of-concept mission to test whether a kinetic impactor spacecraft could deflect an asteroid's orbit. The target was Dimorphos, the moonlet of the binary asteroid system Didymos. Neither asteroid posed any threat to Earth — they were chosen as the perfect test subjects. On September 26, 2022, DART struck Dimorphos at 6.6 km/s (23,760 km/h) — deliberately ending the mission in a blaze of glory. Post-impact measurements confirmed the orbit of Dimorphos around Didymos had changed by 32 minutes — far exceeding the mission's 73-second minimum success criterion.`,
    achievements: [
      'First successful demonstration of asteroid deflection by kinetic impact — a historic first for planetary defence',
      'Changed Dimorphos\'s orbital period by 32 minutes (from 11h 55m to 11h 23m) — 4x better than expected',
      'Impact ejected over 1,000 tonnes of rock and debris, creating a tail stretching 10,000+ km',
      'Italian CubeSat LICIACube deployed 15 days before impact captured close-up footage of the collision',
      'Proven that humanity has the technology to deflect an Earth-threatening asteroid if given sufficient warning',
    ],
    timeline: [
      { date: 'Nov 2021', text: 'DART launches on a SpaceX Falcon 9 rocket from Vandenberg, California' },
      { date: 'Sep 2022', text: 'DART approaches the Didymos system, 11 million km from Earth' },
      { date: 'Sep 26',   text: 'SMART Nav autonomously guides DART to a direct hit on Dimorphos at 23:14 UTC' },
      { date: 'Sep 2022', text: 'LICIACube captures images of the ejecta plume from the impact' },
      { date: 'Oct 2022', text: 'Ground-based telescopes confirm a 32-minute change in Dimorphos\'s orbit' },
      { date: '2024',     text: 'ESA\'s Hera spacecraft launched to study the aftermath in detail (arriving 2026)' },
    ],
    crew: [
      { name: 'Lindley Johnson', role: 'NASA Planetary Defence Officer', initials: 'LJ' },
      { name: 'Tom Statler', role: 'DART Programme Scientist', initials: 'TS' },
    ],
    didYouKnow: `The impact of DART was so powerful that it reshaped Dimorphos from a roughly spherical shape to an oblate spheroid (flattened). The 1,000+ tonnes of ejected material — nearly 10x DART's own mass of 570 kg — actually amplified the deflection effect far beyond what the impact alone would have achieved. This "ejecta momentum transfer" is now a key factor in planetary defence planning.`,
  },

  chandrayaan: {
    name:    'Chandrayaan-3',
    tagline: 'India\'s historic landing at the lunar south pole — August 23, 2023',
    badge:   { text: 'ISRO · Lunar Lander & Rover', cls: 'isro-badge' },
    photo:   'Images/Chandrayaan-3.cms',
    photoAlt: 'Chandrayaan-3 Vikram lander on the Moon',
    visual:  '🌕',
    visualBg: 'radial-gradient(ellipse at center, #1a1a00 0%, #03040a 100%)',
    stats: [
      { val: 'Jul 14, 2023', label: 'Launch Date' },
      { val: 'Aug 23, 2023', label: 'Landing Date' },
      { val: '69.367°S', label: 'Landing Latitude' },
      { val: '40 days', label: 'Earth-to-Moon Journey' },
      { val: '14 Earth days', label: 'Rover Active Period' },
    ],
    overview: `Chandrayaan-3 was ISRO's third lunar mission and India's most ambitious space achievement. Following the partial success of Chandrayaan-2 (whose orbiter succeeded but lander crashed in 2019), Chandrayaan-3 was redesigned with more robust landing sensors, stronger legs, and improved software. On August 23, 2023 at 18:02 IST, the Vikram lander touched down near the lunar south pole — making India the first and only nation in the world to achieve a soft landing at the lunar south pole, and only the 4th country ever to land on the Moon. The Pragyan rover then deployed and drove across the surface for 14 Earth days.`,
    achievements: [
      'India became the 4th country to soft-land on the Moon, after the USSR, USA, and China',
      'First and only successful landing near the lunar south pole — a region of enormous scientific interest',
      'Pragyan rover confirmed the presence of sulphur, aluminium, iron, calcium, titanium, and manganese on the surface',
      'Measured lunar surface temperature — found a 70°C temperature difference between surface and 8 cm below',
      'Cost of the entire mission: ₹615 crore (~$74 million) — cheaper than most Hollywood films',
    ],
    timeline: [
      { date: 'Jul 14, 2023', text: 'Launches on LVM3 (GSLV Mk III) from Satish Dhawan Space Centre, Sriharikota' },
      { date: 'Aug 5, 2023',  text: 'Successfully enters lunar orbit after a series of orbit-raising manoeuvres' },
      { date: 'Aug 17, 2023', text: 'Lander module separates from propulsion module in lunar orbit' },
      { date: 'Aug 23, 2023', text: 'Vikram lander touches down at 18:02 IST — India erupts in celebration' },
      { date: 'Aug 24, 2023', text: 'Pragyan rover deploys and begins surface operations; drives 100+ metres' },
      { date: 'Sep 4, 2023',  text: 'Rover enters sleep mode as lunar night falls; does not wake up' },
    ],
    crew: [
      { name: 'S. Somanath', role: 'ISRO Chairman', initials: 'SS' },
      { name: 'P. Veeramuthuvel', role: 'Project Director', initials: 'PV' },
      { name: 'M. Sankaran', role: 'UR Rao Satellite Centre Director', initials: 'MS' },
    ],
    didYouKnow: `When Chandrayaan-3 was about to land, ISRO scientists discovered a 4-metre boulder in the planned landing zone with just 15 minutes remaining. The autonomous hazard detection system identified a safer spot and redirected the lander — all without any human intervention from Earth. The entire manoeuvre happened in real-time, 380,000 km away.`,
  },

  aditya: {
    name:    'Aditya-L1',
    tagline: 'India\'s first solar observatory — watching the Sun from 1.5 million km away',
    badge:   { text: 'ISRO · Solar Observatory', cls: 'aditya-badge' },
    photo:   'Images/Aditya-L1.jpeg',
    photoAlt: 'Aditya-L1 spacecraft',
    visual:  '☀️',
    visualBg: 'radial-gradient(ellipse at center, #2a1500 0%, #03040a 100%)',
    stats: [
      { val: 'Sep 2, 2023',  label: 'Launch Date' },
      { val: 'Jan 6, 2024',  label: 'L1 Arrival' },
      { val: '1.5 million km', label: 'Distance from Earth' },
      { val: '7 Payloads', label: 'Scientific Instruments' },
      { val: '5 years', label: 'Mission Design Life' },
    ],
    overview: `Aditya-L1 is India's first dedicated solar mission, named after Aditya — the Sanskrit name for the Sun. It was placed in a halo orbit around the first Sun-Earth Lagrange Point (L1), 1.5 million km from Earth, where it has an unobstructed view of the Sun 24 hours a day without any eclipses. The mission carries 7 scientific payloads to study the solar corona (the Sun's outer atmosphere), solar winds, solar flares, and space weather events. Data from Aditya-L1 is critical for predicting geomagnetic storms that can disrupt Earth's power grids, satellites, and communications.`,
    achievements: [
      'India\'s first space-based solar observatory — placed at the strategically ideal Sun-Earth L1 Lagrange point',
      'Successfully captured the Sun\'s first light in January 2024 using the VELC (Visible Emission Line Coronagraph)',
      'Observed multiple solar flares and coronal mass ejections (CMEs) in its first year of operation',
      'SUIT instrument captured first full-disk images of the Sun in near-ultraviolet wavelengths',
      'Established India as one of a handful of nations with dedicated solar observation capabilities from space',
    ],
    timeline: [
      { date: 'Sep 2, 2023',  text: 'Launches on PSLV-C57 from Satish Dhawan Space Centre, Sriharikota' },
      { date: 'Sep–Nov 2023', text: 'Series of Earth-bound orbit raises, then slingshot toward the Sun' },
      { date: 'Jan 6, 2024',  text: 'Inserted into halo orbit around L1 — Prime Minister Modi watches live' },
      { date: 'Jan 2024',     text: 'First science observations begin; VELC captures solar corona images' },
      { date: 'May 2024',     text: 'Observes powerful X-class solar flares during intense solar activity period' },
      { date: '2025+',        text: 'Continues solar monitoring during Solar Cycle 25 — the most active in years' },
    ],
    crew: [
      { name: 'S. Somanath', role: 'ISRO Chairman', initials: 'SS' },
      { name: 'Nigar Shaji', role: 'Project Director', initials: 'NS' },
    ],
    didYouKnow: `Aditya-L1 orbits the L1 Lagrange point in a halo orbit — a periodic three-dimensional orbit around a mathematical point in space, not around any physical body. The L1 point is special because the gravitational pull of Earth and the Sun exactly balance the centripetal force needed to orbit with them, so a spacecraft there stays roughly stationary relative to both bodies — giving Aditya-L1 a permanent front-row seat to the Sun.`,
  },

};

/* ════════════════════════════════════════════════════════════════
   MODAL LOGIC
   ════════════════════════════════════════════════════════════════ */

const modal        = document.getElementById('mission-modal');
const backdrop     = document.getElementById('modal-backdrop');
const closeBtn     = document.getElementById('modal-close');
const visualWrap   = document.getElementById('modal-visual-wrap');
const modalBadge   = document.getElementById('modal-badge');
const modalTitle   = document.getElementById('modal-title');
const modalTagline = document.getElementById('modal-tagline');
const modalStats   = document.getElementById('modal-stats');
const modalOverview   = document.getElementById('modal-overview');
const modalAchieve    = document.getElementById('modal-achievements');
const modalTimeline   = document.getElementById('modal-timeline');
const modalCrew       = document.getElementById('modal-crew');
const modalCrewSection= document.getElementById('modal-crew-section');
const modalDidYouKnow = document.getElementById('modal-did-you-know');
const modalScroll     = document.getElementById('modal-scroll');

function syncMissionCardImages() {
  document.querySelectorAll('.mission-card[data-mission]').forEach(card => {
    const d = MISSIONS[card.dataset.mission];
    if (!d || !d.photo) return;

    const image = card.querySelector('img');
    if (!image) return;

    image.src = d.photo;
    image.alt = d.photoAlt || d.name;
  });
}

syncMissionCardImages();

/* ── OPEN ─────────────────────────────────────────────────────── */
function openModal(missionId) {
  const d = MISSIONS[missionId];
  if (!d) return;

  // Visual / photo
  visualWrap.innerHTML = '';
  if (d.photo) {
    const img = document.createElement('img');
    img.src = d.photo;
    img.alt = d.photoAlt || d.name;
    visualWrap.appendChild(img);
  } else {
    const bg = document.createElement('div');
    bg.className = 'modal-visual-bg';
    bg.style.background = d.visualBg || '#03040a';
    bg.textContent = d.visual || '🚀';
    visualWrap.appendChild(bg);
  }

  // Header
  modalBadge.className = 'mission-badge ' + (d.badge?.cls || '');
  modalBadge.textContent = d.badge?.text || '';
  modalTitle.textContent   = d.name;
  modalTagline.textContent = d.tagline;

  // Stats
  modalStats.innerHTML = d.stats.map(s =>
    `<div class="modal-stat">
       <div class="modal-stat-val">${s.val}</div>
       <div class="modal-stat-label">${s.label}</div>
     </div>`
  ).join('');

  // Overview
  modalOverview.textContent = d.overview;

  // Achievements
  modalAchieve.innerHTML = d.achievements.map(a =>
    `<li>${a}</li>`
  ).join('');

  // Timeline
  modalTimeline.innerHTML = d.timeline.map(t =>
    `<div class="tl-row">
       <span class="tl-date">${t.date}</span>
       <div class="tl-dot"></div>
       <span class="tl-text">${t.text}</span>
     </div>`
  ).join('');

  // Crew
  if (d.crew && d.crew.length) {
    modalCrewSection.hidden = false;
    modalCrew.innerHTML = d.crew.map(c =>
      `<div class="crew-chip">
         <div class="crew-avatar">${c.initials}</div>
         <div class="crew-info">
           <span class="crew-name">${c.name}</span>
           <span class="crew-role">${c.role}</span>
         </div>
       </div>`
    ).join('');
  } else {
    modalCrewSection.hidden = true;
  }

  // Did You Know
  modalDidYouKnow.textContent = d.didYouKnow;

  // Show modal
  modalScroll.scrollTop = 0;
  modal.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
}

/* ── CLOSE ────────────────────────────────────────────────────── */
function closeModal() {
  modal.setAttribute('hidden', '');
  document.body.style.overflow = '';
}

/* ── EVENT LISTENERS ──────────────────────────────────────────── */
// Click on card
document.querySelectorAll('.mission-card[data-mission]').forEach(card => {
  card.addEventListener('click', () => {
    openModal(card.dataset.mission);
  });
  // Keyboard: Enter or Space to open
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(card.dataset.mission);
    }
  });
});

// Close button
closeBtn.addEventListener('click', closeModal);

// Click on backdrop
backdrop.addEventListener('click', closeModal);

// Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
    closeModal();
  }
});

/* ════════════════════════════════════════════════════════════════
   CARD REVEAL ON SCROLL
   ════════════════════════════════════════════════════════════════ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    if (el.classList.contains('mission-card')) {
      const cards = Array.from(document.querySelectorAll('.mission-card'));
      const index = cards.indexOf(el);
      el.style.transitionDelay = `${(index % 2) * 0.15}s`;
    }
    el.classList.add('visible');
    revealObserver.unobserve(el);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ════════════════════════════════════════════════════════════════
   TABLE ROW STAGGER
   ════════════════════════════════════════════════════════════════ */
const tableObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('tbody tr').forEach((row, i) => {
      setTimeout(() => {
        row.style.opacity   = '1';
        row.style.transform = 'translateY(0)';
      }, i * 55);
    });
    tableObserver.unobserve(entry.target);
  });
}, { threshold: 0.1 });

const tableWrapper = document.querySelector('.glass-table-wrapper');
if (tableWrapper) {
  tableWrapper.querySelectorAll('tbody tr').forEach(row => {
    row.style.opacity   = '0';
    row.style.transform = 'translateY(16px)';
    row.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
  });
  tableObserver.observe(tableWrapper);
}

/* ════════════════════════════════════════════════════════════════
   ANIMATION PAUSE FOR OFF-SCREEN CARDS
   ════════════════════════════════════════════════════════════════

   All 8 cards run CSS animations simultaneously by default —
   even if the user is nowhere near them. This observer pauses
   animations in cards that are off-screen, and resumes them
   when they scroll into view.

   The rootMargin of 200px means a card's animations "wake up"
   just before it enters the viewport, so there's no visible pop.
*/
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('anim-paused');
    } else {
      entry.target.classList.add('anim-paused');
    }
  });
}, {
  rootMargin: '200px 0px 200px 0px', // wake up 200px before entering view
  threshold: 0,
});

document.querySelectorAll('.mission-card').forEach(card => {
  // Start paused — observer will un-pause visible ones immediately
  card.classList.add('anim-paused');
  animObserver.observe(card);
});

