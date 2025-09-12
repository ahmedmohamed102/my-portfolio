// DOM Elements
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navLinksItems = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");
const skillBars = document.querySelectorAll(".skill-bar");
const serviceCards = document.querySelectorAll(".service-card");
const themeToggle = document.getElementById("theme-toggle");
const rootElement = document.documentElement;

// Check for saved theme preference or use system preference
const getCurrentTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) return savedTheme;
  
  // Check system preference
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

// Apply theme
const applyTheme = (theme) => {
  if (theme === "dark") {
    rootElement.classList.add("dark-theme");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    rootElement.classList.remove("dark-theme");
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
  localStorage.setItem("theme", theme);
};

// Initialize theme
applyTheme(getCurrentTheme());

// Toggle theme on button click
themeToggle.addEventListener("click", () => {
  const newTheme = rootElement.classList.contains("dark-theme") ? "light" : "dark";
  applyTheme(newTheme);
});

// Toggle mobile menu
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close mobile menu when a nav link is clicked
navLinksItems.forEach((item) => {
  item.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// Highlight active nav link based on scroll position
window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinksItems.forEach((item) => {
    item.classList.remove("active");
    if (item.getAttribute("href").substring(1) === current) {
      item.classList.add("active");
    }
  });
});

// Animate skill bars when they come into view
const animateSkillBars = () => {
  const skillsSection = document.querySelector("#skills");
  const sectionPosition = skillsSection.getBoundingClientRect().top;
  const screenPosition = window.innerHeight / 1.3;

  if (sectionPosition < screenPosition) {
    skillBars.forEach((bar) => {
      const width = bar.style.width;
      bar.style.width = "0";
      setTimeout(() => {
        bar.style.width = width;
      }, 300);
    });
    window.removeEventListener("scroll", animateSkillBars);
  }
};

window.addEventListener("scroll", animateSkillBars);

// Add fade-in animation to elements when they come into view
const fadeInElements = document.querySelectorAll(
  ".project-card, .skill-card, .contact-item, .service-card"
);

const fadeIn = () => {
  fadeInElements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;

    if (elementPosition < screenPosition) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
};

// Set initial styles for fade-in elements
fadeInElements.forEach((element) => {
  element.style.opacity = "0";
  element.style.transform = "translateY(20px)";
  element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
});

window.addEventListener("scroll", fadeIn);
window.addEventListener("load", fadeIn);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    window.scrollTo({
      top: targetElement.offsetTop - 80,
      behavior: "smooth",
    });
  });
});

// Add shadow to navbar on scroll
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (window.scrollY > 50) {
    nav.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    nav.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
  } else {
    nav.style.boxShadow = "none";
    nav.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
  }
});
