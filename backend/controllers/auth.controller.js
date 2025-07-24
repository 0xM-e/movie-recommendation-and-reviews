const authService = require('../services/auth.service');
const User = require('../models/User');

exports.register = async (req, res) => {
    try {
        const result = await authService.register(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const result = await authService.login(req.body);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.logout = (req, res) => {
    // The client should delete the token on the client side
    res.status(200).json({ message: 'Logout successful' });
};

exports.me = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.changePassword = async (req, res) => {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    try {
        await authService.changePassword({ userId, currentPassword, newPassword });
        res.status(200).json({ message: 'Password changed successfully.' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
