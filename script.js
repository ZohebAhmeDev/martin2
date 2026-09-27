/**
 * MARTIN ENGINEERING & TRADING CO. - MODERN CLIENT INTERACTIONS (2026)
 * High-performance, lightweight vanilla JS for sticky navigation,
 * mobile drawer, scroll animations, and progress tracking.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header & Scroll States
  const siteHeader = document.querySelector('.site-header');
  const handleHeaderScroll = () => {
    if (!siteHeader) return;
    if (window.scrollY > 20) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // 2. Mobile Navigation Toggle
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      }
    });

    // Close mobile menu on Esc key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      }
    });
  }

  // 3. Mobile Dropdown Support
  const dropdownToggles = document.querySelectorAll('.nav-item.dropdown > .nav-link');
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const dropdown = toggle.nextElementSibling;
        if (dropdown && dropdown.classList.contains('nav-dropdown')) {
          dropdown.classList.toggle('open');
        }
      }
    });
  });

  // 4. Back-to-Top Circular Scroll Progress Indicator
  const scrollProgress = document.getElementById('progress');
  const progressValue = document.getElementById('progress-value');

  const calcScrollValue = () => {
    if (!scrollProgress) return;
    const pos = document.documentElement.scrollTop || document.body.scrollTop;
    const calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollValue = calcHeight > 0 ? Math.round((pos * 100) / calcHeight) : 0;

    if (pos > 150) {
      scrollProgress.style.display = 'grid';
    } else {
      scrollProgress.style.display = 'none';
    }

    scrollProgress.style.background = `conic-gradient(var(--brand-red, #e01a22) ${scrollValue}%, var(--slate-200, #e2e8f0) ${scrollValue}%)`;
  };

  if (scrollProgress) {
    scrollProgress.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    window.addEventListener('scroll', calcScrollValue, { passive: true });
    calcScrollValue();
  }

  // 5. Scroll-triggered Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('active'));
  }

  // 6. Support for legacy Expand-More interactions if present
  const expandsMore = document.querySelectorAll('[expand-more]');
  expandsMore.forEach((expandMore) => {
    expandMore.addEventListener('click', function () {
      const targetId = this.dataset.target;
      const showContent = document.getElementById(targetId);
      if (!showContent) return;

      const isExpanded = showContent.classList.contains('expand-active');
      this.innerHTML = isExpanded ? (this.dataset.showtext || 'More') : (this.dataset.hidetext || 'Less');
      showContent.classList.toggle('expand-active');
    });
  });
});
