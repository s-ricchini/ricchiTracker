import { pool } from "../../db/connection.js";
import bcrypt from 'bcrypt' 
import crypto from "crypto"
 
import type { UUID,User,TokenPayload } from "../../types/allTypes.js";
import type { ResultSetHeader,RowDataPacket } from "mysql2";



export default class AuthModel{

    static async register(username:string, password:string) : Promise<boolean> { 
        try {
            const [existing] = await pool.query<RowDataPacket[]>(
                `SELECT username FROM users WHERE username = ?`,
                [username]
            );

            if (existing.length > 0) {
                throw new Error("Username already taken");
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const id = crypto.randomUUID()

            await pool.query<ResultSetHeader>(
                `INSERT INTO users (id, username, password) VALUES (UUID_TO_BIN(?), ?, ?)`,
                [id, username, hashedPassword]
            );

            return true;

        } catch (err) {
            throw err;
        }
    }

    static async login(username:string, password:string) : Promise<TokenPayload> {
        try {
            const [rows] = await pool.query<RowDataPacket[] & User[]>(
                `SELECT BIN_TO_UUID(id) as id, username, password FROM users WHERE username = ?`,
                [username]
            );

            if (rows.length === 0) {
                throw new Error("Invalid credentials");
            }

            const user = rows[0];

            const isValid = await bcrypt.compare(password, user!.password);

            if (!isValid) {
                throw new Error("Invalid credentials");
            }

            return { id: user!.id, username: user!.username };

        } catch (err) {
            throw err;
        }
    }

    static async newRefreshToken(userId:UUID,newToken:string) : Promise<void>{
        //busco si el usuario ya tiene un refreshToken -> si lo tiene lo borro
        //encripto el nuevo token -> lo inserto en la db
        try {
            await pool.query<ResultSetHeader>("DELETE from refreshTokens WHERE user_id = UUID_TO_BIN(?)",[userId])

            const hash = crypto.createHash('sha256').update(newToken).digest('hex')

            await pool.query<ResultSetHeader>('INSERT into refreshTokens (user_id,token) VALUES (UUID_TO_BIN(?),?)',[userId,hash])


        } catch (error) {
            console.error(error)
            throw error
            
        }
    }

    static async deleteToken(hash:string):Promise<void>{
        try {
            await pool.query<ResultSetHeader>("DELETE from refreshTokens WHERE token = ?",[hash])


        } catch (error) {
            console.error(error)
            throw error
        }

    }

    static async validToken(hash:string) : Promise<boolean>{
        try {
            const [rows] = await pool.query<RowDataPacket[]>("SELECT * from refreshTokens WHERE token = ?",[hash])

            if(rows.length === 0){
                return false;
            }

            return true;
            
        } catch (error) {
            console.error(error)
            throw error
        }    

    }

    
}