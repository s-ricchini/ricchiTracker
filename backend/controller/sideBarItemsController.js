import { sideBarItemsModel } from "../models/SideBarItems/local/sidebarItemsModel.js";

export class SideBarItemsController{
    
    static async getAll(req,res){
        const data = await sideBarItemsModel.getAll();
        return res.status(200).json(data);
    };

    //addItem, valida el schema de zod primero

    static async addItem(req,res){
       const data = req.body
        
       const newItem = await sideBarItemsModel.addItem(data);
       
       if(newItem){
            return res.status(201).json(newItem)
       }
       return res.status(400).json({error:"error al crear el item"})
    }

    
    static async modifyItem(req,res){
        const newitem = await sideBarItemsModel.modifyItem(req.body)

        if(newitem){
            return res.status(200).json(newitem);
        }

        return res.status(404).json({error:"item not found"})
    }

    static async deleteItem(req,res){
        const id = req.params.id;

        const deletedItem = await sideBarItemsModel.deleteItem(id);

        if(deletedItem){
            return res.status(200).json(deletedItem)
        }
        
        return res.status(400).json({error:"item not found"});

    }

}