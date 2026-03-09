import { useState } from 'react';


function SideBaritem({nodo,openFile,deleteFile}){ //openFile es una funcion que se encarga de hacer el fetch un nivel mas arriba de componente
  const [isOpen,setIsOpen] = useState(false);

  const handleClick = () => {
    //si es carpeta modifico el stado a open -> desencadena la recursividad
    if(nodo.isFolder()){
      setIsOpen( prev => !prev)
    } else{
      openFile(nodo.getId())
    }

  }

  const handleDelete = () => {
    deleteFile(nodo.getId());
  }

  return(
    <div className='ml-4'>
      <div onClick={handleClick} className='flex gap 3'>
        <span>
          {nodo.isFolder() ? (isOpen ? 'OPEN' : "CLOSE") : "FILE"}
        </span>
        <span>
          {nodo.getTitle()}
        </span>
      </div>
      {(nodo.isFolder() && isOpen && nodo.hasChilds()) &&  nodo.getChilds().map(child => <SideBaritem  key= {child.getId()} nodo={child} openFile={openFile} deleteFile={deleteFile}></SideBaritem>)}
      

    </div>

  )

}

export default SideBaritem