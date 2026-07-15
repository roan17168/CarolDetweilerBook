/* ============================================
   Carol Detweiler Website - Main JavaScript
   ============================================ */

// MOBILE NAVIGATION
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    if (burger) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });
    }
};

// MOBILE DROPDOWN TOGGLE
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 968) {
            e.preventDefault();
            const dropdown = toggle.parentElement;
            const isOpen = dropdown.classList.contains('active');

            document.querySelectorAll('.dropdown.active').forEach(openDropdown => {
                if (openDropdown !== dropdown) {
                    openDropdown.classList.remove('active');
                }
            });

            dropdown.classList.toggle('active', !isOpen);
        }
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 968) {
        document.querySelectorAll('.dropdown.active').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

// YOUTUBE IFRAME API — Interview Page
let player;
function onYouTubeIframeAPIReady() {
    const playerEl = document.getElementById('player');
    if (playerEl) {
        player = new YT.Player('player', {
            height: '480',
            width: '854',
            videoId: 'UgVMq9b5Pu4',
            playerVars: { 'rel': 0, 'modestbranding': 1 }
        });
    }
}

function seekTo(seconds) {
    if (player && typeof player.seekTo === 'function') {
        player.seekTo(seconds, true);
        player.playVideo();
        document.querySelector('.video-container').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// ACCORDION — Book Club Page
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const body = header.nextElementSibling;
        header.classList.toggle('active');
        body.classList.toggle('active');
    });
});

// LIGHTBOX — Gallery Page
function openLightbox(src, caption) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const cap = document.getElementById('lightbox-caption');
    if (lightbox && img) {
        img.src = src;
        img.alt = caption;
        cap.textContent = caption;
        lightbox.classList.add('active');
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) lightbox.classList.remove('active');
}

// CONTACT FORM
function handleFormSubmit(event) {
    event.preventDefault();
    alert('Thank you for reaching out! Carol will get back to you soon.\n\n(To make this form live, connect it to a service like Formspree, Netlify Forms, or your own backend.)');
    event.target.reset();
}

// KEYBOARD ACCESSIBILITY — Jump Points
document.querySelectorAll('.timestamp-list li').forEach(item => {
    item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            item.click();
        }
    });
});

// INITIALIZE
navSlide();