const bcrypt = require('bcrypt');

const { user } = require('../models');

exports.register = async (req, res) => {
    const { password } = req.body;
    const passwordHashed = bcrypt.hashSync(password, 10);

    try {
        let userData = await user.create(
            Object.assign(req.body, {password: passwordHashed})
        );
        const dataReturn = await user.authorize(userData.id);
        return res.status(201).json({
            message: 'Register berhasil',
            data: dataReturn,
            action: '/profile'
        });
    } catch (err) {
        return res.status(400).send(err);
    }
}

exports.login = async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: 'Masukan email dan password'
        });
    }

    // const User = user;
    try {
        const userData = await user.authenticate(username, password);
        const dataReturn = await user.authorize(userData.id);
        return res.status(200).json({
            message: 'Login berhasil',
            data: dataReturn,
            action: '/profile'
        });
    } catch (err) {
        return res.status(400).send(err);
    }
}
