import { useForm } from "react-hook-form"
import CirclePlus from "../../../assets/icons/CirclePlus"

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
                <CirclePlus color={'black'} hoverColor={"orange"} size={14}></CirclePlus>    
            </button>    
        </form>



    )

}


export default AddTaskForm
