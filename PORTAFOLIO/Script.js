// script.js

// IIFE (Immediately Invoked Function Expression) para aplicar el tema antes de que la página se renderice
(function() {
    // 1. Obtener la preferencia del tema del usuario desde localStorage
    const userTheme = localStorage.getItem('theme');

    // 2. Detectar la preferencia del sistema
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // 3. Determinar el tema inicial
    let initialTheme;
    if (userTheme) {
        // Si el usuario ha seleccionado un tema manualmente, usarlo
        initialTheme = userTheme;
    } else {
        // Si no hay preferencia manual, usar la preferencia del sistema
        initialTheme = systemPrefersDark ? 'dark' : 'light';
    }

    // 4. Aplicar el tema al elemento <html>
    document.documentElement.setAttribute('data-theme', initialTheme);

    // 5. Actualizar el ícono del botón de alternancia
    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) {
        themeToggleBtn.innerHTML = initialTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
})();


document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    // Función para cambiar el tema
    const toggleTheme = () => {
        let currentTheme = htmlElement.getAttribute('data-theme');
        let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme); // Guardar la preferencia en localStorage

        // Actualizar el ícono del botón
        if (newTheme === 'dark') {
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>'; // Sol para modo oscuro
        } else {
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>'; // Luna para modo claro
        }
    };

    // Listener para el botón de alternancia manual
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }

    // Listener para detectar cambios en la preferencia del sistema en tiempo real
    // Solo actualiza si el usuario NO ha seleccionado manualmente un tema.
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        const userTheme = localStorage.getItem('theme');
        if (!userTheme) { // Si el usuario no ha forzado un tema manualmente
            const newTheme = e.matches ? 'dark' : 'light';
            htmlElement.setAttribute('data-theme', newTheme);
            // Actualizar el ícono del botón
            if (themeToggleBtn) {
                themeToggleBtn.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            }
        }
    });

    // Animaciones al hacer scroll (Intersection Observer)
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% del elemento visible para activar la animación
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Dejar de observar una vez que se ha animado
            }
        });
    }, observerOptions);

    animateOnScrollElements.forEach(el => {
        observer.observe(el);
    });

    // Iniciar tooltips de Bootstrap (asegurarse de que estén disponibles)
    // Esto es redundante si ya se incluyó en index.html, pero es una buena práctica para JS
    // if (typeof bootstrap !== 'undefined') {
    //     var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    //     var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    //         return new bootstrap.Tooltip(tooltipTriggerEl)
    //     })
    // }
});