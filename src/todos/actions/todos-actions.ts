'use server'

import prisma from '@/lib/prisma'
import { Todo } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { getUserSessionServer } from '@/app/api/auth/actions/auth-actions'
import { postSchema } from '@/app/api/todos/route'

export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  const todo = await prisma.todo.findFirst({ where: { id } })

  if (!todo) {
    throw `Todo with id ${id} not found`
  }

  const updateTodo = await prisma.todo.update({
    where: { id },
    data: { complete: complete },
  })

  revalidatePath('/dashboard/server-todos')
  return updateTodo
}

export const addTodo = async (description: string, userId: string) => {
  try {
    const user = await getUserSessionServer()
    //FIXME:
    const todo = await prisma.todo.create({
      data: {
        description,
        userId: user?.id,
      },
    })

    revalidatePath('/dashboard/server-todos')
    return todo
  } catch (error) {
    return {
      message: 'Error create todo',
    }
  }
}

export const deleteCompleted = async (): Promise<void> => {
  await prisma.todo.deleteMany({ where: { complete: true } })
  revalidatePath('/dashboard/server-todos')
}
