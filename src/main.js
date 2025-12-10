import './style.css'

const minecraftPlans = [
  {
    name: 'Cascalho',
    icon: '⛏️',
    price: 'R$ 36/mês',
    features: ['4 GB RAM', '40 GB SSD', 'Até 8 jogadores', 'Hospedado no Brasil']
  },
  {
    name: 'Madeira',
    icon: '🪵',
    price: 'R$ 54/mês',
    features: ['6 GB RAM', '60 GB SSD', 'Até 20 jogadores', 'Hospedado no Brasil']
  },
  {
    name: 'Carvão',
    icon: '⚫',
    price: 'R$ 72/mês',
    features: ['8 GB RAM', '80 GB SSD', 'Até 60 jogadores', 'Hospedado no Brasil']
  },
  {
    name: 'Ferro',
    icon: '⚙️',
    price: 'R$ 99/mês',
    features: ['12 GB RAM', '120 GB SSD', 'Sem limite de jogadores', 'Hospedado no Brasil']
  },
  {
    name: 'Ouro',
    icon: '🥇',
    price: 'R$ 129/mês',
    features: ['16 GB RAM', '160 GB SSD', 'Sem limite de jogadores', 'Hospedado no Brasil']
  },
  {
    name: 'Diamante',
    icon: '💎',
    price: 'R$ 179/mês',
    features: ['24 GB RAM', '240 GB SSD', 'Sem limite de jogadores', 'Hospedado no Brasil']
  }
];

const botPlans = [
  {
    name: '512 MB RAM',
    icon: '🤖',
    price: 'R$ 2,49/mês',
    features: ['CPU 1vCore', 'SSD NVMe Ilimitado', 'Proteção Anti-DDoS', 'Painel Pterodactyl']
  },
  {
    name: '1 GB RAM',
    icon: '🤖',
    price: 'R$ 4,99/mês',
    features: ['CPU 1vCore', 'SSD NVMe Ilimitado', 'Proteção Anti-DDoS', 'Painel Pterodactyl']
  },
  {
    name: '2 GB RAM',
    icon: '🤖',
    price: 'R$ 9,99/mês',
    features: ['CPU 1vCore', 'SSD NVMe Ilimitado', 'Proteção Anti-DDoS', 'Painel Pterodactyl']
  }
];

function createPlanCard(plan, type) {
  return `
    <div class="plan-card">
      <div class="plan-icon">${plan.icon}</div>
      <h3 class="plan-name">${plan.name}</h3>
      <div class="plan-price">${plan.price}</div>
      <ul class="plan-features">
        ${plan.features.map(feature => `<li>${feature}</li>`).join('')}
      </ul>
      <button class="btn btn-primary" onclick="openPurchaseModal('${plan.name}', '${plan.price}', '${type}')">
        Criar Servidor
      </button>
    </div>
  `;
}

function renderPlans() {
  const minecraftContainer = document.getElementById('minecraft-plans');
  const botContainer = document.getElementById('bot-plans');

  minecraftContainer.innerHTML = minecraftPlans.map(plan => createPlanCard(plan, 'Minecraft')).join('');
  botContainer.innerHTML = botPlans.map(plan => createPlanCard(plan, 'Bot')).join('');
}

window.openPurchaseModal = function(planName, planPrice, planType) {
  const modal = document.getElementById('purchase-modal');
  const planDetails = document.getElementById('plan-details');
  
  planDetails.innerHTML = `
    <h3>${planName}</h3>
    <p><strong>Tipo:</strong> ${planType}</p>
    <p><strong>Preço:</strong> ${planPrice}</p>
  `;
  
  modal.style.display = 'block';
}

const modal = document.getElementById('purchase-modal');
const closeBtn = document.querySelector('.close');

closeBtn.onclick = function() {
  modal.style.display = 'none';
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

renderPlans();
