import { Router } from "express";
import protectedRoute from "../middlewares/protectedRoute.js";

import { TodoListController } from "../controller/todoListController.js";

//schema para validar inputs y middlewaregenerico
import { validateSchema } from "../middlewares/validateSchema.js";
import { itemsSideBarSchema } from "../schemas/itemsSideBar.js";
import { TodoListModel } from "../models/todoList/todoListModel.js";

export const todoListRouter = Router()

todoListRouter.get("/",protectedRoute,TodoListController.getTasksTodayAndTomorrow)

todoListRouter.post("/",protectedRoute,TodoListController.createTask)

todoListRouter.delete('/:id',protectedRoute,TodoListController.deleteTask)

todoListRouter.patch('/:id',protectedRoute,TodoListController.toggleCheck)