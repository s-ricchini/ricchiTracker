import Task from "./Task";

function TaskList({tasks,actions}){
        
    const list = tasks.map(task => {
        return <Task task ={task} handleDelete = {actions.handleDelete} handleCheck = {actions.handleCheck} key={task.id}></Task>
    });


    return(
        <div className=" ml-5 mr-2">{list}</div>
    );

}

export default TaskList