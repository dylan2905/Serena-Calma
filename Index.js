// Menú hamburguesa responsive
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
}

// Smooth scrolling para enlaces de anclaje (dentro de la misma página)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        // Obtenemos el valor del atributo href
        const targetId = this.getAttribute('href');

        // Verificamos si es un enlace de anclaje interno (ej. #servicios, #inicio)
        if (targetId.startsWith('#')) {
            e.preventDefault(); // Evitamos la navegación por defecto
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }

        // Si el menú hamburguesa está abierto, lo cerramos
        if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
});

// WhatsApp button functionality
document.getElementById('whatsappBtn')?.addEventListener('click', function() {
    const phoneNumber = '+573017838667';
    const message = encodeURIComponent('Hola, me interesa conocer más sobre los servicios de Serena Calma.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = '#fff';
        header.style.backdropFilter = 'none';
    }
});

// Search button functionality (placeholder)
document.querySelector('.search-btn')?.addEventListener('click', function() {
    alert('Función de búsqueda - Por implementar');
});

// Add click functionality to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function() {
        const serviceName = this.querySelector('h3').textContent;
        const phoneNumber = '+573017838667';
        const message = encodeURIComponent(`Hola, me interesa el servicio de ${serviceName}. ¿Podrían darme más información?`);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        
        window.open(whatsappUrl, '_blank');
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards for animation
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});