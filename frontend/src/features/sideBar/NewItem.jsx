import { useState } from "react"
import ColorPicker from "./ColorPicker"


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


function NewItem(){
    
    const [name,setName] = useState('')
    const [type,setType] = useState('file')
    const [color,setColor] = useState('')

    const handleChange = (e) => {
        e.preventDefault();
        console.log(e)
    }

    return(
        <form>
            <input onChange={handleChange} type="text" value={name} placeholder="Name"></input>
            <select>
            </select>
        </form>

    )

}


export default NewItem
