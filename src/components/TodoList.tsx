import React, { useState, useEffect } from 'react'
import { ITodo } from '../interfaces'
import Todo from './Todo'
import TodoForm from './TodoForm'
import axios from 'axios'

function TodoList() {

    const [todos, setTodos] = useState<ITodo[]>([])

    function getTodos() {
        console.log("getTodos");

        let arrTodo: ITodo[] = [];
        let removeTodos: number[] = [];

        axios.get('https://todo-hooks-ts-default-rtdb.firebaseio.com/todos.json')
            .then((response: any) => {
                axios.get('https://todo-hooks-ts-default-rtdb.firebaseio.com/removeTodos.json')
                    .then((responseRemove: any) => {

                        Object.keys(responseRemove.data).forEach((key) => {
                            const removeTodo = responseRemove.data[key]

                            removeTodos.push(removeTodo)
                        })

                        Object.keys(response.data).forEach((key) => {
                            const todo = response.data[key]
                            if (!removeTodos.includes(todo.id)) {
                                arrTodo.push(todo)
                            }
                        })
                        setTodos(arrTodo)
                    })
                    .catch((error) => {
                        Object.keys(response.data).forEach((key) => {
                            const todo = response.data[key]
                            arrTodo.push(todo)
                        })
                        setTodos(arrTodo);
                        console.log('RemoveArray is not exist');
                    })
            })
            .catch((error) => console.log("not created db: ", error))
    }

    const addTodo = (todo: ITodo): void => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return
        }

        const newTodos: Array<ITodo> = [todo, ...todos]

        setTodos(newTodos)

        axios.post('https://todo-hooks-ts-default-rtdb.firebaseio.com/todos.json', todo)
            .then((response: any) => {
                console.log('Status of loading: ' + response.statusText);
            })
            .catch((error) => console.log(error));
    }

    useEffect(getTodos, [])

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

        axios.post('https://todo-hooks-ts-default-rtdb.firebaseio.com/removeTodos.json', id)
            .then((response: any) => console.log('remove loading: ' + response.statusText))
            .catch((error) => console.log(error));
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
