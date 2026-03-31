/* ================================================================
   Authentic Tech — JavaScript principal
   Fichier : js/main.js
   ================================================================
   CONTENU :
   01. Header scroll (effet au scroll)
   02. Menu mobile hamburger
   03. Scroll reveal (animations d'entrée)
   04. Compteur animé sur les statistiques
   05. Validation formulaire en temps réel
   06. Bouton retour en haut de page
   07. Cartes services cliquables (touch mobile)
   08. Bouton WhatsApp flottant
   09. Formulaire contact Formspree
   10. Navigation active au scroll

   ⚙ À CONFIGURER :
   ─────────────────────────────────────────────────────────
   🔴 VOTRE_NUMERO  → Cherchez cette chaîne et remplacez par
                      votre numéro WhatsApp au format international
                      sans + ni espaces.
                      Ex: Togo = 22890123456

   🔴 YOUR_FORM_ID  → Dans index.html, attribut action= du form.
                      Créez votre formulaire sur formspree.io
                      puis remplacez par votre ID (ex: xabcdefg)
   ================================================================ */

/* ── HEADER SCROLL ────────────────────────────── */
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  /* ── MOBILE NAV ───────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });
  function closeMobileNav() {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
  }

  /* ── SCROLL REVEAL ────────────────────────────── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ════════════════════════════════════════════════
     1. COMPTEUR ANIMÉ DES STATS
     Démarre quand la section hero-stats entre dans le viewport.
     Easing ease-out pour un effet naturel et percutant.
  ════════════════════════════════════════════════ */
  function animateCounter(el) {
    const target  = parseInt(el.dataset.count, 10);
    const suffix  = el.dataset.suffix || '';
    const duration = 1800; // ms
    const startTime = performance.now();

    function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

    function step(now) {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value    = Math.round(easeOut(progress) * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.stat-num[data-count]').forEach(animateCounter);
        statsObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) statsObserver.observe(heroStats);

  /* ════════════════════════════════════════════════
     2. VALIDATION FORMULAIRE EN TEMPS RÉEL
     Chaque champ valide/invalide dès que l'utilisateur
     quitte le champ (blur) ou tape (input pour l'email).
  ════════════════════════════════════════════════ */
  function setHint(hintEl, inputEl, isValid, msgOk, msgErr) {
    if (!hintEl) return;
    inputEl.classList.toggle('valid',   isValid);
    inputEl.classList.toggle('invalid', !isValid);
    hintEl.textContent  = isValid ? msgOk : msgErr;
    hintEl.className    = 'form-hint ' + (isValid ? 'ok' : 'err');
  }

  function clearHint(hintEl, inputEl) {
    if (!hintEl) return;
    inputEl.classList.remove('valid', 'invalid');
    hintEl.textContent = '';
    hintEl.className   = 'form-hint';
  }

  /* Prénom */
  const fPrenom = document.getElementById('prenom');
  const hPrenom = document.getElementById('hint-prenom');
  if (fPrenom) {
    fPrenom.addEventListener('blur', () => {
      if (!fPrenom.value.trim()) { clearHint(hPrenom, fPrenom); return; }
      setHint(hPrenom, fPrenom, fPrenom.value.trim().length >= 2,
        '✓ Parfait', '✗ Prénom trop court');
    });
    fPrenom.addEventListener('input', () => {
      if (fPrenom.classList.contains('invalid'))
        setHint(hPrenom, fPrenom, fPrenom.value.trim().length >= 2, '✓ Parfait', '✗ Prénom trop court');
    });
  }

  /* Nom */
  const fNom = document.getElementById('nom');
  const hNom = document.getElementById('hint-nom');
  if (fNom) {
    fNom.addEventListener('blur', () => {
      if (!fNom.value.trim()) { clearHint(hNom, fNom); return; }
      setHint(hNom, fNom, fNom.value.trim().length >= 2, '✓ Parfait', '✗ Nom trop court');
    });
    fNom.addEventListener('input', () => {
      if (fNom.classList.contains('invalid'))
        setHint(hNom, fNom, fNom.value.trim().length >= 2, '✓ Parfait', '✗ Nom trop court');
    });
  }

  /* Email */
  const fEmail = document.getElementById('email');
  const hEmail = document.getElementById('hint-email');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (fEmail) {
    function validateEmail() {
      if (!fEmail.value.trim()) { clearHint(hEmail, fEmail); return; }
      setHint(hEmail, fEmail, emailRegex.test(fEmail.value),
        '✓ Adresse valide', '✗ Format invalide (ex: vous@domaine.com)');
    }
    fEmail.addEventListener('blur',  validateEmail);
    fEmail.addEventListener('input', validateEmail);
  }

  /* Service */
  const fService = document.getElementById('service');
  const hService = document.getElementById('hint-service');
  if (fService) {
    fService.addEventListener('change', () => {
      setHint(hService, fService, fService.value !== '',
        '✓ Service sélectionné', '✗ Veuillez choisir un service');
    });
  }

  /* Message */
  const fMessage = document.getElementById('message');
  const hMessage = document.getElementById('hint-message');
  if (fMessage) {
    fMessage.addEventListener('blur', () => {
      if (!fMessage.value.trim()) { clearHint(hMessage, fMessage); return; }
      const len   = fMessage.value.trim().length;
      const valid = len >= 20;
      setHint(hMessage, fMessage, valid,
        `✓ Bien (${len} caractères)`,
        `✗ Décrivez un peu plus votre projet (${20 - len} caractères manquants)`);
    });
    fMessage.addEventListener('input', () => {
      if (fMessage.classList.contains('invalid')) {
        const len   = fMessage.value.trim().length;
        const valid = len >= 20;
        setHint(hMessage, fMessage, valid,
          `✓ Bien (${len} caractères)`,
          `✗ Encore ${Math.max(0, 20 - len)} caractères`);
      }
    });
  }

  /* ════════════════════════════════════════════════
     3. BOUTON RETOUR EN HAUT
  ════════════════════════════════════════════════ */
  const backBtn = document.getElementById('back-to-top');
  if (backBtn) {
    // Vérifier le scroll au chargement aussi (cas où la page est déjà scrollée)
    function updateBackBtn() {
      if (window.scrollY > 400) {
        backBtn.classList.add('visible');
      } else {
        backBtn.classList.remove('visible');
      }
    }
    window.addEventListener('scroll', updateBackBtn, { passive: true });
    updateBackBtn(); // vérification initiale

    backBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Fallback tactile mobile
    backBtn.addEventListener('touchend', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ════════════════════════════════════════════════
     4. CARTES SERVICES CLIQUABLES SUR MOBILE (touch)
     Un tap ouvre la carte, un second tap = "En savoir plus".
  ════════════════════════════════════════════════ */
  if (window.matchMedia('(hover: none)').matches) {
    document.querySelectorAll('.service-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const isOpen = card.classList.contains('touch-open');
        // Ferme toutes les autres cartes
        document.querySelectorAll('.service-card.touch-open').forEach(c => {
          if (c !== card) c.classList.remove('touch-open');
        });
        if (!isOpen) {
          card.classList.add('touch-open');
          e.preventDefault(); // empêche le lien au premier tap
        }
        // Si déjà ouvert et tap sur le lien → laisser naviguer
      });
    });
  }

  /* ── WHATSAPP BUTTON ──────────────────────────── */
  const waBtn     = document.getElementById('wa-btn');
  const waTooltip = document.getElementById('wa-tooltip');
  let tooltipTimer;

  setTimeout(() => {
    waTooltip.classList.add('visible');
    tooltipTimer = setTimeout(() => waTooltip.classList.remove('visible'), 5000);
  }, 3000);

  waBtn.addEventListener('mouseenter', () => {
    clearTimeout(tooltipTimer);
    waTooltip.classList.add('visible');
  });
  waBtn.addEventListener('mouseleave', () => {
    tooltipTimer = setTimeout(() => waTooltip.classList.remove('visible'), 1500);
  });

  function openWhatsApp() {
    const numero = '2250788946827';
    const heure = new Date().getHours();
    const salutation = (heure >= 6 && heure < 18) ? 'Bonjour' : 'Bonsoir';
    const message = encodeURIComponent(
      `${salutation}, Authentic Tech ! Je souhaite en savoir plus sur vos services et discuter d'un projet. Pouvez-vous me contacter ?`
    );
    window.open(`https://wa.me/${numero}?text=${message}`, '_blank');
  }

  /* ── CONTACT FORM (FORMSPREE) ─────────────────── */
  const contactForm = document.getElementById('contact-form');
  const formContent = document.getElementById('form-content');
  const formSuccess = document.getElementById('form-success');
  const submitBtn   = document.getElementById('submit-btn');
  const submitText  = document.getElementById('submit-text');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitText.textContent = 'Envoi en cours…';
    submitBtn.disabled = true;
    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        formContent.style.display = 'none';
        formSuccess.style.display = 'block';
      } else { throw new Error(); }
    } catch {
      submitText.textContent = 'Erreur — réessayez';
      submitBtn.disabled = false;
      setTimeout(() => { submitText.textContent = 'Envoyer ma demande'; }, 3000);
    }
  });

  /* ── NAV ACTIVE STATE ─────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('nav a:not(.btn-nav)');
  const observerNav = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === '#' + entry.target.id
            ? 'var(--gold)' : '';
        });
      }
    });
  }, { rootMargin: '-40% 0px -60% 0px' });
  sections.forEach(s => observerNav.observe(s));
