import { useEffect, useState } from 'react'
import {
  getTodos,
  createTodo,
  deleteTodo,
  toggleTodo,
  updateTodo
} from '../services/api'

import type { Todo } from '../types/todo'

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [task, setTask] = useState('')

  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingText, setEditingText] = useState('')

  const loadTodos = async () => {
    const data = await getTodos()
    setTodos(data)
  }

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getTodos()
      setTodos(data)
    }

    fetchTodos()
  }, [])

  const handleAdd = async () => {
    if (!task) return

    await createTodo(task)
    setTask('')
    loadTodos()
  }

  const handleDelete = async (id: number) => {
    await deleteTodo(id)
    loadTodos()
  }

  const handleToggle = async (id: number) => {
    await toggleTodo(id)
    loadTodos()
  }

  const handleEdit = (todo: Todo) => {
    setEditingId(todo.id)
    setEditingText(todo.task)
  }

  const handleUpdate = async () => {
    if (!editingId) return

    await updateTodo(editingId, editingText)

    setEditingId(null)
    setEditingText('')
    loadTodos()
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl text-center font-bold mb-4">Todo App</h2>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1 rounded"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button
          className="bg-blue-500 text-white px-4 rounded"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>

      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center justify-between border p-2 mb-2 rounded"
        >
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
            />

            {editingId === todo.id ? (
              <input
                className="border p-1 rounded"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <span
                className={todo.completed ? 'line-through text-gray-400' : ''}
              >
                {todo.task}
              </span>
            )}
          </div>

          <div className="flex gap-2">
            {editingId === todo.id ? (
              <button className="text-green-600" onClick={handleUpdate}>
                Save
              </button>
            ) : (
              <button
                className="text-blue-600"
                onClick={() => handleEdit(todo)}
              >
                Edit
              </button>
            )}

            <button
              className="text-red-500"
              onClick={() => handleDelete(todo.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TodoList
