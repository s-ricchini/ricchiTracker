import { HexColorPicker } from "react-colorful";
import { useState } from "react";
import ShowColor from "./ShowColor";

function ColorPicker({previusColor = null,handleChangeColor}) {

    const [color, setColor] = useState("#aabbcc");
    return (
        <div className="space-y-2">
            <HexColorPicker color={color} onChange={setColor} />
            
            <div className="space-y-2">
                {previusColor && <ShowColor text={"Previus Color"} color={previusColor}></ShowColor>}
                <ShowColor text = {"New Color"} color={color}/>
            </div>
            <div className="space-x-2">
                <button className="px-2 py-1.5 bg-black text-white rounded hover:cursor-pointer hover:bg-amber-500" onClick={() => handleChangeColor(color)}>Confirm</button>
                {previusColor && <button className="px-2 py-1.5 text-black rounded hover:cursor-pointer hover:text-amber-500" onClick={() => setColor(previusColor)}>Reset</button>}
            </div>
        </div>
    );
}

export default ColorPicker;