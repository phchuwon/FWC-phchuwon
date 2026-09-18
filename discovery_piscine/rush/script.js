document.addEventListener('DOMContentLoaded', function () {

  /* ---------- colorblind mode (settings gear, landing page) ---------- */
  const settingsBtn = document.getElementById('settingsBtn');
  const settingsPanel = document.getElementById('settingsPanel');
  const htmlEl = document.documentElement;

  function applyMode(mode) {
    htmlEl.classList.remove('cb-protanopia', 'cb-deuteranopia', 'cb-tritanopia');
    if (mode !== 'normal') {
      htmlEl.classList.add('cb-' + mode);
    }
    document.querySelectorAll('.mode-option').forEach(function (btn) {
      const isSelected = btn.dataset.mode === mode;
      btn.classList.toggle('selected', isSelected);
      btn.setAttribute('aria-checked', isSelected ? 'true' : 'false');
    });
    if (settingsBtn) settingsBtn.classList.toggle('active', mode !== 'normal');
    try { localStorage.setItem('colorblind-mode', mode); } catch (e) {}
  }

  if (settingsBtn && settingsPanel) {
    settingsBtn.addEventListener('click', function () {
      const isOpen = settingsPanel.classList.toggle('open');
      settingsBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      settingsBtn.classList.add('spin');
      setTimeout(function () { settingsBtn.classList.remove('spin'); }, 500);
    });

    document.addEventListener('click', function (e) {
      if (!settingsPanel.contains(e.target) && !settingsBtn.contains(e.target)) {
        settingsPanel.classList.remove('open');
        settingsBtn.setAttribute('aria-expanded', 'false');
      }
    });

    document.querySelectorAll('.mode-option').forEach(function (btn) {
      btn.addEventListener('click', function () { applyMode(btn.dataset.mode); });
    });
  }

  /* colorblind mode always applied on load, on every page, from saved value */
  try {
    const saved = localStorage.getItem('colorblind-mode');
    if (saved) applyMode(saved);
  } catch (e) {}

  /* ---------- scrollspy: highlight active nav link on resume pages ---------- */
  const navLinks = document.querySelectorAll('.site-nav .nav-link[href^="#"]');
  const sections = Array.from(navLinks)
    .map(function (link) { return document.querySelector(link.getAttribute('href')); })
    .filter(Boolean);

  if (sections.length) {
    window.addEventListener('scroll', function () {
      let currentId = sections[0].id;
      sections.forEach(function (section) {
        if (window.scrollY >= section.offsetTop - 100) {
          currentId = section.id;
        }
      });
      navLinks.forEach(function (link) {
        link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
      });
    });
  }

});
