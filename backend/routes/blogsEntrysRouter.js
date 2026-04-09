import { Router } from "express";

import { BlogEntysController } from "../controller/blogEntrysController.js";
export const blogEntysRouter = Router()



blogEntysRouter.get('/:id',BlogEntysController.getAllEntrys)