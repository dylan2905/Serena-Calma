document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'white';
            header.style.backdropFilter = 'none';
        }
    });

    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }

    // Google Maps function - Opens in a new tab
    const openGoogleMapsBtn = document.querySelector('.map-btn');
    if (openGoogleMapsBtn) {
        openGoogleMapsBtn.addEventListener('click', function() {
            const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Calle+108+%23+37-60,+Barranquilla,+Atlántico,+Colombia';
            window.open(mapsUrl, '_blank');
        });
    }
});
