import React, { useState, useEffect } from 'react'
import { ITodo } from '../interfaces'
import Todo from './Todo'
import TodoForm from './TodoForm'
import axios from 'axios'

function TodoList() {

    const [todos, setTodos] = useState<ITodo[]>([])

    const addTodo = (todo: ITodo): void => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return
        }

        const newTodos: Array<ITodo> = [todo, ...todos]

        setTodos(newTodos)

        axios.post('https://todo-hooks-ts-default-rtdb.firebaseio.com/todos.json', todo)
            .then((response: any) => console.log('Status of loading: ' + response.statusText, response))
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        let arrTodo: ITodo[] = [];
        axios.get('https://todo-hooks-ts-default-rtdb.firebaseio.com/todos.json')
            .then((response: any) => {
                Object.keys(response.data).forEach((key) => {
                    const todo = response.data[key]
                    arrTodo.push(todo)
                })
                console.log(arrTodo);
                setTodos(arrTodo)
            });
    }, [])

    const completeTodo = (id: number): void => {
        let updateTodos = todos.map((todo: ITodo) => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        });
        setTodos(updateTodos)
    }

    const updateTodo = (todoId: number, newValue: ITodo): void => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return
        }

        setTodos((prev: ITodo[]) => prev.map(item => (item.id === todoId ? newValue : item)))
    }

    const removeTodo = (id: number): void => {
        const removeArr = [...todos].filter((todo: ITodo) => todo.id !== id)

        setTodos(removeArr)
    }

    return (
        <div>
            <h1>What's the Plan for Today?</h1>
            <TodoForm onSubmit={addTodo} />
            <Todo
                todos={todos}
                completeTodo={completeTodo}
                removeTodo={removeTodo}
                updateTodo={updateTodo}
            />
        </div>
    )
}

export default TodoList
