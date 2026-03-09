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

  const handleRightClick = (e) => {
    e.preventDefault()
    console.log('Click derecho')
    console.log(e)
  }

  function TrashIcon({color,hoverColor}){
    
    const [currentColor,setCurrentColor] = useState(color)
    
    const setHoverColor = () => {
        setCurrentColor(hoverColor)
    }

    const setInitialColor = () => {
        setCurrentColor(color)
    }

    return(
        <svg onMouseEnter={setHoverColor} onMouseLeave={setInitialColor} className="hover:cursor-pointer size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill={currentColor} d="M232.7 69.9C237.1 56.8 249.3 48 263.1 48L377 48C390.8 48 403 56.8 407.4 69.9L416 96L512 96C529.7 96 544 110.3 544 128C544 145.7 529.7 160 512 160L128 160C110.3 160 96 145.7 96 128C96 110.3 110.3 96 128 96L224 96L232.7 69.9zM128 208L512 208L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 208zM216 272C202.7 272 192 282.7 192 296L192 488C192 501.3 202.7 512 216 512C229.3 512 240 501.3 240 488L240 296C240 282.7 229.3 272 216 272zM320 272C306.7 272 296 282.7 296 296L296 488C296 501.3 306.7 512 320 512C333.3 512 344 501.3 344 488L344 296C344 282.7 333.3 272 320 272zM424 272C410.7 272 400 282.7 400 296L400 488C400 501.3 410.7 512 424 512C437.3 512 448 501.3 448 488L448 296C448 282.7 437.3 272 424 272z"/></svg>


    )
  }

  function FileIcon({color}){
    return(
      <svg className='size-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill={color} d="M304 112L192 112C183.2 112 176 119.2 176 128L176 512C176 520.8 183.2 528 192 528L448 528C456.8 528 464 520.8 464 512L464 272L376 272C336.2 272 304 239.8 304 200L304 112zM444.1 224L352 131.9L352 200C352 213.3 362.7 224 376 224L444.1 224zM128 128C128 92.7 156.7 64 192 64L325.5 64C342.5 64 358.8 70.7 370.8 82.7L493.3 205.3C505.3 217.3 512 233.6 512 250.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128z"/></svg>
    )
  }

  function FolderClosed({color}){

    return(
      <svg className='size-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill={color} d="M128 512L512 512C547.3 512 576 483.3 576 448L576 208C576 172.7 547.3 144 512 144L362.7 144C355.8 144 349 141.8 343.5 137.6L305.1 108.8C294 100.5 280.5 96 266.7 96L128 96C92.7 96 64 124.7 64 160L64 448C64 483.3 92.7 512 128 512z"/></svg>
    )
    
  }

  function FolderOpen({color}){
    return(
      <svg className='size-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill={color} d="M88 289.6L64.4 360.2L64.4 160C64.4 124.7 93.1 96 128.4 96L267.1 96C280.9 96 294.4 100.5 305.5 108.8L343.9 137.6C349.4 141.8 356.2 144 363.1 144L480.4 144C515.7 144 544.4 172.7 544.4 208L544.4 224L179 224C137.7 224 101 250.4 87.9 289.6zM509.8 512L131 512C98.2 512 75.1 479.9 85.5 448.8L133.5 304.8C140 285.2 158.4 272 179 272L557.8 272C590.6 272 613.7 304.1 603.3 335.2L555.3 479.2C548.8 498.8 530.4 512 509.8 512z"/></svg>

    )


  }


  return(
    <div className='ml-4'>
      <div onClick={handleClick} onContextMenu={handleRightClick} className='flex gap 3 text-gray-800 cursor-pointer items-center gap-1' >
        <span>
          {nodo.isFolder() ? (isOpen ? <FolderOpen color={nodo.getColor()}></FolderOpen> : <FolderClosed color={nodo.getColor()}></FolderClosed>) : <FileIcon color={nodo.getColor()}></FileIcon>}
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