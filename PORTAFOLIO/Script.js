/*
 * Archivo: script.js
 * Descripción: Contiene la lógica JavaScript para la alternancia de tema (oscuro/claro)
 * y la persistencia de la preferencia del usuario.
 */

// IIFE (Immediately Invoked Function Expression) para aplicar el tema antes de que la página se renderice
// Esto ayuda a evitar un "parpadeo" de color si la preferencia del usuario es diferente al tema por defecto.
(function () {
    // 1. Verificar la preferencia guardada en localStorage
    const savedTheme = localStorage.getItem('theme');

    // 2. Si no hay preferencia guardada, detectar la preferencia del sistema
    if (!savedTheme) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        // Establecer el tema de la página según la preferencia del sistema
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
        // Si hay una preferencia guardada, aplicarla directamente
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
})();

// Espera a que el DOM esté completamente cargado antes de añadir listeners de eventos
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement; // Referencia al elemento <html>

    // Función para actualizar el icono del botón según el tema actual
    const updateThemeToggleIcon = () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>'; // Sol para cambiar a claro
            themeToggleBtn.setAttribute('aria-label', 'Cambiar a modo claro');
        } else {
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>'; // Luna para cambiar a oscuro
            themeToggleBtn.setAttribute('aria-label', 'Cambiar a modo oscuro');
        }
    };

    // Inicializar el icono del botón al cargar la página
    updateThemeToggleIcon();

    // Event Listener para el botón de alternar tema
    themeToggleBtn.addEventListener('click', () => {
        let currentTheme = htmlElement.getAttribute('data-theme');
        let newTheme = (currentTheme === 'dark' || currentTheme === null) ? 'light' : 'dark'; // Si es oscuro o nulo (por defecto), cambia a claro; si no, cambia a oscuro.

        // Aplicar el nuevo tema
        htmlElement.setAttribute('data-theme', newTheme);
        // Guardar la preferencia en localStorage
        localStorage.setItem('theme', newTheme);
        // Actualizar el icono
        updateThemeToggleIcon();
    });

    // Listener para detectar cambios en la preferencia de tema del sistema
    // Solo actualiza si el usuario no ha seleccionado manualmente un tema (es decir, si localStorage no tiene 'theme')
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) { // Si el usuario no ha forzado un tema manualmente
            const newTheme = e.matches ? 'dark' : 'light';
            htmlElement.setAttribute('data-theme', newTheme);
            updateThemeToggleIcon(); // Actualiza el icono si el tema cambia automáticamente
        }
    });

    // Animación de latido para la imagen de perfil (ya implementada en CSS, JS solo la gestionaría si fuera dinámica)
    // Actualmente, la animación 'pulse' está en CSS y se aplica automáticamente.
    // Si quisieras controlarla con JS (e.g., pausar/reanudar), lo harías aquí.
});
