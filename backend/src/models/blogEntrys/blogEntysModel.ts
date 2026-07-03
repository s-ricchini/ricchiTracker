import { pool } from "../../db/connection.js";

import type { ResultSetHeader, RowDataPacket } from "mysql2";
import type { UUID,BlogEntry } from "../../types/allTypes.js";


export class BlogEntrysModel{
    static async getAllEntrys(userId: UUID ,fileId:UUID) : Promise<BlogEntry[]> {
        try {
            const [rows] = await pool.query<RowDataPacket[] & BlogEntry[]>(
                `SELECT 
                    BIN_TO_UUID(id) as id, 
                    BIN_TO_UUID(file_id) as file_id, 
                    title, 
                    content, 
                    created_at, 
                    updated_at 
                FROM blog_entrys 
                WHERE user_id = UUID_TO_BIN(?) AND file_id = UUID_TO_BIN(?) 
                ORDER BY created_at DESC;`, 
                [userId,fileId]
            );
            console.log(rows)
            return rows;

        } catch (error) {
            console.error("Error al obtener las entradas del blog:", error);
            return [];
        }
    }

    static async deleteEntry(userId:UUID,id:UUID) : Promise<boolean>{
        try {
            console.log(`intentando borrar entry: ${id}`)
            const [result] = await pool.query<ResultSetHeader>('DELETE FROM blog_entrys WHERE user_id = UUID_TO_BIN(?) AND id = UUID_TO_BIN(?)',[userId,id])
            
            if (result.affectedRows === 0){
                throw new Error("invalid id")
            } else{
                console.log("entry eliminada correctamente")
                return true
            }
        
        } catch (error) {
            console.error("Model error: ",error)
            throw error
        }

    }

    static async createEntry(userId:UUID,file_id:UUID,title:string,content:string):Promise<BlogEntry>{
        
        const id = crypto.randomUUID()
        try {
            const [result] = await pool.query<ResultSetHeader>("INSERT INTO blog_entrys (id,user_id,file_id,title,content) VALUES (UUID_TO_BIN(?),UUID_TO_BIN(?),UUID_TO_BIN(?),?,?);", [id,userId,file_id,title,content])

            if(result.affectedRows === 0){
                throw new Error('Error en la query')
            }

            //busco el item que cree
            const [rows] = await pool.query<RowDataPacket[] & BlogEntry[]>("SELECT BIN_TO_UUID(id) as id,BIN_TO_UUID(file_id) as file_id,title,content,created_at FROM blog_entrys WHERE user_id = UUID_TO_BIN(?) AND id = UUID_TO_BIN(?);",[userId,id] )
            console.log(rows[0])
            
            return rows[0]!
            

        } catch (error) {
            console.error("Error en el modelo",error)
            throw error;
        }

    }

    static async modifyEntry(userId:UUID,id:UUID,title:string,content:string): Promise<BlogEntry>{
        try {
            
            const [result] = await pool.query<ResultSetHeader>("UPDATE blog_entrys SET title = ?, content = ? WHERE user_id = UUID_TO_BIN(?) AND id = UUID_TO_BIN(?);",[title,content,userId,id])
            if (result.affectedRows === 0){
                throw new Error("Id not found")
            }

            //busco el item que modifique
            const [rows] = await pool.query<RowDataPacket[] & BlogEntry[]>("SELECT BIN_TO_UUID(id) as id,BIN_TO_UUID(file_id) as file_id,title,content,created_at FROM blog_entrys WHERE user_id = UUID_TO_BIN(?) AND id = UUID_TO_BIN(?);",[userId,id] )
            console.log(rows[0])
            return rows[0]!

        } catch (error) {
            console.error(error)
            throw error;
        }

    }
}