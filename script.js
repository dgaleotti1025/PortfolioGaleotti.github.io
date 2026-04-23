// Inizializza le icone Lucide
lucide.createIcons();

// --- GESTIONE NAVBAR ALLO SCROLL ---
const header = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) header.classList.add('scrolled');
    else if (!header.classList.contains('scrolled-static')) header.classList.remove('scrolled');
});

// --- ANIMAZIONE BARRE COMPETENZE ---
const skillObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.progress').forEach(bar => {
                bar.style.width = bar.getAttribute('data-width');
            });
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });
const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);

// --- REVEAL ON SCROLL ---
document.querySelectorAll('section, .hobby-card, .pcto-card, .glass-card, .section-title')
    .forEach(el => {
        if (!el.classList.contains('reveal')) el.classList.add('reveal');
    });

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// --- EVIDENZIA LINK ATTIVO NELLA NAVBAR ---
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop;
        const h = section.clientHeight;
        if (scrollY >= (top - h / 3)) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href') || '';
        if (current && href.includes('#' + current)) link.classList.add('active');
    });
});

// --- IMAGE SLIDER (con frecce e dot opzionali) ---
document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.slider-container');

    sliders.forEach(slider => {
        const slides = slider.querySelectorAll('.slide');
        if (slides.length === 0) return;

        let current = 0;
        let timer = null;
        const intervalTime = parseInt(slider.getAttribute('data-interval')) || 3000;

        const dotsContainer = slider.querySelector('.slider-dots');
        const dots = [];
        if (dotsContainer) {
            slides.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.className = 'slider-dot';
                dot.setAttribute('aria-label', 'Vai alla slide ' + (i + 1));
                dot.addEventListener('click', () => goTo(i, true));
                dotsContainer.appendChild(dot);
                dots.push(dot);
            });
        }

        function show(idx) {
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            slides[idx].classList.add('active');
            if (dots[idx]) dots[idx].classList.add('active');
            current = idx;
        }

        function next() { show((current + 1) % slides.length); }

        function goTo(idx, restart) {
            show(idx);
            if (restart) { clearInterval(timer); timer = setInterval(next, intervalTime); }
        }

        const prevBtn = slider.querySelector('.slider-prev');
        const nextBtn = slider.querySelector('.slider-next');
        if (prevBtn) prevBtn.addEventListener('click', () => goTo((current - 1 + slides.length) % slides.length, true));
        if (nextBtn) nextBtn.addEventListener('click', () => goTo((current + 1) % slides.length, true));

        slider.addEventListener('mouseenter', () => clearInterval(timer));
        slider.addEventListener('mouseleave', () => { timer = setInterval(next, intervalTime); });

        show(0);
        timer = setInterval(next, intervalTime);
    });

    if (window.lucide) lucide.createIcons();
});
