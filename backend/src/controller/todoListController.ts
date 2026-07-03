import { TodoListModel } from "../models/todoList/todoListModel.js"
import type { Request,Response } from "express"
import type { UUID } from "../types/allTypes.js"

export class TodoListController {
    static async getTasksTodayAndTomorrow(req:Request,res:Response){
        
        const from = req.query.from as string
        const to = req.query.to as string
        const userId = req.session!.id
        
        if(!to || !from){
            return res.status(400).json({error:"faltan parametros en la url"})
        }

        try {        
            //busco las tareas para ese intervalo de tiempo
            const result = await TodoListModel.getInterval(userId,from,to)
            
            if(!result){
                throw new Error("Internal server error")
            }

            return res.status(200).json(result)
   
        } catch (error) {
            return res.status(500).json({error:"Internal server error"})
        }

    }


    static async deleteTask(req:Request,res:Response){
        const id = req.params.id as UUID
        const userId = req.session!.id

        if(!id){
            return res.status(400).json({error:"Id is missing"})
        }

        try {
            const wasDeleted = await TodoListModel.deleteTask(userId,id);
            
            if(!wasDeleted){
                return res.status(400).json({error:"La tarea no existia"})
            }
            
            return res.status(200).send()
        } catch (error) {
            return res.status(500).json({error:"Error al borrar la tarea"})
        }
    }


    static async createTask(req:Request,res:Response){
        const title = req.body.title as string;
        const tomorrow = req.body.tomorrow as boolean
        const userId = req.session!.id

        try {
            const result = await TodoListModel.createTask(userId,title,tomorrow)
            console.log(result)
            return res.status(201).json(result)
        } catch (error) {
            return res.status(500).json({error:"Error: Can't create task"})
        }  


    }

    static async toggleCheck(req:Request,res:Response){
        
        const {id} = req.params
        const {newState} = req.body
        const userId = req.session!.id

        console.log(id)
        console.log(newState)
        
        try {
            const result = await TodoListModel.toggleCheck(userId,id as UUID,newState as boolean);
            return res.status(200).json(result)

        } catch (error) {
            console.error(error)
            return res.status(400).json({error:"error al modificar el task"})
        }
    }

}