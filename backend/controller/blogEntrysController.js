import { BlogEntrysModel } from "../models/blogEntrys/blogEntysModel.js"

export class BlogEntysController{
    
    static async getAllEntrys(req,res){
        
        const {id} = req.params
        
        // data = rows o una lista vacia
        const data = await BlogEntrysModel.getAllEntrys(id)

        if(!data){
            return res.status(400).send()
        }

        return res.status(200).json(data)

    }

}

