const bcrypt = require('bcrypt');

const { user } = require('../models');

exports.register = async (req, res) => {
    const { password } = req.body;
    const passwordHashed = bcrypt.hashSync(password, 10);

    try {
        let userData = await user.create(
            Object.assign(req.body, {password: passwordHashed})
        );
        if (userData) {
            const dataReturn = await user.authorize(userData.id);
            return res.status(201).json({
                message: 'Register berhasil',
                data: dataReturn,
                action: '/profile'
            });
        }
        return res.status(400).json({
            message: 'Gagal melakukan register',
            action: '/register'
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
        if (userData !== false) {
            const dataReturn = await user.authorize(userData.id);
            return res.status(200).json({
                succes: true,
                message: 'Login berhasil',
                data: dataReturn,
                action: '/profile'
            });
        }
        
        return res.status(401).send({
            succes: false,
            message: 'Login gagal, email/telepon dan password tidak sesuai',
            action: '/register'
        });
    } catch (err) {
        return res.status(400).send(err);
    }
}
