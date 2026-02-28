
function Task({task,handleDelete,handleCheck}){
    
    return(
        <div className="flex bg-white p-2 gap-4">
           <div onClick={() => {handleCheck(task.id)}} className="space-x-2 flex hover:cursor-pointer">
                {task.completed ? <SquareIconChecked></SquareIconChecked> : <SquareIcon></SquareIcon>}
                <p className={`${task.completed && "line-through"}`} >{task.title}</p>
            </div>
            <button onClick={() => {handleDelete(task.id)}} className="bg-red-600 text-white">delete</button>
        </div>
    )


}

function SquareIcon(){
    return (<svg className="size-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M480 144C488.8 144 496 151.2 496 160L496 480C496 488.8 488.8 496 480 496L160 496C151.2 496 144 488.8 144 480L144 160C144 151.2 151.2 144 160 144L480 144zM160 96C124.7 96 96 124.7 96 160L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 160C544 124.7 515.3 96 480 96L160 96z"/></svg>)
}
    
function SquareIconChecked(){
    return(<svg className="size-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M480 96C515.3 96 544 124.7 544 160L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 160C96 124.7 124.7 96 160 96L480 96zM438 209.7C427.3 201.9 412.3 204.3 404.5 215L285.1 379.2L233 327.1C223.6 317.7 208.4 317.7 199.1 327.1C189.8 336.5 189.7 351.7 199.1 361L271.1 433C276.1 438 283 440.5 289.9 440C296.8 439.5 303.3 435.9 307.4 430.2L443.3 243.2C451.1 232.5 448.7 217.5 438 209.7z"/></svg>)
}
    

export default Task;