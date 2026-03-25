function ShowColor({text,color}){

    return(
        
        <div className="p-2 border border-gray-300 rounded-xl flex flex-col gap-1">
            <p>{text}</p>
            <div className="flex gap-2 items-center">
                <div className="size-6 rounded-2xl" style={{ backgroundColor: color }}></div>
                <p>{color}</p>
            </div>
        </div>


    )

}

export default ShowColor