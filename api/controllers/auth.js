import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
    // CHECK EXISTING USERS
    const query = "SELECT * FROM users WHERE email = ? OR username = ?";

    db.query(query, [req.body.email, req.body.username], (error, data) => {
        if (error) return res.json(error);
        // Return status - data already exists
        if (data.length) return res.status(409).json("User already exists!");

        // If user doesn't exist
        // Hash the password and create a user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const query = "INSERT INTO users(`username`, `email`, `password`) VALUES (?)";
        const values = [
            req.body.username,
            req.body.email,
            // Hashed password
            hash
        ];

        db.query(query, [values], (error, data) => {
            if (error) return res.json(error);
            // If no error - status successful
            return res.status(200).json("User has been created.");
        });
    });
}

export const login = (req, res) => {
    // CHECK IF USER EXISTS
    const query = "SELECT * FROM users WHERE username = ?";
    db.query(query, [req.body.username], (error, data) => {
        if (error) return res.json(error);
        // No such user in the database
        if (data.length === 0) return res.status(404).json("User not found!");

        // Check password (1st item of the data array is user)
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);

        // If password not correct
        if (!isPasswordCorrect) return res.status(400).json("Wrong username or password!");

        // Storing information that identifies this user (for editing and deleting posts)
        const token = jwt.sign({ id: data[0].id }, "jwtkey");
        // Store all other info besides password
        const {password, ...other} = data[0];

        // Store this info as a cookie
        res.cookie("access_token", token, {
            // Any script in app or browser cannot reach this cookie directly, it can only be reached through api request
            httpOnly:true
        }).status(200).json(data[0]);
    })
}

export const logout = (req, res) => {
    res.clearCookie("access_token",{
        sameSite: "none",
        secure: true
    }).status(200).json("User has been logged out");
}