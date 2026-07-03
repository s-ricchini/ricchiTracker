import { BlogEntrysModel } from "../models/blogEntrys/blogEntysModel.js"
import type { Request,Response } from "express"
import type { UUID } from "../types/allTypes.js"

export class BlogEntysController{
    
    static async getAllEntrys(req:Request,res:Response){
        const {id} = req.params
        const userId = req.session!.id

        if(!id){
            return res.status(400).send()
        }

        // data = rows o una lista vacia
        const data = await BlogEntrysModel.getAllEntrys(userId,id as UUID)

        if(!data){
            return res.status(400).send()
        }

        return res.status(200).json(data)

    }

    static  async deleteEntry(req:Request,res:Response){

        const id = req.params.id
        if(!id){
            throw new Error("No id")
        }

        const userId = req.session!.id
        
        try {
            const result = await BlogEntrysModel.deleteEntry(userId,id as UUID)
            
            if(result){
                res.status(200).send()   
            }

        } catch (error) {
            res.status(404).send()

        }


    }

    //devuelve la entry entera
    static async createEntry(req:Request,res:Response) {
        
        const {file_id,title,content} = req.body
        const userId = req.session!.id
        

        try {
            const newEntry = await BlogEntrysModel.createEntry(userId,file_id,title,content)
            return res.status(201).json(newEntry)

        } catch (error) {
            console.log(error)
            return res.status(404).send()
        }


    }

    static async modifyEntry(req:Request,res:Response){
        const {id} = req.params

        if(!id){
            res.status(404).send()
        }

        //ya se valida en zod
        const {title,content} = req.body
        const userId = req.session!.id

        try {
            const modifiedEntry = await BlogEntrysModel.modifyEntry(userId,id as UUID,title,content)
            return res.status(200).json(modifiedEntry)

        } catch (error) {
            console.error(error)
            return res.status(404).send()
        }


    }


}



