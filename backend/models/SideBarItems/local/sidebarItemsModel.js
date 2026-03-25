import items from './data.json' with {type:'json'};

export class sideBarItemsModel{
    static async getAll(){
        return items;
    }

    static async addItem(){
        
    }

}