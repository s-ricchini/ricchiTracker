import { Link } from "react-router-dom"

function NavBar(){
    
    return(
        <nav className="bg-gray-600 text-white p-4">
            <Link to={'/'}><h1 className="text-2xl">RichiTracker</h1></Link>
        </nav>


    )


}

export default NavBar