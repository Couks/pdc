const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./src/data/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Middleware personalizado para autenticação
server.use(jsonServer.bodyParser);

// Rotas personalizadas
server.post('/auth/login', (req, res) => {
    const { email, password, role } = req.body;
    const db = router.db;

    const users = db.get(role === 'doctor' ? 'doctors' : 'patients').value();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        const token = db.get('auth.tokens').find({ id: user.id }).value();
        res.jsonp({ user: { ...user, password: undefined }, token: token.token });
    } else {
        res.status(401).jsonp({ error: 'Credenciais inválidas' });
    }
});

// Use o router padrão para outras rotas
server.use(router);

server.listen(3000, () => {
    console.log('JSON Server está rodando na porta 3000');
}); 