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
// Background Canvas Animation - Soothing Wedding Theme with Glitter
// ============================================================================

const canvas = document.getElementById("bg-canvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let bokehCircles = [];
  let sparkles = [];
  let glitterParticles = [];
  let dustParticles = [];
  let waves = [];
  let animationId;
  let time = 0;
  
  // Resize canvas to window size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = document.body.scrollHeight;
  }
  
  // Soft bokeh circles - dreamy background effect
  class BokehCircle {
    constructor() {
      this.reset();
    }
    
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.baseSize = Math.random() * 120 + 60;
      this.size = this.baseSize;
      this.speedX = (Math.random() - 0.5) * 0.2;
      this.speedY = (Math.random() - 0.5) * 0.2;
      this.opacity = Math.random() * 0.08 + 0.03;
      this.pulseSpeed = Math.random() * 0.015 + 0.008;
      this.pulseOffset = Math.random() * Math.PI * 2;
      this.color = this.getRandomColor();
    }
    
    getRandomColor() {
      const colors = [
        { r: 201, g: 168, b: 108 }, // Champagne gold
        { r: 212, g: 165, b: 165 }, // Rose
        { r: 232, g: 212, b: 184 }, // Soft gold
        { r: 245, g: 230, b: 224 }, // Blush
        { r: 255, g: 250, b: 245 }, // Ivory
        { r: 255, g: 215, b: 0 },   // Gold
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.size = this.baseSize + Math.sin(time * this.pulseSpeed + this.pulseOffset) * 15;
      
      if (this.x < -this.size) this.x = canvas.width + this.size;
      if (this.x > canvas.width + this.size) this.x = -this.size;
      if (this.y < -this.size) this.y = canvas.height + this.size;
      if (this.y > canvas.height + this.size) this.y = -this.size;
    }
    
    draw() {
      const gradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.size
      );
      gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity * 2})`);
      gradient.addColorStop(0.4, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`);
      gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);
      
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }
  
  // Glitter particles - bright shiny specks
  class GlitterParticle {
    constructor() {
      this.reset();
    }
    
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = 0;
      this.maxOpacity = Math.random() * 1 + 0.5;
      this.twinkleSpeed = Math.random() * 0.15 + 0.08;
      this.twinkleOffset = Math.random() * Math.PI * 2;
      this.color = this.getColor();
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.05;
    }
    
    getColor() {
      const colors = [
        { r: 255, g: 255, b: 255 }, // White
        { r: 255, g: 223, b: 138 }, // Gold
        { r: 255, g: 200, b: 200 }, // Pink
        { r: 230, g: 230, b: 250 }, // Lavender
        { r: 255, g: 250, b: 205 }, // Lemon
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.rotation += this.rotationSpeed;
      
      // Twinkling effect
      this.opacity = (Math.sin(time * this.twinkleSpeed + this.twinkleOffset) + 1) / 2 * this.maxOpacity;
      
      // Wrap around
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }
    
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      
      // Draw diamond/star shape
      ctx.beginPath();
      const spikes = 4;
      for (let i = 0; i < spikes * 2; i++) {
        const radius = i % 2 === 0 ? this.size * 2 : this.size * 0.5;
        const angle = (i * Math.PI) / spikes;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      
      // Gradient fill for sparkle
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size * 2);
      gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`);
      gradient.addColorStop(0.5, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity * 0.5})`);
      gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Add bright center
      ctx.beginPath();
      ctx.arc(0, 0, this.size * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.fill();
      
      ctx.restore();
    }
  }
  
  // Floating sparkle particles (star shaped)
  class Sparkle {
    constructor() {
      this.reset();
    }
    
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 4 + 2;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = -Math.random() * 0.5 - 0.2;
      this.opacity = 0;
      this.maxOpacity = Math.random() * 0.8 + 0.4;
      this.fadeIn = true;
      this.life = 0;
      this.maxLife = Math.random() * 400 + 300;
      this.twinkleSpeed = Math.random() * 0.12 + 0.06;
      this.rotation = 0;
      this.rotationSpeed = (Math.random() - 0.5) * 0.02;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life++;
      this.rotation += this.rotationSpeed;
      
      if (this.fadeIn) {
        this.opacity += 0.02;
        if (this.opacity >= this.maxOpacity) this.fadeIn = false;
      } else if (this.life > this.maxLife - 80) {
        this.opacity -= 0.015;
      }
      
      // Twinkle
      this.opacity += Math.sin(time * this.twinkleSpeed) * 0.03;
      this.opacity = Math.max(0, Math.min(this.maxOpacity, this.opacity));
      
      if (this.y < -20 || this.life > this.maxLife || this.opacity <= 0) {
        this.reset();
        this.y = canvas.height + 20;
      }
    }
    
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      
      // Draw 6-pointed star
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const outerX = Math.cos(angle) * this.size;
        const outerY = Math.sin(angle) * this.size;
        const innerAngle = angle + Math.PI / 6;
        const innerX = Math.cos(innerAngle) * this.size * 0.4;
        const innerY = Math.sin(innerAngle) * this.size * 0.4;
        
        if (i === 0) ctx.moveTo(outerX, outerY);
        else ctx.lineTo(outerX, outerY);
        ctx.lineTo(innerX, innerY);
      }
      ctx.closePath();
      
      ctx.fillStyle = `rgba(255, 250, 240, ${this.opacity})`;
      ctx.fill();
      
      // Bright center
      ctx.beginPath();
      ctx.arc(0, 0, this.size * 0.25, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.fill();
      
      ctx.restore();
    }
  }
  
  // Flowing light waves
  class LightWave {
    constructor(yOffset) {
      this.yOffset = yOffset;
      this.amplitude = Math.random() * 40 + 25;
      this.frequency = Math.random() * 0.003 + 0.001;
      this.speed = Math.random() * 0.4 + 0.2;
      this.opacity = Math.random() * 0.06 + 0.02;
      this.phase = Math.random() * Math.PI * 2;
    }
    
    draw() {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * this.yOffset);
      
      for (let x = 0; x <= canvas.width; x += 4) {
        const y = canvas.height * this.yOffset + 
                  Math.sin(x * this.frequency + time * this.speed + this.phase) * this.amplitude +
                  Math.sin(x * this.frequency * 0.5 + time * this.speed * 0.7) * this.amplitude * 0.5;
        ctx.lineTo(x, y);
      }
      
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      
      const gradient = ctx.createLinearGradient(0, canvas.height * this.yOffset - 60, 0, canvas.height);
      gradient.addColorStop(0, `rgba(201, 168, 108, 0)`);
      gradient.addColorStop(0.3, `rgba(201, 168, 108, ${this.opacity})`);
      gradient.addColorStop(0.6, `rgba(255, 223, 138, ${this.opacity * 0.8})`);
      gradient.addColorStop(1, `rgba(201, 168, 108, 0)`);
      
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }
  
  // Soft floating dust particles
  class DustParticle {
    constructor() {
      this.reset();
    }
    
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.15;
      this.speedY = (Math.random() - 0.5) * 0.15;
      this.opacity = Math.random() * 0.4 + 0.1;
      this.wobbleSpeed = Math.random() * 0.025 + 0.012;
      this.twinkle = Math.random() * 0.1 + 0.05;
    }
    
    update() {
      this.x += this.speedX + Math.sin(time * this.wobbleSpeed) * 0.15;
      this.y += this.speedY + Math.cos(time * this.wobbleSpeed) * 0.08;
      
      // Twinkle
      this.currentOpacity = this.opacity + Math.sin(time * this.twinkle) * 0.15;
      
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }
    
    draw() {
      // Outer glow
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 248, 240, ${this.currentOpacity * 0.2})`;
      ctx.fill();
      
      // Inner bright
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.currentOpacity})`;
      ctx.fill();
    }
  }
  
  // Initialize all elements
  function initElements() {
    bokehCircles = [];
    sparkles = [];
    glitterParticles = [];
    dustParticles = [];
    waves = [];
    
    // Bokeh circles
    const bokehCount = Math.min(12, Math.floor(canvas.width / 150));
    for (let i = 0; i < bokehCount; i++) {
      bokehCircles.push(new BokehCircle());
    }
    
    // Glitter particles (main sparkle effect)
    const glitterCount = Math.min(80, Math.floor(canvas.width / 20));
    for (let i = 0; i < glitterCount; i++) {
      glitterParticles.push(new GlitterParticle());
    }
    
    // Sparkles (floating stars)
    const sparkleCount = Math.min(50, Math.floor(canvas.width / 30));
    for (let i = 0; i < sparkleCount; i++) {
      sparkles.push(new Sparkle());
    }
    
    // Dust particles
    const dustCount = Math.min(60, Math.floor(canvas.width / 30));
    for (let i = 0; i < dustCount; i++) {
      dustParticles.push(new DustParticle());
    }
    
    // Light waves
    waves = [
      new LightWave(0.6),
      new LightWave(0.7),
      new LightWave(0.8),
      new LightWave(0.9)
    ];
  }
  
  // Animation loop
  function animate() {
    time++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw in order: waves (back), bokeh, dust, glitter, sparkles (front)
    waves.forEach(wave => wave.draw());
    
    bokehCircles.forEach(circle => {
      circle.update();
      circle.draw();
    });
    
    dustParticles.forEach(dust => {
      dust.update();
      dust.draw();
    });
    
    glitterParticles.forEach(glitter => {
      glitter.update();
      glitter.draw();
    });
    
    sparkles.forEach(sparkle => {
      sparkle.update();
      sparkle.draw();
    });
    
    animationId = requestAnimationFrame(animate);
  }
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  
  // Initialize and start
  resizeCanvas();
  if (!prefersReducedMotion) {
    initElements();
    animate();
  }
  
  // Handle window resize
  window.addEventListener("resize", () => {
    resizeCanvas();
    if (!prefersReducedMotion) {
      initElements();
    }
  });
  
  // Update canvas height on scroll for full page coverage
  let resizeTimeout;
  window.addEventListener("scroll", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const newHeight = document.body.scrollHeight;
      if (canvas.height !== newHeight) {
        canvas.height = newHeight;
      }
    }, 100);
  });
  
  // Reduce animation when page is not visible
  if (!prefersReducedMotion) {
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        animate();
      }
    });
  }
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

