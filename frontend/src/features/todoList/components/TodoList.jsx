import { useState,useEffect, useMemo } from "react";
import TaskList from "./TaskList";
import AddTaskForm from "./AddTaskForm";
import { useNavigate } from "react-router-dom";

import authFetch from "../../../functions/authFetch";


function TodoList() {
  //array de perueba posteriormente hace fetch a db mysql

  const [tasks,setTasks] = useState([])
  const [selected, setSelected] = useState("today");
  const navigate = useNavigate()
   
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
              const response = await authFetch(`http://localhost:1234/tasks?from=${from}&to=${to}`,{
                method:"GET",
              },navigate);
            
             
              const data = await response.json();
              setTasks(data)
              console.log(data);
             
  
          } catch (error) {
              console.error("Error recuperando los items:", error);
          };
          
        }
      fetchTaskData(inicioUTC,finUTC)
    }, [navigate]); 
    
    
  const { tasksHoy, tasksMañana } = useMemo(() => {
    
    // Sacamos el string "YYYY-MM-DD" de hoy en hora local
    const hoyString = new Date().toLocaleDateString('sv-SE'); 

    const hoy = [];
    const mañana = [];

    tasks.forEach(task => {
      const fechaCreacion = new Date(task.created_at).toLocaleDateString('sv-SE');
      //const fechaUpdate = new Date(task.updated_at).toLocaleDateString('sv-SE');

      if (fechaCreacion <= hoyString){ 
        hoy.push(task);
      } else {
        mañana.push(task);
      }
    });

    return { tasksHoy: hoy, tasksMañana: mañana };
  }, [tasks]);


  async function handleNewTask(title){
    
    const reqBody = {title:title,tomorrow:false}

    if (selected === "tomorrow"){
      reqBody.tomorrow = true
    
    }

    try {
      const response = await authFetch("http://localhost:1234/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        },navigate);

      if(!response.ok){
        throw new Error('Error al crear tarea')
      }

      const newTask = await response.json()
      
      //por el memo se va a actualizar las listas
      setTasks(prev => [...prev,newTask])

    } catch (error) {
      console.log("Error al crear tarea",error)      
    }

  }


  async function handleDelete(id){
    const prevState = tasks

    //borrado optimista
    setTasks(tasks => tasks.filter( task => task.id !== id));

    try {
      const response = await authFetch(`http://localhost:1234/tasks/${id}`, {
          method: "DELETE",},navigate);
      
      if (!response.ok){
        throw new Error("Error al borrar tarea")

      }


    } catch (error) {
      //si falla vuelvo al estado previo 
      console.log("Error al borrar tarea",error) 
      setTasks(prevState)

    }


  }

  async function handleCheck(id,newState){
    try {
      const response = await authFetch(`http://localhost:1234/tasks/${id}`, {
          method: "PATCH", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({newState:newState}),
        },navigate);


      if(!response.ok){
        throw new Error('Error al marcar tarea')
      }

      const newTask = await response.json()
      
      setTasks(prevTasks => {
        const newTasks = prevTasks.filter(task => task.id !== id);
        return [newTask,...newTasks]
      })

    } catch (error) {
      console.log("Error al crear tarea",error)      
    }

  }

  const actions = {
    handleDelete:handleDelete,
    handleNewTask:handleNewTask,
    handleCheck:handleCheck
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
        <TaskList tasks={tasksHoy} setTasks={setTasks} actions={actions}></TaskList>
      ) : (
        <TaskList tasks={tasksMañana} setTasks={setTasks} actions={actions} ></TaskList>
      )}
      <AddTaskForm handleNewTask={handleNewTask}></AddTaskForm>
    </div>
  );
}

export default TodoList;
