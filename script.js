// ============================================
// NAVIGATION VISIBILITY ON SCROLL
// ============================================
const mainNav = document.getElementById('mainNav');
const scrollIndicator = document.getElementById('scrollIndicator');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  // Show nav after scrolling down 200px
  if (currentScroll > 200) {
    mainNav.classList.add('nav-visible');
    mainNav.classList.remove('nav-hidden');
    scrollIndicator.classList.add('hidden');
  } else {
    mainNav.classList.remove('nav-visible');
    mainNav.classList.add('nav-hidden');
    scrollIndicator.classList.remove('hidden');
  }
  
  lastScroll = currentScroll;
});

// ============================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Close mobile menu if open
      document.getElementById('navMenu').classList.remove('active');
      document.getElementById('menuToggle').classList.remove('active');
    }
  });
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// ============================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ============================================
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all elements with scroll reveal classes
document.querySelectorAll('.service-block, .pricing-card, .faq-item, .demo-text, .demo-video-container, .contact-text, .contact-form-container').forEach(element => {
  observer.observe(element);
});

// ============================================
// ABOUT SECTION - HORIZONTAL AUTO-SCROLL CAROUSEL
// ============================================
const carousel = document.getElementById('aboutCarousel');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let autoScrollInterval;
const SCROLL_INTERVAL = 5000; // 5 seconds

// Function to scroll to a specific slide
function scrollToSlide(index) {
  const slideWidth = carousel.offsetWidth;
  carousel.scrollTo({
    left: slideWidth * index,
    behavior: 'smooth'
  });
  currentSlide = index;
  updateDots();
}

// Update active dot indicator
function updateDots() {
  dots.forEach((dot, index) => {
    if (index === currentSlide) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// Auto-scroll function
function startAutoScroll() {
  autoScrollInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % 3; // Loop back to 0 after slide 2
    scrollToSlide(currentSlide);
  }, SCROLL_INTERVAL);
}

// Stop auto-scroll
function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

// Dot click handlers
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    stopAutoScroll();
    scrollToSlide(index);
    startAutoScroll(); // Restart auto-scroll after manual interaction
  });
});

// Manual scroll detection
let isScrolling;
carousel.addEventListener('scroll', () => {
  // Clear auto-scroll while user is manually scrolling
  stopAutoScroll();
  
  // Detect which slide we're on
  clearTimeout(isScrolling);
  isScrolling = setTimeout(() => {
    const slideWidth = carousel.offsetWidth;
    const scrollLeft = carousel.scrollLeft;
    currentSlide = Math.round(scrollLeft / slideWidth);
    updateDots();
    startAutoScroll(); // Restart auto-scroll after manual scroll ends
  }, 150);
});

// Start auto-scroll when page loads
startAutoScroll();

// Pause auto-scroll when user hovers over carousel (desktop)
carousel.addEventListener('mouseenter', stopAutoScroll);
carousel.addEventListener('mouseleave', startAutoScroll);

// Stop auto-scroll when About section is not in view
const aboutSection = document.getElementById('about');
const aboutObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      startAutoScroll();
    } else {
      stopAutoScroll();
    }
  });
}, { threshold: 0.3 });

aboutObserver.observe(aboutSection);

// ============================================
// FAQ ACCORDION
// ============================================
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', function() {
    const faqItem = this.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
      item.classList.remove('active');
    });
    
    // If the clicked item wasn't active, open it
    if (!isActive) {
      faqItem.classList.add('active');
    }
  });
});

// ============================================
// MODAL FUNCTIONALITY
// ============================================
const modalAiAssistantCore = document.getElementById('modalAiAssistantCore');
const modalAiAssistantPro = document.getElementById('modalAiAssistantPro');
const modalCustomProject = document.getElementById('modalCustomProject');

// Open modals when pricing buttons are clicked
document.querySelectorAll('.pricing-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const card = this.closest('.pricing-card');
    const plan = card.getAttribute('data-plan');
    
    if (plan === 'ai-assistant-core') {
      modalAiAssistantCore.classList.add('active');
    } else if (plan === 'ai-assistant-pro') {
      modalAiAssistantPro.classList.add('active');
    } else if (plan === 'custom-project') {
      modalCustomProject.classList.add('active');
    }
    
    // Stop body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  });
});

// Close modals
document.querySelectorAll('.modal-close').forEach(closeBtn => {
  closeBtn.addEventListener('click', function() {
    this.closest('.modal').classList.remove('active');
    document.body.style.overflow = 'auto';
  });
});

// Close modal when clicking outside
document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', function(e) {
    if (e.target === this) {
      this.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
});

// Modal CTA buttons scroll to contact
document.querySelectorAll('.modal-cta').forEach(btn => {
  btn.addEventListener('click', function() {
    // Close modal
    this.closest('.modal').classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.active').forEach(modal => {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }
});

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 150;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
});

// ============================================
// PERFORMANCE OPTIMIZATIONS
// ============================================

// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Lazy load images if any
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src;
  });
} else {
  // Fallback for browsers that don't support lazy loading
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}

// ============================================
// PARALLAX EFFECT ON HERO (SUBTLE)
// ============================================
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('.hero');
      if (hero && scrolled < window.innerHeight) {
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent) {
          heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
          heroContent.style.opacity = Math.max(0, 1 - (scrolled / (window.innerHeight * 0.8)));
        }
      }
      ticking = false;
    });
    ticking = true;
  }
});

// ============================================
// FORM VALIDATION FEEDBACK
// ============================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    // Form will submit to Web3Forms, but we can add visual feedback
    const submitBtn = this.querySelector('.submit-btn');
    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.style.opacity = '0.7';
    submitBtn.disabled = true;
  });
}

// ============================================
// REDUCE MOTION FOR ACCESSIBILITY
// ============================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
  // Disable auto-scroll carousel for users who prefer reduced motion
  stopAutoScroll();
  
  // Reduce animation durations
  document.documentElement.style.setProperty('--animation-duration', '0.01ms');
}

// ============================================
// CONSOLE EASTER EGG
// ============================================
console.log('%c🚀 NIVIAN AI Solutions', 'color: #00d4ff; font-size: 24px; font-weight: bold;');
console.log('%cBuilt with care in Australia 🇦🇺', 'color: #5b9bd5; font-size: 14px;');
console.log('%cInterested in working with us? contact@nivian.co', 'color: #a8c5e6; font-size: 12px;');
