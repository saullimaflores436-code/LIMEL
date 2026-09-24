/* ============================================================
   LIMELL — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Copyright year ───────────────────────────────────── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Navbar scroll ────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Active nav link on scroll ────────────────────────── */
  const sections   = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => sectionObserver.observe(s));

  /* ── Mobile drawer ────────────────────────────────────── */
  const toggle      = document.getElementById('nav-toggle');
  const drawer      = document.getElementById('nav-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const drawerLinks = drawer ? drawer.querySelectorAll('a') : [];

  const openDrawer  = () => {
    toggle.classList.add('open');
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const closeDrawer = () => {
    toggle.classList.remove('open');
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (toggle) toggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

  /* Close drawer on Escape */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeDrawer();
      closeTermsModal();
    }
  });

  /* ── Scroll-in fade animations ────────────────────────── */
  const fadeEls = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

  fadeEls.forEach(el => fadeObserver.observe(el));

  /* ── Smooth scroll for all anchor links ───────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    /* Excluir el enlace de T&C que abre un modal */
    if (anchor.id === 'footer-terms-link') return;
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── Modal Términos y Condiciones ─────────────────────── */
  const termsLink  = document.getElementById('footer-terms-link');
  const termsModal = document.getElementById('modal-terms');
  const termsClose = document.getElementById('modal-terms-close');

  const openTermsModal = () => {
    termsModal.removeAttribute('hidden');
    termsModal.classList.add('modal-enter');
    document.body.style.overflow = 'hidden';
    termsClose.focus();
  };

  const closeTermsModal = () => {
    if (!termsModal || termsModal.hasAttribute('hidden')) return;
    termsModal.setAttribute('hidden', '');
    termsModal.classList.remove('modal-enter');
    document.body.style.overflow = '';
    if (termsLink) termsLink.focus();
  };

  if (termsLink)  termsLink.addEventListener('click',  e => { e.preventDefault(); openTermsModal(); });
  if (termsClose) termsClose.addEventListener('click', closeTermsModal);

  /* Cerrar al hacer clic fuera del modal-box */
  if (termsModal) {
    termsModal.addEventListener('click', e => {
      if (e.target === termsModal) closeTermsModal();
    });
  }

  /* ── Tabs Empresa ─────────────────────────────────────── */
  const empresaTabs = document.querySelectorAll('.empresa-tab');
  const empresaPanels = document.querySelectorAll('.empresa-panel');

  if (empresaTabs.length > 0) {
    empresaTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remover active de todos los tabs y paneles
        empresaTabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        empresaPanels.forEach(p => {
          p.classList.remove('active');
          p.setAttribute('hidden', '');
        });

        // Añadir active al seleccionado
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        
        const targetId = tab.getAttribute('aria-controls');
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.add('active');
          targetPanel.removeAttribute('hidden');
        }
      });
    });
  }

});
