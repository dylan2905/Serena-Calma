document.addEventListener('DOMContentLoaded', () => {
  // Efecto de scroll en header
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.style.background = 'rgba(255, 255, 255, 0.95)';
      header.style.backdropFilter = 'blur(10px)';
    } else {
      header.style.background = 'white';
      header.style.backdropFilter = 'none';
    }
  });

  // ===== Menú hamburguesa =====
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu   = document.getElementById('nav-menu');

  if (menuToggle && navMenu) {
    // Abrir/Cerrar
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Cerrar al tocar un enlace (en móvil)
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navMenu.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Cerrar al hacer click fuera
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });

    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ===== Animaciones y WhatsApp en tarjetas =====
  const comboCards = document.querySelectorAll('.combo-card');

  comboCards.forEach(card => {
    card.addEventListener('click', function () {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => { this.style.transform = 'translateY(-10px)'; }, 150);

      const priceElement = this.querySelector('.combo-price');
      if (priceElement) {
        const price = priceElement.textContent;
        const message = `Hola! Me interesa el combo especial de ${price}. ¿Podrían darme más información?`;
        const whatsappUrl = `https://wa.me/573017838667?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
      }
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  comboCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
    observer.observe(card);
  });
});
