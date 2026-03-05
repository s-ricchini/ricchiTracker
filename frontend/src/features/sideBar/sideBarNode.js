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

  //añadir un hijo
  addChild(node) {
    this.children.push(node);
  }
}

export default SidebarNode