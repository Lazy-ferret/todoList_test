import React from 'react'
import TodoItem from '../TodoItem/TodoItem'

const TodoList = ({ todos, listTitle, onDelete, onComplete, onAddClick, isModalOpen, onEdit }) => {

    return (
        <div className='TodoList'>
            <h1>{listTitle}</h1>
            <ul >
                {todos.length !== 0 ?
                    todos.map(todo => {
                        return <TodoItem
                            key={todo.id}
                            todo={todo}
                            onDelete={onDelete}
                            onEdit={onEdit}
                            onComplete={onComplete}
                            onAddClick={onAddClick}
                        />
                    })
                    : <span>ToDo List is empty</span>
                }
            </ul>
            {!isModalOpen && <button className='add' onClick={onAddClick}>add</button>}
        </div>
    )
}

export default TodoList