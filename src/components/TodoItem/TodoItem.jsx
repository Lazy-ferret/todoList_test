import dayjs from 'dayjs'
import React, { useMemo } from 'react'

const TodoItem = ({ todo, onDelete, onComplete, onEdit }) => {
    const { id, title, description, endDate, completed, attachment } = todo

    const isExpired = useMemo(() => {
        const date = dayjs(endDate)
        const currentDate = dayjs()

        if (date.diff(currentDate) >= 0) {
            return false
        } else {
            return true
        }
    }, [endDate])

    const handleDelete = (id) => {
        onDelete(id)
    }

    const handleEdit = (todo) => {
        onEdit(todo)
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
                <div className='TodoItemAttachment'>{attachment?.name}</div>
            </div>


            <div className='TodoItemControl'>
                <input type='checkbox' className='checkbox' checked={completed} onChange={() => onComplete(id)} />
                <button className='button edit' onClick={() => handleEdit(todo)}>edit</button>
                <button className='button delete' onClick={() => handleDelete(id)}>x</button>
            </div>
        </li>
    )
}

export default TodoItem