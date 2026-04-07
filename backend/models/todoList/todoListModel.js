import { pool } from "../../db/connection.js";
export class TodoListModel {

    static async getInterval(from,to){
        try {
            const query = `
                SELECT 
                    BIN_TO_UUID(id) AS id, 
                    title, 
                    completed, 
                    created_at,
                    updated_at
                FROM tasks 
                WHERE 
                    -- 1. Tareas programadas para el rango (Hoy/Mañana)
                    (created_at >= ? AND created_at < ?) 
                    OR 
                    -- 2. Deuda técnica: Tareas viejas que siguen sin hacerse
                    (created_at < ? AND completed = false)
                    OR
                    -- 3. Feedback: Tareas viejas que completaste en este rango
                    (updated_at >= ? AND updated_at < ? AND completed = true)
                ORDER BY 
                    completed ASC,     -- Primero lo que falta hacer
                    updated_at DESC;   -- Lo más reciente arriba
            `

            const [rows] = await pool.query(query, [from, to, from, from, to]);
            return rows;
        } catch (error) {
            console.error("Error en TodoListModel.getInterval:", error);
            return null
        }
        
    }

    static async deleteTask(id){
        try {
            console.log(`intentando borrar ${id}`)
            const [result] = await pool.query('DELETE FROM tasks WHERE id = UUID_TO_BIN(?)',[id])
            return result.affectedRows > 0
        } catch (error) {
            console.error("Model error: ",error)
            throw error
        }

    }

    static async createTask(title, tomorrow = false){
        try {

            const randomId = crypto.randomUUID()
            
            let result = {}
            if(tomorrow){
                [result] = await pool.query('INSERT INTO tasks (id,title,created_at) VALUES (UUID_TO_BIN(?),?,DATE_ADD(NOW(), INTERVAL 1 DAY))',[randomId,title])
            } else{
                [result] = await pool.query("INSERT INTO tasks (id,title) VALUES (UUID_TO_BIN(?),?)",[randomId,title])
            }
            
            if (result.affectedRows == 0){
                throw new Error("Error al crear nueva tarea")
            }

            const [rows] = await pool.query("SELECT BIN_TO_UUID(id) as id, title, completed, created_at, updated_at FROM tasks WHERE id = UUID_TO_BIN(?)",[randomId])
            return rows[0]

        } catch (error) {
            console.error("Error en el modelo: ",error)
            throw error
        }
    }

    static async toggleCheck(id,newState){
        try {
            //cambio el objeto
            const result = await pool.query("UPDATE tasks SET completed = ? WHERE id = UUID_TO_BIN(?)",[newState,id])
            console.log(result)

            if (result.affectedRows === 0){
                throw new Error("No se ecnontro el id");
            }

            //devuelvo el objeto cambiado
            const [rows] = await pool.query("SELECT BIN_TO_UUID(id) as id, title, completed, created_at, updated_at FROM tasks WHERE id = UUID_TO_BIN(?)",[id])
            
            console.log(rows[0])
            return rows[0]
        
        } catch (error) {
            console.error("Error en el modelo",error)
            throw error;
        }


    }

}
