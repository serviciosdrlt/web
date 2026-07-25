/* ============================================  
   script.js - Servicios DR  
   Funcionalidades: menú responsive, animaciones,  
   contadores, formulario, smooth scroll, etc.  
   ============================================ */  

'use strict';  

// ============================================  
// 1. MENÚ HAMBURGUESA - RESPONSIVE  
// ============================================  
const navMenu = document.getElementById('nav-menu');  
const navToggle = document.getElementById('nav-toggle');  
const navClose = document.getElementById('nav-close');  
const navLinks = document.querySelectorAll('.nav__link');  

// Abrir menú  
if (navToggle) {  
    navToggle.addEventListener('click', () => {  
        navMenu.classList.add('show-menu');  
    });  
}  

// Cerrar menú  
if (navClose) {  
    navClose.addEventListener('click', () => {  
        navMenu.classList.remove('show-menu');  
    });  
}  

// Cerrar menú al hacer clic en un enlace  
navLinks.forEach(link => {  
    link.addEventListener('click', () => {  
        navMenu.classList.remove('show-menu');  
    });  
});  

// ============================================  
// 2. CAMBIAR FONDO DEL HEADER AL HACER SCROLL  
// ============================================  
const header = document.getElementById('header');  

function scrollHeader() {  
    if (window.scrollY >= 80) {  
        header.classList.add('scroll-header');  
    } else {  
        header.classList.remove('scroll-header');  
    }  
}  

window.addEventListener('scroll', scrollHeader);  

// ============================================  
// 3. ENLACE ACTIVO EN LA NAVEGACIÓN  
// ============================================  
const sections = document.querySelectorAll('section[id]');  

function scrollActive() {  
    const scrollY = window.pageYOffset;  

    sections.forEach(section => {  
        const sectionHeight = section.offsetHeight;  
        const sectionTop = section.offsetTop - 100;  
        const sectionId = section.getAttribute('id');  

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {  
            const activeLink = document.querySelector(`.nav__link[href*=${sectionId}]`);  
            if (activeLink) {  
                activeLink.classList.add('active-link');  
            }  
        } else {  
            const activeLink = document.querySelector(`.nav__link[href*=${sectionId}]`);  
            if (activeLink) {  
                activeLink.classList.remove('active-link');  
            }  
        }  
    });  
}  

window.addEventListener('scroll', scrollActive);  

// ============================================  
// 4. MOSTRAR/OCULTAR BOTÓN SCROLL TO TOP  
// ============================================  
const scrollUp = document.getElementById('scroll-up');  

function scrollUpActive() {  
    if (window.scrollY >= 500) {  
        scrollUp.classList.add('show-scroll');  
    } else {  
        scrollUp.classList.remove('show-scroll');  
    }  
}  

window.addEventListener('scroll', scrollUpActive);  

// ============================================  
// 5. ANIMACIONES FADE-IN AL HACER SCROLL  
// ============================================  
const fadeElements = document.querySelectorAll('.fade-in');  

const observerOptions = {  
    root: null,  
    rootMargin: '0px',  
    threshold: 0.15  
};  

const observer = new IntersectionObserver((entries) => {  
    entries.forEach(entry => {  
        if (entry.isIntersecting) {  
            entry.target.classList.add('visible');  
            observer.unobserve(entry.target);  
        }  
    });  
}, observerOptions);  

fadeElements.forEach(element => {  
    observer.observe(element);  
});  

// ============================================  
// 6. ANIMACIÓN DE CONTADORES (estadísticas)  
// ============================================  
const stats = document.querySelectorAll('.hero__stat-number');  

function animateCounter(element) {  
    const target = parseInt(element.getAttribute('data-count'));  
    const duration = 2000; // 2 segundos  
    const step = Math.ceil(target / (duration / 16));  
    let current = 0;  

    const timer = setInterval(() => {  
        current += step;  
        if (current >= target) {  
            element.textContent = target + (target === 98 ? '%' : '+');  
            clearInterval(timer);  
        } else {  
            element.textContent = current;  
        }  
    }, 16);  
}  

// Detectar cuando los contadores son visibles  
const statsObserver = new IntersectionObserver((entries) => {  
    entries.forEach(entry => {  
        if (entry.isIntersecting) {  
            const counters = entry.target.querySelector