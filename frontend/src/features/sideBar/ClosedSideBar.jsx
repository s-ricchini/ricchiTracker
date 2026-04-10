import MenuBars from "../../assets/icons/MenuBars"

function ClosedSideBar({toggleSideBar}){

    return(
        <div className="cursor-pointer h-full bg-white" onClick={toggleSideBar}>
            <MenuBars color={'black'} hoverColor={'orange'}></MenuBars>
        </div>

    )

}

export default ClosedSideBar