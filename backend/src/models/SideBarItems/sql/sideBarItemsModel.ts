import { pool } from "../../../db/connection.js";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

import type { UUID,SideBarItem,SideBarItemChanges } from "../../../types/allTypes.js";


export class sideBarItemsModel {

    static async getAll(userId:UUID) : Promise<SideBarItem[]>{
        try {
            const [rows] = await pool.query<RowDataPacket[] & SideBarItem[]>("SELECT BIN_TO_UUID(id) as id,name,type,color,BIN_TO_UUID(parent_id) as parent_id,position,is_open FROM sidebar_elements WHERE user_id = UUID_TO_BIN(?);",[userId])
            return rows

        } catch (error) {
            console.error("error en el modelo", error)
            throw error
        }

    }
    

    static async addItem(userId:UUID,newItem:SideBarItem) : Promise<SideBarItem>{
        console.log(newItem)
        const {id,name,type,color,parent_id,position,is_open} = newItem
        
        
        try {
            const [result] = await pool.query<ResultSetHeader>("INSERT INTO sidebar_elements (id,user_id,name,type,color,parent_id,position,is_open) VALUES (UUID_TO_BIN(?),UUID_TO_BIN(?),?,?,?,UUID_TO_BIN(?),?,?);",
            [id,userId,name,type,color,parent_id,position,is_open])

            if(result.affectedRows === 0){
                throw new Error("Internal server error")
            }

            //busco el item que cree
            const [rows] = await pool.query<RowDataPacket[] & SideBarItem[]>("SELECT BIN_TO_UUID(id) as id,name,type,color,BIN_TO_UUID(parent_id) as parent_id,position,is_open FROM sidebar_elements WHERE id = UUID_TO_BIN(?) AND user_id = UUID_TO_BIN(?);",[id,userId] )
            return rows[0]!
  
        } catch (error) {

            console.error("Error en el modelo",error)
            throw error
        }

    }

    static async modifyItem(userId:UUID ,changes:SideBarItemChanges ) : Promise<SideBarItem> {
        const modifyCol = Object.keys(changes).find(key => key !== 'id') as keyof Omit<SideBarItemChanges, 'id'>;
        const newValue = changes[modifyCol];

        console.log(changes)


        try {
            let result;
            
            if(modifyCol === "color"){
                [result] = await pool.query<ResultSetHeader>("UPDATE sidebar_elements SET color = ? WHERE id = UUID_TO_BIN(?) AND user_id = UUID_TO_BIN(?);",[newValue,changes.id,userId])            
            }

            if(modifyCol === "name"){
                [result] = await pool.query<ResultSetHeader>("UPDATE sidebar_elements SET name = ? WHERE id = UUID_TO_BIN(?) AND user_id = UUID_TO_BIN(?) ;",[newValue,changes.id,userId])
            }
            
            if(modifyCol === "is_open"){
                const boolValue = newValue ? 1 : 0;
                [result] = await pool.query<ResultSetHeader>("UPDATE sidebar_elements SET is_open = ? WHERE id = UUID_TO_BIN(?) AND user_id = UUID_TO_BIN(?);",[boolValue,changes.id,userId])
            }

            if(!result){
                throw new Error("Internal server error")
            }

            if(result.affectedRows === 0){
                throw new Error("Id not found")
            }

            //devuelvo el objeto modificado
            const [rows] = await pool.query<RowDataPacket[] & SideBarItem[]>("SELECT BIN_TO_UUID(id) as id,name,type,color,BIN_TO_UUID(parent_id) as parent_id,position,is_open FROM sidebar_elements WHERE id = UUID_TO_BIN(?) AND user_id = UUID_TO_BIN(?);",[changes.id,userId] )
            return rows[0]!

        } catch (error) {
            console.error(error)
            throw error
        }
        
    }

    static async deleteItem(userId:UUID,id:UUID) : Promise<boolean>{
        try {
            console.log(`intentando borrar ${id}`)
            const [result] = await pool.query<ResultSetHeader>('DELETE FROM sidebar_elements WHERE id = UUID_TO_BIN(?) AND user_id = UUID_TO_BIN(?)',[id,userId])
            return (result.affectedRows > 0)
        } catch (error) {
            console.error("Model error: ",error)
            throw error
        }

    }
}
