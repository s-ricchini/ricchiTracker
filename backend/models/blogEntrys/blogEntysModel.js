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


}