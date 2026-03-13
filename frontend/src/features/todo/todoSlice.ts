import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Todo {
  id: number
  task: string
  completed: boolean
}

interface TodoState {
  todos: Todo[]
}

const initialState: TodoState = {
  todos: []
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos(state, action: PayloadAction<Todo[]>) {
      state.todos = action.payload
    },
    addTodo(state, action: PayloadAction<Todo>) {
      state.todos.push(action.payload)
    },
    deleteTodo(state, action: PayloadAction<number>) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload)
    },
    toggleTodo(state, action: PayloadAction<number>) {
      const todo = state.todos.find((t) => t.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    }
  }
})

export const { setTodos, addTodo, deleteTodo, toggleTodo } = todoSlice.actions

export default todoSlice.reducer
