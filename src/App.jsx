import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navabar.jsx'

function App() {

  const [Todos, setTodos] = useState(()=>{
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  })
  const [Todo, setTodo] = useState("")

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(Todos));
  }, [Todos]);

  const handleEdit = (index) => {
    setTodos((prevTodos) =>
      prevTodos.map((item, i) =>
        i === index ? { ...item, isEditing: !item.isEditing } : item
      )
    );
  };

  const handleSave = (index, newTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((item, i) =>
        i === index ? { ...item, Todo: newTodo, isEditing: false } : item
      )
    );
  };
  const handleKeyDownsave=()=>{
    if(key==="Enter"){
      handleSave()
    }
  }
  const handleDelete = (index) => {
    setTodos(Todos.filter((_, i) => i !== index));
  };
  const handleAdd = () => {
    setTodos([...Todos, { Todo, isCompleted: false }])
    setTodo("")
    console.log(Todos)
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleKeyDownadd=(e)=>{
    if(e.key==="Enter"){
      handleAdd()
    }
  }
  const handleCheckbox = (index) => {
    setTodos((prevTodos) =>
      prevTodos.map((item, i) =>
        i === index ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-3.5 text-amber-1000">

        <div className="add">
          <input onChange={handleChange} onKeyDown={handleKeyDownadd} value={Todo} className='bg-amber-50 text-amber-700 w-150 my-3.5 rounded-l-3xl h-10 pl-10' type="text" placeholder='What do you need to do?' />
          <button onClick={handleAdd} className='bg-amber-400 text-amber-50 w-20 my-3.5 rounded-r-3xl h-10 hover:bg-amber-500'>ADD</button>
        </div>

        <div className="Todos bg-amber-50 h-90 w-170 rounded-3xl m-3 p-3.5 flex flex-col">
          {Todos.map((item, index) => {


            return <div key={index} className='Todo flex justify-center relative h-12 border-b-2 border-b-amber-400'>
              <input onChange={() => handleCheckbox(index)} type="checkbox" value={Todo.isCompleted} />
              <div className={`${item.isCompleted ? "line-through" : ""} text flex justify-between items-center rounded-2xl w-120 p-5`}>
                {item.isEditing ? (
                  // Show input field when editing
                  <input
                    type="text" defaultValue={item.Todo} onBlur={(e) => handleSave(index, e.target.value)}  
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSave(index, e.target.value); // Save on Enter key press
                      }}}
                    className="text-amber-700 p-2 rounded bg-transparent border-none focus:outline-none editing"
                  />
                ) : (
                <h3>{item.Todo}</h3>)}</div>
              <div className="btn flex relative bottom-1.5 right-0">
                {/* edit btn*/}
                <button onClick={()=>handleEdit(index)} className="edit bg-amber-400 text-amber-50 w-8 my-3.5 rounded-3xl m-2 h-8 flex justify-center items-center hover:bg-amber-500">
                  <img src="   https://cdn-icons-png.flaticon.com/512/10573/10573605.png " width="20" height="20" />
                </button>
                {/* delete btm*/}
                <button onClick={() => handleDelete(index)} className="delete bg-amber-400 text-amber-50 w-8 my-3.5 rounded-3xl h-8 flex justify-center items-center hover:bg-amber-500">
                  <img src="   https://cdn-icons-png.flaticon.com/512/3096/3096687.png " width="20" height="20" />
                </button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
