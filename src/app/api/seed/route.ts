import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) {
  //   await prisma.todo.deleteMany({ where: { complete: true } })
  await prisma.todo.deleteMany() // delete * from todo

  await prisma.todo.createMany({
    data: [
      { description: 'G703', complete: true },
      { description: 'G603' },
      { description: 'G503' },
      { description: 'G403' },
      { description: 'G303', complete: true },
    ],
  })

  return NextResponse.json({
    message: 'Seed Executed',
  })
}
