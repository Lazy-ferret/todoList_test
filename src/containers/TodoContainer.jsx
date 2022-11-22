import React, { useEffect, useState } from 'react'
import TodoEditModal from '../components/TodoEditModal/TodoEditModal'
import TodoList from '../components/TodoList/TodoList'
import { deleteTodoItem, getTodoList, saveTodoItem } from '../service/database'

const TodoContainer = (props) => {
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
    item.completed = !item.completed
    await saveTodoItem(item)
    loadTodoList()
  }

  const handleToggleModal = () => {
    setEditingTodo(null)
    setIsModalOpen(!isModalOpen)
  }

  const handleEditModal = async (item) => {
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
    <>
      <TodoList todos={todos}
        listTitle='Todo List'
        onDelete={handleDelete}
        onEdit={handleEdit}
        onComplete={handleComplete}
        onAddClick={handleToggleModal}
        isModalOpen={isModalOpen}
      />
      {isModalOpen && <TodoEditModal
        onFormSubmit={handleEditModal}
        onCloseClick={handleToggleModal}
        todo={editingTodo}
      />}
    </>
  )
}

export default TodoContainer