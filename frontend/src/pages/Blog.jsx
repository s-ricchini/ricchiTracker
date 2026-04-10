import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import { useSideBarContext } from "../contexts/SideBarProvider"

import NavBar from "../features/navbar/NavBar"
import FullSideBar from "../features/sideBar/FullSideBar"
import EntryList from "../features/blog/EntryList"

function Blog(){

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
    }, [fileId])

    
    async function createEntry(fileId){
        console.log("Create")
    }

    async function deleteEntry(id) {
        console.log("Delete")
    }

    async function modifyEntry(id) {
        console.log("Modify")
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
                    <EntryList entrys={entrys}></EntryList>
                </div>
            </div>
        </div>
    );

}

export default Blog