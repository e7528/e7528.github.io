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

  const homeBtn = document.getElementById('home-btn');
  if (homeBtn) {
    homeBtn.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }

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

  // Show login state (if you have a top-right display)
  const signinButtons = document.getElementById('signin-buttons');
  if (signinButtons) {
    signinButtons.innerHTML = '';

    if (localStorage.getItem('loggedIn') === 'true') {
      const username = localStorage.getItem('username') || 'User';

      const welcome = document.createElement('span');
      welcome.textContent = `Welcome, ${username}`;
      welcome.className = 'welcome-text';
      welcome.style.marginRight = '10px';

      const logoutBtn = document.createElement('button');
      logoutBtn.id = 'logout-btn';
      logoutBtn.className = 'button';
      logoutBtn.textContent = 'Log Out';

      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('username');
        alert('You have been logged out.');
        window.location.href = 'signin.html';
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

// Optional: Add to Cart function
function addToCart(item) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existingIndex = cart.findIndex(i => i.title === item.title);
  if (existingIndex !== -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push(item);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  window.location.href = 'cart.html';
}
