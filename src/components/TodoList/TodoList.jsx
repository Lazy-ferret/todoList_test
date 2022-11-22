import React, { useMemo } from 'react'
import TodoItem from '../TodoItem/TodoItem'

/**
 * Component that takes array of todos and return  
 * TodoItem for each item in the array
 *  
 * @prop {function} onFormSubmit - submit form handler 
 * @prop {function} onCloseClick - close button handler 
 * @prop {Object} todo - data of editing TodoItem
 * @returns TodoItem - UI component for displaying data for each task
 */
const TodoList = ({ todos, listTitle, onDelete, onComplete, onAddClick, isModalOpen, onEdit }) => {

    const memoList = useMemo(() => {
        return todos.map(todo => {
            return <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={onDelete}
                onEdit={onEdit}
                onComplete={onComplete}
                onAddClick={onAddClick}
            />
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [todos])

    return (
        <div className='TodoList'>
            <h1>{listTitle}</h1>
            <ul >
                {todos.length
                    ? memoList
                    : <span>ToDo List is empty</span>
                }
            </ul>
            {!isModalOpen && <button className='add' onClick={onAddClick}>add</button>}
        </div>
    )
}

export default TodoList