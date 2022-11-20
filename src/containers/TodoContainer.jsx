import React, { useEffect, useState } from 'react'
import TodoEditModal from '../components/TodoEditModal/TodoEditModal';
import TodoList from '../components/TodoList/TodoList'
import { deleteTodoItem, getTodoList, saveTodoItem, updateTodoList } from '../service/database';

const TodoContainer = (props) => {

  const [todos, setTodos] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTodo, setEditingTodo] = useState(null)

  const loadTodoList = () => {
    const todoList = getTodoList()
    console.log('todoList', todoList)
    setTodos(todoList)
  }

  useEffect(() => {
    loadTodoList()
  }, []);

  const handleDelete = (id) => {
    deleteTodoItem(id)
    loadTodoList()
  }

  const handleEdit = (todo) => {
    setEditingTodo(todo)
    setIsModalOpen(true)
  }

  const handleComplete = (id) => {
    const todoList = todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })
    setTodos(todoList)
    updateTodoList(todos)
  }

  const handleOpenModal = () => {
    setEditingTodo(null)
    setIsModalOpen(!isModalOpen)
  }

  const handleEditModal = (item) => {
    
    console.log('item', item)
    saveTodoItem(item)
     loadTodoList()
    setEditingTodo(null)
    setIsModalOpen(false)
  }

  return (
    <>
      <TodoList todos={todos}
        listTitle='Todo List'
        onDelete={handleDelete}
        onEdit={handleEdit}
        onComplete={handleComplete}
        onAddClick={handleOpenModal}
        isModalOpen={isModalOpen}
      />
      {isModalOpen && <TodoEditModal
        onFormSubmit={handleEditModal}
        onCloseClick={handleOpenModal}
        todo={editingTodo}
      />}
    </>
  )
}

export default TodoContainer