import React, { useEffect, useState } from 'react'

/**
 * Component for rendering a form that creates new tasks 
 * and edits existing ones
 * 
 * @prop {function} onFormSubmit - submit form handler 
 * @prop {function} onCloseClick - close button handler 
 * @prop {Object} todo - data of editing TodoItem
 * @returns - form for creating and editing tasks
 */

const TodoEditModal = ({ onFormSubmit, onCloseClick, todo }) => {
    const [value, setValue] = useState({
        id: undefined,
        title: '',
        description: '',
        endDate: '',
        completed: false,
        file: null,
        attachmentUrl: ''
    })

    useEffect(() => {
        if (todo) {
            setValue(todo)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleFieldChange = (e) => {
        const newTodo = { ...value }
        newTodo[e.target.name] = e.target.value
        setValue(newTodo)
    }

    const handleAttachmentChange = (e) => {
        const file = e.target.files[0]
        const newTodo = { ...value, file }
        setValue(newTodo)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onFormSubmit(value)
    }

    return (
        <div className='TodoEditModal'>
            <div className='TodoEditBtn'>
                <button onClick={onCloseClick} className='close'>x</button>
            </div>
            <form action="submit" className='TodoEditForm' onSubmit={handleSubmit}>
                <div>Todo Item</div>

                <label htmlFor="title">Title</label>
                <input type="text"
                    name='title'
                    onChange={handleFieldChange}
                    value={value.title}
                    required
                    placeholder='type new task' />

                <label htmlFor="description">Description</label>
                <textarea name="description"
                    onChange={handleFieldChange}
                    value={value.description}
                    placeholder='describe new task' />

                <label htmlFor="endDate">End date</label>
                <input type="date"
                    name='endDate'
                    onChange={handleFieldChange}
                    value={value.endDate} />

                <label htmlFor="attachment">File</label>
                {!value.attachmentUrl &&
                    <input type="file"
                        name='attachment'
                        onChange={handleAttachmentChange}
                    />}
                {value.attachmentUrl &&
                    <a href={value.attachmentUrl}>attachment</a>}
                <button type='submit' className='save'>save</button>
            </form>
        </div>
    )
}

export default TodoEditModal