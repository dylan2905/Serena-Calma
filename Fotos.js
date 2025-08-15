// Gallery data
const galleryData = [
    { image: "/Imagenes/IMG_1478.JPG" },
    // ... otras imágenes
];

let currentImageIndex = 0;
let modal, modalImage, closeModal, galleryGrid;

// Open modal function
function openModal(index) {
    currentImageIndex = index;
    const data = galleryData[index];
    modalImage.src = data.image;
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
    if (currentImageIndex >= galleryData.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = galleryData.length - 1;
    }
    const data = galleryData[currentImageIndex];
    modalImage.src = data.image;
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    modal = document.getElementById('imageModal');
    modalImage = document.getElementById('modalImage');
    closeModal = document.querySelector('.close-modal');
    galleryGrid = document.querySelector('.gallery-grid');
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Populate gallery images
    function populateGallery() {
        galleryData.forEach((data, index) => {
            const item = document.createElement('div');
            item.classList.add('gallery-item');
            item.innerHTML = `<img src="${data.image}" alt="Galería de Serena Calma">`;
            item.addEventListener('click', () => openModal(index));
            galleryGrid.appendChild(item);
        });
    }
    populateGallery();

    // Event listeners
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

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

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
});
