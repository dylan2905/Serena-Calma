// Data for the gallery images
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
let modal, modalImage, closeModal, galleryGrid;

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // 2. Populate gallery images dynamically
    galleryGrid = document.querySelector('.gallery-grid');
    if (galleryGrid) {
        galleryData.forEach((data, index) => {
            const item = document.createElement('div');
            item.classList.add('gallery-item');
            item.innerHTML = `<img src="${data.image}" alt="Galería de Serena Calma">`;
            item.addEventListener('click', () => openModal(index));
            galleryGrid.appendChild(item);
        });
    } else {
        console.error('Error: El contenedor de la galería no se encontró.');
    }

    // 3. Modal elements and listeners
    modal = document.getElementById('imageModal');
    modalImage = document.getElementById('modalImage');
    closeModal = document.querySelector('.close-modal');

    if (modal && modalImage && closeModal) {
        closeModal.addEventListener('click', closeModalFunction);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModalFunction();
            }
        });
        document.addEventListener('keydown', (e) => {
            if (modal.style.display === 'block') {
                if (e.key === 'Escape') closeModalFunction();
                else if (e.key === 'ArrowLeft') changeImage(-1);
                else if (e.key === 'ArrowRight') changeImage(1);
            }
        });
    }

    // 4. Animation on scroll
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // 5. Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

// 6. Modal functions
function openModal(index) {
    if (modal && modalImage) {
        currentImageIndex = index;
        const data = galleryData[index];
        modalImage.src = data.image;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}
function closeModalFunction() {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}
function changeImage(direction) {
    currentImageIndex += direction;
    if (currentImageIndex >= galleryData.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = galleryData.length - 1;
    }
    const data = galleryData[currentImageIndex];
    if (modalImage) {
        modalImage.src = data.image;
    }
}

// 7. Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) { // Check if header exists
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'white';
            header.style.backdropFilter = 'none';
        }
    }
});
