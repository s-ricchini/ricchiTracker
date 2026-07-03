import type { Request,Response,NextFunction } from "express";
import type { ZodObject } from "zod";

//middleware generico que procesa schemas, pueden hacer procesamiento parcial para patch
 export const validateSchema = (schema:ZodObject, parcial = false) => {
    return (req:Request,res:Response,next:NextFunction) => {
        const input = req.body

        let result = null;

        if(parcial){
            result = schema.partial().safeParse(input)
        } else{
            result = schema.safeParse(input)
        }

        if (!result.success){
            return res.status(400).json(result.error);
            
        }

        req.body = result.data;
        next()
    }
}