import { useContext,createContext,useState } from "react";

const SideBarContext = createContext(null)

export function useSideBarContext(){
    return useContext(SideBarContext)
}

export function SideBarContextProvider({ children }){
    
    const prevSelected = JSON.parse(localStorage.getItem('selectedFile')) ?? []
    const [selected,setSelected] = useState(prevSelected)

    function selectFile(file){
        setSelected(file);
        localStorage.setItem('selectedFile',JSON.stringify(file))
        console.log("Selected file: ", file)
    }

    function deleteSelectedFile(){
        selectFile([])
        localStorage.removeItem('selectedFile')
    }


    return(
        <SideBarContext.Provider value={{selectFile,deleteSelectedFile,selected}}>{children}</SideBarContext.Provider>
    )

}
