// Gallery Lightbox and Animation functionality
document.addEventListener('DOMContentLoaded', function() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = lightbox?.querySelector('.lightbox-image');
  const lightboxClose = lightbox?.querySelector('.lightbox-close');
  const lightboxPrev = lightbox?.querySelector('.lightbox-prev');
  const lightboxNext = lightbox?.querySelector('.lightbox-next');
  const galleryItems = document.querySelectorAll('.gallery-item');
  let currentIndex = 0;
  const images = [];

  // Collect images and setup click handlers
  galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    if (img) {
      images.push(img.src);
      item.addEventListener('click', e => { if (!e.target.closest('.like-btn')) { currentIndex = index; openLightbox(images[currentIndex]); } });
    }
  });

  // Like button functionality
  document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      this.classList.toggle('liked');
      if (this.classList.contains('liked')) {
        const burst = document.createElement('div');
        burst.className = 'heart-burst';
        burst.innerHTML = '❤️';
        this.appendChild(burst);
        setTimeout(() => burst.remove(), 600);
      }
    });
  });

  const openLightbox = src => { if (lightbox && lightboxImage) { lightboxImage.src = src; lightbox.classList.add('active'); document.body.style.overflow = 'hidden'; } };
  const closeLightbox = () => { if (lightbox) { lightbox.classList.remove('active'); document.body.style.overflow = ''; } };
  const navigate = dir => {
    currentIndex = (currentIndex + dir + images.length) % images.length;
    if (lightboxImage) { lightboxImage.style.opacity = '0'; setTimeout(() => { lightboxImage.src = images[currentIndex]; lightboxImage.style.opacity = '1'; }, 150); }
  };

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', e => { e.stopPropagation(); navigate(1); });
  if (lightboxPrev) lightboxPrev.addEventListener('click', e => { e.stopPropagation(); navigate(-1); });
  if (lightbox) lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  
  document.addEventListener('keydown', e => {
    if (!lightbox?.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowRight') navigate(1);
    else if (e.key === 'ArrowLeft') navigate(-1);
  });

  if (lightboxImage) lightboxImage.style.transition = 'opacity 0.15s ease';

  // Scroll animation
  const animateOnScroll = () => {
    const windowHeight = window.innerHeight;
    document.querySelectorAll('.gallery-item, .video-item').forEach(item => {
      if (item.getBoundingClientRect().top < windowHeight * 0.9) item.classList.add('animate');
    });
  };
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll, { passive: true });
});
