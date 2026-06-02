/* ================================================================
   dashboard.js — Mission Control Dashboard Logic
   ================================================================ */

/* ── LIVE CLOCK ─────────────────────────────────────────────────── */
function updateClock() {
  const now = new Date();
  const utc = now.toUTCString().replace('GMT', 'UTC');
  const el = document.getElementById('hero-clock');
  if (el) el.textContent = `🕐 ${now.toLocaleTimeString()} LOCAL  |  ${now.toISOString().slice(0,19).replace('T',' ')} UTC`;
}
updateClock();
setInterval(updateClock, 1000);

/* ── ANIMATED COUNTER ────────────────────────────────────────────── */
function animateCounter(el, target, duration = 2000) {
  let start = null;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString() + (el.dataset.suffix || '');
  };
  requestAnimationFrame(step);
}

/* ── WHO'S IN SPACE (Open Notify API) ──────────────────────────── */
const FALLBACK_CREW = [
  { name: 'Oleg Kononenko',   craft: 'ISS' },
  { name: 'Nikolai Chub',     craft: 'ISS' },
  { name: 'Tracy Dyson',      craft: 'ISS' },
  { name: 'Matthew Dominick', craft: 'ISS' },
  { name: 'Michael Barratt',  craft: 'ISS' },
  { name: 'Jeanette Epps',    craft: 'ISS' },
  { name: 'Alexander Grebenkin', craft: 'ISS' },
];

function renderCrew(people) {
  const list = document.getElementById('crew-list');
  const total = document.getElementById('crew-total');
  if (!list) return;

  list.innerHTML = `<div class="crew-grid">${people.map(p => {
    const initials = p.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    return `
      <div class="crew-chip">
        <div class="crew-avatar">${initials}</div>
        <div>
          <div class="crew-chip-name">${p.name}</div>
          <div class="crew-chip-craft">${p.craft}</div>
        </div>
      </div>
    `;
  }).join('')}</div>`;

  if (total) total.textContent = `🌍 ${people.length} humans currently in space`;
}

async function fetchCrew() {
  try {
    const res = await fetch('http://api.open-notify.org/astros.json');
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    if (data.people && data.people.length) {
      renderCrew(data.people);
      const sub = document.querySelector('#crew-card .dash-card-sub');
      if (sub) sub.textContent = `${data.people.length} people currently aboard`;
    } else {
      renderCrew(FALLBACK_CREW);
    }
  } catch (e) {
    // API blocked or offline — show fallback data
    renderCrew(FALLBACK_CREW);
    const sub = document.querySelector('#crew-card .dash-card-sub');
    if (sub) sub.textContent = 'Showing latest known crew (live API unavailable)';
  }
}
fetchCrew();

/* ── ISS POSITION TRACKER ────────────────────────────────────────── */
let issAngle = 0;
function simulateISSOrbit() {
  issAngle = (issAngle + 0.5) % 360;
  const rad = (issAngle * Math.PI) / 180;
  const r = 90;
  const cx = 100, cy = 100;
  const x = cx + r * Math.cos(rad);
  const y = cy + r * Math.sin(rad);
  const dot = document.getElementById('iss-dot');
  if (dot) {
    dot.style.position = 'absolute';
    dot.style.left = `${x}px`;
    dot.style.top  = `${y}px`;
    dot.style.transform = 'translate(-50%, -50%)';
    dot.style.animation = 'none';
  }
}

async function fetchISS() {
  try {
    const res = await fetch('http://api.open-notify.org/iss-now.json');
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    const lat = parseFloat(data.iss_position.latitude).toFixed(2);
    const lon = parseFloat(data.iss_position.longitude).toFixed(2);
    const latEl = document.getElementById('iss-lat');
    const lonEl = document.getElementById('iss-lon');
    if (latEl) latEl.textContent = `${lat}°`;
    if (lonEl) lonEl.textContent = `${lon}°`;
  } catch (e) {
    // Simulate position if API unavailable
    const lat = (Math.random() * 180 - 90).toFixed(2);
    const lon = (Math.random() * 360 - 180).toFixed(2);
    const latEl = document.getElementById('iss-lat');
    const lonEl = document.getElementById('iss-lon');
    if (latEl) latEl.textContent = `${lat}°`;
    if (lonEl) lonEl.textContent = `${lon}°`;
  }
}
fetchISS();
setInterval(fetchISS, 5000);
setInterval(simulateISSOrbit, 50);

/* ── CHART.JS THEME DEFAULTS ─────────────────────────────────────── */
Chart.defaults.color = '#8892b0';
Chart.defaults.font.family = "'Exo 2', sans-serif";
Chart.defaults.font.size = 12;

