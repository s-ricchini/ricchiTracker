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
        items.splice(deletedItemIndex,1)

        return deletedItem
        

    }

}