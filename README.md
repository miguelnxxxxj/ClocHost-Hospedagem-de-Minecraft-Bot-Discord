Clochost - Site de Hospedagem
Visão Geral

Site profissional e moderno para a Clochost, empresa de hospedagem de servidores Minecraft e Bots. Design escuro elegante, com tons de preto/cinza e botões azuis.
Última Atualização

Data: 09 de dezembro de 2025
Arquitetura do Projeto
Frontend

    Framework: Vite (Vanilla JavaScript)
    Estilo: CSS moderno com tema escuro
    Porta: 5000

Backend (API)

    Framework: Express.js
    Autenticação: bcrypt + express-session
    Banco de Dados: Em memória (Map)
    Porta: 3000

Funcionalidades Implementadas
✅ Página Inicial 

    Hero section com título impactante e CTAs
    Estatísticas em destaque (99.9% Uptime, 19ms Ping, 24/7 Suporte)
    Seção de recursos com 3 cards (Gerenciamento, Monitoramento, Mobile)
    Cards de planos de Minecraft (6 planos: Cascalho, Madeira, Carvão, Ferro, Ouro, Diamante)
    Cards de planos de Bots (3 planos: 512MB, 1GB, 2GB)

✅ Sistema de Autenticação Completo

    API Backend (api/app.js):
        POST /api/register - Criar nova conta
        POST /api/login - Fazer login
        POST /api/logout - Fazer logout
        GET /api/user - Obter usuário logado
        GET /api/servers - Listar servidores do usuário

    Páginas Frontend:
        /auth.html - Login e Registro com tabs
        /painel.html - Painel do cliente (protegido)

✅ Painel do Cliente

    Dashboard com estatísticas (Servidores Ativos, Plano, Status)
    Lista de servidores (vazia por padrão)
    Botão para criar novo servidor
    Sistema de logout

✅ Página 404 Personalizada

    Design elegante e responsivo
    Animação flutuante
    Botões para voltar ao início ou Discord

✅ Menu Superior Fixo

    Navegação: Início, Planos Minecraft, Planos Bot, Área do Cliente, Suporte/Discord
    Responsivo com menu mobile (hamburger)
    Sticky ao fazer scroll

✅ Sistema de Compra

    Modal de compra ao clicar em "Criar Servidor"
    Mostra detalhes do plano escolhido
    Botão direto para Discord: https://discord.gg/clochost

✅ Rodapé (Footer)

    Links rápidos (Início, Discord, Termos, Privacidade)
    Seção de suporte
    Copyright © 2025 Clochost

✅ Design Responsivo

    Funciona em desktop, tablet e mobile
    Menu hamburger para dispositivos móveis
    Grids adaptáveis em todas as seções

Estrutura de Arquivos

/
├── index.html          # Página inicial
├── auth.html          # Login/Registro
├── painel.html        # Painel do cliente
├── 404.html           # Página de erro
├── api/
│   └── app.js         # API de autenticação
├── src/
│   ├── main.js        # JavaScript principal (planos, modal)
│   ├── auth.js        # JavaScript de autenticação
│   ├── painel.js      # JavaScript do painel
│   ├── style.css      # Estilos principais
│   ├── auth.css       # Estilos de auth
│   └── painel.css     # Estilos do painel
├── vite.config.js     # Configuração Vite (host 0.0.0.0:5000)
└── package.json       # Dependências

Planos Disponíveis
Minecraft

    Cascalho - R$ 36/mês (4GB RAM, 40GB SSD, até 8 jogadores)
    Madeira - R$ 54/mês (6GB RAM, 60GB SSD, até 20 jogadores)
    Carvão - R$ 72/mês (8GB RAM, 80GB SSD, até 60 jogadores)
    Ferro - R$ 99/mês (12GB RAM, 120GB SSD, sem limite)
    Ouro - R$ 129/mês (16GB RAM, 160GB SSD, sem limite)
    Diamante - R$ 179/mês (24GB RAM, 240GB SSD, sem limite)

Bots

    512 MB RAM - R$ 2,49/mês (1vCore, SSD NVMe Ilimitado, Anti-DDoS)
    1 GB RAM - R$ 4,99/mês (1vCore, SSD NVMe Ilimitado, Anti-DDoS)
    2 GB RAM - R$ 9,99/mês (1vCore, SSD NVMe Ilimitado, Anti-DDoS)

Como Executar
Frontend

npm install
npm run dev

Disponível em http://localhost:5000
Backend (API)

node api/app.js

Disponível em http://localhost:3000
Cores do Tema

    Background Primary: #0a0a0a (preto)
    Background Secondary: #1a1a1a (cinza escuro)
    Cards: #1f1f1f
    Accent Blue: #3b82f6
    Text Primary: #ffffff
    Text Secondary: #a0a0a0
    Success Green: #10b981

Workflows Configurados

    Clochost Site - Frontend (npm run dev) na porta 5000
    API Backend - Backend (node api/app.js) na porta 3000

Fluxo de Autenticação

    Usuário acessa /auth.html
    Pode fazer login ou criar conta
    Dados são enviados para API (/api/login ou /api/register)
    API valida e cria sessão
    Usuário é redirecionado para /painel.html
    Painel verifica autenticação via /api/user
    Se não autenticado, redireciona para /auth.html

Próximas Funcionalidades (Futuro)

    Integração com banco de dados PostgreSQL
    Sistema de pagamentos automáticos (Stripe/MercadoPago)
    Criação real de servidores via API
    Sistema de tickets de suporte
    Email de confirmação de cadastro
    Recuperação de senha
