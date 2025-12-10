const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000' 
  : `${window.location.protocol}//${window.location.hostname}:3000`;

const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    
    btn.classList.add('active');
    document.getElementById(tab).classList.add('active');
    
    hideMessage();
  });
});

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(loginForm);
  const data = {
    username: formData.get('username'),
    password: formData.get('password')
  };

  try {
    const response = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
      showMessage('Login realizado com sucesso! Redirecionando...', 'success');
      setTimeout(() => {
        window.location.href = '/painel.html';
      }, 1500);
    } else {
      showMessage(result.error || 'Erro ao fazer login', 'error');
    }
  } catch (error) {
    showMessage('Erro ao conectar com o servidor', 'error');
  }
});

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(registerForm);
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password')
  };

  try {
    const response = await fetch(`${API_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
      showMessage('Conta criada com sucesso! Redirecionando...', 'success');
      setTimeout(() => {
        window.location.href = '/painel.html';
      }, 1500);
    } else {
      showMessage(result.error || 'Erro ao criar conta', 'error');
    }
  } catch (error) {
    showMessage('Erro ao conectar com o servidor', 'error');
  }
});

function showMessage(message, type) {
  const messageEl = document.getElementById('auth-message');
  messageEl.textContent = message;
  messageEl.className = `auth-message show ${type}`;
}

function hideMessage() {
  const messageEl = document.getElementById('auth-message');
  messageEl.className = 'auth-message';
}
