import Task from "./Task";

function TaskList({tasks,setTasks}){
    
    function handleDelete(id){
       console.log('eliminar') 
    }
    
    const list = tasks.map(task => {
        return <Task task ={task} handleDelete = {handleDelete}  key={task.id}></Task>
    });




    return(
        <div>{list}</div>
    );

}

export default TaskList