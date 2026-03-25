import { Router } from "express";

import { SideBarItemsController } from "../controller/sideBarItemsController.js";

//schema para validar inputs y middlewaregenerico
import { validateSchema } from "../middlewares/validateSchema.js";
import { itemsSideBarSchema } from "../schemas/itemsSideBar.js";

export const sideBarItemsRouter = Router()

sideBarItemsRouter.get("/",SideBarItemsController.getAll)

sideBarItemsRouter.post('/', validateSchema(itemsSideBarSchema) ,SideBarItemsController.addItem)
