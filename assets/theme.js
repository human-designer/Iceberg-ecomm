/* ─── ICEBERG THEME JS ────────────────────────────────────────────────── */

// Nav scroll behaviour
(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('nav--scrolled', window.scrollY > 80);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Scroll reveal
(function () {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  reveals.forEach(el => observer.observe(el));
})();

// Footer staggered reveal
(function () {
  const els = document.querySelectorAll('.footer-reveal');
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => observer.observe(el));
})();

// PDP — mobile carousel dot sync
(function () {
  const track = document.getElementById('pdpTrack');
  if (!track) return;
  const dots = document.querySelectorAll('.pdp__carousel-dot');
  if (!dots.length) return;

  const setActive = (index) => {
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === index);
      dot.setAttribute('aria-selected', i === index);
    });
  };

  // Update dots on scroll
  track.addEventListener('scroll', () => {
    const index = Math.round(track.scrollLeft / track.offsetWidth);
    setActive(index);
  }, { passive: true });

  // Click dot to scroll
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.dataset.slide, 10);
      track.scrollTo({ left: index * track.offsetWidth, behavior: 'smooth' });
      setActive(index);
    });
  });
})();

// PDP — desktop thumbnail viewer
(function () {
  const hero = document.querySelector('.pdp__gallery-hero');
  if (!hero) return;
  const heroImg = hero.querySelector('img');
  if (!heroImg) return;
  const thumbs = document.querySelectorAll('.pdp__gallery-thumb');

  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const thumbImg = thumb.querySelector('img');
      if (!thumbImg) return;
      // Swap src/srcset between hero and thumb
      const heroSrc = heroImg.src;
      const heroSrcset = heroImg.srcset;
      heroImg.src = thumbImg.src;
      heroImg.srcset = thumbImg.srcset;
      thumbImg.src = heroSrc;
      thumbImg.srcset = heroSrcset;
    });
  });
})();

// PDP — size option selector + variant update
(function () {
  const form = document.getElementById('pdp-form');
  if (!form) return;
  const variantInput = document.getElementById('pdpVariantId');
  const priceEl = document.getElementById('pdpPrice');
  const sizeBtns = form.querySelectorAll('.pdp__size-btn');
  const sizeDrawer = document.getElementById('pdpSizeDrawer');
  const sizeLabel = sizeDrawer ? sizeDrawer.querySelector('.pdp__size-selected') : null;

  // Shopify exposes window.productVariants via a script tag in the section,
  // or we fall back to a basic option→variant map if available.
  const variants = window.__pdpVariants || [];

  const findVariant = (selectedOptions) => {
    return variants.find((v) =>
      v.options.every((opt, i) => opt === selectedOptions[i])
    );
  };

  const selectedOptions = {};

  sizeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const optionIndex = btn.dataset.optionIndex;
      const value = btn.dataset.value;

      // Update active state within this option's group
      form.querySelectorAll(`.pdp__size-btn[data-option-index="${optionIndex}"]`)
        .forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      selectedOptions[optionIndex] = value;

      // Update label
      if (sizeLabel) sizeLabel.textContent = `— ${value}`;

      // Close drawer
      if (sizeDrawer) sizeDrawer.removeAttribute('open');

      // Match variant
      if (variants.length) {
        const optionValues = Object.keys(selectedOptions).sort().map(k => selectedOptions[k]);
        const matched = findVariant(optionValues);
        if (matched && variantInput) {
          variantInput.value = matched.id;
          if (priceEl) {
            priceEl.textContent = matched.price === 0
              ? 'Price on Application'
              : new Intl.NumberFormat('en-US', { style: 'currency', currency: matched.currency || 'USD' }).format(matched.price / 100);
          }
        }
      }
    });
  });
})();
