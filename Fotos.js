// Gallery data
const galleryData = [
    { image: "/Imagenes/IMG_1478.JPG" },
    { image: "/Imagenes/IMG_1475.JPG" },
    { image: "/Imagenes/IMG_1483.JPG" },
    { image: "/Imagenes/IMG_1489.JPG" },
    { image: "/Imagenes/IMG_1559.jpg" },
    { image: "/Imagenes/IMG_1562.JPG" },
    { image: "/Imagenes/IMG_1585.JPG" },
    { image: "/Imagenes/IMG_1565.JPG" },
    { image: "/Imagenes/IMG_1568.JPG" },
    { image: "/Imagenes/IMG_1569.jpg" },
    { image: "/Imagenes/IMG_1583.JPG" },
    { image: "/Imagenes/IMG_1573.JPG" },
    { image: "/Imagenes/IMG_1578.JPG" },
    { image: "/Imagenes/IMG_1582.JPG" }
];

let currentImageIndex = 0;

// DOM Elements
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.querySelector('.close-modal');
const galleryGrid = document.querySelector('.gallery-grid');

// Populates gallery images
function populateGallery() {
    galleryData.forEach((data, index) => {
        const item = document.createElement('div');
        item.classList.add('gallery-item');
        item.innerHTML = `<img src="${data.image}" alt="Galería de Serena Calma">`;
        item.addEventListener('click', () => openModal(index));
        galleryGrid.appendChild(item);
    });
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'white';
        header.style.backdropFilter = 'none';
    }
});

// Open modal function
function openModal(index) {
    currentImageIndex = index;
    modalImage.src = galleryData[index].image;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal function
function closeModalFunction() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Change image in modal
function changeImage(direction) {
    currentImageIndex += direction;
    if (currentImageIndex >= galleryData.length) currentImageIndex = 0;
    if (currentImageIndex < 0) currentImageIndex = galleryData.length - 1;
    modalImage.src = galleryData[currentImageIndex].image;
}

// Event listeners
closeModal.addEventListener('click', closeModalFunction);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModalFunction(); });
document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'block') {
        if (e.key === 'Escape') closeModalFunction();
        if (e.key === 'ArrowLeft') changeImage(-1);
        if (e.key === 'ArrowRight') changeImage(1);
    }
});

/* ====== Hamburguesa: mostrar/ocultar ====== */
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        const opened = navMenu.classList.toggle('active');
        mobileMenuToggle.setAttribute('aria-expanded', opened ? 'true' : 'false');
    });

    // Cerrar automáticamente al hacer click en un enlace (solo móvil)
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Al pasar a escritorio, asegurar que el panel quede cerrado
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// Animation on scroll
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    populateGallery();
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
        observer.observe(item);
    });
});
