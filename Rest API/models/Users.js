const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a name"]
    },
    age: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
