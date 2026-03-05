import {useCallback, useEffect, useState } from "react"
import ParametroPomodoro from "./ParametroPomodoro"
import Timer from "./Timer"

//iconos
import StartIcon from "../../../assets/icons/StartIcon"
import PauseIcon from "../../../assets/icons/PauseIcon"

function Pomodoro(){
    
    //tiempo de estudio
    const [study,setStudy] = useState(10)
    const studyData = {title: "Trabajo",unit: "minutos",max:60,incrementBy: 5}
    
    //tiempo de break
    const [breakTime,setBreakTime] = useState(5)
    const breakTimeData = {title: "Descanso",unit: "minutos",max:60, incrementBy:5}

    //nummero de repes
    const [repes,setRepes] = useState(3)
    const repesData = {title: "Repeticiones",unit: "repes",max:10, incrementBy:1}


    const [phase,setPhase] = useState('study')
    
    const [isRunning,setIsRunning] = useState(false)
    const [actualTime,setActualTime] = useState(study)
    const [repsCompleted,setRepsCompleted] = useState(0)


    function handlePhaseTransition() {
        if (phase === 'study') {
            setPhase('break');
            setActualTime(breakTime * 60);
        } else {
            const nextRep = repsCompleted + 1;
            if (nextRep >= repes) {
                reset();

            } else {
                setRepsCompleted(nextRep);
                setPhase('study');
                setActualTime(study * 60);
            }
        }
    }

    function reset() {
        setIsRunning(false);
        setPhase('study');
        setActualTime(study * 60);
        setRepsCompleted(0);
    }

    //efecto visual para que cuando se modifica el study el timer lo refleje
    useEffect(() => {
        setActualTime(study * 60)
    },[study])

    // 2. Lógica del Intervalo (Solo resta)
    useEffect(() => {
        let interval = null;
        if (isRunning && actualTime > 0) {
            interval = setInterval(() => {
                setActualTime((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning, actualTime]);

    // 3. Lógica de Cambio de Fase (Se activa cuando el tiempo llega a 0)
    useEffect(() => {
        if (actualTime === 0 && isRunning) {
            handlePhaseTransition();
        }
    }, [actualTime, isRunning]);


    return(
        <div className="bg-white p-5 space-y-4">
            <div className="border border-gray-200 rounded-xl p-3 space-y-3">
                <Timer secs={actualTime} phase={phase} reps ={(repsCompleted + 1)}></Timer>
                <div className="flex gap-3">    
                    <button onClick={()=>{setIsRunning(prev => !prev)}} className=" py-1.5 px-3 bg-gray-900 text-white rounded hover:bg-amber-500 hover:cursor-pointer"> {isRunning ? "Stop":"Start"}</button>
                    <button onClick={() => {reset()}} className="hover:cursor-pointer hover:text-amber-500">Reset</button>
                </div>
            </div> 

            <div className="flex gap-4">
                <ParametroPomodoro data={studyData} contador={study} setContador={setStudy} reset={reset}></ParametroPomodoro>
                <ParametroPomodoro data={breakTimeData} contador={breakTime} setContador={setBreakTime} reset={reset}></ParametroPomodoro>
                <ParametroPomodoro data={repesData} contador={repes} setContador={setRepes} reset={reset}></ParametroPomodoro>
            </div>
        </div>  
    
    )

}

export default Pomodoro