// ============================================================================
// About Section - Random Photo Slideshow
// ============================================================================

const aboutPhotoContainer = document.getElementById("aboutPhotoContainer");

if (aboutPhotoContainer) {
  // Gallery photos pool
  const galleryPhotos = [
    "images/gallery/001.JPG",
    "images/gallery/01 (19).jpg",
    "images/gallery/03 (11).jpg",
    "images/gallery/8 (46).jpg",
    "images/gallery/8 (52).JPG",
    "images/gallery/8 (54).JPG",
    "images/gallery/ABN00018.jpg",
    "images/gallery/ABN07237.jpg",
    "images/gallery/ABN07556.jpg",
    "images/gallery/ABN08424.jpg",
    "images/gallery/ABN09689.jpg",
    "images/gallery/ABN09728.jpg",
    "images/gallery/ABN09899.jpg",
    "images/gallery/ALX00087.jpg",
    "images/gallery/ALX03102.jpg",
    "images/gallery/ALX03206.jpg",
    "images/gallery/ALX05446.jpg",
    "images/gallery/ALX05472.jpg",
    "images/gallery/ALX05524.jpg",
    "images/gallery/ALX05704.jpg",
    "images/gallery/ALX05763.jpg",
    "images/gallery/ALX06495.jpg",
    "images/gallery/ALX06851.jpg",
    "images/gallery/ALX07090.jpg",
    "images/gallery/ALX07247.jpg",
    "images/gallery/ALX08346.jpg",
    "images/gallery/ASU_6224.jpg",
    "images/gallery/ASU_6693.jpg",
    "images/gallery/ASU_7081.jpg",
    "images/gallery/ASU_7089.jpg",
    "images/gallery/DAC_7163.jpg",
    "images/gallery/DAC_7579.jpg",
    "images/gallery/DAC_7811.jpg",
    "images/gallery/DSC06861.jpg",
    "images/gallery/DSC07098.jpg",
    "images/gallery/JES03165.jpg",
    "images/gallery/JES03662.jpg",
    "images/gallery/JES05141.jpg",
    "images/gallery/SBY00461.jpg",
    "images/gallery/SIM07899.jpg",
    "images/gallery/SIM08146.jpg",
    "images/gallery/SIM09070.jpg",
    "images/gallery/SKD02524.jpg",
    "images/gallery/SKD03570.jpg",
    "images/gallery/SKD03592.jpg"
  ];

  // Scattered image photos pool (for the 4-piece animation)
  const scatteredPhotos = [
    "images/cover.jpg",
    "images/gallery/SKD03570.jpg",
    "images/gallery/ALX05763.jpg",
    "images/gallery/ASU_7081.jpg",
    "images/gallery/DAC_7579.jpg"
  ];

  // Shuffle array function
  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Get random photos without repetition
  function getRandomPhotos(pool, count, exclude = []) {
    const available = pool.filter(p => !exclude.includes(p));
    const shuffled = shuffleArray(available);
    return shuffled.slice(0, count);
  }

  // Set random photos for slideshow
  function setRandomPhotos() {
    const photoPieces = aboutPhotoContainer.querySelectorAll(".photo-piece");
    const slideImages = aboutPhotoContainer.querySelectorAll(".about-photo-slide");
    
    // Pick random scattered image
    const randomScattered = scatteredPhotos[Math.floor(Math.random() * scatteredPhotos.length)];
    
    // Set scattered pieces background
    photoPieces.forEach(piece => {
      piece.style.backgroundImage = `url('${randomScattered}')`;
    });
    
    // Pick 3 random unique photos for slides
    const randomSlides = getRandomPhotos(galleryPhotos, 3, [randomScattered]);
    
    slideImages.forEach((img, index) => {
      if (randomSlides[index]) {
        img.src = randomSlides[index];
      }
    });
  }

  // Initial random selection
  setRandomPhotos();

  // Change photos every cycle (24 seconds)
  setInterval(setRandomPhotos, 24000);
}
