import MenuBars from "../../assets/icons/MenuBars"

function ClosedSideBar({toggleSideBar}){

    return(
        <div className="cursor-pointer" onClick={toggleSideBar}>
            <MenuBars color={'black'} hoverColor={'orange'}></MenuBars>
        </div>

    )


}

export default ClosedSideBar