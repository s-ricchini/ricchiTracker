class SidebarNode {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.type; // 'folder' o 'file'
    this.color = data.color;
    this.parentId = data.parent_id;
    this.position = data.position;
    this.children = []; //guardaremos los hijos
  }

  // es carpeta
  isFolder() {
    return this.type === 'folder';
  }

  getId(){
    return this.id
  }

  hasChilds(){
    return this.children.length > 0
  }

  getChilds(){
    return this.children
  }

  getChildsId(){
    if (this.children.length === 0){
      return []
    }

    //consigo todos los id
    let ids = [];
    this.children.forEach(child => ids.push(child.getId()))
    return ids
    
  }

  getTitle(){
    return this.name
  }

  getColor(){
    if(this.color){
      return this.color
    }
    
    //color por defecto
    return 'black'
  }

  //añadir un hijo
  addChild(node) {
    this.children.push(node);
    //ordeno los hijos por posicion
    this.children.sort((a, b) => a.position - b.position)
  }
}


export default SidebarNode