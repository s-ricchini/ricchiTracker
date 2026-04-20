import { sideBarItemsModel } from "../models/SideBarItems/sql/sideBarItemsModel.js";

export class SideBarItemsController{
    
    static async getAll(req,res){

        const userId = req.session.id
        const data = await sideBarItemsModel.getAll(userId);
        return res.status(200).json(data);
    };

    //addItem, valida el schema de zod primero

    static async addItem(req,res){
       const data = req.body
       const userId = req.session.id 

       const newItem = await sideBarItemsModel.addItem(userId,data);
       
       if(newItem){
            return res.status(201).json(newItem)
       }
       return res.status(400).json({error:"error al crear el item"})
    }

    
    static async modifyItem(req,res){
        const userId = req.session.id
        const newitem = await sideBarItemsModel.modifyItem(userId,req.body)

        if(newitem){
            return res.status(200).json(newitem);
        }

        return res.status(404).json({error:"item not found"})
    }


    static async deleteItem(req,res){
        const id = req.params.id;
        const userId = req.session.id

        const deletedItem = await sideBarItemsModel.deleteItem(userId,id);

        if(deletedItem){
            return res.status(200).send()
        }
        
        return res.status(400).json({error:"item not found"});

    }

}