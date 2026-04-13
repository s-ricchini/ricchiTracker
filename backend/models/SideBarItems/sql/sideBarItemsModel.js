import { pool } from "../../../db/connection.js";

export class sideBarItemsModel {

    static async getAll(){
        try {
            const [rows] = await pool.query("SELECT BIN_TO_UUID(id) as id,name,type,color,BIN_TO_UUID(parent_id) as parent_id,position,is_open FROM sidebar_elements;")
            return rows

        } catch (error) {
            console.error("error en el modelo", error)
        }


    }
    

    static async addItem(newItem){
        console.log(newItem)
        const {id,name,type,color,parent_id,position,is_open} = newItem
        
        
        try {
            const [result] = await pool.query("INSERT INTO sidebar_elements (id,name,type,color,parent_id,position,is_open) VALUES (UUID_TO_BIN(?),?,?,?,UUID_TO_BIN(?),?,?);",
            [id,name,type,color,parent_id,position,is_open])

            if(result.affectedRows === 0){
                return null
            }

            //busco el item que cree
            const [rows] = await pool.query("SELECT BIN_TO_UUID(id) as id,name,type,color,BIN_TO_UUID(parent_id) as parent_id,position,is_open FROM sidebar_elements WHERE id = UUID_TO_BIN(?);",[id] )
            return rows[0]

        } catch (error) {
            console.error("Error en el modelo",error)
            return null;
        }

    }

    static async modifyItem(changes){
        const modifyCol = Object.keys(changes).find(key => key !== 'id');
        const newValue = changes[modifyCol];

        console.log(changes)


        try {
            let result;
            
            if(modifyCol === "color"){
                [result] = await pool.query("UPDATE sidebar_elements SET color = ? WHERE id = UUID_TO_BIN(?);",[newValue,changes.id])            
            }

            if(modifyCol === "name"){
                [result] = await pool.query("UPDATE sidebar_elements SET name = ? WHERE id = UUID_TO_BIN(?);",[newValue,changes.id])
            }
            
            if(modifyCol === "is_open"){
                const boolValue = newValue ? 1 : 0;
                [result] = await pool.query("UPDATE sidebar_elements SET is_open = ? WHERE id = UUID_TO_BIN(?);",[boolValue,changes.id])
            }

            if(!result){
                return null
            }

            if(result.affectedRows === 0){
                return null
            }

            //devuelvo el objeto modificado
            const [rows] = await pool.query("SELECT BIN_TO_UUID(id) as id,name,type,color,BIN_TO_UUID(parent_id) as parent_id,position,is_open FROM sidebar_elements WHERE id = UUID_TO_BIN(?);",[changes.id] )
            return rows[0]

        } catch (error) {
            console.error(error)
            return null
        }
        
    }

    static async deleteItem(id){
        try {
            console.log(`intentando borrar ${id}`)
            const [result] = await pool.query('DELETE FROM sidebar_elements WHERE id = UUID_TO_BIN(?)',[id])
            return result.affectedRows > 0
        } catch (error) {
            console.error("Model error: ",error)
            throw error
        }

    }
}
