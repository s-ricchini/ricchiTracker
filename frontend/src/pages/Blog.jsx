import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import { useSideBarContext } from "../contexts/SideBarProvider"

import NavBar from "../features/navbar/NavBar"
import FullSideBar from "../features/sideBar/FullSideBar"
import EntryList from "../features/blog/EntryList"
import BlogEntryForm from "../features/blog/BlogEntryForm"



function Blog(){
    const [newEntryForm,setNewEntryForm] = useState(false)
    const [modifyForm,setModifyForm] = useState(false)
    



    const {selected} = useSideBarContext()

    //consigo el id que viene en la url
    const {fileId} = useParams()
    
    const [entrys,setEntrys] = useState([])

    //recupera los datos del blog cuando se carga la pagina
    useEffect(() => {
        
        if(!fileId){
            return
        }

        async function fetchData(){
            
            //limpio el estado para que si cambiamos de blog no se siga viendo los datos del otro
            setEntrys([])
            
            try {
                const response = await fetch(`http://localhost:1234/blog/${fileId}`)
                
                if(!response.ok){
                    throw new Error("Error en el get de blog entrys")
                }

                const data = await response.json()
                setEntrys(data)
                console.log(data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
        setNewEntryForm(false)
        setModifyForm(false)
    }, [fileId])

    
    async function createEntry(title, content) {
        try {
            const response = await fetch(`http://localhost:1234/blog/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ file_id: fileId,title:title, content:content }),
            });

            if (!response.ok) throw new Error('Error al crear la entry');

            const data = await response.json();
            setEntrys(prev => [data,...prev]);

        } catch (error) {
            console.error("Hubo un fallo en el POST:", error);
            alert("No se pudo crear la entry.");
        }
}

    async function deleteEntry(id) {
        try {
            const result = await fetch(`http://localhost:1234/blog/${id}`,{method:"DELETE"})
            
            if(!result.ok){
                throw new Error("Error en el fetch para borrar la entry")
            }

            //busco en el estado y borro
            const newEntrys = entrys.filter(e => e.id !== id)
            setEntrys(newEntrys)

        } catch (error) {
            console.log(error)
        }
    }

    async function modifyEntry(id, newTitle, newContent) {
        const previousEntries = entrys

        // Actualización optimista
        setEntrys(prev => prev.map(entry => 
            entry.id === id 
                ? { ...entry, title: newTitle, content: newContent }
                : entry
        ))

        try {
            const response = await fetch(`http://localhost:1234/blog/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: newTitle, content: newContent })
            })

            if (!response.ok) throw new Error("Error al modificar la entrada")

        } catch (error) {
            console.error(error)
            setEntrys(previousEntries) 
        }
    }

    function closeNewEntryForm(){
        setNewEntryForm(false)
    }

    const actions = {
        createEntry:createEntry,
        deleteEntry:deleteEntry,
        modifyEntry:modifyEntry
    }


    return (
        <div>
            <NavBar></NavBar>
            <div className="flex h-screen ">
                <FullSideBar></FullSideBar>
                <div className="flex flex-col flex-1 gap-5 m-5">
                    {selected && 
                        <div className="text-xl">
                            {selected.name}    
                        </div>    
                    }
                    <div>
                        {newEntryForm ? <BlogEntryForm createEntry={createEntry} closeForm={closeNewEntryForm} ></BlogEntryForm> : <button className="w-fit bg-black rounded text-white text-lg hover:bg-amber-500 cursor-pointer px-4 py-2" onClick={() => {setNewEntryForm(prev => !prev)}}>New entry</button> }

                        <EntryList entrys={entrys} actions={actions}></EntryList>

                    </div>
                    
                </div>
            </div>
        </div>
    );

}

export default Blog