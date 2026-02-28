import { useState } from "react"


function Task({task,handleDelete,handleCheck}){
    
    return(
        <div className="flex justify-between bg-white p-2 gap-4">
           <div onClick={() => {handleCheck(task.id)}} className="space-x-2 flex hover:cursor-pointer items-center">
                {task.completed ? <SquareIconChecked></SquareIconChecked> : <SquareIcon></SquareIcon>}
                <p className={`${task.completed && "line-through"}`} >{task.title}</p>
            </div>
            <div onClick={() => {handleDelete(task.id)}}>
                <TrashIcon color={"rgb(232, 232, 232)"} hoverColor={"rgb(242, 46, 46)"}> </TrashIcon>
            </div>
        </div>
    )


}

function SquareIcon(){
    return (<svg className="size-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M480 144C488.8 144 496 151.2 496 160L496 480C496 488.8 488.8 496 480 496L160 496C151.2 496 144 488.8 144 480L144 160C144 151.2 151.2 144 160 144L480 144zM160 96C124.7 96 96 124.7 96 160L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 160C544 124.7 515.3 96 480 96L160 96z"/></svg>)
}
    
function SquareIconChecked(){
    return(<svg className="size-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M480 96C515.3 96 544 124.7 544 160L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 160C96 124.7 124.7 96 160 96L480 96zM438 209.7C427.3 201.9 412.3 204.3 404.5 215L285.1 379.2L233 327.1C223.6 317.7 208.4 317.7 199.1 327.1C189.8 336.5 189.7 351.7 199.1 361L271.1 433C276.1 438 283 440.5 289.9 440C296.8 439.5 303.3 435.9 307.4 430.2L443.3 243.2C451.1 232.5 448.7 217.5 438 209.7z"/></svg>)
}
    
function TrashIcon({color,hoverColor}){
    
    const [currentColor,setCurrentColor] = useState(color)
    
    const setHoverColor = () => {
        setCurrentColor(hoverColor)
    }

    const setInitialColor = () => {
        setCurrentColor(color)
    }

    return(
        <svg onMouseEnter={setHoverColor} onMouseLeave={setInitialColor} className="hover:cursor-pointer size-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill={currentColor} d="M232.7 69.9C237.1 56.8 249.3 48 263.1 48L377 48C390.8 48 403 56.8 407.4 69.9L416 96L512 96C529.7 96 544 110.3 544 128C544 145.7 529.7 160 512 160L128 160C110.3 160 96 145.7 96 128C96 110.3 110.3 96 128 96L224 96L232.7 69.9zM128 208L512 208L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 208zM216 272C202.7 272 192 282.7 192 296L192 488C192 501.3 202.7 512 216 512C229.3 512 240 501.3 240 488L240 296C240 282.7 229.3 272 216 272zM320 272C306.7 272 296 282.7 296 296L296 488C296 501.3 306.7 512 320 512C333.3 512 344 501.3 344 488L344 296C344 282.7 333.3 272 320 272zM424 272C410.7 272 400 282.7 400 296L400 488C400 501.3 410.7 512 424 512C437.3 512 448 501.3 448 488L448 296C448 282.7 437.3 272 424 272z"/></svg>


    )
}

export default Task;