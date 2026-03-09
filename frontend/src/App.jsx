
import './App.css'
import { useState } from 'react'
import TodoList from './features/todoList/components/TodoList'
import Pomodoro from './features/pomodoro/components/Pomodoro'

import OpenSideBar from './features/sideBar/SideBar'
import ClosedSideBar from './features/sideBar/ClosedSideBar'
import ColorPicker from './features/sideBar/ColorPicker'


function App() {
  
  const [isOpen,setIsOpen] = useState(true)

  function toggleSideBar(){
    setIsOpen(prev => !prev)
  }

  return (
    <div className='flex h-screen'>
      {isOpen ? <OpenSideBar toggleSideBar={toggleSideBar}></OpenSideBar> : <ClosedSideBar toggleSideBar={toggleSideBar}></ClosedSideBar> }
      <div className='flex gap-5 m-5' >
        <div className='w-1/2'>
          <TodoList></TodoList>
        </div>
        <div className='w-1/2'>
          <Pomodoro></Pomodoro>
        </div>
        
      </div>
      <ColorPicker previusColor={"#aabbcc"}></ColorPicker>
    </div>
  )
}

export default App