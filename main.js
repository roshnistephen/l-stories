// ============================================================================
// L-Stories - Main JavaScript
// ============================================================================

// Mobile Navigation Toggle
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");
const navCloseArea = document.querySelector(".nav-close-area");
const menuText = document.querySelector(".menu-text");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
    if (menuText) {
      menuText.textContent = mainNav.classList.contains("open") ? "CLOSE" : "MENU";
    }
  });

  // Close menu when clicking outside
  if (navCloseArea) {
    navCloseArea.addEventListener("click", () => {
      mainNav.classList.remove("open");
      if (menuText) {
        menuText.textContent = "MENU";
      }
    });
  }

  // Close menu when clicking on nav links
  const navLinks = mainNav.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      if (menuText) {
        menuText.textContent = "MENU";
      }
    });
  });
}

// Header scroll effect
const header = document.querySelector(".site-header");
if (header) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// Auto year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ============================================================================
// Scroll Animation for Elements
// ============================================================================

const animateOnScroll = () => {
  const elements = document.querySelectorAll(".animate-fadeIn");
  
  elements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight - 100) {
      el.classList.add("visible");
    }
  });
};

// Initial check and scroll listener
window.addEventListener("load", animateOnScroll);
window.addEventListener("scroll", animateOnScroll);

// ============================================================================
// Contact Form Validation and Submission
// ============================================================================

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Clear previous errors
    clearErrors();
    
    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const date = document.getElementById("date").value;
    const location = document.getElementById("location").value.trim();
    const message = document.getElementById("message").value.trim();
    
    let isValid = true;
    
    // Validate name
    if (!name || name.length < 2) {
      showError("nameError", "Please enter your name (at least 2 characters)");
      isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      showError("emailError", "Please enter a valid email address");
      isValid = false;
    }
    
    // Validate phone
    const phoneRegex = /^[\+]?[0-9\s\-]{10,}$/;
    if (!phone || !phoneRegex.test(phone)) {
      showError("phoneError", "Please enter a valid phone number");
      isValid = false;
    }
    
    // Validate message
    if (!message || message.length < 10) {
      showError("messageError", "Please tell us more about your day (at least 10 characters)");
      isValid = false;
    }
    
    if (isValid) {
      // Prepare email body
      const subject = encodeURIComponent(`Wedding Enquiry from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone}\n` +
        `Wedding Date: ${date || "Not specified"}\n` +
        `Location: ${location || "Not specified"}\n\n` +
        `Message:\n${message}`
      );
      
      // Open mailto link
      const mailtoLink = `mailto:greetings.lstories@gmail.com?subject=${subject}&body=${body}`;
      window.location.href = mailtoLink;
      
      // Show success message
      showFormStatus("success", "Opening your email client... If it doesn't open, please email us directly at greetings.lstories@gmail.com");
      
      // Reset form after a delay
      setTimeout(() => {
        contactForm.reset();
        formStatus.classList.remove("success");
        formStatus.style.display = "none";
      }, 5000);
    }
  });
}

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.textContent = message;
  }
}

function clearErrors() {
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((el) => {
    el.textContent = "";
  });
  if (formStatus) {
    formStatus.classList.remove("success", "error");
    formStatus.style.display = "none";
  }
}

function showFormStatus(type, message) {
  if (formStatus) {
    formStatus.textContent = message;
    formStatus.classList.remove("success", "error");
    formStatus.classList.add(type);
    formStatus.style.display = "block";
  }
}

// ============================================================================
// Background Canvas Animation - Photography Theme
// ============================================================================

const canvas = document.getElementById("bg-canvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let particles = [];
  let animationId;
  
  // Resize canvas to window size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  // Particle class - creates floating camera aperture/bokeh effect
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.3 + 0.1;
      this.opacityDirection = Math.random() > 0.5 ? 1 : -1;
      this.color = this.getRandomColor();
    }
    
    getRandomColor() {
      const colors = [
        "rgba(212, 175, 55, ", // Gold
        "rgba(255, 255, 255, ", // White
        "rgba(180, 150, 100, ", // Warm
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      // Fade in/out
      this.opacity += 0.003 * this.opacityDirection;
      if (this.opacity >= 0.4 || this.opacity <= 0.05) {
        this.opacityDirection *= -1;
      }
      
      // Wrap around screen
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.opacity + ")";
      ctx.fill();
      
      // Add glow effect for larger particles
      if (this.size > 2) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color + (this.opacity * 0.2) + ")";
        ctx.fill();
      }
    }
  }
  
  // Create floating lines (film strip effect)
  class Line {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.length = Math.random() * 50 + 20;
      this.angle = Math.random() * Math.PI * 2;
      this.speed = Math.random() * 0.2 + 0.05;
      this.opacity = Math.random() * 0.1 + 0.02;
    }
    
    update() {
      this.y += this.speed;
      this.angle += 0.005;
      
      if (this.y > canvas.height + this.length) {
        this.y = -this.length;
        this.x = Math.random() * canvas.width;
      }
    }
    
    draw() {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(
        this.x + Math.cos(this.angle) * this.length,
        this.y + Math.sin(this.angle) * this.length
      );
      ctx.strokeStyle = `rgba(212, 175, 55, ${this.opacity})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }
  
  // Initialize particles
  function initParticles() {
    particles = [];
    const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Add some lines
    for (let i = 0; i < 15; i++) {
      particles.push(new Line());
    }
  }
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });
    
    animationId = requestAnimationFrame(animate);
  }
  
  // Initialize and start
  resizeCanvas();
  initParticles();
  animate();
  
  // Handle window resize
  window.addEventListener("resize", () => {
    resizeCanvas();
    initParticles();
  });
  
  // Reduce animation when page is not visible
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      animate();
    }
  });
}

// ============================================================================
// Smooth Scroll for anchor links
// ============================================================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function(e) {
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});
