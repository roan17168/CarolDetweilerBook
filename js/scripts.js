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
function initializePlayer() {
    const playerEl = document.getElementById('player');
    if (!playerEl || player) return;
    player = new YT.Player('player', {
        height: '480',
        width: '854',
        videoId: 'UgVMq9b5Pu4',
        playerVars: { 'rel': 0, 'modestbranding': 1 }
    });
}

function onYouTubeIframeAPIReady() {
    initializePlayer();
}

// If the IFrame API finished loading before this script ran, the callback above
// never fires. Initialise directly when the API is already available.
if (window.YT && typeof window.YT.Player === 'function') {
    initializePlayer();
}

window.addEventListener('load', () => {
    if (!player && window.YT && typeof window.YT.Player === 'function') {
        initializePlayer();
    }
});

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
// The site is static, so nothing is posted to a server. Instead the form builds a
// pre-filled email and hands it to the visitor's own mail app to send.
const CONTACT_EMAIL = 'CrowsRedRibbon@gmail.com';
const MESSAGE_LIMIT = 1500; // mailto URLs get truncated by some mail clients

function buildMailtoUrl(name, email, reason, message) {
    const subject = reason
        ? 'Website message from ' + name + ' (' + reason + ')'
        : 'Website message from ' + name;
    const body = [
        'Name: ' + name,
        'Email: ' + email,
        'Reaching out as: ' + reason,
        '',
        message,
        '',
        '--',
        'Sent from the contact form at caroldetweilerbook'
    ].join('\n');
    return 'mailto:' + CONTACT_EMAIL +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
}

function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const reason = form.elements.reason.value;
    let message = form.elements.message.value.trim();

    const status = document.getElementById('form-status');
    let truncated = false;
    if (message.length > MESSAGE_LIMIT) {
        message = message.slice(0, MESSAGE_LIMIT) + '...';
        truncated = true;
    }

    const url = buildMailtoUrl(name, email, reason, message);

    if (status) {
        status.textContent = truncated
            ? 'Opening your email app. Your message was long, so it was trimmed - send the rest as a reply.'
            : 'Opening your email app with your message ready to send. If nothing happens, email ' + CONTACT_EMAIL + ' directly.';
    }

    window.location.href = url;
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