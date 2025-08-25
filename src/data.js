let data = [
    {
        "id": 1560865205317,
        "text": "Buy eggs",
        "completed": false
    },
    {
        "id": 1560865205318,
        "text": "Do 15 min exercise",
        "completed": false
    }
]

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

