import { Router } from "express";

import protectedRoute from "../middlewares/protectedRoute.js";

import { BlogEntysController } from "../controller/blogEntrysController.js";
export const blogEntysRouter = Router()


blogEntysRouter.get('/:id',protectedRoute,BlogEntysController.getAllEntrys)
blogEntysRouter.delete('/:id',protectedRoute,BlogEntysController.deleteEntry)
blogEntysRouter.post('/',protectedRoute,BlogEntysController.createEntry)
blogEntysRouter.patch('/:id',protectedRoute,BlogEntysController.modifyEntry)