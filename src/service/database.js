let todos = [
    {
        id: 1,
        title: 'Авав',
        description: 'Посмотреть на собаку',
        endDate: '2022-10-22',
        completed: true,
        attachment: null
    },
    {
        id: 2,
        title: 'Мяу',
        description: 'Погладить кошку',
        endDate: '2022-11-25',
        completed: false,
        attachment: false
    },
]

export const getTodoList = () => {
    return todos
}

export const saveTodoItem = (item) => {
    todos = todos.filter(i => i.id !== item.id)
    todos.push(item)
}

export const deleteTodoItem = (id) => {
    const newTodos = todos.filter(i => i.id !== id)
    todos = newTodos
}

export const updateTodoList = (newTodoList) => {
    todos = newTodoList
    console.log(todos)
}

