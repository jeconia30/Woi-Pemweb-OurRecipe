const loginForm = document.querySelector('#login-form');
const registerForm = document.querySelector('#register-form');
const showRegisterLink = document.querySelector('#show-register');
const showLoginLink = document.querySelector('#show-login');

if (loginForm && registerForm && showRegisterLink && showLoginLink) {
  showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault(); 
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
  });
  showLoginLink.addEventListener('click', (e) => {
    e.preventDefault(); 
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
  });
}

function setupPasswordToggle(toggleId, inputId) {
    const toggleIcon = document.querySelector(toggleId);
    const inputField = document.querySelector(inputId);

    if (toggleIcon && inputField) {
        toggleIcon.addEventListener('click', () => {
            const type = inputField.getAttribute('type') === 'password' ? 'text' : 'password';
            inputField.setAttribute('type', type);
            
            if (type === 'password') {
                toggleIcon.classList.remove('fa-eye');
                toggleIcon.classList.add('fa-eye-slash');
            } else {
                toggleIcon.classList.remove('fa-eye-slash');
                toggleIcon.classList.add('fa-eye');
            }
        });
    }
}

setupPasswordToggle('#toggle-password', '#login-password');
setupPasswordToggle('#toggle-reg-password', '#reg-password');
setupPasswordToggle("#toggle-reg-confirm", "#reg-password-confirm");
setupPasswordToggle("#toggle-new-pass", "#new-password");
setupPasswordToggle("#toggle-confirm-pass", "#confirm-password");