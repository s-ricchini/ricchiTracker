import SideBarManager from "./sideBarManager"
import SideBaritem from "./SideBarItem"
import MenuBars from "../../assets/icons/MenuBars"
import ContextMenu from "./ContextMenu"

import { useState,useMemo,useEffect } from "react"
import NewItem from "./NewItem"


//contexto para saber que archivo se selecciona
import { useSideBarContext } from "../../contexts/SideBarProvider"
import { useNavigate } from "react-router-dom"



function OpenSideBar({toggleSideBar}){
    const {selectFile} = useSideBarContext()
    const navigate = useNavigate()
    //en la futura implementacion primero hago una query para recuperar la rowData

    //estado que sigue a la dataplana(items)
    const [rowData,setRowData] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    
    //useEffect para recuperar la data al cargar el componente
    useEffect(() => {
        const fetchSidebarData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch("http://localHost:1234/items");
                const data = await response.json();
                console.log(data)
                setRowData(data);
            } catch (error) {
                console.error("Error recuperando los items:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSidebarData();
    }, []); // El array vacío asegura que solo se ejecute una vez

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

        //busco el file
        const file = rowData.find(f => f.id === id)

        //lo pongo en el estado selected usando el hook
        selectFile(file)
        navigate(`/blog/${file.id}`)
        

    }

    async function deleteFile(id){
        closeMenu()

        //guardo un backup por si falla el delete
        const prevData = [...rowData];

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

        try {
        const response = await fetch(`http://localhost:1234/items/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error al eliminar en el servidor');
        }

        console.log(`Item ${id} y sus hijos eliminados correctamente`);

        } catch (error) {
            console.error("Fallo el DELETE:", error);
            
            alert("No se pudo eliminar el archivo.");
            setRowData(prevData);
        }

        

    }

    async function changeColor(id,newColor){
        let oldColor = ''; 

        const newData = rowData.map(item => {
            if(item.id === id){
                oldColor = item.color
                return {...item, color:newColor}
            }
            return item
        })
        setRowData(newData);

        //tendria que hacer un fetch  PATCH para actualizar la base de datos

        const changes = {id:id,color:newColor}

        try {
            const response = await fetch('http://localhost:1234/items', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(changes),
            })

            if (!response.ok) {
                throw new Error('Error al guardar en la base de datos');
                
            }

            const data = await response.json();
            console.log('Guardado exitosamente:', data);

        } catch (error) {
            console.error("Hubo un fallo en el PATCH:", error);

            alert("No se pudo renombrar el item.");
            setRowData(prevData => prevData.map(item => {
                if(item.id === id){
                    const newItem = {...item,color:oldColor}
                    return newItem
                }
                return item 

            }));
        }

    }


    async function toggleOpenFolder(id,newstate){
        let oldState = null; 

        const newData = rowData.map(item => {
            if(item.id === id){
                oldState = item.is_open
                return {...item, is_open:newstate}
            }
            return item
        })
        setRowData(newData);

        //tendria que hacer un fetch  PATCH para actualizar la base de datos

        const changes = {id:id,is_open:newstate}

        try {
            const response = await fetch('http://localhost:1234/items', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(changes),
            })

            if (!response.ok) {
                throw new Error('Error al guardar en la base de datos');
                
            }

            const data = await response.json();
            console.log('Guardado exitosamente:', data);

        } catch (error) {
            console.error("Hubo un fallo en el PATCH:", error);

            alert("No se pudo actualizar el estado");
            
            if (oldState !== null){
                setRowData(prevData => prevData.map(item => {
                    if(item.id === id){
                        const newItem = {...item,is_open:oldState}
                        return newItem
                    }
                    return item 

                }));
            }   
        }
    }



    async function renameItem(id,newName){

        let viejoNombre = '';

        const newData = rowData.map(item => {
            if(item.id === id){
                viejoNombre = item.name
                const newItem = {...item, name:newName};
                return newItem
            } 
            return item
            
        })

        setRowData(newData);

        //hay que actualizar base de datos
        const changes = {id:id,name:newName}

        try {
            const response = await fetch('http://localhost:1234/items', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(changes),
            })

            if (!response.ok) {
                throw new Error('Error al guardar en la base de datos');
                
            }

            const data = await response.json();
            console.log('Guardado exitosamente:', data);

        } catch (error) {
            console.error("Hubo un fallo en el PATCH:", error);

            alert("No se pudo renombrar el item.");
            setRowData(prevData => prevData.map(item => {
                if(item.id === id){
                    const newItem = {...item,name:viejoNombre}
                    return newItem
                }
                return item 

            }));
        }


    }

    async function createItem(name,type,color,parentId){
        const newItem = {
            id:crypto.randomUUID(),
            name:name,
            type:type,
            color:color,
            parent_id:parentId,
            position:100,
            is_open:false
        }
        
    
        //aca se accede a la base de datos
        //Actualización optimista: Reflejamos el cambio en la UI de inmediato
        setRowData(prevData => [...prevData, newItem]);

        try {
            const response = await fetch('http://localhost:1234/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newItem),
            });

            if (!response.ok) {
                throw new Error('Error al guardar en la base de datos');
                
            }

            const data = await response.json();
            console.log('Guardado exitosamente:', data);

        } catch (error) {
            console.error("Hubo un fallo en el POST:", error);

            alert("No se pudo guardar el item. Reintentando...");
            setRowData(prevData => prevData.filter(item => item.id !== newItem.id));
        }
    }
       
    

    const actions = {
        openFile:openFile,
        renameItem:renameItem,
        deleteFile: deleteFile,
        createItem:createItem,
        changeColor: changeColor,
        handleMenu:handleMenu,
        closeMenu:closeMenu,
        toggleOpenFolder:toggleOpenFolder

    }

    return(
        <div className="bg-white h-full pr-6">
            
            <div className="flex text-xl gap-2 items-center" >
                <div className="cursor-pointer" onClick={toggleSideBar} >
                    <MenuBars color={'black'} hoverColor={'orange'}></MenuBars>
                </div>
                <p>My Blogs</p>
            </div>
        
            { isLoading ? <p className="text-xl"> Loading items</p>: (<div>
                {manager.getTree().map(elem => <SideBaritem key={elem.getId()} nodo={elem} actions={actions}></SideBaritem>)}
            </div>)}
            
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