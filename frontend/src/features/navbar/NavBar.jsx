import { Link } from "react-router-dom"
import { useSideBarContext } from "../../contexts/SideBarProvider"
import { useNavigate } from "react-router-dom"


function NavBar(){
    
    const {deleteSelectedFile} = useSideBarContext()

    const navigate = useNavigate()

    const logOut = async () => {
  
        try {
            const response = await fetch("http://localhost:1234/auth/logout",{
                credentials:"include",
            })

            if (!response.ok){
                throw new Error("Cant logout right now")
            }

            navigate('/login')
        
        } catch (error) {
            console.log("Cant logout right now")
        }

    }

    return(
        <nav className="bg-gray-600 text-white p-4 flex justify-between " >
            <Link onClick={() => deleteSelectedFile()} to={'/'}><h1 className="text-2xl">RichiTracker</h1></Link>
            <button  className="cursor-pointer" onClick={logOut}>LogOut</button>
        </nav>


    )

}

export default NavBar

