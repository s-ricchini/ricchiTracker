
import TodoList from "../features/todoList/components/TodoList";
import Pomodoro from "../features/pomodoro/components/Pomodoro";
import FullSideBar from "../features/sideBar/FullSideBar";
import NavBar from "../features/navbar/NavBar";


function HomePage(){


  return (
    <div>
      <NavBar></NavBar>
      <div className="flex h-screen">
        <FullSideBar></FullSideBar>
        <div className="flex  flex-1 gap-5 m-5">
          <div className="w-1/2">
            <TodoList></TodoList>
          </div>
          <div className="w-1/2">
            <Pomodoro></Pomodoro>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage

