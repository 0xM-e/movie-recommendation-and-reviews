const jwt = require('jsonwebtoken');
const { verifyToken } = require('../utils/jwt');

exports.authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ message: 'Token required' });

    const token = authHeader.split(' ')[1];
    try {
        const user = verifyToken(token);
        req.user = user; // { id, username, role }
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
