'use client'
import { FormEvent, useState } from 'react'
import { IoTrashOutline } from 'react-icons/io5'
// import { addTodo, deleteCompleted } from '../actions/todos-actions'
// import { getUserSessionServer } from '@/app/api/auth/actions/auth-actions'
import { useRouter } from 'next/navigation'
import * as todosApi from '@/todos/helpers/todos'

export const NewTodo = () => {
  const router = useRouter()
  const [description, setDescription] = useState('')
  // const user = getUserSessionServer()

  // METHOD: API REST
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (description.trim().length === 0) return

    await todosApi.createTodo(description)
    router.refresh()

    setDescription('')
  }

  const deleteCompleted = async () => {
    await todosApi.deleteCompletedTodos()
    router.refresh()
  }

  //FIXME: METHOD: SERVER ACTIONS
  // const onSubmit = async (e: FormEvent) => {
  //   e.preventDefault()
  //   if (description.trim().length === 0) return

  //   await addTodo(description, user.id)
  //   setDescription('')
  // }

  return (
    <form onSubmit={onSubmit} className='flex w-full'>
      <input
        type='text'
        onChange={e => setDescription(e.target.value)}
        value={description}
        className='w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all'
        placeholder='¿What needs to be done?'
      />

      <button
        type='submit'
        className='flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all'>
        Create
      </button>

      <span className='flex flex-1'></span>

      <button
        onClick={() => deleteCompleted()}
        type='button'
        className='flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all'>
        <IoTrashOutline />
        Delete completed
      </button>
    </form>
  )
}
