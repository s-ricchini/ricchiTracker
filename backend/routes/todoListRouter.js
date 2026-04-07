import { Router } from "express";

import { TodoListController } from "../controller/todoListController.js";

//schema para validar inputs y middlewaregenerico
import { validateSchema } from "../middlewares/validateSchema.js";
import { itemsSideBarSchema } from "../schemas/itemsSideBar.js";

export const todoListRouter = Router()

todoListRouter.get("/",TodoListController.getTasksTodayAndTomorrow)

todoListRouter.post("/",TodoListController.createTask)

todoListRouter.delete('/:id',TodoListController.deleteTask)