/* ── BAR CHART: Missions by Decade ──────────────────────────────── */
(function initMissionsChart() {
  const ctx = document.getElementById('missionsChart');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s'],
      datasets: [{
        label: 'Crewed Missions',
        data: [18, 22, 20, 28, 32, 38, 26],
        backgroundColor: [
          'rgba(123,97,255,0.7)',
          'rgba(0,212,255,0.7)',
          'rgba(255,166,0,0.7)',
          'rgba(80,200,120,0.7)',
          'rgba(255,80,80,0.7)',
          'rgba(180,100,255,0.7)',
          'rgba(0,212,255,0.9)',
        ],
        borderColor: [
          'rgba(123,97,255,1)',
          'rgba(0,212,255,1)',
          'rgba(255,166,0,1)',
          'rgba(80,200,120,1)',
          'rgba(255,80,80,1)',
          'rgba(180,100,255,1)',
          'rgba(0,212,255,1)',
        ],
        borderWidth: 1,
        borderRadius: 8,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(8,10,22,0.9)',
          borderColor: 'rgba(123,97,255,0.3)',
          borderWidth: 1,
          titleColor: '#fff',
          bodyColor: '#8892b0',
          padding: 12,
          callbacks: {
            label: ctx => ` ${ctx.parsed.y} crewed missions`
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { color: '#8892b0' },
        },
        y: {
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: { color: '#8892b0', stepSize: 5 },
          beginAtZero: true,
        }
      }
    }
  });
})();

/* ── DOUGHNUT CHART: Astronauts by Country ──────────────────────── */
(function initCountryChart() {
  const ctx = document.getElementById('countryChart');
  if (!ctx) return;

  const labels  = ['USA', 'Russia/USSR', 'China', 'Germany', 'Japan', 'Canada', 'Others'];
  const data    = [355, 130, 24, 11, 12, 10, 90];
  const colors  = ['#3cc8ff','#ff7070','#ffd250','#b464ff','#ffa000','#50c878','#8892b0'];

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: colors.map(c => c + 'cc'),
        borderColor: colors,
        borderWidth: 1.5,
        hoverOffset: 10,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(8,10,22,0.9)',
          borderColor: 'rgba(123,97,255,0.3)',
          borderWidth: 1,
          titleColor: '#fff',
          bodyColor: '#8892b0',
          padding: 12,
          callbacks: {
            label: ctx => ` ${ctx.label}: ${ctx.parsed} astronauts`
          }
        }
      }
    }
  });

  // Custom legend
  const legend = document.getElementById('country-legend');
  if (legend) {
    legend.innerHTML = labels.map((l, i) => `
      <div class="legend-item">
        <div class="legend-dot" style="background:${colors[i]}"></div>
        <span>${l} (${data[i]})</span>
      </div>
    `).join('');
  }
})();

/* ── LINE CHART: Space launches over decades ─────────────────────── */
(function initLaunchChart() {
  const ctx = document.getElementById('launchChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['1957','1960','1965','1970','1975','1980','1985','1990','1995','2000','2005','2010','2015','2020','2024'],
      datasets: [
        {
          label: 'USSR / Russia',
          data: [2, 8, 20, 40, 55, 60, 55, 50, 30, 28, 26, 20, 18, 15, 14],
          borderColor: '#ff7070',
          backgroundColor: 'rgba(255,112,112,0.08)',
          tension: 0.4, fill: true, borderWidth: 2, pointRadius: 3,
        },
        {
          label: 'USA',
          data: [0, 5, 18, 35, 38, 30, 25, 20, 22, 26, 20, 18, 20, 25, 30],
          borderColor: '#3cc8ff',
          backgroundColor: 'rgba(60,200,255,0.07)',
          tension: 0.4, fill: true, borderWidth: 2, pointRadius: 3,
        },
        {
          label: 'China',
          data: [0, 0, 0, 0, 0, 0, 2, 4, 5, 5, 6, 10, 15, 30, 45],
          borderColor: '#ffd250',
          backgroundColor: 'rgba(255,210,80,0.06)',
          tension: 0.4, fill: true, borderWidth: 2, pointRadius: 3,
        },
        {
          label: 'Others',
          data: [0, 0, 1, 2, 4, 6, 8, 12, 18, 22, 28, 35, 42, 55, 70],
          borderColor: '#50c878',
          backgroundColor: 'rgba(80,200,120,0.06)',
          tension: 0.4, fill: true, borderWidth: 2, pointRadius: 3,
        },
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          display: true,
          labels: { color: '#8892b0', boxWidth: 12, padding: 16, usePointStyle: true }
        },
        tooltip: {
          backgroundColor: 'rgba(8,10,22,0.92)',
          borderColor: 'rgba(123,97,255,0.3)',
          borderWidth: 1,
          titleColor: '#fff',
          bodyColor: '#8892b0',
          padding: 12,
        }
      },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#8892b0', maxTicksLimit: 8 } },
        y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#8892b0', stepSize: 10 }, beginAtZero: true }
      }
    }
  });
})();

/* ── SCROLL REVEAL + STAT COUNTERS ──────────────────────────────── */
const observer = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Trigger counter if this is a stat card
      const numEl = entry.target.querySelector('.stat-number');
      if (numEl) {
        const target = parseInt(numEl.dataset.target, 10);
        if (!isNaN(target)) animateCounter(numEl, target);
      }

      observer.unobserve(entry.target);
    }
  }),
  { threshold: 0.15 }
);
document.querySelectorAll('.reveal, .stat-card').forEach(el => observer.observe(el));
