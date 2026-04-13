import { pool } from "../../db/connection.js";


export class BlogEntrysModel{
    static async getAllEntrys(fileId) {
        try {
            const [rows] = await pool.query(
                `SELECT 
                    BIN_TO_UUID(id) as id, 
                    BIN_TO_UUID(file_id) as file_id, 
                    title, 
                    content, 
                    created_at, 
                    updated_at 
                FROM blog_entrys 
                WHERE file_id = UUID_TO_BIN(?) 
                ORDER BY created_at DESC;`, 
                [fileId]
            );
            console.log(rows)
            return rows;

        } catch (error) {
            console.error("Error al obtener las entradas del blog:", error);
            return [];
        }
    }

    static async deleteEntry(id){
        try {
            console.log(`intentando borrar entry: ${id}`)
            const [result] = await pool.query('DELETE FROM blog_entrys WHERE id = UUID_TO_BIN(?)',[id])
            
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

    static async createEntry(file_id,title,content){
        
        const id = crypto.randomUUID()
        try {
            const [result] = await pool.query("INSERT INTO blog_entrys (id,file_id,title,content) VALUES (UUID_TO_BIN(?),UUID_TO_BIN(?),?,?);", [id,file_id,title,content])

            if(result.affectedRows === 0){
                throw new Error('Error en la query')
            }

            //busco el item que cree
            const [rows] = await pool.query("SELECT BIN_TO_UUID(id) as id,BIN_TO_UUID(file_id) as file_id,title,content,created_at FROM blog_entrys WHERE id = UUID_TO_BIN(?);",[id] )
            console.log(rows[0])
            
            return rows[0]
            

        } catch (error) {
            console.error("Error en el modelo",error)
            throw error;
        }

    }

    static async modifyEntry(id,title,content){
        try {
            
            const [result] = await pool.query("UPDATE blog_entrys SET title = ?, content = ? WHERE id = UUID_TO_BIN(?);",[title, content, id])
            if (result.affectedRows === 0){
                throw new Error("Id not found")
            }

            //busco el item que modifique
            const [rows] = await pool.query("SELECT BIN_TO_UUID(id) as id,BIN_TO_UUID(file_id) as file_id,title,content,created_at FROM blog_entrys WHERE id = UUID_TO_BIN(?);",[id] )
            console.log(rows[0])
            return rows[0]

        } catch (error) {
            console.error(error)
            throw error;
        }


    }
}