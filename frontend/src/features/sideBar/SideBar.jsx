import SideBarManager from "./sideBarManager"
import SideBaritem from "./SideBarItem"
import MenuBars from "../../assets/icons/MenuBars"
import ContextMenu from "./ContextMenu"

import items from "../../data/itemsSidebar"
import { useState,useMemo,useEffect } from "react"
import NewItem from "./NewItem"

//hola

function OpenSideBar({toggleSideBar}){

    //en la futura implementacion primero hago una query para recuperar la rowData

    //estado que sigue a la dataplana(items)
    const [rowData,setRowData] = useState(items)

    //uso memo para que solo se calcule el arbol si cambia la data
    const manager = useMemo(() => {
        return new SideBarManager(rowData || []) },[rowData])

    //manejo del menu
    const [contextMenu,setContextMenu] = useState(false);
    const [menuInfo,setMenuInfo] = useState({nodo:null,x:0,y:0})

    const [newRootFile,setNewRootFile] = useState(false)
    const [newRootFolder,setNewRootFolder] = useState(false)

    console.log(manager.getTree().length)

    function handleMenu(id,x,y){

        //si clickeo 2 veces en el mismo archivo se cierra
        if(menuInfo.nodo && menuInfo.nodo.getId() === id){
            setContextMenu(prev => !prev)
            return
        }

        setContextMenu(true)
        //busco el nodo
        const nodoBuscado = manager.findById(id)
        const newInfo = {nodo: nodoBuscado,x:x + 20,y:y}
        setMenuInfo(newInfo);
        
    }

    function closeMenu(){
        setContextMenu(false)
    }

    function openFile(id){
        const nodoBuscado =manager.findById(id)
        const titlulo = nodoBuscado.getTitle()

        console.log(`buscando archivo con id ${id} titulo: ${titlulo}`)

        //mas adelante aca deberia redirigirte a una url dinamica con el router y desde esa pagina hacer el fetch al archivo
    }

    function deleteFile(id){
        closeMenu()

        //recupero el nodo que quiero borrar
        const nodoAborrar = manager.findById(id)
        
        if(nodoAborrar.isFolder()){
            //busco todos los id del arbol que tenga como raiz el nodo a borrar
            const allIds = manager.getAllChildsId(id)
            allIds.push(id)

            //uso sets para tener o(1) en el filter y que en total quede o(n)
            const setAllIds = new Set(allIds)
            const updatedData = rowData.filter(item => !(setAllIds.has(item.id)))
            setRowData(updatedData)

        } else{
            const updatedData = rowData.filter(item => item.id !== id)
            setRowData(updatedData)
        }

    }

    function changeColor(id,newColor){
        const newData = rowData.map(item => {
            if(item.id === id){
                return {...item, color:newColor}
            }
            return item
        })
        setRowData(newData);

        //tendria que hacer un fetch  PATCH para actualizar la base de datos

    }

    function renameItem(id,newName){
        const newData = rowData.map(item => {
            if(item.id === id){
                const newItem = {...item, name:newName};
                return newItem
            } 
            return item
            
        })
        setRowData(newData);

        //hay que actualizar base de datos


    }

    function createItem(name,type,color,parentId){
        const newItem = {
            id:crypto.randomUUID(),
            name:name,
            type:type,
            color:color,
            parent_id:parentId,
            position:100,
        }
        
        const newData = [...rowData,newItem];
        setRowData(newData)

        //aca se accede a la base de datos
    }
       
    

    const actions = {
        openFile:openFile,
        renameItem:renameItem,
        deleteFile: deleteFile,
        createItem:createItem,
        changeColor: changeColor,
        handleMenu:handleMenu,
        closeMenu:closeMenu,

    }

    return(
        <div className="bg-white">
            
            <div className="flex text-xl gap-2 items-center" >
                <div className="cursor-pointer" onClick={toggleSideBar} >
                    <MenuBars color={'black'} hoverColor={'orange'}></MenuBars>
                </div>
                <p>My Blogs</p>
            </div>
    
            <div>
                {manager.getTree().map(elem => <SideBaritem key={elem.getId()} nodo={elem} actions={actions}></SideBaritem>)}
            </div>
            <div className=" flex flex-col items-start ml-4">
                <button  className = "hover:cursor-pointer" onClick={() => {setNewRootFolder(prev => !prev)}}>New Folder</button>
                { newRootFolder && <CreateRootFolder createItem={createItem} setEstado={setNewRootFolder}></CreateRootFolder>}
                
                <button  className = "hover:cursor-pointer" onClick={() => {setNewRootFile(prev => !prev)}}>New File</button>
                { newRootFile && <CreateRootFile createItem={createItem} setEstado={setNewRootFile}></CreateRootFile>}
                
            </div>
            {contextMenu && <ContextMenu key={menuInfo.nodo.getTitle()} nodo={menuInfo.nodo} x={menuInfo.x} y={menuInfo.y}  actions = {actions}></ContextMenu>}
        </div>
    )


}

function CreateRootFolder({createItem,setEstado}){
    
    function handleCreateRootFolder(FileName,type,color){
        console.log(FileName)
        createItem(FileName,'folder',color,null);
        setEstado(false);
    }

    return(
        <NewItem type={'folder'} handleCreation={handleCreateRootFolder}></NewItem>
    )

}

function CreateRootFile({createItem,setEstado}){
    
    function handleCreateRootFolder(FileName,type,color){
        console.log(FileName)
        createItem(FileName,'file',color,null);
        setEstado(false);
    }

    return(
        <NewItem type={'file'} handleCreation={handleCreateRootFolder}></NewItem>
    )

}

export default OpenSideBar