const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const errorHandler = require('../middleware/error_handler');
const { user } = require('../models');

exports.register = async (req, res) => {
    const err = validationResult(req);
    console.log(err);
    if (!err.isEmpty()) {
        return errorHandler(res, 422, 'Error Input', err.errors);
    }

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
    const {email, password} = req.body;

    if (!email || !password) {
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
