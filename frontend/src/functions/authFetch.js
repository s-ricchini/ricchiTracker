
//fetch que usa logica de refresh token, 
    //llama a la url solicitada
        //si devuelve la data:
            //return
        //si devuelve status 401
            //llamo a refresh
                //si devuelve 200
                    //llamo a la url original
                //401
                    //mando al usuario al login




export default async function authFetch(url,options,navigate) {
    
    const finalOptions = {
        ...options,
        credentials:"include"
    }    

    try {
        const response = await fetch(url,finalOptions)

        if (response.status === 401){
            const refreshResponse = await fetch('http://localhost:1234/auth/refresh',{method:"POST",credentials:"include"})

            if (refreshResponse.status === 401){
                navigate('/login')
                throw new Error("Invalid token")
            }

            if(!refreshResponse.ok){
                throw new Error("Error en el fetch de refresh")
            }

            //vuelvo a llamar a la url original
            const newUrlRequest = await fetch(url,finalOptions)

            return newUrlRequest

        }

        return response

    } catch (error) {
        console.log(error)
        throw error
    }

}