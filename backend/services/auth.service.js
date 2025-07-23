const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { signToken } = require('../utils/jwt');

exports.register = async ({ username, email, password }) => {
    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    const token = signToken({ id: user._id, username: user.username, role: user.role });
    return { token, user: { id: user._id, username: user.username, email: user.email } };
};

exports.login = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Incorrect password');

    const token = signToken({ id: user._id, username: user.username, role: user.role });
    return { token, user: { id: user._id, username: user.username, email: user.email } };
};
