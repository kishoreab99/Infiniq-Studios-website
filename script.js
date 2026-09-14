// ==========================================================================
// Infiniq Studios — shared behaviour
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Mobile nav toggle ---------------- */
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const open = toggle.classList.toggle('is-open');
      mobileMenu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('is-open');
        mobileMenu.classList.remove('is-open');
      });
    });
  }

  /* ---------------- Scroll reveal ---------------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ---------------- Featured services carousel ---------------- */

const track = document.querySelector('.carousel-track');

if (track) {

  const originalSlides = Array.from(
    track.querySelectorAll('.feature-slide')
  );

  const prevBtn = document.querySelector(
    '[data-carousel="prev"]'
  );

  const nextBtn = document.querySelector(
    '[data-carousel="next"]'
  );

  /*
   * Clone cards at both ends.
   * This creates a seamless circular carousel.
   */

  const beforeClones = originalSlides.map(slide => {
    const clone = slide.cloneNode(true);
    clone.classList.add('carousel-clone');
    return clone;
  });

  const afterClones = originalSlides.map(slide => {
    const clone = slide.cloneNode(true);
    clone.classList.add('carousel-clone');
    return clone;
  });


  /*
   * Put clones before and after the original cards.
   */

  beforeClones.reverse().forEach(clone => {
    track.insertBefore(clone, track.firstChild);
  });

  afterClones.forEach(clone => {
    track.appendChild(clone);
  });


  const slides = Array.from(
    track.querySelectorAll('.feature-slide')
  );

  let index = originalSlides.length;


  function getStep() {

    if (slides.length < 2) return 0;

    const cardWidth =
      slides[0].getBoundingClientRect().width;

    const gap =
      parseFloat(
        window.getComputedStyle(track).gap
      ) || 0;

    return cardWidth + gap;
  }


  function moveCarousel(animate = true) {

    const step = getStep();

    slides.forEach(slide => {

      slide.style.transition = animate
        ? 'transform .45s cubic-bezier(.22,.61,.36,1)'
        : 'none';

      slide.style.transform =
        `translate3d(-${index * step}px, 0, 0)`;

    });
  }


  /*
   * NEXT
   */

  if (nextBtn) {

    nextBtn.addEventListener('click', () => {

      index++;

      moveCarousel(true);

    });

  }


  /*
   * PREVIOUS
   */

  if (prevBtn) {

    prevBtn.addEventListener('click', () => {

      index--;

      moveCarousel(true);

    });

  }


  /*
   * When the animation reaches a clone,
   * instantly jump to the matching original.
   */

  slides.forEach(slide => {

    slide.addEventListener('transitionend', () => {

      const total = originalSlides.length;

      if (index >= total * 2) {

        index -= total;

        moveCarousel(false);

      }

      else if (index < total) {

        index += total;

        moveCarousel(false);

      }

    });

  });


  /*
   * Resize
   */

  window.addEventListener('resize', () => {

    moveCarousel(false);

  });


  /*
   * Initial position
   */

  moveCarousel(false);
}


 /* =========================================================
   CONTACT FORMS + EMAILJS
   Works on:
   - Home page
   - Services page
   - Contact page
   ========================================================= */


/* =========================================================
   CONTACT FORMS + EMAILJS
   ========================================================= */

const EMAILJS_SERVICE_ID = 'service_oytrhm9';
const EMAILJS_TEMPLATE_ID = 'template_7lnjqlt';
const EMAILJS_PUBLIC_KEY = 'fJ2ZU-XOhvjfrhHM_';


// Initialize EmailJS
if (typeof emailjs !== 'undefined') {
  emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY
  });
}


const contactForms = document.querySelectorAll('#contact-form');

