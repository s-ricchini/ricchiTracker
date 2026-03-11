import { useState } from "react"
import ColorPicker from "./ColorPicker"


function ContextMenu({nodo,x,y,actions}){
    const [isRename,setIsRename] = useState(false)
    const [isChangeColor,setIsChangeColor] = useState(false)
    const [isDelete,setIsDelete] = useState(false)
    
    //opciones de folder
    const [isNewFolder,setIsNewFolder] = useState(false)
    const [isNewFile,setIsNewFile] = useState(false)

    console.log(nodo.getTitle())


    function handleChangeColor(color){
        actions.changeColor(nodo.getId(),color)
    }

    function handleDelete(){
        actions.deleteFile(nodo.getId())
    }


    return(
        <div style={{position:'fixed', top: y, left:x, zIndex:1000}} className='bg-white border border-gray-300 w-lg p-2'>
            <div className="flex flex-col items-start">
                <button className="text-lg cursor-pointer"> Rename</button>
                
                <button className={isChangeColor ? "text-lg cursor-pointer text-amber-500" : "text-lg cursor-pointer hover:text-amber-500"} onClick={() => {setIsChangeColor(prev => !prev)}}> Change Color</button>
                {isChangeColor && <ColorPicker previusColor={nodo.getColor()} handleChangeColor ={handleChangeColor}></ColorPicker>}
                
                <button className={isDelete ? "text-lg cursor-pointer text-amber-500" : "text-lg cursor-pointer hover:text-amber-500"} onClick={() => setIsDelete(prev => !prev)}> Delete</button>
                {isDelete && <DeleteConfimationForm title = {nodo.getTitle()} isFolder = {nodo.isFolder()} handleDelete={handleDelete} closeMenu={actions.closeMenu}></DeleteConfimationForm>}
            </div>
            {nodo.isFolder() && <div className="flex flex-col items-start">
                <button className="text-lg cursor-pointer"> New Folder</button>
                <button className="text-lg cursor-pointer"> New File</button>
            </div>}
        </div>
    )
}

function DeleteConfimationForm({title,isFolder,handleDelete}){
    
    return(
        <div>
            <p className="text-red-500">
                {isFolder ?  `Are you sure you want to delete ${<span className="text-black">{title}</span>} and all its contents? This action cannot be undone.` : `Are you sure you want to delete ${<span className="text-black">{title}</span>}? This action cannot be undone`}
            </p>
            
            <button onClick={() => {
                handleDelete()}}>Confirm</button>
        </div>
    )
}

export default ContextMenu