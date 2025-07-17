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

  if (signinEmailInput) {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) signinEmailInput.value = savedEmail;
  }

  if (showPasswordCheckbox && signinPasswordInput) {
    showPasswordCheckbox.addEventListener('change', () => {
      signinPasswordInput.type = showPasswordCheckbox.checked ? 'text' : 'password';
    });
  }

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

  createLink?.addEventListener('click', (e) => {
    e.preventDefault();
    buttonGroup?.classList.add('hidden');
    signinForm?.classList.add('hidden');
    createForm?.classList.remove('hidden');
    createMessage?.classList.add('hidden');
  });

  returnBtn?.addEventListener('click', () => {
    createForm?.classList.add('hidden');
    signinForm?.classList.remove('hidden');
    buttonGroup?.classList.add('hidden');
    createMessage?.classList.remove('hidden');
  });

  signinForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputEmail = signinEmailInput?.value.trim() || '';
    const inputPassword = signinPasswordInput?.value || '';

    const savedEmail = localStorage.getItem('userEmail') || '';
    const savedPassword = localStorage.getItem('userPassword') || '';

    if (inputEmail === savedEmail && inputPassword === savedPassword) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('username', inputEmail.split('@')[0]);
      alert('Signed in successfully!');
      window.location.href = 'index.html';
    } else {
      alert('Invalid email or password.');
    }
  });

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
    localStorage.setItem('username', email.split('@')[0]);

    alert('Account successfully registered! Logging you in...');
    window.location.href = 'index.html';
  });

  const protectedPages = ['store.html'];
  const isProtectedPage = protectedPages.some(page => window.location.pathname.includes(page));
  if (isProtectedPage && localStorage.getItem('loggedIn') !== 'true') {
    alert('Access denied. Please sign in.');
    window.location.href = 'signin.html';
  }

  // ✅ Fix here: use ID instead of class for "signin-buttons"
document.addEventListener('DOMContentLoaded', () => {
  const signinButtons = document.getElementById('signin-buttons');
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  const username = localStorage.getItem('username');

  if (signinButtons) {
    if (isLoggedIn && username) {
      // Show welcome message and log out button
      signinButtons.innerHTML = `
        <span class="welcome-msg">Welcome, <strong>${username}</strong></span>
        <button id="logoutBtn">Log Out</button>
      `;

      document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('username');
        window.location.reload();
      });
    } else {
      // Show sign-in button
      signinButtons.innerHTML = `<button id="signinBtn">Sign In</button>`;

      document.getElementById('signinBtn').addEventListener('click', () => {
        const user = prompt("Enter your username:");
        if (user && user.trim() !== "") {
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem('username', user.trim());
          window.location.reload();
        }
      });
    }
  }
});

});
