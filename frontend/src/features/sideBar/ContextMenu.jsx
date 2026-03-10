import { useState } from "react"
import ColorPicker from "./ColorPicker"


function ContextMenu({nodo,x,y,closeMenu,actions}){
    const [isRename,setIsRename] = useState(false)
    const [isChangeColor,setIsChangeColor] = useState(false)
    const [isDelete,setIsDelete] = useState(false)
    
    //opciones de folder
    const [isNewFolder,setIsNewFolder] = useState(false)
    const [isNewFile,setIsNewFile] = useState(false)

    function handleClose(){
        setTimeout(() => {
            closeMenu()
        },100)
    }

    function handleChangeColor(color){
        actions.changeColor(nodo.getId(),color)
    }


    return(
        <div style={{position:'fixed', top: y, left:x, zIndex:1000}} className='bg-white border border-gray-300 w-lg p-2'>
            <div className="flex flex-col items-start">
                <button className="text-lg cursor-pointer"> Rename</button>
                <button className={isChangeColor ? "text-lg cursor-pointer text-amber-500" : "text-lg cursor-pointer hover:text-amber-500"} onClick={() => {setIsChangeColor(prev => !prev)}}> Change Color</button>
                {isChangeColor && <ColorPicker previusColor={nodo.getColor()} handleChangeColor ={handleChangeColor}></ColorPicker>}
                <button className="text-lg cursor-pointer"> Delete</button>
            </div>
            {nodo.isFolder() && <div className="flex flex-col items-start">
                <button className="text-lg cursor-pointer"> New Folder</button>
                <button className="text-lg cursor-pointer"> New File</button>
            </div> }
        </div>
    )
}

export default ContextMenu