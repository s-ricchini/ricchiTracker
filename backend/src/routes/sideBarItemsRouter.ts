import { Router } from "express";
import protectedRoute from "../middlewares/protectedRoute.js";

import { SideBarItemsController } from "../controller/sideBarItemsController.js";

//schema para validar inputs y middlewaregenerico
import { validateSchema } from "../middlewares/validateSchema.js";
import { itemsSideBarSchema } from "../schemas/itemsSideBar.js";

export const sideBarItemsRouter = Router()

sideBarItemsRouter.get("/",protectedRoute,SideBarItemsController.getAll)

sideBarItemsRouter.post('/', protectedRoute,validateSchema(itemsSideBarSchema) ,SideBarItemsController.addItem)

sideBarItemsRouter.patch('/',protectedRoute,validateSchema(itemsSideBarSchema,true) ,SideBarItemsController.modifyItem)

sideBarItemsRouter.delete('/:id',protectedRoute ,SideBarItemsController.deleteItem)

