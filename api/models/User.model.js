const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    logoImage: {
        type: String,
        default:
            "https://naneedigital.com/storage/img/images_2/replace_default_user_account_avatar_in_windows_10.png",
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    createdOn: {
        type: Date,
    },
    updatedOn: {
        type: Date,
    },
})

const User = mongoose.model('User', userSchema)
module.exports = User;