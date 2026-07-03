import { sideBarItemsModel } from "../models/SideBarItems/sql/sideBarItemsModel.js";

import type { Request,Response } from "express"
import type { UUID,SideBarItem,SideBarItemChanges} from "../types/allTypes.js"

export class SideBarItemsController{
    
    static async getAll(req:Request,res:Response){

        const userId = req.session!.id

        try {    
            const data = await sideBarItemsModel.getAll(userId);
            return res.status(200).json(data);
                
        } catch (error) {
            console.log(error)
            res.status(500).json({error:"Internal server error"})
        }
    
    
    };

    //addItem, valida el schema de zod primero

    static async addItem(req:Request,res:Response){
       const data = req.body as SideBarItem
       const userId = req.session!.id 

       try {
        const newItem = await sideBarItemsModel.addItem(userId,data);
        
        if(newItem){
                return res.status(201).json(newItem)
        }

        } catch (error) {
            return res.status(500).json({error:"error al crear el item"})
       }
    
    }

    
    static async modifyItem(req:Request,res:Response){
        const userId = req.session!.id
        const changes = req.body as SideBarItemChanges
        try {
            const newitem = await sideBarItemsModel.modifyItem(userId,changes)
            
            if(newitem){
                return res.status(200).json(newitem);
            }

        } catch (error:any) {
            console.error(error)
            if(error.message === "Id not found"){
                return res.status(404).json({error:"Id not found"})
            } else{
                return res.status(500).json({error: "Internal server error"})
            }
            
        }
    }


    static async deleteItem(req:Request,res:Response){
        const id = req.params.id;

        if(!id){
            return res.status(400).json({error:"Id is missing"})
        }

        const userId = req.session!.id

        try {        
            const deletedItem = await sideBarItemsModel.deleteItem(userId,id as UUID);

            if(deletedItem){
                return res.status(200).send()
            }
            
            return res.status(404).json({error:"item not found"});
   
        } catch (error) {
            return res.status(500).json({error:"Internal server error"})         

        }
    }

}