import { useState } from "react"
import { useForm } from "react-hook-form"

import ColorPicker from "./ColorPicker"
import ShowColor from "./ShowColor"

/*
    ejemplo del item
  {
    "id": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    "name": "Programación",
    "type": "folder",
    "color": "#50E3C2",
    "parent_id": null,
    "position": 1
  },
*/


function NewItem({type,handleCreation}){

    const [color,setColor] = useState("#000000")
    const [showPicker,setShowPicker] = useState(false)

    function handleColor(newColor){
        setColor(newColor)
        setTimeout(() => {setShowPicker(false)},100)
    }

    const {register,handleSubmit,formState: { errors }} = useForm()

    
    
    const onSubmit = (data) => {
        handleCreation(data.name,type,color)
    }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="ml-2">
        <div>
            <div className="flex">
                <input type="text" placeholder="Name"{...register("name", { required: true })} />
                {!showPicker && <input type="submit" value={"Create"}/>}
            </div>
            {errors.name && <span>This field is required</span>}
        </div>
        <ShowColor color={color} text={"Current Color"}></ShowColor>
        <button type="button" onClick={() => setShowPicker(prev => !prev)}>Choose Color</button>
        { showPicker && <ColorPicker handleChangeColor={handleColor}></ColorPicker>}
        
    </form>

)

}


export default NewItem
