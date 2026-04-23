import AuthModel from "../models/authModel/authModel.js";
import jwt from "jsonwebtoken"

import { createHash } from 'crypto'

export default class AuthController{


    static async register(req,res){
        const {username,password} = req.body
        
        try {
            const created = await AuthModel.register(username,password)
            return res.status(201).send()

        } catch (error) {
            if(error.message === "Username already taken"){
                return res.status(400).json({error:"Username already taken"})
            } 

            return res.status(500).json({error:"Internal server error"})

        }



    }

    static async login(req, res) {
        try {
            const { username, password } = req.body;

            const user = await AuthModel.login(username, password);

            const access_token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "10m" });
            const refresh_token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn:"90d"})

            //inserto el refresh token a la db
            const result = await AuthModel.newRefreshToken(user.id,refresh_token)

            res
                .cookie("access_token", access_token, {
                    httpOnly: true,
                    secure: false, //cambiar en prod
                    sameSite: "lax",
                    maxAge: 1000 * 60 * 10, // 10 mins en ms
                })
                .cookie("refresh_token",refresh_token,{
                    httpOnly: true,
                    secure: false, //cambiar en prod
                    sameSite: "lax",
                    maxAge: 1000 * 60 * 60 * 24 * 90, // 90 dias en ms
                })

                .status(202)
                .json({username: user.username });

            return res
        } catch (err) {
            console.error(err)
            if (err.message === "Invalid credentials") {
                return res.status(401).json({ error: err.message });
            }
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    static async logout(req, res) {
        const acces_token = req.cookies.access_token;
        const refresh_token = req.cookies.refresh_token

        try {
            if (refresh_token) {
                //lo busco por el hash por si luego quiero implenetar multi dispositivo
                const hash = createHash('sha256').update(refresh_token).digest('hex')
                await AuthModel.deleteToken(hash)
            
            }
            
            res
                .clearCookie("access_token", {
                    httpOnly: true,
                    secure: false,
                    sameSite: "lax",
                })
                .clearCookie("refresh_token", {
                    httpOnly: true,
                    secure: false,
                    sameSite: "lax",
                })
                .status(200).send();
        
            return res
            
        } catch (error) {
            console.error(error)
            return res.status(500).json({error:"internal server error"})            
        }

    }

    static async refresh(req,res){
       const refresh_token = req.cookies.refresh_token

        if (!refresh_token) {
            return res.status(401).json({ error: "No token provided" });
        }

        try {
            //veo que el refresh token no haya expirado
            const payload = jwt.verify(refresh_token, process.env.JWT_SECRET);
            const user = {id: payload.id, username:payload.username}


            //verifico que este en la db
            const hash = createHash('sha256').update(refresh_token).digest('hex')
            const inDb = await AuthModel.validToken(hash)            

            if (!inDb){
                return res.status(401).json({error:"Invalid Token"})
            }

            const newAccess_token = jwt.sign(user,process.env.JWT_SECRET,{expiresIn:"10m"})

            res.clearCookie("access_token", {
                    httpOnly: true,
                    secure: false,
                    sameSite: "lax",
                })
                .cookie("access_token", newAccess_token , {
                    httpOnly: true,
                    secure: false, //cambiar en prod
                    sameSite: "lax",
                    maxAge: 1000 * 60 * 10, // 10 mins en ms
                })
                .status(200).send()


        } catch (err) {
            return res.status(401).json({error: "Invalid Token"})
        }

    }

}
