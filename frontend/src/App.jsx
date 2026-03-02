
import './App.css'
import TodoList from './features/todoList/components/TodoList'
import Pomodoro from './features/pomodoro/components/Pomodoro'


function App() {
  return (
    <div className='flex gap-5' >
      <div className='w-3/5'>
        <TodoList></TodoList>
      </div>
      <div className='w-2/5'>
        <Pomodoro></Pomodoro>
      </div>
      
    </div>
  )
}

export default App