contactForms.forEach((form) => {

  const nameInput = form.querySelector('#cf-name');
  const emailInput = form.querySelector('#cf-email');
  const phoneInput = form.querySelector('#cf-phone');
  const countryInput = form.querySelector('.phone-field select');
  const categoryInput = form.querySelector('#cf-category');
  const specificInput = form.querySelector('#cf-specific');
  const messageInput = form.querySelector('#cf-message');

  const submitButton = form.querySelector('button[type="submit"]');
  const note = form.querySelector('.form-note');


  /* =======================================================
     SPECIFIC SERVICE DROPDOWN
     ======================================================= */

  const serviceMap = {

    development: [
      'Website Development',
      'E-commerce Development',
      'Web Application Development',
      'Mobile App Development',
      'Maintenance & Support'
    ],

    marketing: [
      'Digital Marketing',
      'Search Engine Optimization (SEO)',
      'Social Media Marketing',
      'Performance Marketing'
    ],

    other: [
      'Graphic Design',
      'Branding & Identity',
      'Video editing'
    ]

  };


  function updateSpecificServices() {

    if (!categoryInput || !specificInput) return;

    const selectedCategory = categoryInput.value;

    specificInput.innerHTML =
      '<option value="" disabled selected>Select a Specific Service</option>';

    const services = serviceMap[selectedCategory] || [];

    services.forEach((service) => {

      const option = document.createElement('option');

      option.value = service;
      option.textContent = service;

      specificInput.appendChild(option);

    });

  }


  if (categoryInput) {
    categoryInput.addEventListener(
      'change',
      updateSpecificServices
    );
  }


  updateSpecificServices();


  /* =======================================================
     FORM SUBMIT
     ======================================================= */

  form.addEventListener('submit', async (event) => {

    event.preventDefault();


    /* -------------------------------------------------------
       GET VALUES
       ------------------------------------------------------- */

    const name = nameInput?.value.trim() || '';

    const email = emailInput?.value.trim() || '';

    const phone = phoneInput?.value.trim() || '';

    const countryCode =
      countryInput?.value.trim() || '';

    const category =
      categoryInput?.value.trim() || '';

    const specific =
      specificInput?.value.trim() || '';

    const message =
      messageInput?.value.trim() || '';


    /* -------------------------------------------------------
       DEBUG
       ------------------------------------------------------- */

    console.log('========== CONTACT FORM ==========');

    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Country:', countryCode);
    console.log('Phone:', phone);
    console.log('Category:', category);
    console.log('Specific:', specific);
    console.log('Message:', message);

    console.log('==================================');


    /* -------------------------------------------------------
       VALIDATION
       ------------------------------------------------------- */

    if (!name) {

      alert('Please enter your name.');

      return;
    }


    if (!phone || phone.length < 7) {

      alert('Please enter a valid phone number.');

      return;
    }


    if (
      email &&
      !/^\S+@\S+\.\S+$/.test(email)
    ) {

      alert('Please enter a valid email address.');

      return;
    }


    /* -------------------------------------------------------
       CHECK EMAILJS
       ------------------------------------------------------- */

    if (typeof emailjs === 'undefined') {

      console.error('EmailJS library is not loaded.');

      alert(
        'Email service is not available. Please try again.'
      );

      return;
    }


    /* -------------------------------------------------------
       FULL PHONE NUMBER
       ------------------------------------------------------- */

    const fullPhone =
      `${countryCode} ${phone}`.trim();


    /* -------------------------------------------------------
       EMAILJS DATA
       ------------------------------------------------------- */

    const templateParams = {

      name: name,

      email: email,

      phone: fullPhone,

      category: category,

      specific: specific,

      message: message

    };


    console.log(
      'EMAILJS DATA:',
      templateParams
    );


    /* -------------------------------------------------------
       BUTTON
       ------------------------------------------------------- */

    const originalText =
      submitButton?.textContent || 'Send Message';


    if (submitButton) {

      submitButton.disabled = true;

      submitButton.textContent = 'Sending...';

    }


    /* -------------------------------------------------------
       SEND
       ------------------------------------------------------- */

    try {

      const response = await emailjs.send(

        EMAILJS_SERVICE_ID,

        EMAILJS_TEMPLATE_ID,

        templateParams

      );


      console.log(
        'EMAIL SENT SUCCESSFULLY:',
        response
      );


      /* -----------------------------------------------------
         SUCCESS
         ----------------------------------------------------- */

      if (note) {

        note.textContent =
          "Thanks — your message has been sent successfully. We'll get back to you soon.";

        note.classList.add('show');

      }


      alert('Message sent successfully!');


      form.reset();


      if (specificInput) {

        specificInput.innerHTML =
          '<option value="" disabled selected>Select a Specific Service</option>';

      }


    } catch (error) {

      console.error(
        'EMAILJS ERROR:',
        error
      );


      alert(
        'Message could not be sent. Check the browser console.'
      );


    } finally {

      if (submitButton) {

        submitButton.disabled = false;

        submitButton.textContent = originalText;

      }

    }

  });

});

  /* ---------------- Blog: search + category filter ---------------- */
  const blogGrid = document.querySelector('[data-blog-grid]');
  if (blogGrid) {
    const cards = Array.from(blogGrid.querySelectorAll('.article-card'));
    const pills = document.querySelectorAll('.category-pill');
    const searchInput = document.querySelector('#blog-search');
    const noResults = document.querySelector('.no-results');
    let activeCategory = 'all';

    function applyFilters() {
      const term = (searchInput ? searchInput.value : '').trim().toLowerCase();
      let visibleCount = 0;
      cards.forEach(card => {
        const cat = card.dataset.category;
        const text = card.textContent.toLowerCase();
        const matchesCategory = activeCategory === 'all' || cat === activeCategory;
        const matchesSearch = !term || text.includes(term);
        const show = matchesCategory && matchesSearch;
        card.style.display = show ? '' : 'none';
        if (show) visibleCount++;
      });
      if (noResults) noResults.classList.toggle('show', visibleCount === 0);
    }

    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeCategory = pill.dataset.category;
        applyFilters();
      });
    });
    searchInput && searchInput.addEventListener('input', applyFilters);
  }

  /* =========================================================
   NEWSLETTER SUBSCRIPTION + EMAILJS
   ========================================================= */

