import SidebarNode from "./sideBarNode"

class SideBarManager{
    constructor(data){
        this.dataPlana = data
        this.nodeMap = {}
        this.tree = this.createTree()
        this.searchedChildId = []
    }

    createTree(){
        const root = []
        
        //creo el mapa id : nodo O(n)
        this.dataPlana.forEach(element => {
            this.nodeMap[element.id] = new SidebarNode(element)            
        });


        //creo las conecciones de padre/hijo O(n)
        this.dataPlana.forEach(element => {
            //es el hijo de alguien
            if (element.parent_id){
                const nodoPadre = this.nodeMap[element.parent_id];
                const nodoHijo = this.nodeMap[element.id];

                nodoPadre.addChild(nodoHijo);

            } else {
                //no tiene padre -> es root
                root.push(this.nodeMap[element.id])
            }
        });

        //ordeno por posicion los elementos tambien del root

        return root.sort((a, b) => a.position - b.position)
        
    }

    getTree(){
        return this.tree
    }

    //metodo para encontrar por id
    findById(id){
        return this.nodeMap[id];
    }

    //reinicio los ids buscados
    resetSerchedChildsId(){
        this.searchedChildId = [];
    }

    //consigo todos los id hijos de un nodo 
    // obeservacion: antes de llamar a esta funcion reseta los searchedIdChilds con su metodo 
    getAllChildsId(id){
        
        let ids = []
        let nodoActual = this.findById(id);

        if(nodoActual.hasChild()){
            //pushea todos los id a la variable global
            ids.push(...nodoActual.getChildsId())
            this.searchedChildId.push(...ids)    
                
            //recursividad mientras cada nodo tenga hijos se sigue ejecutando hasta encontrar todos los nodos
            ids.forEach(id => this.getAllChildsId(id))
            
        }

        return
        
    }

}

export default SideBarManager