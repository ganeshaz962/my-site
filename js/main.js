// ===========================
// NAVBAR – scroll effect + hamburger
// ===========================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  document.getElementById('back-to-top').classList.toggle('visible', window.scrollY > 400);
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// ===========================
// SMOOTH SCROLL for anchor links
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===========================
// BACK TO TOP
// ===========================
document.getElementById('back-to-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===========================
// STATS COUNTER ANIMATION
// ===========================
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'), 10);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;

    const update = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.ceil(current);
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    };
    update();
  });
}

// ===========================
// INTERSECTION OBSERVER – fade-in & counter trigger
// ===========================
const observerOptions = { threshold: 0.15 };

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

// Apply fade-in to all major cards and sections
document.querySelectorAll(
  '.service-card, .product-card, .team-card, .testimonial-card, .about-grid, .contact-grid, .section-header'
).forEach(el => {
  el.classList.add('fade-in');
  fadeObserver.observe(el);
});

const statsBar = document.querySelector('.stats-bar');
if (statsBar) statsObserver.observe(statsBar);

// ===========================
// CONTACT FORM – client-side validation
// ===========================
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const btnText = document.getElementById('btn-text');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();
  let valid = true;

  // Clear previous errors
  contactForm.querySelectorAll('input, textarea').forEach(field => {
    field.classList.remove('error');
  });

  const name = contactForm.querySelector('#name');
  const email = contactForm.querySelector('#email');
  const message = contactForm.querySelector('#message');

  if (!name.value.trim()) { name.classList.add('error'); valid = false; }
  if (!validateEmail(email.value.trim())) { email.classList.add('error'); valid = false; }
  if (!message.value.trim()) { message.classList.add('error'); valid = false; }

  if (!valid) return;

  // Simulate form submission
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  btnText.textContent = 'Sending...';

  setTimeout(() => {
    submitBtn.disabled = false;
    btnText.textContent = 'Send Message';
    contactForm.reset();
    formSuccess.style.display = 'block';
    setTimeout(() => { formSuccess.style.display = 'none'; }, 5000);
  }, 1200);
});

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ===========================
// NEWSLETTER FORM
// ===========================
const newsletterForm = document.getElementById('newsletter-form');
newsletterForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const input = this.querySelector('input[type="email"]');
  if (validateEmail(input.value.trim())) {
    input.value = '';
    input.placeholder = 'Thanks for subscribing!';
    setTimeout(() => { input.placeholder = 'your@email.com'; }, 3000);
  }
});

// ===========================
// ACTIVE NAV LINK on scroll
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-links a:not(.btn-nav)');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.getAttribute('id');
    }
  });
  navLinkEls.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = navbar.classList.contains('scrolled') ? 'var(--green)' : 'var(--green-mid)';
    }
  });
});
