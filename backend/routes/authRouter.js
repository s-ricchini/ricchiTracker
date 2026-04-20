import { Router } from "express";
import protectedRoute from "../middlewares/protectedRoute.js";

import AuthController from "../controller/authController.js";

export const authRouter = Router()

authRouter.post('/register',AuthController.register)
authRouter.post('/login',AuthController.login)
authRouter.get('logout',AuthController.logout)
