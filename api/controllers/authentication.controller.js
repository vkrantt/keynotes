const { authConstant, serverError } = require("../constant/constant.config");
const User = require("../models/User.model");
const bcrypt = require('bcryptjs');
const generateToken = require("../utils/token.service");
const { validationResult } = require("express-validator");


// Create New user
const registerUser = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password
    } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(411).json({
            status: 411,
            response: errors.array(),
        });
    }


    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                status: 401,
                response: authConstant.USER_EXISTS,
            });
        }

        // Create Hash
        const hash = await bcrypt.hash(password, 10);

        // Create New User
        const newUser = await User({
            firstName,
            lastName,
            email,
            password: hash,
            createdOn: new Date(),
            updatedOn: new Date(),
        });

        const savedUser = await newUser.save();

        // Create Token
        const token = generateToken(savedUser._id);
        res.header("auth-token", token).status(201).json({
            status: 201,
            response: authConstant.ACCOUNT_CREATED,
            token,
        });
    } catch (error) {
        res.status(501).json({
            status: 501,
            response: serverError.INTERNAL_SERVER,
            error,
        });
    }
}

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(411).json({
            status: 411,
            response: errors.array(),
        });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                status: 401,
                response: authConstant.NOT_FOUND,
            });
        }

        //   Match Password
        const matchedPassword = await bcrypt.compare(password, user.password);
        if (!matchedPassword) {
            return res.status(401).json({
                status: 401,
                response: authConstant.NOT_FOUND,
            });
        }

        // Create Token
        const token = generateToken(user._id);

        res.header("auth-token", token).status(201).json({
            status: 201,
            response: authConstant.LOGGED_IN,
            token,
        });
    } catch (error) {
        res.status(501).json({
            status: 501,
            response: serverError.INTERNAL_SERVER,
            error,
        });
    }
};

// Access Verified User : Login required
const accessUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user }).select(" -password");
        return res.status(201).json({
            status: 201,
            response: user,
        });
    } catch (error) {
        res.status(501).json({
            status: 501,
            response: serverError.INTERNAL_SERVER,
            error,
        });
    }
};

// Change Password
const changePassword = async (req, res) => {
    const id = req.params.identifier;
    const { existingPassword, newPassword } = req.body;
    try {
        const existedUser = await User.findById({ _id: id }).select("password");
        if (!existedUser) {
            return res.status(401).json({
                status: 401,
                response: authConstant.NOT_FOUND,
            });
        }

        // If Existing Password or saved passwords not same
        const matchPasswords = await bcrypt.compare(
            existingPassword,
            existedUser.password
        );
        if (!matchPasswords) {
            return res.status(401).json({
                status: 401,
                response: "Wrong Password.",
            });
        }

        // If New Password or saved password are same
        const newPasswordMatchWithDatabase = await bcrypt.compare(
            newPassword,
            existedUser.password
        );
        if (newPasswordMatchWithDatabase) {
            return res.status(401).json({
                status: 401,
                response: "New Password cannot be the same.",
            });
        }

        const hash = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(
            { _id: id },
            {
                password: hash,
            },
            { new: true }
        );

        return res.status(201).json({
            status: 201,
            response: "Password Updated Successfully.",
        });
    } catch (error) {
        res.status(501).json({
            status: 501,
            response: serverError.INTERNAL_SERVER,
            error,
        });
    }
};

const updateUserDetails = async (req, res) => {
    const id = req.params.identifier;
    const {
        firstName,
        lastName,
        email,
        password,
    } = req.body;
    try {
        const existedUser = await User.findById({
            _id: id,
        }).select("-password");

        if (!existedUser) {
            return res.status(401).json({
                status: 401,
                response: authConstant.NOT_FOUND,
            });
        }

        await User.findByIdAndUpdate(
            { _id: id },
            {
                firstName,
                lastName,
                email,
                password,
                updatedOn: new Date(),
            },
            {
                new: true,
            }
        );

        return res.status(201).json({
            status: 201,
            response: "Updated details saved.",
        });
    } catch (error) {
        res.status(501).json({
            status: 501,
            response: serverError.INTERNAL_SERVER,
            error,
        });
    }
};


module.exports = { registerUser, loginUser, accessUser, changePassword, updateUserDetails }