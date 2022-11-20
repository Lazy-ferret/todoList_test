import React, { useEffect, useRef, useState } from 'react'

const TodoEditModal = ({ onFormSubmit, onCloseClick, todo }) => {
    const [value, setValue] = useState({
        id: Number(Date.now()),
        title: '',
        description: '',
        endDate: '',
        completed: false,
        attachment: null
    })

    useEffect(() => {
        if (todo) {
            setValue(todo)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fileRef = useRef()

    const handleFieldChange = (e) => {
        const newTodo = { ...value }
        newTodo[e.target.name] = e.target.value
        setValue(newTodo)
    }

    const handleAttachmentChange = (e) => {
        const newTodo = { ...value, attachment: e.target.files[0] }
        setValue(newTodo)
    }

    const handleSubmit = () => {
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
                <input type="file"
                    name='attachment'
                    onChange={handleAttachmentChange}
                    ref={fileRef}
                />

                <button type='submit' className='save'>save</button>
            </form>
        </div>
    )
}

export default TodoEditModal