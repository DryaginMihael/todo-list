import React, { useState } from 'react'
import { RiCloseCircleLine } from 'react-icons/ri'
import { TiEdit } from 'react-icons/ti'
import { IEdit, ITodo, TodoProps } from '../interfaces'
import TodoForm from './TodoForm'

function Todo({ todos, completeTodo, removeTodo, updateTodo }: TodoProps) {

    const [edit, setEdit] = useState<IEdit>({
        id: null,
        value: ''
    })

    const submitUpdate = (value: ITodo): void => {
        updateTodo(edit.id as number, value)
        setEdit({
            id: null,
            value: ''
        })
    }

    if (edit.id) {
        return <TodoForm edit={edit} onSubmit={submitUpdate} />
    }

    return <>
        {todos.map((todo, index) => {
            return (
                <div className={todo.isComplete ? 'todo-row complete' :
                    'todo-row'}
                    key={index}
                >
                    <div
                        key={todo.id}
                        onClick={() => completeTodo(todo.id)}
                    >{todo.text}</div>
                    <div className={"icons"}>
                        <RiCloseCircleLine
                            onClick={() => removeTodo(todo.id)}
                            className={'delete-icon'}
                        />
                        <TiEdit
                            onClick={() => setEdit({ id: todo.id, value: todo.text })}
                            className={'edit-icon'}
                        />
                    </div>
                </div>)
        })}
    </>
}

export default Todo;