import { useState } from "react"
import ParametroPomodoro from "./ParametroPomodoro"
import Timer from "./Timer"

function Pomodoro(){
    
    //tiempo de estudio
    const [study,setStudy] = useState(25)
    const studyData = {title: "Trabajo",unit: "minutos",max:60,incrementBy: 5}
    
    //tiempo de break
    const [breakTime,setBreakTime] = useState(5)
    const breakTimeData = {title: "Descanso",unit: "minutos",max:60, incrementBy:5}

    //nummero de repes
    const [repes,setRepes] = useState(3)
    const repesData = {title: "Repeticiones",unit: "repes",max:10, incrementBy:1}
    
    return(
        <>
            <Timer secs={3600}></Timer>
            <div className="flex gap-4 bg-white">
                <ParametroPomodoro data={studyData} contador={study} setContador={setStudy}></ParametroPomodoro>
                <ParametroPomodoro data={breakTimeData} contador={breakTime} setContador={setBreakTime}></ParametroPomodoro>
                <ParametroPomodoro data={repesData} contador={repes} setContador={setRepes}></ParametroPomodoro>
            </div>
        </>  
    
    )

}

export default Pomodoro