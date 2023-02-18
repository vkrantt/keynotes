const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    important: {
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

const Note = mongoose.model('Note', noteSchema)
module.exports = Note;