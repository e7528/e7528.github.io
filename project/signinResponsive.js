//Jomer Junio
document.addEventListener('DOMContentLoaded', () => {
  const buttonGroup = document.getElementById('button-group');
  const signinForm = document.getElementById('signin-form');
  const createForm = document.getElementById('create-form');
  const createLink = document.getElementById('create-link');
  const returnBtn = document.getElementById('return-btn');
  const createMessage = document.getElementById('create-message');

  // Show Sign In form after clicking third-party button
  buttonGroup.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
      buttonGroup.classList.add('hidden');
      signinForm.classList.remove('hidden');
      createForm.classList.add('hidden');
      createMessage.classList.remove('hidden');
    });
  });

  // Show Create Account form and hide "make one today" message
  createLink.addEventListener('click', (e) => {
    e.preventDefault();
    buttonGroup.classList.add('hidden');
    signinForm.classList.add('hidden');
    createForm.classList.remove('hidden');
    createMessage.classList.add('hidden'); // ✅ Hide it here
  });

  // Return to Sign In and show message again
  returnBtn.addEventListener('click', () => {
    createForm.classList.add('hidden');
    signinForm.classList.remove('hidden');
    buttonGroup.classList.add('hidden');
    createMessage.classList.remove('hidden'); // ✅ Show it again
  });

  // Handle Sign In submit
  signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Signed in successfully!");
  });

  // Handle Create Account submit
  createForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!passwordRegex.test(password)) {
      alert("Password must include uppercase, lowercase, number, and special character.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    alert("Account successfully registered!");
    createForm.reset();
  });
});
