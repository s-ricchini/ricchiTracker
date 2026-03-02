import { useState } from "react"
import ParametroPomodoro from "./ParametroPomodoro"
function Pomodoro(){
    
    //tiempo de estudio
    const [study,setStudy] = useState(25)
    const studyData = {title: "Tiempo de estudio",unit: "minutos",max:60,incrementBy: 5}
    
    //tiempo de break
    const [breakTime,setBreakTime] = useState(5)
    const breakTimeData = {title: "tiempo de descanso",unit: "minutos",max:60, incrementBy:5}

    //nummero de repes
    const [repes,setRepes] = useState(3)
    const repesData = {title: "Numero de repes",unit: "repes",max:10, incrementBy:1}
    
    return(
        <div className="flex gap-4 bg-white">
            <ParametroPomodoro data={studyData} contador={study} setContador={setStudy}></ParametroPomodoro>
            <ParametroPomodoro data={breakTimeData} contador={breakTime} setContador={setBreakTime}></ParametroPomodoro>
            <ParametroPomodoro data={repesData} contador={repes} setContador={setRepes}></ParametroPomodoro>
        </div>
        
    
    )

}

export default Pomodoro