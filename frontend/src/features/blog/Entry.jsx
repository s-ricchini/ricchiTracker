import { useState } from "react";
import BlogEntryForm from "./BlogEntryForm";

function Entry({entry,actions}){

    const [editOpen,setEditOpen] = useState(false)

    const localDate = new Date(entry.created_at)
    const formattedDate = localDate.toLocaleString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true 
    });

    const handleDelete = () => {
        const id = entry.id
        console.log(`intentando borrar entry: ${entry.title} id: ${entry.id}`)
        actions.deleteEntry(id)

    }

    const closeMenu = () => {
        setEditOpen(false)
    }
    
    return(
        <>
            {editOpen ? <BlogEntryForm modifyEntry={actions.modifyEntry} closeForm={closeMenu} entry={entry}></BlogEntryForm> : (<div className="bg-white p-7 mt-3 space-y-2 border-gray-100 rounded">
                <div className="flex justify-between items-center">
                    <p className="font-semibold text-lg text-gray-900">{entry.title}</p>
                    <p className="text-gray-400">{formattedDate}</p>
                </div>
                
                <div className="flex">
                    <p className="text-lg text-gray-700">{entry.content}</p>
                    <div className="flex flex-col gap-3">
                        <button onClick={handleDelete}><TrashIcon color={"rgb(232, 232, 232)"} hoverColor={"rgb(242, 46, 46)"}> </TrashIcon></button>
                        <button onClick={() => setEditOpen(prev => !prev)}><EditIcon color={"rgb(232, 232, 232)"} hoverColor={"rgb(242, 46, 46)"}> </EditIcon></button>
                    </div>

                </div>

            </div>
            )}
        </>  

    )

}


function EditIcon({color,hoverColor}){
    
    const [currentColor,setCurrentColor] = useState(color)
    
    const setHoverColor = () => {
        setCurrentColor(hoverColor)
    }

    const setInitialColor = () => {
        setCurrentColor(color)
    }

    return(
        <svg onMouseEnter={setHoverColor} onMouseLeave={setInitialColor} className="hover:cursor-pointer size-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill={currentColor} d="M505 122.9L517.1 135C526.5 144.4 526.5 159.6 517.1 168.9L488 198.1L441.9 152L471 122.9C480.4 113.5 495.6 113.5 504.9 122.9zM273.8 320.2L408 185.9L454.1 232L319.8 366.2C316.9 369.1 313.3 371.2 309.4 372.3L250.9 389L267.6 330.5C268.7 326.6 270.8 323 273.7 320.1zM437.1 89L239.8 286.2C231.1 294.9 224.8 305.6 221.5 317.3L192.9 417.3C190.5 425.7 192.8 434.7 199 440.9C205.2 447.1 214.2 449.4 222.6 447L322.6 418.4C334.4 415 345.1 408.7 353.7 400.1L551 202.9C579.1 174.8 579.1 129.2 551 101.1L538.9 89C510.8 60.9 465.2 60.9 437.1 89zM152 128C103.4 128 64 167.4 64 216L64 488C64 536.6 103.4 576 152 576L424 576C472.6 576 512 536.6 512 488L512 376C512 362.7 501.3 352 488 352C474.7 352 464 362.7 464 376L464 488C464 510.1 446.1 528 424 528L152 528C129.9 528 112 510.1 112 488L112 216C112 193.9 129.9 176 152 176L264 176C277.3 176 288 165.3 288 152C288 138.7 277.3 128 264 128L152 128z"/></svg>


    )
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


export default Entry