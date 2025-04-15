document.addEventListener('DOMContentLoaded', function () {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu');
  const navLinks = document.querySelector('.nav-links');
  const authButtons = document.querySelector('.auth-buttons');

  mobileMenuBtn.addEventListener('click', function () {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    authButtons.style.display = authButtons.style.display === 'flex' ? 'none' : 'flex';

    if (navLinks.style.display === 'flex') {
      navLinks.classList.add('animate');
      authButtons.classList.add('animate');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  // Adjust menu for window resize
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
      navLinks.style.display = 'flex';
      authButtons.style.display = 'flex';
      document.body.style.overflow = '';
    } else {
      navLinks.style.display = 'none';
      authButtons.style.display = 'none';
    }
  });

  // Modal functionality
  const loginBtn = document.querySelector('.auth-buttons .btn-outline');
  const registerBtn = document.querySelector('.auth-buttons .btn-primary');
  const loginModal = document.getElementById('loginModal');
  const registerModal = document.getElementById('registerModal');
  const closeModalButtons = document.querySelectorAll('.close-modal');

  loginBtn.addEventListener('click', function () {
    loginModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });

  registerBtn.addEventListener('click', function () {
    registerModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });

  closeModalButtons.forEach(button => {
    button.addEventListener('click', function () {
      loginModal.style.display = 'none';
      registerModal.style.display = 'none';
      document.body.style.overflow = '';
    });
  });

  window.addEventListener('click', function (event) {
    if (event.target === loginModal) {
      loginModal.style.display = 'none';
      document.body.style.overflow = '';
    }
    if (event.target === registerModal) {
      registerModal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });

  // Login Form
  document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    showNotification('Login successful! Redirecting...');
    setTimeout(() => {
      loginModal.style.display = 'none';
      document.body.style.overflow = '';
    }, 1500);
  });

  // Register Form
  document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();
    showNotification('Registration successful! Welcome to BankEase.');
    setTimeout(() => {
      registerModal.style.display = 'none';
      document.body.style.overflow = '';
    }, 1500);
  });

  // Transfer Form
  document.getElementById('transferForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const amount = document.getElementById('amount').value;
    const fromAccount = document.getElementById('fromAccount').value;
    const toAccount = document.getElementById('toAccount').value;

    if (fromAccount === toAccount) {
      showNotification('Cannot transfer to the same account!', 'error');
      return;
    }

    if (parseFloat(amount) <= 0) {
      showNotification('Amount must be greater than zero!', 'error');
      return;
    }

    showNotification(`Transferring $${amount}...`);

    setTimeout(() => {
      showNotification('Transfer completed successfully!');
      document.getElementById('transferForm').reset();

      const balanceElement = document.querySelector('.balance');
      const currentBalance = parseFloat(balanceElement.textContent.replace('$', '').replace(',', ''));
      const newBalance = currentBalance - parseFloat(amount);
      balanceElement.textContent = '$' + newBalance.toLocaleString('en-US', { minimumFractionDigits: 2 });

      const transactionTable = document.querySelector('.transaction-table tbody');
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${document.getElementById('description').value || 'Transfer'}</td>
        <td>${new Date().toLocaleDateString()}</td>
        <td class="transaction-amount debit">-$${parseFloat(amount).toFixed(2)}</td>
        <td><span class="status completed">Completed</span></td>
      `;
      transactionTable.insertBefore(newRow, transactionTable.firstChild);
    }, 2000);
  });

  // Contact Form
  document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    showNotification('Message sent successfully! We will contact you soon.');
    document.getElementById('contactForm').reset();
  });

  // Show Notification
  function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.backgroundColor = type === 'error' ? 'var(--danger)' : 'var(--primary)';
    notification.style.display = 'block';

    setTimeout(() => {
      notification.style.display = 'none';
    }, 3000);
  }

  // Dark Mode Toggle
  const darkModeToggle = document.querySelector('.dark-mode-toggle');
  darkModeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    const icon = darkModeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
      localStorage.setItem('darkMode', 'enabled');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
      localStorage.setItem('darkMode', 'disabled');
    }
  });

  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeToggle.querySelector('i').classList.remove('fa-moon');
    darkModeToggle.querySelector('i').classList.add('fa-sun');
  }

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });

        if (window.innerWidth <= 768) {
          navLinks.style.display = 'none';
          authButtons.style.display = 'none';
          document.body.style.overflow = '';
        }
      }
    });
  });

  // Animate Elements
  const animateOnScroll = function () {
    const elements = document.querySelectorAll('.animate');

    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };

  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll();

  // Simulate delay animation
  setTimeout(() => {
    document.querySelectorAll('.delay-1').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }, 200);

  setTimeout(() => {
    document.querySelectorAll('.delay-2').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }, 400);

  setTimeout(() => {
    document.querySelectorAll('.delay-3').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }, 600);

  // Simulated Balance Update
  function updateAccountBalance() {
    const balanceElements = document.querySelectorAll('.balance');
    balanceElements.forEach(element => {
      const currentBalance = parseFloat(element.textContent.replace('$', '').replace(',', ''));
      const randomChange = (Math.random() * 200 - 100);
      const newBalance = Math.max(0, currentBalance + randomChange);
      element.textContent = '$' + newBalance.toLocaleString('en-US', { minimumFractionDigits: 2 });
    });
  }

  setInterval(updateAccountBalance, 30000);
});
