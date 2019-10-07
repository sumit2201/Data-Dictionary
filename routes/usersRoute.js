const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/usersModel.js');
const config = require('../config');

const router = express.Router();


router.post('/login', (req, res) => {
    const username = req.body.username || '';
    const password = req.body.password || '';

    let errors = {};

    if (username === '') {
        errors = {...errors, username: 'This field is required' };
    }
    if (password === '') {
        errors = {...errors, password: 'This field is required' };
    }

    if (Object.keys(errors).length > 0) {
        res.json({ errors });
    } else {
        User.findOne({username: username}, (err, user) => {
            if (err) throw err;
            if (Boolean(user)) {
                // Match Password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) return err;
                    if (isMatch) {
                        const token = jwt.sign({
                                id: user._id,
                                username: user.username,
                                role: user.role,
                            }, config.jwtSecret);
                        res.json({ token, success: 'success' })
                    } else {
                       res.json({ errors: { invalidCredentials: 'Invalid Username or Password' } });
                    }
                });
            } else {
                res.json({ errors: { invalidCredentials: 'Invalid Username or Password' } });
            }
        });
    }
});

module.exports = router;
