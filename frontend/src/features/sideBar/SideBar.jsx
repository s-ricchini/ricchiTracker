import SideBarManager from "./sideBarManager"
import SideBaritem from "./SideBarItem"

import items from "../../data/itemsSidebar"
import { useState,useMemo } from "react"


function SideBar(){

    //en la futura implementacion primero hago una query para recuperar la rowData

    //estado que sigue a la dataplana(items)
    const [rowData,setRowData] = useState(items)

    //uso memo para que solo se calcule el arbol si cambia la data
    const manager = useMemo(() => {return new SideBarManager(rowData)},[rowData])


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
            <p>Side Bar</p>
            <div>
                {manager.getTree().map(elem => <SideBaritem key={elem.getId()} nodo={elem} openFile={openFile} deleteFile = {deleteFile}></SideBaritem>)}
            </div>
            
        </div>
    )


}

export default SideBar