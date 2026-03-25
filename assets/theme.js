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

// PDP — Ring size right-rail drawer
(function () {
  const rail         = document.getElementById('pdpSizeRail');
  const trigger      = document.getElementById('pdpSizeTrigger');
  const overlay      = document.getElementById('pdpSizeOverlay');
  const closeBtn     = document.getElementById('pdpSizeClose');
  const addBtn       = document.getElementById('pdpSizeAdd');
  const form         = document.getElementById('pdp-form');
  const variantInput = document.getElementById('pdpVariantId');
  const selectedLabel = document.getElementById('pdpSizeSelected');
  if (!rail || !trigger) return;

  let activeTab = 'eu';

  // EU → US size mapping
  const EU_TO_US = {'50':'5¼','51':'5¾','52':'6','53':'6¼','54':'6¾','55':'7','56':'7½','57':'8','58':'8½','59':'9','60':'9½','61':'10','62':'10½','63':'11'};

  // Stamp data-us onto each item on init
  rail.querySelectorAll('.size-rail__item').forEach(item => {
    item.dataset.us = EU_TO_US[item.dataset.eu] || item.dataset.eu;
  });

  function openRail() {
    rail.classList.add('is-open');
    rail.setAttribute('aria-hidden', 'false');
    trigger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeRail() {
    rail.classList.remove('is-open');
    rail.setAttribute('aria-hidden', 'true');
    trigger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  trigger.addEventListener('click', openRail);
  if (overlay) overlay.addEventListener('click', closeRail);
  if (closeBtn) closeBtn.addEventListener('click', closeRail);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeRail(); });

  // Tab switching — updates active tab and relabels all rows
  rail.querySelectorAll('.size-rail__tab').forEach(tab => {
    tab.addEventListener('click', function () {
      activeTab = this.dataset.tab;
      rail.querySelectorAll('.size-rail__tab').forEach(t => {
        t.classList.toggle('is-active', t === this);
        t.setAttribute('aria-selected', t === this ? 'true' : 'false');
      });
      // Relabel each row to show the active system's value
      rail.querySelectorAll('.size-rail__item').forEach(item => {
        const label = item.querySelector('.size-rail__item-label');
        if (label) label.textContent = item.dataset[activeTab] || item.dataset.eu;
      });
    });
  });

  // Size selection
  rail.querySelectorAll('.size-rail__item').forEach(item => {
    item.addEventListener('click', function () {
      const euSize = this.dataset.eu;
      const optionIndex = parseInt(this.dataset.optionIndex) || 0;

      // Mark selected state
      rail.querySelectorAll('.size-rail__item').forEach(i => {
        const match = i.dataset.eu === euSize;
        i.classList.toggle('is-selected', match);
        const badge = i.querySelector('.size-rail__item-badge');
        if (match && !badge) {
          const b = document.createElement('span');
          b.className = 'size-rail__item-badge';
          b.textContent = 'Selected';
          i.appendChild(b);
        } else if (!match && badge) {
          badge.remove();
        }
      });

      // Update trigger label — show in active tab's system
      const displaySize = activeTab === 'us' ? (this.dataset.us || euSize) : euSize;
      if (selectedLabel) selectedLabel.textContent = '— ' + displaySize;

      // Sync variant
      const variants = window.__pdpVariants || [];
      if (variants.length && variantInput) {
        const matched = variants.find(v => v.options && v.options[optionIndex] === euSize);
        if (matched) variantInput.value = matched.id;
      }
    });
  });

  // Add to cart from rail
  if (addBtn && form) {
    addBtn.addEventListener('click', function () {
      closeRail();
      form.requestSubmit ? form.requestSubmit() : form.submit();
    });
  }
})();

// PDP — Read more / collapse description
(function () {
  const btn = document.querySelector('[data-expand-desc]');
  if (!btn) return;
  const desc = btn.closest('.pdp__desc');
  const textEl = desc && desc.querySelector('.pdp__desc-text');
  if (!desc || !textEl) return;
  // Hide button if content isn't actually clamped
  if (textEl.scrollHeight <= textEl.clientHeight) { btn.style.display = 'none'; return; }
  btn.addEventListener('click', function () {
    const expanded = desc.classList.toggle('pdp__desc--expanded');
    btn.textContent = expanded ? 'Read less' : 'Read more';
    btn.setAttribute('aria-expanded', expanded);
  });
})();
