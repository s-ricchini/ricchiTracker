import { useContext,createContext,useState } from "react";

const SideBarContext = createContext(null)

export function useSideBarContext(){
    return useContext(SideBarContext)
}

export function SideBarContextProvider({ children }){
    const [selected,setSelected] = useState([])

    function selectFile(file){
        setSelected(file);
        console.log("Selected file: ", file)
    }


    return(
        <SideBarContext.Provider value={{selectFile,selected}}>{children}</SideBarContext.Provider>
    )

}
