import { pool } from "../../db/connection.js";
export class TodoListModel {

    static async getInterval(userId,from,to){
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
                    user_id = UUID_TO_BIN(?) AND (
                    (created_at >= ? AND created_at < ?) 
                    OR 
                    (created_at < ? AND completed = false)
                    OR
                    (updated_at >= ? AND updated_at < ? AND completed = true))
                ORDER BY 
                    completed ASC,     -- Primero lo que falta hacer
                    updated_at DESC;   -- Lo más reciente arriba
            `

            const [rows] = await pool.query(query, [userId,from, to, from, from, to]);
            return rows;
        } catch (error) {
            console.error("Error en TodoListModel.getInterval:", error);
            return null
        }
        
    }

    static async deleteTask(userId,id){
        try {
            console.log(`intentando borrar ${id}`)
            const [result] = await pool.query('DELETE FROM tasks WHERE id = UUID_TO_BIN(?) AND user_id = UUID_TO_BIN(?)',[id,userId])
            return result.affectedRows > 0
        } catch (error) {
            console.error("Model error: ",error)
            throw error
        }

    }

    static async createTask(userId,title, tomorrow = false){
        try {

            const randomId = crypto.randomUUID()
            
            let result = {}
            if(tomorrow){
                [result] = await pool.query('INSERT INTO tasks (id,user_id,title,created_at) VALUES (UUID_TO_BIN(?),UUID_TO_BIN(?),?,DATE_ADD(NOW(), INTERVAL 1 DAY))',[randomId,userId,title])
            } else{
                [result] = await pool.query("INSERT INTO tasks (id,user_id,title) VALUES (UUID_TO_BIN(?),UUID_TO_BIN(?),?)",[randomId,userId,title])
            }
            
            if (result.affectedRows == 0){
                throw new Error("Error al crear nueva tarea")
            }

            const [rows] = await pool.query("SELECT BIN_TO_UUID(id) as id, title, completed, created_at, updated_at FROM tasks WHERE id = UUID_TO_BIN(?) AND user_id = UUID_TO_BIN(?)",[randomId,userId])
            return rows[0]

        } catch (error) {
            console.error("Error en el modelo: ",error)
            throw error
        }
    }

    static async toggleCheck(userId,id,newState){
        try {
            //cambio el objeto
            const [result] = await pool.query("UPDATE tasks SET completed = ? WHERE id = UUID_TO_BIN(?) AND user_id = UUID_TO_BIN(?)",[newState,id,userId])
            console.log(result)

            if (result.affectedRows === 0){
                throw new Error("No se ecnontro el id");
            }

            //devuelvo el objeto cambiado
            const [rows] = await pool.query("SELECT BIN_TO_UUID(id) as id, title, completed, created_at, updated_at FROM tasks WHERE id = UUID_TO_BIN(?) AND user_id = UUID_TO_BIN(?)",[id,userId])
            
            console.log(rows[0])
            return rows[0]
        
        } catch (error) {
            console.error("Error en el modelo",error)
            throw error;
        }


    }

}
