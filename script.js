// Smooth scrolling for navigation links
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

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
  observer.observe(element);
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 100;

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

// Pricing card hover effects (works on both desktop and mobile touch)
document.querySelectorAll('.pricing-card').forEach(card => {
  // Desktop hover
  card.addEventListener('mouseenter', function() {
    this.classList.add('hover-active');
  });
  
  card.addEventListener('mouseleave', function() {
    this.classList.remove('hover-active');
  });

  // Mobile touch
  card.addEventListener('touchstart', function() {
    this.classList.add('hover-active');
  });
  
  card.addEventListener('touchend', function() {
    setTimeout(() => {
      this.classList.remove('hover-active');
    }, 300);
  });
});

// Service card animations (works on both desktop and mobile)
document.querySelectorAll('.service-card').forEach(card => {
  // Desktop hover
  card.addEventListener('mouseenter', function() {
    this.classList.add('hover-active');
  });
  
  card.addEventListener('mouseleave', function() {
    this.classList.remove('hover-active');
  });

  // Mobile touch
  card.addEventListener('touchstart', function() {
    this.classList.add('hover-active');
  });
  
  card.addEventListener('touchend', function() {
    setTimeout(() => {
      this.classList.remove('hover-active');
    }, 300);
  });
});

// Ripple effect on hero CTA button
const heroCta = document.getElementById('heroCta');
heroCta.addEventListener('click', function(e) {
  const ripple = document.createElement('span');
  ripple.classList.add('ripple');
  
  const rect = this.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;
  
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  
  this.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
});

// Modal functionality
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
  });
});

// Close modals
document.querySelectorAll('.modal-close').forEach(closeBtn => {
  closeBtn.addEventListener('click', function() {
    this.closest('.modal').classList.remove('active');
  });
});

// Close modal when clicking outside
document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', function(e) {
    if (e.target === this) {
      this.classList.remove('active');
    }
  });
});

// Modal CTA buttons scroll to contact
document.querySelectorAll('.modal-cta').forEach(btn => {
  btn.addEventListener('click', function() {
    // Close modal
    this.closest('.modal').classList.remove('active');
    
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

// FAQ Accordion functionality
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

// Add parallax effect to hero section
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('.hero');
      if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.15}px)`;
        hero.style.opacity = Math.max(0.3, 1 - (scrolled / (window.innerHeight * 1.5)));
      }
      ticking = false;
    });
    ticking = true;
  }
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.style.background = 'rgba(12, 26, 59, 0.95)';
    nav.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
  } else {
    nav.style.background = 'rgba(12, 26, 59, 0.85)';
    nav.style.boxShadow = 'none';
  }
});

// Hero title gradient follows mouse
const heroTitle = document.querySelector('.hero h1');
if (heroTitle) {
  heroTitle.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    this.style.background = `
      radial-gradient(circle at ${x}% ${y}%, 
        white, 
        var(--electric-blue) 30%, 
        var(--bright-blue) 60%
      )
    `;
    this.style.webkitBackgroundClip = 'text';
    this.style.backgroundClip = 'text';
  });
  
  heroTitle.addEventListener('mouseleave', function() {
    this.style.background = 'linear-gradient(135deg, white, var(--electric-blue), var(--bright-blue))';
    this.style.webkitBackgroundClip = 'text';
    this.style.backgroundClip = 'text';
  });
}
