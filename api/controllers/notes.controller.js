const { validationResult } = require("express-validator");
const { serverError } = require("../constant/constant.config");
const Note = require("../models/Note.model");


// Create New Note
const createNote = async (req, res) => {
    const userId = req.user;
    const {
        title,
        description,
        important
    } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(411).json({
            status: 411,
            response: errors.array(),
        });
    }


    try {
        // Create New Note
        const newNote = await Note({
            user: userId,
            title,
            description,
            important,
            createdOn: new Date(),
            updatedOn: new Date(),
        });
        const savedNote = await newNote.save();

        if (savedNote) {
            res.status(201).json({
                status: 201,
                response: 'New note added.',
                savedNote
            });
        }
    } catch (error) {
        res.status(501).json({
            status: 501,
            response: serverError.INTERNAL_SERVER,
            error,
        });
    }
}

// Get all Note
const getAllNotes = async (req, res) => {

    try {
        const filter = { user: req.user };
        const notes = await Note.find(filter)
        res.status(201).json({
            status: 201,
            response: 'All notes.',
            notes
        });
    } catch (error) {
        res.status(501).json({
            status: 501,
            response: serverError.INTERNAL_SERVER,
            error,
        });
    }
}


// delete note
const deleteNote = async (req, res) => {
    const id = req.params.id;
    try {
        const filter = { _id: id };
        const existedNote = await Note.findById(req.params.id);
        if (!existedNote) {
            return res.status(401).json({
                status: 401,
                response: 'Not found.'
            });
        }
        else if (existedNote.user.toString() !== req.user) {
            return res.status(401).json({
                status: 401,
                response: 'Access denied.'
            });
        }
        else {
            await Note.findByIdAndDelete(filter);
            res.status(201).json({
                status: 201,
                response: 'Note deleted.'
            });
        }
    } catch (error) {
        res.status(501).json({
            status: 501,
            response: serverError.INTERNAL_SERVER,
            error,
        });
    }
}


// Edit note
const editNote = async (req, res) => {
    const id = req.params.id;
    try {
        const existedNote = await Note.findById(req.params.id);
        if (!existedNote) {
            return res.status(401).json({
                status: 401,
                response: 'Not found.'
            });
        }
        else if (existedNote.user.toString() !== req.user) {
            return res.status(401).json({
                status: 401,
                response: 'Access denied.'
            });
        }
        else {
            const updatedNote = await Note.findByIdAndUpdate(id, { $set: req.body }, { new: true });
            res.status(201).json({
                status: 201,
                response: 'Note edited.',
                updatedNote
            });
        }

    } catch (error) {
        res.status(501).json({
            status: 501,
            response: serverError.INTERNAL_SERVER,
            error,
        });
    }
}
module.exports = { createNote, getAllNotes, deleteNote, editNote }