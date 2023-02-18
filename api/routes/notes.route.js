const router = require("express").Router();
const { body } = require("express-validator");
const { createNote, getAllNotes, deleteNote } = require("../controllers/notes.controller");
const authToken = require("../middlewares/verifyToken.middleware");

router.route('/createnote').post(authToken,
    [
        body("title", "Title is required.").isLength({
            min: 1,
        }),
    ]
    , createNote
)

// Get all notes
router.route('/getallnotes').get(authToken, getAllNotes);

// Delete note 
router.route('/deletenote/:id').delete(authToken, deleteNote)


module.exports = router;