import { Login } from "../features/auth/login"
import { Register } from "../features/auth/Register"

import { useState } from "react"


function LoginPage(){
    const [selected,setSelected] = useState('login')

    const goToLogin = () => {
        setSelected('login')
    }

    return(
        <>            
            <div className="text-white bg-gray-600 flex justify-between p-4">
                
                <h1 className="text-2xl" >RicchiTracker</h1>
                <div className="flex gap-3">
                    <button className="cursor-pointer" onClick={() => setSelected('login')}>LogIn</button>
                    <button className="cursor-pointer" onClick={() => setSelected('register')}>Register</button>
                </div>
            </div>
            <div className="w-1/3 mx-auto space-y-3 mt-5">
                {selected === "login" ? <p className="text-3xl  text-gray-700 text-center">Welcome back!</p> : <p className="text-3xl  text-gray-700 text-center">Create a new account</p>} 
                {selected === "login" ? <Login></Login> : <Register goToLogin={goToLogin}></Register>}
            </div>
        </>

    )

}

export default LoginPage