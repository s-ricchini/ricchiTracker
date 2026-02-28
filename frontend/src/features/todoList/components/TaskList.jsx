import Task from "./Task";

function TaskList({tasks,setTasks}){
    
    function handleDelete(id){
        console.log('eliminar')
        setTasks(tasks => tasks.filter( task => task.id !== id));


    }

    function handleCheck(id){
        console.log('check')
        setTasks(tasks => tasks.map(task => {
            if (task.id === id){
                return {...task, completed: !task.completed};
            } else{
                return(task)
            }

        }))
    }

    
    const list = tasks.map(task => {
        return <Task task ={task} handleDelete = {handleDelete} handleCheck = {handleCheck} key={task.id}></Task>
    });




    return(
        <div className="w-11/12 mx-auto">{list}</div>
    );

}

export default TaskList