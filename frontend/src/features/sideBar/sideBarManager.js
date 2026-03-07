import SidebarNode from "./sideBarNode"

class SideBarManager{
    constructor(data){
        this.dataPlana = data
        this.map = {}
        this.tree = this.createTree()
    }

    createTree(){
        const nodeMap = {}
        const root = []
        
        //creo el mapa id : nodo O(n)
        this.dataPlana.forEach(element => {
            nodeMap[element.id] = new SidebarNode(element)            
        });


        //creo las conecciones de padre/hijo O(n)
        this.dataPlana.forEach(element => {
            //es el hijo de alguien
            if (element.parent_id){
                const nodoPadre = nodeMap[element.parent_id];
                const nodoHijo = nodeMap[element.id];

                nodoPadre.addChild(nodoHijo);

            } else {
                //no tiene padre -> es root
                root.push(nodeMap[element.id])
            }
        });

        //ordeno por posicion los elementos tambien del root
        return root.sort((a, b) => a.position - b.position)
        
    }

    //crear arbol
        // 


    //agregar nodo a arbol existente (nodo)

    //crear mapa de la flatlist


}