module.exports = (req, res, next) => {
    if (req.method === 'POST') {
        // Adiciona timestamp para IDs
        req.body.id = req.body.id || `${Date.now()}`;

        // Se for registro de token
        if (req.path === '/auth/tokens') {
            const tokens = res.locals.data.auth.tokens;
            tokens.push(req.body);
            res.locals.data.auth.tokens = tokens;
        }
    }
    next();
}; 