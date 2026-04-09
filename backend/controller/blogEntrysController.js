import { BlogEntrysModel } from "../models/blogEntrys/blogEntysModel"

export class BlogEntysController{
    
    static async getAllEntrys(req,res){
        
        const {file_id} = req.params
        
        // data = rows o una lista vacia
        const data = await BlogEntrysModel.getAllEntrys(file_id)

        if(!data){
            return res.status(400).send()
        }

        return res.status(200).json(data)

    }

}