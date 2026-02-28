import { useForm } from "react-hook-form"
import { useState } from "react"

function AddTaskForm({handleNewTask}){
    
    const {register,handleSubmit,formState: {errors}} = useForm()

    const OnSubmit = (data) => {
        handleNewTask(data)
    }

    return(
        
        <form onSubmit={handleSubmit(OnSubmit)} className="flex items-center gap-2" >
            <div className="flex flex-col w-full">
                <input className="text-xl border-3 p-2 rounded-xl hover:border-amber-500" type="text" {...register("title", {required:true})}placeholder="New task"></input>
                {errors.title && <span className="text-sm text-red-700">This field is required</span>}
            </div>
            <button type="submit">
                <CirclePlus color={'black'} hoverColor={"orange"}></CirclePlus>    
            </button>    
        </form>



    )

}

function CirclePlus({color,hoverColor}){

    const [currentColor,setCurrentColor] = useState(color);
    
    return(
        <svg onMouseEnter={() => {setCurrentColor(hoverColor)}} onMouseLeave={() => {setCurrentColor(color)}} className="size-14 hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill={currentColor} d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM296 408L296 344L232 344C218.7 344 208 333.3 208 320C208 306.7 218.7 296 232 296L296 296L296 232C296 218.7 306.7 208 320 208C333.3 208 344 218.7 344 232L344 296L408 296C421.3 296 432 306.7 432 320C432 333.3 421.3 344 408 344L344 344L344 408C344 421.3 333.3 432 320 432C306.7 432 296 421.3 296 408z"/></svg>

    )
}

export default AddTaskForm
