function ContextMenu({id,x,y}){
  return(
    <div style={{position:'fixed', top: y, left:x, zIndex:1000}} className='bg-white border border-gray-300'>
      <p>HOLA SOY UN MENU FLOTANTE {id}</p>
    </div>
  )
}

export default ContextMenu