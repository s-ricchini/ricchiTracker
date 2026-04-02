import items from './data.json' with {type:'json'};

export class sideBarItemsModel{
    static async getAll(){
        return items;
    }

    static async addItem(newItem){
        
        //verifico que la id no exista
        const existeId = items.findIndex(item => item.id === newItem.id);

        //si no existe lo agrego
        if(existeId === -1){
            items.push(newItem)
            return newItem;
        }

        //si no existe
        return null
    }

    static async modifyItem(changes){
        //busco el index
        const id = changes.id
        const index = items.findIndex(item => item.id === id)
        
        if(index === -1){
            //no existe el item
            return null
        }

        const newItem = {...items[index],...changes} 
        items[index] = newItem;
        return items[index];

    }

    static async deleteItem(id){
        const deletedItemIndex = items.findIndex(item => item.id === id) 

        if (deletedItemIndex === -1){
            return null
        }


        const deletedItem = {...items[deletedItemIndex]}
        
        if(deletedItem.type === "file"){
            items.splice(deletedItemIndex,1)   
            return deletedItem
        }
    
        //si es carpeta tengo que buscar a todos sus hijos para borrarlo en cascada

        //creo un diccionario
        const mapaItems = {}
        items.forEach(item => {
            mapaItems[item.id] = {...item,childs : []}
        })
    
        //asigno todos los hijos
        items.forEach(item => {
            if (item.parent_id){
                mapaItems[item.parent_id].childs.push(item.id)
            }
        })

        //arranco con el id que quiero borrar y busco todos sus id hijos recursivamente
        
        //si no tiene hijos lo borro directo
        if(mapaItems[id].childs.length === 0){
            items.splice(deletedItemIndex,1)   
            return deletedItem
        }

        //consigo todos los id cascada
        const todoslosIdAborrar = (idTarget) => {
            let ids = [idTarget]
            const childs = mapaItems[idTarget].childs || [];

            childs.forEach(child => {
                ids = [...ids,...todoslosIdAborrar(child)]

            });
        
            return ids;
        }


        const idBorrados = todoslosIdAborrar(id)
        
        let itemsBorrados = []
        idBorrados.forEach(idBorrado => {
            const index = items.findIndex(item => item.id === idBorrado)
            if(index){
                itemsBorrados.push(items[index])
            }
        })

        const setIdAborrar = new Set(idBorrados)
        const itemsNoBorrados = items.filter(item => !setIdAborrar.has(item.id))

        items.length = 0;
        items.push(...itemsNoBorrados)
        return itemsBorrados

    }

}