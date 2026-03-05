
import './App.css'
import TodoList from './features/todoList/components/TodoList'
import Pomodoro from './features/pomodoro/components/Pomodoro'

import SideBar from './features/sideBar/SideBar'

function App() {
  return (
    <div className='flex h-screen'>
      <h2>HOLA</h2>
      <div className='w-1/8 bg-white'>
        <SideBar></SideBar>
      </div>  
      <div className='flex gap-5 m-5 w-7/8' >
        <div className='w-3/5'>
          <TodoList></TodoList>
        </div>
        <div className='w-2/5'>
          <Pomodoro></Pomodoro>
        </div>
        
      </div>
    </div>
  )
}

export default App