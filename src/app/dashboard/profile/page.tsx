'use client'
import { useSession } from 'next-auth/react'

export default function ProfilePage() {
  const { data: session } = useSession()

  return (
    <div>
      <h1>Page Profile</h1>
      <hr />

      <div className='flex flex-col'>
        <span>{session?.user?.name ?? 'Default Name'}</span>
        <span>{session?.user?.email ?? 'example@hosting.us'}</span>
        <span>{session?.user?.image ?? 'Not Image'}</span>
        <span>{session?.user?.id ?? 'Not UUID'}</span>
        <span>{session?.user?.roles?.join(',') ?? ['Not-Roles']}</span>
      </div>
    </div>
  )
}
