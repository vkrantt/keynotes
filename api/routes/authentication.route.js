const { registerUser, loginUser, accessUser, changePassword, updateUserDetails } = require('../controllers/authentication.controller');
const router = require("express").Router();
const { body } = require("express-validator");
const authToken = require('../middlewares/verifyToken.middleware');


router.route('/createuser').post(
    [
        body("firstName", "First name must be 2 minimum characters.").isLength({
            min: 2,
        }),
        body("lastName", "Last name must be 2 minimum characters.").isLength({
            min: 2,
        }),
        body("email", "Email must be valid.").isEmail(),
        body("password", "Password must be 8 minimum characters.").isLength({
            min: 8,
        }),
    ]
    , registerUser
);

// Login User
router.route("/login").post(
    [
        body("email", "Email must be valid.").isEmail(),
        body("password", "Password must be 8 minimum characters.").isLength({
            min: 8,
        }),
    ],
    loginUser
);

// Access User - Login required
router.route("/access-user").post(authToken, accessUser);

// Change Password - Login required
router.route("/updatepassword/:identifier").put(authToken, changePassword);

// Update User details - Login required
router
    .route("/updateprofile/:identifier")
    .put(authToken, updateUserDetails);


module.exports = router;
