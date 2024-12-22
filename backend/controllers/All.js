import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = "soul";

export async function signup(request, response) {
    try {
        const body = await request.body;
        const {
            referral,
            mentalCondition,
            name,
            username,
            email,
            password,
            ageGroup,
            gender,
            country,
            goals,
            preferences
        } = body;
        const requiredFields = {
            referral,
            mentalCondition,
            name,
            username,
            email,
            password,
            ageGroup,
            gender,
            country,
            goals,
            preferences
        };
        const missingFields = Object.entries(requiredFields)
            .filter(([_, value]) => !value)
            .map(([key]) => key);

        if (missingFields.length > 0) {
            return response.status(400).json({
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            if (existingUser.email === email) {
                return response.status(400).json({
                    message: "Email already in use."
                });
            }
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            referral,
            mentalCondition,
            name,
            username,
            email,
            password: hashedPassword,
            ageGroup,
            gender,
            country,
            goals,
            preferences
        });
        await newUser.save();

        return response.status(201).json({
            message: "User registered successfully.",
            user: {
                username: newUser.username,
                email: newUser.email
            }
        });

    } catch (error) {
        console.error("Error during signup:", error);
        return response.status(500).json({
            message: "Internal server error."
        });
    }
}

export async function login(request, response) {
    try {
        const { email, password } = request.body;
        const user = await User.findOne({ email });
        if (!user) {
            return response.status(401).json({ message: "Invalid email or password." });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return response.status(401).json({ message: "Invalid email or password." });
        }
        const token = jwt.sign(
            { id: user._id, email: user.email, username: user.username },
            JWT_SECRET,
            { expiresIn: "2h" }
        );

        return response.status(200).json({
            message: "Login successful.",
            token,
        });
    } catch (error) {
        console.error("Error during login:", error);
        return response.status(500).json({ message: "Internal server error." });
    }
}

export const profile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error." });
    }
};


export const updateProfile = async (req, res) => {
    console.log("Received request to update profile");
    try {
        const { name, username, email, password, newPassword } = req.body;
        const userId = req.user.id; // Get user ID from the token
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        const emailtaken = await User.findOne({ email })
        if (emailtaken && emailtaken._id != userId) {
            return res.status(400).json({ message: "Email already in use." });
        }
        if (newPassword != "") {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid current password." });
            }
            user.password = await bcrypt.hash(newPassword, 10);
        }

        // Update user profile fields
        user.name = name || user.name;
        user.username = username || user.username;
        user.email = email || user.email;

        await user.save();

        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
};