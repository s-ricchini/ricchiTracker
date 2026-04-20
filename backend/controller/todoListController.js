import { TodoListModel } from "../models/todoList/todoListModel.js"

export class TodoListController {
    static async getTasksTodayAndTomorrow(req,res){
        
        const from = req.query.from
        const to = req.query.to
        const userId = req.session.id
        
        if(!to || !from){
            return res.status(400).json({error:"faltan parametros en la url"})
        }

        //busco las tareas para ese intervalo de tiempo
        const result = await TodoListModel.getInterval(userId,from,to)
        if(!result){
            return res.status(400).json({error:"error"})
        }

        return res.status(200).json(result)

    }


    static async deleteTask(req,res){
        const id = req.params.id
        const userId = req.session.id

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


    static async createTask(req,res){
        const title = req.body.title;
        const tomorrow = req.body.tomorrow
        const userId = req.session.id

        try {
            const result = await TodoListModel.createTask(userId,title,tomorrow)
            console.log(result)
            return res.status(201).json(result)
        } catch (error) {
            return res.status(400).json({error:"Error: Can't create task"})
        }  


    }

    static async toggleCheck(req,res){
        
        const {id} = req.params
        const {newState} = req.body
        const userId = req.session.id

        console.log(id)
        console.log(newState)
        
        try {
            const result = await TodoListModel.toggleCheck(userId,id,newState);
            return res.status(200).json(result)

        } catch (error) {
            console.error(error)
            return res.status(400).json({error:"error al modificar el task"})
        }
    }

}