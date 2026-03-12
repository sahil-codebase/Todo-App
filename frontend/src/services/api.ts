import type { Todo } from '../types/todo'

const API_URL = 'http://127.0.0.1:8000'

export const getTodos = async (): Promise<Todo[]> => {
  const res = await fetch(`${API_URL}/todos`)
  return res.json()
}

export const createTodo = async (task: string): Promise<Todo> => {
  const res = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ task })
  })

  return res.json()
}

export const updateTodo = async (id: number, task: string) => {
  await fetch(`${API_URL}/todos/${id}?task=${task}`, {
    method: 'PUT'
  })
}

export const deleteTodo = async (id: number) => {
  await fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE'
  })
}

export const toggleTodo = async (id: number) => {
  await fetch(`${API_URL}/todos/${id}/toggle`, {
    method: 'PUT'
  })
}
