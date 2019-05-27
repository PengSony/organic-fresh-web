const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    }
});

userSchema.statics.findByLogin = async function(login) {
    let user = await this.findOne({
        username: login,
    });

    if (!user) {
        user = await this.findOne({ email: login });
    }

    return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;