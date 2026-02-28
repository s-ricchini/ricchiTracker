import { useForm } from "react-hook-form"


function AddTaskForm({handleNewTask}){
    
    const {register,handleSubmit,formState: {errors}} = useForm()

    const OnSubmit = (data) => {
        handleNewTask(data)
    }

    return(
        
        <form onSubmit={handleSubmit(OnSubmit)}>
            <input type="text" {...register("title", {required:true})}placeholder="New task"></input>
            {errors.title && <span>This field is required</span>}
            <input type="submit"></input>    
        </form>



    )

}

export default AddTaskForm
