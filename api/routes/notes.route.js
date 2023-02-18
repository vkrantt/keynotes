const router = require("express").Router();
const { body } = require("express-validator");
const { createNote, getAllNotes } = require("../controllers/notes.controller");
const authToken = require("../middlewares/verifyToken.middleware");

router.route('/createnote').post(authToken,
    [
        body("title", "Title is required.").isLength({
            min: 1,
        }),
    ]
    , createNote
)

router.route('/getallnotes').get(authToken, getAllNotes)

module.exports = router;