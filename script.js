// Elements
const menuToggle = document.getElementById('menu-toggle');
const navList = document.getElementById('nav-list');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const mediaButtons = document.querySelectorAll('.media-btn');
const modal = document.getElementById('media-modal');
const modalImg = document.getElementById('modal-image');
const modalClose = document.getElementById('modal-close');
const modalBackdrop = document.getElementById('modal-backdrop');

// Menu toggle (mobile)
menuToggle?.addEventListener('click', () => {
  navList.classList.toggle('show');
  // simple accessible toggle
  menuToggle.setAttribute('aria-expanded', navList.classList.contains('show'));
});

// Theme toggle with persistence
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
  themeToggle.textContent = '☀️';
} else {
  themeToggle.textContent = '🌙';
}
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Intersection observer for fade-in
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.18 });
document.querySelectorAll('.section, .card, .hero-card, .about-card, .skill').forEach(el => io.observe(el));

// Tilt interaction
document.querySelectorAll('.tilt').forEach((el) => {
  el.addEventListener('mousemove', (ev) => {
    const rect = el.getBoundingClientRect();
    const x = (ev.clientX - rect.left) / rect.width - 0.5;
    const y = (ev.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `rotateX(${ -y * 6 }deg) rotateY(${ x * 6 }deg) translateZ(0)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
  });
});

// Modal preview logic
mediaButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const src = btn.dataset.src;
    modalImg.src = src;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
  });
});
function closeModal() {
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  modalImg.src = '';
}
modalClose?.addEventListener('click', closeModal);
modalBackdrop?.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
});
