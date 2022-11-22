import dayjs from 'dayjs'
import React, { useMemo } from 'react'

/**
 * UI component for displaying data for each task  
 * takes data from TodoList and return markup of todo item
 * 
 * @prop {Object} todo - data of todo item 
 * @prop {function} onDelete - delete todo item handler 
 * @prop {function} onComplete - todo item property 'completed' handler  
 * @prop {function} onEdit - submit form handler
 * @returns TodoItem - UI component for displaying data for each task
 */
const TodoItem = ({ todo, onDelete, onComplete, onEdit }) => {
    const { title, description, endDate, completed, attachmentUrl } = todo

    const isExpired = useMemo(() => {
        const date = dayjs(endDate)
        const currentDate = dayjs()

        if (date.diff(currentDate) >= 0) {
            return false
        } else {
            return true
        }
    }, [endDate])

    const handleDelete = (todo) => {
        onDelete(todo)
    }

    const handleEdit = (todo) => {
        onEdit(todo)
    }

    const handleComplete = (id) => {
        onComplete(id)
    }

    return (
        <li className='TodoItem'>
            <div className='TodoItemContent'>
                <div className={`TodoItemDescription${completed ? ' completed' : ''}`}>
                    <div className='title'>{title}</div>
                    <div>{description}</div>
                </div>
                <div className={`TodoItemEndDate${isExpired ? ' expired' : ''}`}>
                    {endDate}   
                </div>
                {attachmentUrl && <div className='TodoItemAttachment'>
                    <a href={attachmentUrl}>attachment</a>
                </div>}
            </div>
            <div className='TodoItemControl'>
                <input type='checkbox'
                    className='checkbox'
                    checked={completed}
                    onChange={() => handleComplete(todo)} />
                <button className='button edit' onClick={() => handleEdit(todo)}>edit</button>
                <button className='button delete' onClick={() => handleDelete(todo)}>x</button>
            </div>
        </li>
    )
}

export default TodoItem