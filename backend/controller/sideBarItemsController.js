import { sideBarItemsModel } from "../models/SideBarItems/local/sidebarItemsModel.js";

export class SideBarItemsController{
    
    static async getAll(req,res){
        const data = await sideBarItemsModel.getAll();
        return res.status(200).json(data);
    };

    //addItem, valida el schema de zod primero

    static async addItem(req,res){

    }




}