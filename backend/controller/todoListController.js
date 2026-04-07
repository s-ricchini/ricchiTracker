import { TodoListModel } from "../models/todoList/todoListModel.js"

export class TodoListController {
    static async getTasksTodayAndTomorrow(req,res){
        
        const from = req.query.from
        const to = req.query.to
        
        if(!to || !from){
            return res.status(400).json({error:"faltan parametros en la url"})
        }

        //busco las tareas para ese intervalo de tiempo
        const result = await TodoListModel.getInterval(from,to)
        if(!result){
            return res.status(400).json({error:"error"})
        }

        return res.status(200).json(result)

    }


    static async deleteTask(req,res){
        const id = req.params;
        try {
            const wasDeleted = await TodoListModel.deleteTask(id);
            
            if(!wasDeleted){
                return res.status(400).json({error:"La tarea no existia"})
            }
            
            return res.status(200)
        } catch (error) {
            return res.status(500).json({error:"Error al borrar la tarea"})
        }
    }


    static async createTask(req,res){
        const title = req.body.title;
        const tomorrow = req.body.tomorrow
        
        try {
            const result = await TodoListModel.createTask(title,tomorrow)
            console.log(result)
            return res.status(201).json(result)
        } catch (error) {
            return res.status(400).json({error:"Error: Can't create task"})
        }  


    }

}