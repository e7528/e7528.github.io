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

  // Pre-fill saved email if any
  if (signinEmailInput) {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      signinEmailInput.value = savedEmail;
    }
  }

  // Show/Hide password
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

  // Sign In
  signinForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputEmail = signinEmailInput?.value.trim() || '';
    const inputPassword = signinPasswordInput?.value || '';

    const savedEmail = localStorage.getItem('userEmail') || '';
    const savedPassword = localStorage.getItem('userPassword') || '';

    if (inputEmail === savedEmail && inputPassword === savedPassword) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('username', inputEmail.split('@')[0]); // store username from email
      alert('Signed in successfully!');
      window.location.href = 'index.html';
    } else {
      alert('Invalid email or password.');
    }
  });

  // Create Account
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

  // Route guard (only restrict store.html, NOT homepage)
  const protectedPages = ['store.html', 'dashboard.html']; // add more if needed
  const isProtectedPage = protectedPages.some(page => window.location.pathname.includes(page));

  if (isProtectedPage && localStorage.getItem('loggedIn') !== 'true') {
    alert('Access denied. Please sign in.');
    window.location.href = 'signin.html';
  }

  // Show user info or Sign In on homepage
  const signinButtons = document.querySelector('.signin-buttons');
  if (signinButtons) {
    signinButtons.innerHTML = '';

    if (localStorage.getItem('loggedIn') === 'true') {
      const username = localStorage.getItem('username') || 'User';

      const welcome = document.createElement('span');
      welcome.textContent = `Welcome, ${username}`;
      welcome.style.color = '#fff';
      welcome.style.marginRight = '10px';

      const logoutBtn = document.createElement('button');
      logoutBtn.id = 'logout-btn';
      logoutBtn.className = 'button';
      logoutBtn.textContent = 'Log Out';

      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('username');
        alert('You have been logged out.');
        window.location.reload();
      });

      signinButtons.appendChild(welcome);
      signinButtons.appendChild(logoutBtn);
    } else {
      const signInLink = document.createElement('a');
      signInLink.href = 'signin.html';
      signInLink.className = 'button';
      signInLink.textContent = 'Sign In';
      signinButtons.appendChild(signInLink);
    }
  }
});
