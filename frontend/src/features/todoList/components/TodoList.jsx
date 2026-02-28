import { useState } from "react";
import TaskList from "./TaskList";
import AddTaskForm from "./AddTaskForm";


function TodoList(){
    //array de perueba posteriormente hace fetch a db mysql
    const todosHoy = [
        {
            id: 1,
            title: "Estudiar árboles binarios",
            completed: false,
            created_at: "2026-02-26"
        },
        {
            id: 2,
            title: "Repasar middleware en Express",
            completed: true,
            created_at: "2026-02-26"
        },
        {
            id: 3,
            title: "Resolver 5 ejercicios de SQL",
            completed: false,
            created_at: "2026-02-26"
        },
        {
            id: 4,
            title: "Planificar features del dashboard",
            completed: true,
            created_at: "2026-02-26"
        },
        {
            id: 5,
            title: "Escribir entrada de progreso",
            completed: false,
            created_at: "2026-02-26"
        }
    ];

    const todosManana = [
        {
            id: 1,
            title: "Implementar endpoint de folders",
            completed: false,
            created_at: "2026-02-27"
        },
        {
            id: 2,
            title: "Conectar frontend con backend (mock)",
            completed: false,
            created_at: "2026-02-27"
        },
        {
            id: 3,
            title: "Agregar filtro por carpeta",
            completed: false,
            created_at: "2026-02-27"
        },
        {
            id: 4,
            title: "Optimizar estructura de features",
            completed: false,
            created_at: "2026-02-27"
        },
        {
            id: 5,
            title: "Revisar diseño de base de datos",
            completed: false,
            created_at: "2026-02-27"
        }
    ];


    //3 ESTADOS 
    // 1 tareas de hoy + las inconclusas
    // 2 tareas de manana 
    // 3 el dia que se va a mostrar actualente

    const [today,setToday] = useState(todosHoy)
    const [tomorrow,setTomorow] = useState(todosManana)
    const [selected,setSelected] = useState('today')


    function handleNewTask(newTask){

        if(selected === "today"){
            setToday(today => [...today,{
                id: (today.length + 1), //este id se va a cambiar, se va a poner el inserted id que te devuelva la db
                title: newTask.title,
                completed: false,
                created_at: "2026-02-26" //poner la fecha real cuando se use db

            }])
        } else{
            setTomorow( tomorrow => [...tomorrow,{
                id: (tomorrow.length + 1), //este id se va a cambiar, se va a poner el inserted id que te devuelva la db
                title: newTask.title,
                completed: false,
                created_at: "2026-02-26" //poner la fecha real cuando se use db

            }])
        }

    }

    return(
        <div className="w-1/2 bg-white p-5 space-y-4">
            <div className="bg-white flex gap-4 text-md text-xl ">
                <button onClick={() => {setSelected('today')}} className={`hover:cursor-pointer ${selected === "today" ? "text-orange-500": ''}`}>Today</button>
                <button onClick={() => {setSelected('tomorrow')}} className={`hover:cursor-pointer ${selected === "tomorrow" ? "text-orange-500": ''}`}>Tomorrow</button>
            </div>
            {selected === "today" ? <TaskList tasks={today} setTasks={setToday}></TaskList> : <TaskList tasks={tomorrow} setTasks={setTomorow}></TaskList> }
            <AddTaskForm handleNewTask = {handleNewTask}></AddTaskForm>
        </div>
        
    );
}

export default TodoList;