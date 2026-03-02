import CirclePlus from "../../../assets/icons/CirclePlus";
import CircleMinus from "../../../assets/icons/CircleMinus"

function ParametroPomodoro({data,contador,setContador}){
    
    function incrementCounter(){
        if(contador < data.max){
            setContador(contador => contador + data.incrementBy)
        } 

        if (contador === data.max){
            setContador(0)
        }

    }

    function decrementCounter(){
        if(contador > 0){
            setContador(contador => contador - data.incrementBy)
        }
    }


    return(
        <div className="border-2 rounded-xl p-4 flex flex-col items-center justify-center w-1/3 space-y-3">
            <h3 className="text-gray-800">{data.title}</h3>
            <div className="flex flex-col items-center">
                <p className="text-2xl">{contador}</p>
                <p className=" text-gray-500 text-sm">({data.unit})</p>
            </div>
            <div className="flex gap-1.5">
                <button onClick={decrementCounter}><CircleMinus color={'black'} hoverColor={'orange'} size={7}></CircleMinus></button>
                <button onClick={incrementCounter}><CirclePlus color={'black'} hoverColor={'orange'} size={7}></CirclePlus></button>
            </div>

        </div>


    );
}

export default ParametroPomodoro
