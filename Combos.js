
// DOM Elements
const comboContainer = document.querySelector('.combos-grid');

// Populates combo cards
function populateCombos() {
    combosData.forEach(combo => {
        const comboCard = document.createElement('div');
        comboCard.classList.add('combo-card');
        comboCard.innerHTML = `
            <div class="combo-image">
                <img src="${combo.image}" alt="${combo.name}">
            </div>
            <div class="combo-content">
                <h3 class="combo-name">${combo.name}</h3>
                <p class="combo-description">${combo.description}</p>
                <ul class="combo-details">
                    ${combo.details.map(detail => `<li>${detail}</li>`).join('')}
                </ul>
                <div class="combo-price">${combo.price}</div>
                <button class="combo-btn">Reservar</button>
            </div>
        `;
        comboContainer.appendChild(comboCard);
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

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animation on scroll
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

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    populateCombos();
    
    // Add event listener to each combo button
    document.querySelectorAll('.combo-btn').forEach(button => {
        button.addEventListener('click', () => {
            alert('Has hecho clic en Reservar. ¡Gracias!');
        });
    });

    console.log('Página de combos cargada.');

    const comboCards = document.querySelectorAll('.combo-card');
    comboCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

