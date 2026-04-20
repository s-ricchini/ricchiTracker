import { pool } from "../../db/connection.js";
import bcrypt from 'bcrypt' 


export default class AuthModel{

    static async register(username, password) {
        try {
            const [existing] = await pool.query(
                `SELECT username FROM users WHERE username = ?`,
                [username]
            );

            if (existing.length > 0) {
                throw new Error("Username already taken");
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const id = crypto.randomUUID()

            await pool.query(
                `INSERT INTO users (id, username, password) VALUES (UUID_TO_BIN(?), ?, ?)`,
                [id, username, hashedPassword]
            );

            return true;

        } catch (err) {
            throw err;
        }
    }

    static async login(username, password) {
        try {
            const [rows] = await pool.query(
                `SELECT BIN_TO_UUID(id) as id, username, password FROM users WHERE username = ?`,
                [username]
            );

            if (rows.length === 0) {
                throw new Error("Invalid credentials");
            }

            const user = rows[0];

            const isValid = await bcrypt.compare(password, user.password);

            if (!isValid) {
                throw new Error("Invalid credentials");
            }

            return { id: user.id, username: user.username };

        } catch (err) {
            throw err;
        }
    }

    
}