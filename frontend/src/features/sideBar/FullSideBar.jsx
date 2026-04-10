import { useState } from "react"
import OpenSideBar from "./SideBar"
import ClosedSideBar from "./ClosedSideBar"

function FullSideBar(){
    const [isOpen, setIsOpen] = useState(true);

    function toggleSideBar() {
        setIsOpen((prev) => !prev);
    }

     return(
        <div className="h-full shrink-0">{isOpen ? (<OpenSideBar toggleSideBar={toggleSideBar}></OpenSideBar>) : (<ClosedSideBar toggleSideBar={toggleSideBar}></ClosedSideBar>)}</div>
    )

}

export default FullSideBar