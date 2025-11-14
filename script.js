// Menu
const menuToggle = document.getElementById("menu-toggle");
const navList = document.getElementById("nav-list");
menuToggle.addEventListener("click", () => {
  navList.classList.toggle("show");
});

// Theme
const body = document.body;
const themeToggle = document.getElementById("theme-toggle");

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  const dark = body.classList.contains("dark");
  themeToggle.textContent = dark ? "☀️" : "🌙";
  localStorage.setItem("theme", dark ? "dark" : "light");
});

// Modal
const modal = document.getElementById("media-modal");
const modalImg = document.getElementById("modal-image");
const modalClose = document.getElementById("modal-close");
const modalBackdrop = document.getElementById("modal-backdrop");

document.querySelectorAll(".media-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    modalImg.src = btn.dataset.src;
    modal.classList.add("show");
  });
});

function closeModal() {
  modal.classList.remove("show");
  modalImg.src = "";
}

modalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", closeModal);

// Scroll Reveal Animation
const revealElements = document.querySelectorAll(".fade-in, .slide-up");

function revealOnScroll() {
  const trigger = window.innerHeight * 0.85;

  revealElements.forEach((el) => {
    const rect = el.getBoundingClientRect().top;

    if (rect < trigger) {
      el.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
