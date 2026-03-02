function Timer({secs}){
    
    function PrintTime(seconds){
        const minutes = (Math.trunc(seconds / 60)).toString().padStart(2,"0")
        const sec = (seconds % 60).toString().padStart(2,"0")

        return `${minutes}:${sec}`

    }
    
    
    return(
        <p className="text-4xl">{PrintTime(secs)}</p>
    )

}

export default Timer
