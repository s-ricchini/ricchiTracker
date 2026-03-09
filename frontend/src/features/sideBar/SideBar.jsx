import SideBarManager from "./sideBarManager"
import SideBaritem from "./SideBarItem"
import MenuBars from "../../assets/icons/MenuBars"
import ContextMenu from "./ContextMenu"

import items from "../../data/itemsSidebar"
import { useState,useMemo } from "react"


function OpenSideBar({toggleSideBar}){

    //en la futura implementacion primero hago una query para recuperar la rowData

    //estado que sigue a la dataplana(items)
    const [rowData,setRowData] = useState(items)

    //uso memo para que solo se calcule el arbol si cambia la data
    const manager = useMemo(() => {return new SideBarManager(rowData)},[rowData])

    //manejo del menu
    const [contextMenu,setContextMenu] = useState(false);
    const [menuInfo,setMenuInfo] = useState({id:'',x:0,y:0})

    function handleMenu(id,x,y){

        //si clickeo 2 veces en el mismo archivo se cierra
        if(menuInfo.id === id){
            setContextMenu(prev => !prev)
            return
        }

        setContextMenu(true)
        const newInfo = {id:id,x:x + 20,y:y}
        setMenuInfo(newInfo);
        
    }


    function openFile(id){
        const nodoBuscado =manager.findById(id)
        const titlulo = nodoBuscado.getTitle()

        console.log(`buscando archivo con id ${id} titulo: ${titlulo}`)

        //mas adelante aca deberia redirigirte a una url dinamica con el router y desde esa pagina hacer el fetch al archivo
    }

    function deleteFile(id){
        
        //recupero el nodo que quiero borrar
        const nodoAborrar = manager.findById(id)
        
        if(nodoAborrar.isFolder()){
            //busco todos los id del arbol que tenga como raiz el nodo a borrar
            manager.resetSerchedChildsId()
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


    return(
        <div className="bg-white">
            
            <div className="flex text-xl gap-2 items-center" >
                <div className="cursor-pointer" onClick={toggleSideBar} >
                    <MenuBars color={'black'} hoverColor={'orange'}></MenuBars>
                </div>
                <p>My Blogs</p>
            </div>
    
            <div>
                {manager.getTree().map(elem => <SideBaritem key={elem.getId()} nodo={elem} openFile={openFile} deleteFile = {deleteFile} handleMenu={handleMenu}></SideBaritem>)}
            </div>
            <div className=" flex flex-col items-start ml-4">
                <button>New Folder</button>
                <button>New File</button>
            </div>
            {contextMenu && <ContextMenu id={menuInfo.id} x={menuInfo.x} y={menuInfo.y}></ContextMenu>}
        </div>
    )


}

export default OpenSideBar