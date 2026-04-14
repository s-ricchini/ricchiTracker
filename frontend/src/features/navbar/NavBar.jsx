import { Link } from "react-router-dom"
import { useSideBarContext } from "../../contexts/SideBarProvider"

function NavBar(){
    
    const {deleteSelectedFile} = useSideBarContext()

    return(
        <nav className="bg-gray-600 text-white p-4">
            <Link onClick={() => deleteSelectedFile()} to={'/'}><h1 className="text-2xl">RichiTracker</h1></Link>
        </nav>


    )


}

export default NavBar

