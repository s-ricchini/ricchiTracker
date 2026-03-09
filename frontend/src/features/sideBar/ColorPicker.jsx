import { HexColorPicker } from "react-colorful";
import { useState } from "react";


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

function ColorPicker({previusColor = null}) {

    const [color, setColor] = useState("#aabbcc");
    return (
        <div className="space-y-2">
            <HexColorPicker color={color} onChange={setColor} />
            
            <div className="space-y-2">
                {previusColor && <ShowColor text={"Previus Color"} color={previusColor}></ShowColor>}
                <ShowColor text = {"New Color"} color={color}/>
            </div>
            <div className="space-x-2">
                <button className="px-2 py-1.5 bg-black text-white rounded hover:cursor-pointer hover:bg-amber-500">Confirm</button>
                {previusColor && <button className="px-2 py-1.5 text-black rounded hover:cursor-pointer hover:text-amber-500" onClick={() => setColor(previusColor)}>Reset</button>}
            </div>
        </div>
    );
}

export default ColorPicker;