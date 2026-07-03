import { pool } from "../../db/connection.js";
import type { ResultSetHeader,RowDataPacket } from "mysql2";
import type { UUID } from "../../types/allTypes.js";
import type { Task } from "../../types/allTypes.js";

export class TodoListModel {

    static async getInterval(userId:UUID,from:string,to:string) : Promise<Task[]> {
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

            const [rows] = await pool.query<RowDataPacket[] & Task[]>(query, [userId,from, to, from, from, to]);
            return rows;
        } catch (error) {
            console.error("Error en TodoListModel.getInterval:", error);
            throw error
        }
        
    }

    static async deleteTask(userId:UUID,id:UUID):Promise<boolean>{
        try {
            console.log(`intentando borrar ${id}`)
            const [result] = await pool.query<ResultSetHeader>('DELETE FROM tasks WHERE id = UUID_TO_BIN(?) AND user_id = UUID_TO_BIN(?)',[id,userId])
            return result.affectedRows > 0
        } catch (error) {
            console.error("Model error: ",error)
            throw error
        }

    }

    static async createTask(userId:UUID,title:string, tomorrow = false) : Promise<Task>{
        try {

            const randomId = crypto.randomUUID()
            
            let result;
            if(tomorrow){
                [result] = await pool.query<ResultSetHeader>('INSERT INTO tasks (id,user_id,title,created_at) VALUES (UUID_TO_BIN(?),UUID_TO_BIN(?),?,DATE_ADD(NOW(), INTERVAL 1 DAY))',[randomId,userId,title])
            } else{
                [result] = await pool.query<ResultSetHeader>("INSERT INTO tasks (id,user_id,title) VALUES (UUID_TO_BIN(?),UUID_TO_BIN(?),?)",[randomId,userId,title])
            }
            
            if (result.affectedRows == 0){
                throw new Error("Error al crear nueva tarea")
            }

            const [rows] = await pool.query<RowDataPacket[] & Task[]>("SELECT BIN_TO_UUID(id) as id, title, completed, created_at, updated_at FROM tasks WHERE id = UUID_TO_BIN(?) AND user_id = UUID_TO_BIN(?)",[randomId,userId])
            return rows[0]!

        } catch (error) {
            console.error("Error en el modelo: ",error)
            throw error
        }
    }

    static async toggleCheck(userId:UUID,id:UUID,newState:boolean):Promise<Task>{
        try {
            //cambio el objeto
            const [result] = await pool.query<ResultSetHeader>("UPDATE tasks SET completed = ? WHERE id = UUID_TO_BIN(?) AND user_id = UUID_TO_BIN(?)",[newState,id,userId])
            console.log(result)

            if (result.affectedRows === 0){
                throw new Error("No se encontro el id");
            }

            //devuelvo el objeto cambiado
            const [rows] = await pool.query<RowDataPacket[] & Task[]>("SELECT BIN_TO_UUID(id) as id, title, completed, created_at, updated_at FROM tasks WHERE id = UUID_TO_BIN(?) AND user_id = UUID_TO_BIN(?)",[id,userId])
            
            console.log(rows[0])
            return rows[0]!
        
        } catch (error) {
            console.error("Error en el modelo",error)
            throw error;
        }


    }

}
