import { Router } from "express";

import { SideBarItemsController } from "../controller/sideBarItemsController.js";


export const blogEntysRouter = Router()


sideBarItemsRouter.get("/",SideBarItemsController.getAll)

sideBarItemsRouter.post('/', validateSchema(itemsSideBarSchema) ,SideBarItemsController.addItem)

sideBarItemsRouter.patch('/' ,validateSchema(itemsSideBarSchema,true) ,SideBarItemsController.modifyItem)

sideBarItemsRouter.delete('/:id' ,SideBarItemsController.deleteItem)

