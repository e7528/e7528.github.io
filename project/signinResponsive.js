//Jomer Junio
document.addEventListener('DOMContentLoaded', () => {
  const buttonGroup = document.getElementById('button-group');
  const signinForm = document.getElementById('signin-form');
  const createForm = document.getElementById('create-form');
  const createLink = document.getElementById('create-link');
  const returnBtn = document.getElementById('return-btn');
  const createMessage = document.getElementById('create-message');

  const signinEmailInput = document.getElementById('signin-email');
  const signinPasswordInput = document.getElementById('signin-password');
  const showPasswordCheckbox = document.getElementById('show-password');

  // ✅ Pre-fill saved email if any
  if (signinEmailInput) {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      signinEmailInput.value = savedEmail;
    }
  }

  // ✅ Show/Hide password
  if (showPasswordCheckbox && signinPasswordInput) {
    showPasswordCheckbox.addEventListener('change', () => {
      signinPasswordInput.type = showPasswordCheckbox.checked ? 'text' : 'password';
    });
  }

  // Show Sign In form
  if (buttonGroup) {
    buttonGroup.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('click', () => {
        buttonGroup.classList.add('hidden');
        signinForm?.classList.remove('hidden');
        createForm?.classList.add('hidden');
        createMessage?.classList.remove('hidden');
      });
    });
  }

  // Show Create Account form
  createLink?.addEventListener('click', (e) => {
    e.preventDefault();
    buttonGroup?.classList.add('hidden');
    signinForm?.classList.add('hidden');
    createForm?.classList.remove('hidden');
    createMessage?.classList.add('hidden');
  });

  // Return to Sign In
  returnBtn?.addEventListener('click', () => {
    createForm?.classList.add('hidden');
    signinForm?.classList.remove('hidden');
    buttonGroup?.classList.add('hidden');
    createMessage?.classList.remove('hidden');
  });

  // ✅ Sign In
  signinForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputEmail = signinEmailInput?.value.trim() || '';
    const inputPassword = signinPasswordInput?.value || '';

    const savedEmail = localStorage.getItem('userEmail') || '';
    const savedPassword = localStorage.getItem('userPassword') || '';

    if (inputEmail === savedEmail && inputPassword === savedPassword) {
      localStorage.setItem('loggedIn', 'true');
      alert('Signed in successfully!');
      window.location.href = 'dashboard.html'; //CHANGE IT TO THE HOMEPAGE
    } else {
      alert('Invalid email or password.');
    }
  });

  // ✅ Create Account
  createForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!passwordRegex.test(password)) {
      alert('Password must include uppercase, lowercase, number, and special character.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);
    localStorage.setItem('loggedIn', 'true');

    alert('Account successfully registered! Logging you in...');
    window.location.href = 'dashboard.html'; //CHANGE IT TO THE HOMEPAGE
  });

  // ✅ Auto-login
  if (localStorage.getItem('loggedIn') === 'true' && !window.location.pathname.includes('dashboard.html')) {
    window.location.href = 'dashboard.html'; //CHANGE IT TO THE HOMEPAGE
  }

  // ✅ Guard dashboard if not logged in
  if (window.location.pathname.includes('dashboard.html')) { //CHANGE IT TO THE HOMEPAGE
    if (localStorage.getItem('loggedIn') !== 'true') {
      alert('Access denied. Please sign in.');
      window.location.href = 'signin.html';
    }
  }

  // ✅ Logout only clears session
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('loggedIn'); 
      alert('You have been logged out.');
      window.location.href = 'signin.html';
    });
  }
});
