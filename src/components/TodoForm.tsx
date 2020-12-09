import React, { useState, useEffect, useRef } from 'react'
import { TodoFormProps } from '../interfaces'

function TodoForm(props: TodoFormProps) {

    const [input, setInput] = useState<string>(props.edit ? props.edit.value : '')

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        inputRef.current!.focus()
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        props.onSubmit({
            id: Math.floor(Math.random() * 1000),
            text: input
        });

        setInput('')
    };

    return (
        <form
            className="todo-form"
            onSubmit={handleSubmit}
        >
            {props.edit ? (<>
                <input
                    type="text"
                    placeholder="Update your item"
                    value={input}
                    className="todo-input edit"
                    onChange={handleChange}
                    ref={inputRef}
                />
                <button className='todo-button edit'>Update</button>
            </>) :
                (<>
                    <input
                        type="text"
                        placeholder="Add a todo"
                        value={input}
                        className="todo-input"
                        onChange={handleChange}
                        ref={inputRef}
                    />
                    <button className='todo-button'>Add todo</button>
                </>)
            }

        </form>
    )
}

export default TodoForm
