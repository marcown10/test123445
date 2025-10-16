import React, { useState, useEffect } from 'react'
    import { v4 as uuidv4 } from 'uuid'
    import Navbar from './components/Navbar'
    import Footer from './components/Footer'

    function App() {
      const [todos, setTodos] = useState([])
      const [input, setInput] = useState('')
      const [filter, setFilter] = useState('all')
      const [editingId, setEditingId] = useState(null)
      const [editText, setEditText] = useState('')

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
            completed: false,
            createdAt: new Date().toISOString()
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

      const startEditing = (todo) => {
        setEditingId(todo.id)
        setEditText(todo.text)
      }

      const saveEdit = () => {
        const updatedTodos = todos.map(todo => 
          todo.id === editingId ? { ...todo, text: editText } : todo
        )
        setTodos(updatedTodos)
        setEditingId(null)
        setEditText('')
      }

      const clearCompleted = () => {
        const activeTodos = todos.filter(todo => !todo.completed)
        setTodos(activeTodos)
      }

      const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed
        if (filter === 'completed') return todo.completed
        return true
      })

      return (
        <div className="app-container">
          <Navbar />
          
          <div className="hero-section">
            <h1>Manage Your Todos</h1>
            <p>Stay organized and boost your productivity</p>
          </div>

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

            <div className="todo-filters">
              <button 
                className={filter === 'all' ? 'active' : ''} 
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button 
                className={filter === 'active' ? 'active' : ''} 
                onClick={() => setFilter('active')}
              >
                Active
              </button>
              <button 
                className={filter === 'completed' ? 'active' : ''} 
                onClick={() => setFilter('completed')}
              >
                Completed
              </button>
              <button onClick={clearCompleted}>Clear Completed</button>
            </div>

            <ul className="todo-list">
              {filteredTodos.map(todo => (
                <li 
                  key={todo.id} 
                  className={`todo-item ${todo.completed ? 'completed' : ''}`}
                >
                  {editingId === todo.id ? (
                    <div className="edit-todo">
                      <input 
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                      />
                      <button onClick={saveEdit}>Save</button>
                      <button onClick={() => setEditingId(null)}>Cancel</button>
                    </div>
                  ) : (
                    <>
                      <span onClick={() => toggleComplete(todo.id)}>
                        {todo.text}
                      </span>
                      <div className="todo-actions">
                        <button onClick={() => startEditing(todo)}>Edit</button>
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>

            <div className="todo-summary">
              Total Todos: {todos.length} | 
              Active: {todos.filter(todo => !todo.completed).length} | 
              Completed: {todos.filter(todo => todo.completed).length}
            </div>
          </div>

          <Footer />
        </div>
      )
    }

    export default App
