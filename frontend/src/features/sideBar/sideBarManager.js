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
        
        if (this.dataPlana.length <= 0){
            return []
        }

        //creo el mapa id : nodo O(n)
        this.dataPlana.forEach(element => {
            this.nodeMap[element.id] = new SidebarNode(element)            
        });


        //creo las conecciones de padre/hijo O(n)
        this.dataPlana.forEach(element => {
            //es el hijo de alguien
            if (element.parent_id !== null && element.parent_id !== undefined){
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
    getAllChildsId(id) {
        let ids = [];
        let nodoActual = this.findById(id);

        // Si el nodo existe y tiene hijos
        if (nodoActual && nodoActual.hasChilds()) {
            const hijosDirectos = nodoActual.getChildsId();
            
            ids.push(...hijosDirectos);

            hijosDirectos.forEach(hijoId => {
                const idsDescendientes = this.getAllChildsId(hijoId); 
                ids.push(...idsDescendientes); 
            });
        }

        // retorna la lista completa de descendientes
        return ids;
    }

}

export default SideBarManager