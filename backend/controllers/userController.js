const User = require("../models/userSchema");
const Student = require("../models/studentSchema");
const jwt = require("jsonwebtoken")

// Create a new user
const addUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body);

        res.status(201).json({
            message: "User created successfully",
            user
        });
    } catch (err) {
        next(err);
    }
};

// Login user
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({
            email: email.trim().toLowerCase()
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not configured");
        }

        // Fetch role-specific profile
        let profile = null;

        if (user.role === "Student") {
            profile = await Student.findOne({
                email: user.email
            }).select(
                "name email photo course department semester rollNumber admissionNumber status"
            );
        }

        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || "1d"
            }
        );

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            },
            profile
        });

    } catch (err) {
        next(err);
    }
};


module.exports = {
    addUser,
    loginUser
};
