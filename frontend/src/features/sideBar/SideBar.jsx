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


    return(
        <div className="bg-white">
            <p>Side Bar</p>
            <div>
                {manager.getTree().map(elem => <SideBaritem key={elem.getId()} nodo={elem} openFile={openFile}></SideBaritem>)}
            </div>
            
        </div>
    )


}

export default SideBar