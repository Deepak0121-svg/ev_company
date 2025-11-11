// small helper
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

document.addEventListener('DOMContentLoaded', () => {
  // set year in footer
  const y = new Date().getFullYear();
  const yEl = document.getElementById('year');
  const yEl2 = document.getElementById('year-2');
  if (yEl) yEl.textContent = y;
  if (yEl2) yEl2.textContent = y;

  // hamburger toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', (!expanded).toString());
      navLinks.classList.toggle('show');
    });
  }

  // IntersectionObserver for reveal animations
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  $$('[data-animate]').forEach(el => io.observe(el));

  // contact form handler (dummy)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = document.querySelector('.status');
      if (status) status.textContent = 'Sending…';
      // Simulate network
      setTimeout(() => {
        if (status) status.textContent = '✅ Message sent — we will contact you shortly.';
        contactForm.reset();
      }, 1200);
    });
  }
});

// Modal logic & product details
const modal = document.getElementById('productModal');
const modalBody = document.getElementById('modalBody');

function showDetails(type) {
  if (!modal || !modalBody) return;
  let content = '';
  if (type === 'petrol') {
    content = `
      <h2>Petrol Pollution Check Machine</h2>
      <img src="images/petrol_machine.jpg" alt="Petrol Machine" style="width:100%;border-radius:8px;margin:12px 0">
      <p><strong>Features:</strong> Real-time LPG/petrol sensor, auto-calibration, CSV export, user-friendly UI.</p>
      <ul>
        <li>Quick diagnostics (under 60s)</li>
        <li>Bluetooth / USB connectivity</li>
        <li>Optional cloud reporting</li>
      </ul>
    `;
  } else if (type === 'diesel') {
    content = `
      <h2>Diesel Smoke Meter</h2>
      <img src="images/diesel_machine.jpg" alt="Diesel Machine" style="width:100%;border-radius:8px;margin:12px 0">
      <p><strong>Features:</strong> Optical smoke density sensor, rugged build, service mode & trace logging.</p>
      <ul>
        <li>High accuracy light absorption</li>
        <li>Workshop-grade durability</li>
        <li>On-site calibration service</li>
      </ul>
    `;
  } else if (type === 'ev') {
    content = `
      <h2>Electric Vehicle Range-X</h2>
      <img src="images/ev.jpg" alt="EV" style="width:100%;border-radius:8px;margin:12px 0">
      <p>Zero emission city vehicle with modular battery packs and smart telematics.</p>
      <ul>
        <li>Range up to 220 km (single charge)</li>
        <li>Fast charging capability</li>
      </ul>
    `;
  } else if (type === 'assembly') {
    content = `
      <h2>Assembly & Test Units</h2>
      <img src="images/Gas_analyzer.jpg" alt="Assembly Unit" style="width:100%;border-radius:8px;margin:12px 0">
      <p>Modular assembly stations with pick-and-place, torque control & QA integration.</p>
    `;
  } else {
    content = `<p>Product information not available.</p>`;
  }

  modalBody.innerHTML = content;
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modal) return;
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// close modal on outside click or ESC
document.addEventListener('click', (e) => {
  if (!modal) return;
  if (!modal.classList.contains('hidden')) {
    const within = e.composedPath().includes(modal.querySelector('.modal-content'));
    if (!within) closeModal();
  }
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
