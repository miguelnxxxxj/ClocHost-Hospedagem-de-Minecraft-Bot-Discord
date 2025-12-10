import express from 'express';
import bcrypt from 'bcryptjs';
import session from 'express-session';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(cors({
  origin: function(origin, callback) {
    const allowedOrigins = [
      'http://localhost:5000',
      /https?:\/\/.*\.replit\.dev$/,
      /https?:\/\/.*\.repl\.co$/
    ];
    
    if (!origin || allowedOrigins.some(pattern => 
      pattern instanceof RegExp ? pattern.test(origin) : pattern === origin
    )) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'clochost-secret-2025',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
}));

const users = new Map();

function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ error: 'Não autenticado' });
  }
}

app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const existingUser = Array.from(users.values()).find(
      u => u.username === username || u.email === email
    );

    if (existingUser) {
      return res.status(400).json({ error: 'Usuário ou email já existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = Date.now().toString();
    
    const newUser = {
      id: userId,
      username,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      servers: []
    };

    users.set(userId, newUser);
    req.session.userId = userId;

    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({ 
      message: 'Usuário criado com sucesso', 
      user: userWithoutPassword 
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
    }

    const user = Array.from(users.values()).find(u => u.username === username);

    if (!user) {
      return res.status(401).json({ error: 'Usuário ou senha inválidos' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Usuário ou senha inválidos' });
    }

    req.session.userId = user.id;

    const { password: _, ...userWithoutPassword } = user;
    res.json({ 
      message: 'Login realizado com sucesso', 
      user: userWithoutPassword 
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

app.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao fazer logout' });
    }
    res.json({ message: 'Logout realizado com sucesso' });
  });
});

app.get('/api/user', isAuthenticated, (req, res) => {
  const user = users.get(req.session.userId);
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  const { password, ...userWithoutPassword } = user;
  res.json({ user: userWithoutPassword });
});

app.get('/api/servers', isAuthenticated, (req, res) => {
  const user = users.get(req.session.userId);
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  res.json({ servers: user.servers || [] });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 API de autenticação rodando na porta ${PORT}`);
});
