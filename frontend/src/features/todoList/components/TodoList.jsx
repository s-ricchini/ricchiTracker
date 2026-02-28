import { useState } from "react";
import TaskList from "./TaskList";

function TodoList(){
    //array de perueba
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
            id: 6,
            title: "Implementar endpoint de folders",
            completed: false,
            created_at: "2026-02-27"
        },
        {
            id: 7,
            title: "Conectar frontend con backend (mock)",
            completed: false,
            created_at: "2026-02-27"
        },
        {
            id: 8,
            title: "Agregar filtro por carpeta",
            completed: false,
            created_at: "2026-02-27"
        },
        {
            id: 9,
            title: "Optimizar estructura de features",
            completed: false,
            created_at: "2026-02-27"
        },
        {
            id: 10,
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


    return(
        <div>
            <div className="bg-white flex gap-4 text-md ">
                <button onClick={() => {setSelected('today')}}>Today</button>
                <button onClick={() => {setSelected('tomorrow')}}>Tomorrow</button>
            </div>
            {selected === "today" ? <TaskList tasks={today} setTasks={setToday}></TaskList> : <TaskList tasks={tomorrow} setTasks={setTomorow}></TaskList> }
        </div>
        
    );
}

export default TodoList;