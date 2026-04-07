import { useState,useEffect, useMemo } from "react";
import TaskList from "./TaskList";
import AddTaskForm from "./AddTaskForm";

function TodoList() {
  //array de perueba posteriormente hace fetch a db mysql

  const [tasks,setTasks] = useState([])
  const [selected, setSelected] = useState("today");

   
  //useEffect para recuperar la data al cargar el componente
  useEffect(() => {
      const hoyLocal = new Date(); 
      hoyLocal.setHours(0, 0, 0, 0); 
      const inicioUTC = hoyLocal.toISOString();
    
      const finDeMañana = new Date(hoyLocal);
      finDeMañana.setDate(hoyLocal.getDate() + 2); // Le sumamos 2 días exactos

      const finUTC = finDeMañana.toISOString();

      const fetchTaskData = async (from,to) => {
          try {
              const response = await fetch(`http://localhost:1234/tasks?from=${from}&to=${to}`);
              const data = await response.json();
              setTasks(data)
              console.log(data);
              
          } catch (error) {
              console.error("Error recuperando los items:", error);
          };
          
        }
      fetchTaskData(inicioUTC,finUTC)
    }, []); 
    
    
  const { tasksHoy, tasksMañana } = useMemo(() => {
    
    // Sacamos el string "YYYY-MM-DD" de hoy en hora local
    const hoyString = new Date().toLocaleDateString('sv-SE'); 

    const hoy = [];
    const mañana = [];

    tasks.forEach(task => {
      const fechaCreacion = new Date(task.created_at).toLocaleDateString('sv-SE');
      const fechaUpdate = new Date(task.updated_at).toLocaleDateString('sv-SE');

      if (fechaCreacion <= hoyString || (fechaUpdate === hoyString || fechaCreacion < hoyString)){ //ACA HAY UN BUG 
        hoy.push(task);
      } else {
        mañana.push(task);
      }
    });

    return { tasksHoy: hoy, tasksMañana: mañana };
  }, [tasks]);

  function handleNewTask(newTask){
    console.log('hola')
  }


  async function handleCheck(id){
    console.log('hola')
  }


  async function handleDelete(id){
    console.log('hola')
  }



  return (
    <div className=" bg-white p-5 space-y-4">
      <div className="bg-white flex gap-4 text-md text-xl ">
        <button
          onClick={() => {
            setSelected("today");
          }}
          className={`hover:cursor-pointer ${selected === "today" ? "text-orange-500" : ""}`}
        >
          Today
        </button>
        <button
          onClick={() => {
            setSelected("tomorrow");
          }}
          className={`hover:cursor-pointer ${selected === "tomorrow" ? "text-orange-500" : ""}`}
        >
          Tomorrow
        </button>
      </div>
      {selected === "today" ? (
        <TaskList tasks={tasksHoy} setTasks={setTasks}></TaskList>
      ) : (
        <TaskList tasks={tasksMañana} setTasks={setTasks}></TaskList>
      )}
      <AddTaskForm handleNewTask={handleNewTask}></AddTaskForm>
    </div>
  );
}

export default TodoList;
