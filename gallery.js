// Gallery Lightbox and Animation functionality

document.addEventListener('DOMContentLoaded', function() {
  // Lightbox elements
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = lightbox ? lightbox.querySelector('.lightbox-image') : null;
  const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;
  const lightboxPrev = lightbox ? lightbox.querySelector('.lightbox-prev') : null;
  const lightboxNext = lightbox ? lightbox.querySelector('.lightbox-next') : null;
  
  // Gallery items
  const galleryItems = document.querySelectorAll('.gallery-item');
  let currentIndex = 0;
  const images = [];
  
  // Collect all image sources
  galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    if (img) {
      images.push(img.src);
      
      // Open lightbox on click (but not on like button)
      item.addEventListener('click', function(e) {
        if (e.target.closest('.like-btn')) return;
        currentIndex = index;
        openLightbox(images[currentIndex]);
      });
    }
  });
  
  // Like button functionality
  const likeButtons = document.querySelectorAll('.like-btn');
  likeButtons.forEach((btn) => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      this.classList.toggle('liked');
      
      // Add heart burst animation
      if (this.classList.contains('liked')) {
        createHeartBurst(this);
      }
    });
  });
  
  // Heart burst animation
  function createHeartBurst(button) {
    const burst = document.createElement('div');
    burst.className = 'heart-burst';
    burst.innerHTML = '❤️';
    button.appendChild(burst);
    
    setTimeout(() => {
      burst.remove();
    }, 600);
  }
  
  // Open lightbox function
  function openLightbox(src) {
    if (lightbox && lightboxImage) {
      lightboxImage.src = src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }
  
  // Close lightbox function
  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
  
  // Navigate to next image
  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    if (lightboxImage) {
      lightboxImage.style.opacity = '0';
      setTimeout(() => {
        lightboxImage.src = images[currentIndex];
        lightboxImage.style.opacity = '1';
      }, 150);
    }
  }
  
  // Navigate to previous image
  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    if (lightboxImage) {
      lightboxImage.style.opacity = '0';
      setTimeout(() => {
        lightboxImage.src = images[currentIndex];
        lightboxImage.style.opacity = '1';
      }, 150);
    }
  }
  
  // Event listeners for lightbox controls
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }
  
  if (lightboxNext) {
    lightboxNext.addEventListener('click', function(e) {
      e.stopPropagation();
      nextImage();
    });
  }
  
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', function(e) {
      e.stopPropagation();
      prevImage();
    });
  }
  
  // Close lightbox on background click
  if (lightbox) {
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    
    switch(e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowRight':
        nextImage();
        break;
      case 'ArrowLeft':
        prevImage();
        break;
    }
  });
  
  // Add transition for image opacity changes
  if (lightboxImage) {
    lightboxImage.style.transition = 'opacity 0.15s ease';
  }
  
  // Scroll animation for gallery items
  function animateOnScroll() {
    galleryItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top < windowHeight * 0.9) {
        item.classList.add('animate');
      }
    });
    
    // Animate video items too
    const videoItems = document.querySelectorAll('.video-item');
    videoItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top < windowHeight * 0.9) {
        item.classList.add('animate');
      }
    });
  }
  
  // Initial check for items in view
  animateOnScroll();
  
  // Check on scroll
  window.addEventListener('scroll', animateOnScroll, { passive: true });
});
