import { useForm } from "react-hook-form"
import { useState, useRef, useEffect } from "react"
import ColorPicker from "./ColorPicker"
import NewItem from "./NewItem"




function ContextMenu({nodo,x,y,actions}){
    
    const menuRef = useRef(null)
    const [adjustedPos, setAdjustedPos] = useState({x, y})

    useEffect(() => {
        if(menuRef.current){
            const rect = menuRef.current.getBoundingClientRect()
            const windowHeight = window.innerHeight
            const windowWidth = window.innerWidth

            let newY = y
            let newX = x

            if(rect.bottom > windowHeight) newY = y - rect.height
            if(rect.right > windowWidth) newX = x - rect.width

            setAdjustedPos({x: newX, y: newY})
        }
    }, [x, y])


    const [isRename,setIsRename] = useState(false)
    const [isChangeColor,setIsChangeColor] = useState(false)
    const [isDelete,setIsDelete] = useState(false)
    
    //opciones de folder
    const [isNewFolder,setIsNewFolder] = useState(false)
    const [isNewFile,setIsNewFile] = useState(false)

    //estados para informacion del menu
    const [name,setName] = useState(nodo.getTitle())
    const [currentColor,setCurrentColor] = useState(nodo.getColor())

    function handleChangeColor(color){
        actions.changeColor(nodo.getId(),color)
        setCurrentColor(color)
        
        //cierro la ventana
        setTimeout(() => {setIsChangeColor(false)},200)
    }

    function handleDelete(){
        actions.deleteFile(nodo.getId())

        //cierro la ventana
        setTimeout(() => {setIsDelete(false)},200)
    }

    function handleRename(newName){
        actions.renameItem(nodo.getId(),newName);
        setName(newName);

        //cierro ventana
        setTimeout(() => {setIsRename(false)},200)
    }

    function handleCreateItem(FileName,type,color){
        console.log(FileName)
        actions.createItem(FileName,type,color,nodo.getId());

        setTimeout(() => {
            setIsNewFile(false)
            setIsNewFolder(false)
        },100)
    }

    return(
        <div ref={menuRef} style={{position:'fixed', top: adjustedPos.y, left:adjustedPos.x, zIndex:1000}} className='bg-white border border-gray-300 w-lg p-2 space-y-2'>
            <div className="flex border-b pb-2 border-gray-300 gap-1.5 items-center">
                {nodo.isFolder() ? <FolderClosed color={currentColor}></FolderClosed> : <FileIcon color={nodo.getColor()}></FileIcon>}
                <p className="text-xl">{name}</p>

            </div>
            <div className="ml-4">
                <div className="flex flex-col items-start">
                    <button className="text-lg cursor-pointer" onClick={() => setIsRename(prev => !prev)}> Rename</button>
                    {isRename && <RenameForm handleRename={handleRename}></RenameForm>}

                    <button className={isChangeColor ? "text-lg cursor-pointer text-amber-500" : "text-lg cursor-pointer hover:text-amber-500"} onClick={() => {setIsChangeColor(prev => !prev)}}> Change Color</button>
                    {isChangeColor && <ColorPicker previusColor={nodo.getColor()} handleChangeColor ={handleChangeColor}></ColorPicker>}
                    
                    <button className={isDelete ? "text-lg cursor-pointer text-amber-500" : "text-lg cursor-pointer hover:text-amber-500"} onClick={() => setIsDelete(prev => !prev)}> Delete</button>
                    {isDelete && <DeleteConfimationForm title = {nodo.getTitle()} isFolder = {nodo.isFolder()} handleDelete={handleDelete} closeMenu={actions.closeMenu}></DeleteConfimationForm>}
                </div>
                {nodo.isFolder() && <div className="flex flex-col items-start">
                    <button className="text-lg cursor-pointer" onClick={() => setIsNewFolder(prev => !prev)}> New Folder</button>
                    {isNewFolder && <NewItem type={'folder'}  handleCreation={handleCreateItem}></NewItem>}
                    
                    <button className="text-lg cursor-pointer" onClick={() => setIsNewFile(prev => !prev)}> New File</button>
                    {isNewFile && <NewItem type={'file'} handleCreation={handleCreateItem}></NewItem>}
                    
                </div>}
            </div>
        </div>
    )
}

//ICONOS:
  function FileIcon({color}){
    return(
      <svg className='size-8' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill={color} d="M304 112L192 112C183.2 112 176 119.2 176 128L176 512C176 520.8 183.2 528 192 528L448 528C456.8 528 464 520.8 464 512L464 272L376 272C336.2 272 304 239.8 304 200L304 112zM444.1 224L352 131.9L352 200C352 213.3 362.7 224 376 224L444.1 224zM128 128C128 92.7 156.7 64 192 64L325.5 64C342.5 64 358.8 70.7 370.8 82.7L493.3 205.3C505.3 217.3 512 233.6 512 250.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128z"/></svg>
    )
  }

  function FolderClosed({color}){

    return(
      <svg className='size-7' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill={color} d="M128 512L512 512C547.3 512 576 483.3 576 448L576 208C576 172.7 547.3 144 512 144L362.7 144C355.8 144 349 141.8 343.5 137.6L305.1 108.8C294 100.5 280.5 96 266.7 96L128 96C92.7 96 64 124.7 64 160L64 448C64 483.3 92.7 512 128 512z"/></svg>
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

function RenameForm({handleRename}){
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        handleRename(data.newName)

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap 2">
            <div className="flex gap-2">
                <input className="border pl-2 border-gray-300 rounded"  type="text" {...register("newName", { required: true })} />
                <input className= "px-2 py-1.5 bg-black rounded text-white hover:bg-amber-500 hover:cursor-pointer" type="submit" value={"Rename"}/>
            </div>
            {errors.newName && <span className="text-red-700">This field is required</span>}

        </form>
    )

}


export default ContextMenu