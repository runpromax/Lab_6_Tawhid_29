import { useState } from 'react'

function App() {
  const [tasks, setTasks] = useState([])
  const [inputValue, setInputValue] = useState('')

  const handleAddTask = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const newTask = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
    }

    setTasks([newTask, ...tasks])
    setInputValue('')
  }


  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const remainingTasks = tasks.filter((task) => !task.completed).length

  return (
    <div className="min-h-screen bg-white text-slate-800 flex items-center justify-center p-4">
  
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-slate-200">
        
     
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Task Manager
            </h1>
            <p className="text-xs text-slate-500 mt-1">Keep track of your daily goals</p>
          </div>
          
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-violet-50 text-violet-600 border border-violet-200">
            {remainingTasks} pending
          </span>
        </div>

        <form onSubmit={handleAddTask} className="flex gap-2.5 mb-6">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 text-slate-800 placeholder-slate-400 transition-all text-sm"
          />
          <button
            type="submit"
            className="px-5 py-3 bg-violet-600 hover:bg-violet-700 active:scale-95 transition-all text-white font-medium text-sm rounded-xl shadow-md shadow-violet-200 cursor-pointer"
          >
            Add
          </button>
        </form>

     
        <div className="flex justify-between items-center px-1 mb-4 text-xs font-medium text-slate-500">
          <span>Remaining: <strong className="text-violet-600 font-semibold">{remainingTasks}</strong></span>
          <span>Total: <strong className="text-slate-700">{tasks.length}</strong></span>
        </div>

        
        <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
          {tasks.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-slate-200 rounded-xl">
              <p className="text-slate-400 text-sm">No tasks added yet. Start by writing one!</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className={`group flex items-center justify-between p-3.5 rounded-xl border transition-all duration-200 ${
                  task.completed
                    ? 'bg-slate-50 border-slate-200 opacity-60'
                    : 'bg-violet-50/40 hover:bg-violet-50/70 border-violet-200/80 hover:border-violet-300 shadow-sm'
                }`}
              >
             
                <div
                  onClick={() => handleToggleComplete(task.id)}
                  className="flex items-center gap-3.5 cursor-pointer flex-1 select-none min-w-0"
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleComplete(task.id)}
                    className="h-4.5 w-4.5 rounded-md border-violet-300 text-violet-600 focus:ring-0 cursor-pointer accent-violet-600"
                  />
                  <span
                    className={`text-sm truncate transition-all duration-200 ${
                      task.completed
                        ? 'line-through text-slate-400'
                        : 'text-violet-950 font-medium'
                    }`}
                  >
                    {task.text}
                  </span>
                </div>

               
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 px-2 py-1 rounded-lg transition-all text-xs font-semibold cursor-pointer ml-2"
                  title="Delete task"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default App