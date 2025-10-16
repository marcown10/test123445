import React, { useState, useEffect } from 'react'
    import { v4 as uuidv4 } from 'uuid'

    function App() {
      const [todos, setTodos] = useState([])
      const [input, setInput] = useState('')

      useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos') || '[]')
        setTodos(savedTodos)
      }, [])

      useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
      }, [todos])

      const addTodo = () => {
        if (input.trim()) {
          const newTodo = {
            id: uuidv4(),
            text: input,
            completed: false
          }
          setTodos([...todos, newTodo])
          setInput('')
        }
      }

      const toggleComplete = (id) => {
        const updatedTodos = todos.map(todo => 
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
        setTodos(updatedTodos)
      }

      const deleteTodo = (id) => {
        const filteredTodos = todos.filter(todo => todo.id !== id)
        setTodos(filteredTodos)
      }

      return (
        <div className="todo-container">
          <div className="todo-input">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a new todo"
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            />
            <button onClick={addTodo}>Add Todo</button>
          </div>
          <ul className="todo-list">
            {todos.map(todo => (
              <li 
                key={todo.id} 
                className={`todo-item ${todo.completed ? 'completed' : ''}`}
              >
                <span onClick={() => toggleComplete(todo.id)}>
                  {todo.text}
                </span>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )
    }

    export default App
