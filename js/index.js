// Estado de la aplicación
let isLoginMode = true;

// Referencias a elementos del DOM
const container = document.querySelector('.container');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const containerForm = document.querySelector('.container-form');
const containerVideo = document.querySelector('.container-video');

// Función principal para alternar entre modos
function toggleMode() {
    isLoginMode = !isLoginMode;

    // Cambiar dirección del contenedor
    if (isLoginMode) {
        container.style.flexDirection = 'row';
        containerForm.style.borderRadius = 'var(--border-radius) 0 0 var(--border-radius)';
        containerVideo.style.borderRadius = '0 var(--border-radius) var(--border-radius) 0';
    } else {
        container.style.flexDirection = 'row-reverse';
        containerForm.style.borderRadius = '0 var(--border-radius) var(--border-radius) 0';
        containerVideo.style.borderRadius = 'var(--border-radius) 0 0 var(--border-radius)';
    }

    

    // Actualizar botones
    updateButtons();

    // Actualizar contenido del formulario
    updateFormContent();
}

// Función para actualizar el estado de los botones
function updateButtons() {
    if (!isLoginMode) {
        loginBtn.classList.remove('disabled');
        loginBtn.classList.add('active');
        loginBtn.disabled = false;

        signupBtn.classList.remove('active');
        signupBtn.classList.add('disabled');
        signupBtn.disabled = true;
    } else {
        loginBtn.classList.remove('active');
        loginBtn.classList.add('disabled');
        loginBtn.disabled = true;

        signupBtn.classList.remove('disabled');
        signupBtn.classList.add('active');
        signupBtn.disabled = false;
    }
}

// Función para actualizar el contenido del formulario
function updateFormContent() {
    if (isLoginMode) {
        formTitle.textContent = 'Bienvenido de Vuelta';
        submitBtn.textContent = 'Iniciar Sesión';
    } else {
        formTitle.textContent = 'Crea tu Cuenta';
        submitBtn.textContent = 'Registrarse';
    }
}

// Event listeners
loginBtn.addEventListener('click', () => {
    if (!isLoginMode) {
        toggleMode();
    }
});

signupBtn.addEventListener('click', () => {
    if (isLoginMode) {
        toggleMode();
    }
});

// Inicializar el estado
document.addEventListener('DOMContentLoaded', () => {
    updateButtons();
    updateFormContent();
});