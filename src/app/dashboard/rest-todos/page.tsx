export const dynamic = 'force-dynamic'

import prisma from '@/lib/prisma'
import { NewTodo, TodosGrid } from '@/todos'
import { getUserSessionServer } from '@/app/api/auth/actions/auth-actions'

export const metadata = {
  title: 'List of TODOS',
  description: 'Todo list',
}

export default async function RestTodosPage() {
  const user = await getUserSessionServer()

  const todos = await prisma.todo.findMany({
    where: { userId: user?.id },
    orderBy: { description: 'asc' },
  })

  return (
    <div>
      <div className='w-full px-3 mx-5 mb-5'>
        <NewTodo />
      </div>

      <TodosGrid todos={todos} />
    </div>
  )
}
