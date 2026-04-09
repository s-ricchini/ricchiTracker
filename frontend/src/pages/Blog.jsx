import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"

import EntryList from "../features/blog/EntryList"

function Blog(){

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


    return(<div>

        <div className="flex flex-col w-4/5 mx-auto">
            <EntryList entrys={entrys}></EntryList>
        </div>
        
    </div>)

}

export default Blog