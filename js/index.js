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
const video = document.querySelector('.video');
const togglePassword = document.querySelector('.toggle-password');
const passwordInput = document.querySelector('#password');
const nameInput = document.querySelector('#name');

// Alterna entre modo login y registro
function toggleMode() {
    isLoginMode = !isLoginMode;

    container.style.flexDirection = isLoginMode ? 'row' : 'row-reverse';
    containerForm.style.borderRadius = isLoginMode
        ? 'var(--border-radius) 0 0 var(--border-radius)'
        : '0 var(--border-radius) var(--border-radius) 0';
    containerVideo.style.borderRadius = isLoginMode
        ? '0 var(--border-radius) var(--border-radius) 0'
        : 'var(--border-radius) 0 0 var(--border-radius)';
    video.src = isLoginMode ? '../static/videos/1.mp4' : '../static/videos/2.mp4';

    updateButtons();
    updateFormContent();
}

function updateButtons() {
    loginBtn.classList.toggle('active', !isLoginMode);
    loginBtn.classList.toggle('disabled', isLoginMode);
    loginBtn.disabled = isLoginMode;

    signupBtn.classList.toggle('active', isLoginMode);
    signupBtn.classList.toggle('disabled', !isLoginMode);
    signupBtn.disabled = !isLoginMode;
}

function updateFormContent() {
    formTitle.textContent = isLoginMode ? 'Bienvenido de Vuelta' : 'Crea tu Cuenta';
    submitBtn.textContent = isLoginMode ? 'Iniciar Sesión' : 'Registrarse';
}

function loginOrRegister(event) {
    event.preventDefault();

    const credentials = {
        name: nameInput.value,
        password: passwordInput.value
    };

    if (isLoginMode) {
        const stored = localStorage.getItem('credentials');
        if (stored) {
            const storedCredentials = JSON.parse(stored);
            const isValid = credentials.name === storedCredentials.name && credentials.password === storedCredentials.password;

            if (isValid) {
                sessionStorage.setItem('isLoggedIn', 'true');
                Swal.fire({
                    title: '¡Bienvenido!',
                    text: 'Inicio de sesión exitoso.',
                    icon: 'success',
                    customClass: {
                        popup: 'custom-swal',
                        title: 'custom-title',
                        htmlContainer: 'custom-text',
                        confirmButton: 'custom-success'
                    },
                    confirmButtonText: 'Continuar'
                }).then(() => {
                    nameInput.value = '';
                    passwordInput.value = '';
                    window.location.href = 'pages/catalog.html';
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Nombre de usuario o contraseña incorrectos.',
                    icon: 'error',
                    showCancelButton: true,
                    cancelButtonText: 'Intentar de nuevo',
                    showConfirmButton: false,
                    customClass: {
                        popup: 'custom-swal',
                        title: 'custom-title',
                        htmlContainer: 'custom-text',
                        cancelButton: 'custom-error'
                    }
                }).then(() => {
                    nameInput.value = '';
                    passwordInput.value = '';
                });
            }
        } else {
            Swal.fire({
                title: 'Sin registro',
                text: 'No hay usuarios registrados.',
                icon: 'warning',
                confirmButtonText: 'Registrar usuario',
                customClass: {
                    popup: 'custom-swal',
                    title: 'custom-title',
                    htmlContainer: 'custom-text',
                    confirmButton: 'custom-warning-confirm'
                }
            }).then(() => {
                nameInput.value = '';
                passwordInput.value = '';
                toggleMode();
            });
        }
    } else {
        localStorage.setItem('credentials', JSON.stringify(credentials));
        Swal.fire({
            title: 'Registro Exitoso',
            text: `Tu cuenta ha sido creada correctamente.\nNombre de usuario: ${credentials.name} \nContraseña: ${credentials.password}`,
            icon: 'success',
            customClass: {
                popup: 'custom-swal',
                title: 'custom-title',
                htmlContainer: 'custom-text',
                confirmButton: 'custom-success'
            },
            confirmButtonText: 'Aceptar'
        }).then(() => {
            window.location.href = 'index.html';
        });
    }
}

// Event listeners
loginBtn.addEventListener('click', () => { if (!isLoginMode) toggleMode(); });
signupBtn.addEventListener('click', () => { if (isLoginMode) toggleMode(); });
submitBtn.addEventListener('click', loginOrRegister);

togglePassword.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    this.querySelector('svg').innerHTML = type === 'password' 
        ? '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>'
        : '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>';
});

document.addEventListener('DOMContentLoaded', () => {
    updateButtons();
    updateFormContent();
});