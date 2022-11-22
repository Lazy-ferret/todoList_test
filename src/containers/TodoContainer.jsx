import React, { useEffect, useState } from 'react'
import TodoEditModal from '../components/TodoEditModal/TodoEditModal'
import TodoList from '../components/TodoList/TodoList'
import { deleteTodoItem, getTodoList, saveTodoItem } from '../service/database'

/**
 * Component contains all handlers for interaction with DB API. 
 * Return UI components TodoList and TodoEditModal   
 *  
 * @returns TodoList   
 * @returns TodoEditModal - return if local state isModalOpen is true 
 */
const TodoContainer = () => {
  const [todos, setTodos] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTodo, setEditingTodo] = useState(null)

  const loadTodoList = async () => {
    const todoList = await getTodoList()
    setTodos(todoList)
  }

  useEffect(() => {
    loadTodoList()
  }, [])

  const handleEdit = (todo) => {
    setEditingTodo(todo)
    setIsModalOpen(true)
  }

  const handleComplete = async (item) => {
    await saveTodoItem({ ...item, completed: !item.completed })
    loadTodoList()
  }

  const handleAddClick = () => {
    setIsModalOpen(true)
  }

  const handleCloseClick = () => {
    setEditingTodo(null)
    setIsModalOpen(false)
  }

  const handleSubmitModal = async (item) => {
    await saveTodoItem(item)
    loadTodoList()
    setEditingTodo(null)
    setIsModalOpen(false)
  }

  const handleDelete = (id) => {
    deleteTodoItem(id)
    loadTodoList()
  }

  return (
    <div className='TodoContainer'>
      {!isModalOpen && <button className='add' onClick={handleAddClick}>add</button>}
      <TodoList todos={todos}
        listTitle='Todo List'
        onDelete={handleDelete}
        onEdit={handleEdit}
        onComplete={handleComplete}
        onAddClick={handleAddClick}
        isModalOpen={isModalOpen}
      />
      {isModalOpen && <TodoEditModal
        onFormSubmit={handleSubmitModal}
        onCloseClick={handleCloseClick}
        todo={editingTodo}
      />}
    </div>
  )
}

export default TodoContainer