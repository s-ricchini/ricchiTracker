function Entry({entry}){
    
    const localDate = new Date(entry.created_at)
    const formattedDate = localDate.toLocaleString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true 
    });


    return(
        <div className="bg-white p-4 py-8 mt-3 space-y-2 border-gray-100 rounded-xl">
            <div className="flex justify-between items-center">
                <p className="font-semibold text-lg text-gray-900">{entry.title}</p>
                <p className="text-gray-400">{formattedDate}</p>
            </div>
            <p className="text-lg text-gray-700">{entry.content}</p>

        </div>


    )

}

export default Entry