import initialTodos from '../todos.json'

let data = initialTodos

function getAllTodos() {
    return data
}

function addTodo(todo) {
    data.push(todo)
}

function removeTodo(id) {
    data = data.filter(function (item) {
        return item.id !== id
    })
}

function updateTodo(id, completed) {
    const itemIndex = data.findIndex(function (value) {
        return value.id === id
    })
    data[itemIndex].completed = completed
}

export {
    getAllTodos,
    addTodo,
    removeTodo,
    updateTodo
}

