export interface ITodo {
    id: number;
    text: string;
    isComplete?: boolean;
    value?: string;
}

export interface IEdit {
    id: null | number;
    value: string;
}

export interface TodoProps {
    todos: Array<ITodo>;
    completeTodo(id: number): void;
    removeTodo(id: number): void;
    updateTodo(todoId: number, newValue: ITodo): void;
}


export interface TodoFormProps {
    onSubmit(todo: ITodo): void
    edit?: IEdit;
}