import { db } from "../db.js";
import bcrypt from "bcryptjs";

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

        const query = "INSERT INTO users('username', 'email', 'password') VALUES (?)";
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

}

export const logout = (req, res) => {

}