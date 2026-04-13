import Entry from "./Entry"

function EntryList({entrys,actions}){
    
    const list = entrys.map(e => <Entry entry={e} key={e.id} actions={actions}></Entry>)
    
    return list

}

export default EntryList