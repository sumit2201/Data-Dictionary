const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        require: true,
    }
});

UserSchema.statics.addInitialData = (userData) => {
    let _users = [
        {
            name: "admin",
            username: "admin",
            password: "admin",
            role: "admin"
        },
        {
            name: "contributor",
            username: "contributor",
            password: "contributor",
            role: "contributor"
        },
        {
            name: "viewer",
            username: "viewer",
            password: "viewer",
            role: "viewer"
        },
    ]

    userData.deleteMany({}, (err) => {
        _users.forEach((newUser) => {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) return err;
                // Create the hashed password
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) return err;
                    newUser.password = hash;
                    userData.create(newUser);
                });
            });
        });
    });

}
const User = mongoose.model('User', UserSchema)

module.exports = User;