/* ---------------- Newsletter form ---------------- */

const newsletterForm = document.querySelector('#newsletter-form');

if (newsletterForm) {

  newsletterForm.addEventListener('submit', async (e) => {

    e.preventDefault();

    const input = newsletterForm.querySelector('input[type="email"]');
    const btn = newsletterForm.querySelector('button');

    const subscriberEmail = input.value.trim();

    // Check email
    if (!subscriberEmail || !/^\S+@\S+\.\S+$/.test(subscriberEmail)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Check EmailJS
    if (typeof emailjs === 'undefined') {
      console.error('EmailJS is NOT loaded.');
      alert('Email service is not available.');
      return;
    }

    // Data being sent
    const newsletterParams = {
      subscriber_email: subscriberEmail
    };

    console.log('Newsletter subscriber:', newsletterParams);

    btn.disabled = true;
    btn.textContent = 'Sending...';

    try {

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        'template_z6e75m2', // Newsletter template ID
        newsletterParams
      );

      console.log('NEWSLETTER EMAIL SENT SUCCESSFULLY:', response);

      btn.textContent = 'Subscribed';
      input.value = '';

      setTimeout(() => {
        btn.textContent = 'Subscribe';
      }, 2500);

    } catch (error) {

      console.error('NEWSLETTER EMAILJS ERROR:', error);

      alert('Unable to subscribe right now. Please try again.');

      btn.textContent = 'Subscribe';

    } finally {

      btn.disabled = false;

    }

  });

}
});
  /* ---------------- Home service cards → Services sections ---------------- */

  const homeServiceCards = document.querySelectorAll('.service-card');

  const serviceTargets = {
    'Website Development': 'services.html#website-development',
    'E-commerce Development': 'services.html#ecommerce-development',
    'Web Application Development': 'services.html#web-application-development',
    'Mobile App Development': 'services.html#mobile-app-development',
    'Digital Marketing': 'services.html#digital-marketing',
    'SEO': 'services.html#seo',
    'Social Media Marketing': 'services.html#social-media-marketing',
    'Performance Marketing': 'services.html#performance-marketing',
    'Graphic Design': 'services.html#graphic-design'
  };

  homeServiceCards.forEach(card => {

    const title = card.querySelector('h3');

    if (!title) return;

    const serviceName = title.textContent.trim();
    const target = serviceTargets[serviceName];

    if (!target) return;

    card.style.cursor = 'pointer';

    card.addEventListener('click', () => {
      window.location.href = target;
    });

  });


  /* ---------------- Scroll to selected service ---------------- */

  const serviceHash = window.location.hash;

  if (serviceHash) {

    setTimeout(() => {

      const targetSection = document.querySelector(serviceHash);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }

    }, 150);

  }
  /* ---------------- Blog: search + category filter ---------------- */
const blogGrid = document.querySelector('[data-blog-grid]');

if (blogGrid) {
  const cards = Array.from(blogGrid.querySelectorAll('.article-card'));
  const pills = document.querySelectorAll('.category-pill');
  const searchInput = document.querySelector('#blog-search');
  const noResults = document.querySelector('.no-results');

  let activeCategory = 'all';

  function applyFilters() {
    const term = (searchInput ? searchInput.value : '').trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach(card => {
      const category = (card.dataset.category || '').toLowerCase();
      const text = card.textContent.toLowerCase();

      const matchesCategory =
        activeCategory === 'all' || category === activeCategory;

      const matchesSearch =
        !term || text.includes(term);

      const shouldShow =
        matchesCategory && matchesSearch;

      card.style.display = shouldShow ? '' : 'none';

      if (shouldShow) {
        visibleCount++;
      }
    });

    if (noResults) {
      noResults.classList.toggle('show', visibleCount === 0);
    }
  }

  /* Category buttons */
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(item => item.classList.remove('active'));

      pill.classList.add('active');

      activeCategory = pill.dataset.category;

      applyFilters();
    });
  });

  /* Search while typing */
  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);

    /* Search when ENTER is pressed */
    searchInput.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        event.preventDefault();

        applyFilters();

        const latestHeading = Array.from(
          document.querySelectorAll('h2')
        ).find(
          heading => heading.textContent.trim().toLowerCase() === 'latest articles'
        );

        if (latestHeading) {
          latestHeading.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  }
}
