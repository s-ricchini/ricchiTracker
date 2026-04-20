import AuthModel from "../models/authModel/authModel.js";

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

            const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });

            res
                .cookie("access_token", token, {
                    httpOnly: true,
                    secure: false, //cambiar en prod
                    sameSite: "lax",
                    maxAge: 1000 * 60 * 60, // 1 hora en ms
                })
                .status(202)
                .json({username: user.username });

            return res
        } catch (err) {
            if (err.message === "Invalid credentials") {
                return res.status(401).json({ error: err.message });
            }
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    static logout(req, res) {
        const token = req.cookies.access_token;

        if (!token) {
            return res.status(200).send()
        }

        res
            .clearCookie("access_token", {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
            })
            .status(200).send();
    
        return res
    }

}
