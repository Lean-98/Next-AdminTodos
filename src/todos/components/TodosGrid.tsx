'use client'

import { Todo } from '@prisma/client'
import { TodoItem } from '..'
// import * as todosApi from '@/todos/helpers/todos'
// import { useRouter } from 'next/navigation'
import { toggleTodo } from '../actions/todos-actions'

interface Props {
  todos?: Todo[]
}

export const TodosGrid = ({ todos = [] }: Props) => {
  // const router = useRouter()

  // API REST
  // const toggleTodo = async (id: string, complete: boolean) => {
  //   const updateTodos = await todosApi.updateTodo(id, complete)

  //   router.refresh()
  // }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </div>
  )
}
