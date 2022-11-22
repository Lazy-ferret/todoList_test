import React, { useMemo } from 'react'
import TodoItem from '../TodoItem/TodoItem'

/**
 * Component that takes array of todos and return  
 * TodoItem for each item in the array
 *  
 * @prop {function} onFormSubmit - submit form handler 
 * @prop {Array} todos - array of objects of todo items data
 * @prop {string} listTitle - list title
 * @prop {function} onDelete - delete todo item handler 
 * @prop {function} onComplete - todo item property 'completed' handler
 * @prop {function} onEdit - submit form handler
 * @returns TodoItem - UI component for displaying data for each task
 */
const TodoList = ({ todos, listTitle, onDelete, onComplete, onEdit }) => {

    const memoList = useMemo(() => {
        return todos.map(todo => {
            return <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={onDelete}
                onEdit={onEdit}
                onComplete={onComplete}
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
        </div>
    )
}

export default TodoList