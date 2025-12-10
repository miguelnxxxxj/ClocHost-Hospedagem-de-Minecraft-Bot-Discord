const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000' 
  : `${window.location.protocol}//${window.location.hostname}:3000`;

async function checkAuth() {
  try {
    const response = await fetch(`${API_URL}/api/user`, {
      credentials: 'include'
    });

    if (!response.ok) {
      window.location.href = '/auth.html';
      return null;
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error('Erro ao verificar autenticação:', error);
    window.location.href = '/auth.html';
    return null;
  }
}

async function loadUserData() {
  const user = await checkAuth();
  
  if (user) {
    document.getElementById('user-name').textContent = user.username;
    
    if (user.servers && user.servers.length > 0) {
      document.getElementById('active-servers').textContent = user.servers.length;
    }
  }
}

async function loadServers() {
  try {
    const response = await fetch(`${API_URL}/api/servers`, {
      credentials: 'include'
    });

    if (response.ok) {
      const data = await response.json();
      displayServers(data.servers);
    }
  } catch (error) {
    console.error('Erro ao carregar servidores:', error);
  }
}

function displayServers(servers) {
  const serversList = document.getElementById('servers-list');
  
  if (servers && servers.length > 0) {
    serversList.innerHTML = servers.map(server => `
      <div class="server-card">
        <div class="server-header">
          <h3>${server.name}</h3>
          <span class="server-status online">Online</span>
        </div>
        <p><strong>Plano:</strong> ${server.plan}</p>
        <p><strong>RAM:</strong> ${server.ram}</p>
        <p><strong>SSD:</strong> ${server.ssd}</p>
      </div>
    `).join('');
  }
}

const logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  
  try {
    await fetch(`${API_URL}/api/logout`, {
      method: 'POST',
      credentials: 'include'
    });
    
    window.location.href = '/';
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
  }
});

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

loadUserData();
loadServers();
