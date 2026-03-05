
function Timer({secs,phase,reps}){
    
    function PrintTime(seconds){
        const minutes = (Math.trunc(seconds / 60)).toString().padStart(2,"0")
        const sec = (seconds % 60).toString().padStart(2,"0")

        return `${minutes}:${sec}`

    }
    
    
    return(
        <div className="flex flex-col items-baseline">
            <p className="text-4xl">{PrintTime(secs)}</p>

            <div className="flex gap-2 text-sm text-gray-700">
                <p>Phase: <span className={phase === "study" ? "text-green-600 font-medium" : "text-red-600 font-medium" }>{phase}</span></p>
                <p>Rep: <span className="font-medium">{reps}</span></p>
            </div>    
        </div>
        
    
    )

}

export default Timer
