import { BlogEntrysModel } from "../models/blogEntrys/blogEntysModel.js"

export class BlogEntysController{
    
    static async getAllEntrys(req,res){
        
        const {id} = req.params
        const userId = req.session.id

        // data = rows o una lista vacia
        const data = await BlogEntrysModel.getAllEntrys(userId,id)

        if(!data){
            return res.status(400).send()
        }

        return res.status(200).json(data)

    }

    static  async deleteEntry(req,res){

        const id = req.params.id
        const userId = req.session.id
        
        try {
            const result = await BlogEntrysModel.deleteEntry(userId,id)
            res.status(200).send()


        } catch (error) {
            res.status(404).send()

        }


    }

    //devuelve la entry entera
    static async createEntry(req,res) {
        
        const {file_id,title,content} = req.body
        const userId = req.session.id
        

        try {
            const newEntry = await BlogEntrysModel.createEntry(userId,file_id,title,content)
            return res.status(201).json(newEntry)

        } catch (error) {
            console.log(error)
            return res.status(404).send()
        }


    }

    static async modifyEntry(req,res){
        const {id} = req.params
        const {title,content} = req.body
        const userId = req.session.id

        try {
            const modifiedEntry = await BlogEntrysModel.modifyEntry(userId,id,title,content)
            return res.status(200).json(modifiedEntry)

        } catch (error) {
            console.error(error)
            return res.status(404).send()
        }


    }


}



