import Image from 'next/image'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import {
  IoBasketOutline,
  IoCalendarOutline,
  IoCheckboxOutline,
  IoCodeWorkingOutline,
  IoListOutline,
  IoPersonOutline,
} from 'react-icons/io5'
import { LogoutButton, SideBarItem } from '..'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const menuItems = [
  {
    path: '/dashboard',
    icon: <IoCalendarOutline size={30} />,
    title: 'Dashboard',
  },
  {
    path: '/dashboard/rest-todos',
    icon: <IoCheckboxOutline size={30} />,
    title: 'Rest Todos',
  },
  {
    path: '/dashboard/server-todos',
    icon: <IoListOutline size={30} />,
    title: 'Server Actions',
  },
  {
    path: '/dashboard/cookies',
    icon: <IoCodeWorkingOutline size={30} />,
    title: 'Cookies',
  },
  {
    path: '/dashboard/products',
    icon: <IoBasketOutline size={30} />,
    title: 'Products',
  },
  {
    path: '/dashboard/profile',
    icon: <IoPersonOutline size={30} />,
    title: 'Profile',
  },
]

export const SideBar = async () => {
  const session = await getServerSession(authOptions)

  const userName = session?.user?.name ?? 'Default Nickname'
  const avatarUrl =
    session?.user?.image ??
    'https://avatars.githubusercontent.com/u/104113851?v=4'
  const userRoles = session?.user?.roles ?? ['Client']

  return (
    <>
      <aside className='ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]'>
        <div>
          <div className='-mx-6 px-6 py-4 text-center'>
            <Link href='/dashboard' title='Home'>
              <Image
                src='https://seeklogo.com/images/N/nextjs-logo-963D40B71E-seeklogo.com.png'
                width={100}
                height={100}
                className='w-25'
                alt='Next.js logo'
              />
            </Link>
          </div>

          <div className='mt-8 text-center'>
            <Image
              src={avatarUrl}
              width={112}
              height={112}
              alt=''
              className='w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28'
            />
            <h5 className='hidden mt-4 text-xl font-semibold text-gray-600 lg:block'>
              {userName}
            </h5>
            <span className='hidden text-gray-400 lg:block capitalize'>
              {userRoles.join(',')}
            </span>
          </div>

          {menuItems.map(item => (
            <SideBarItem key={item.path} {...item} />
          ))}
        </div>

        <div className='px-6 -mx-6 pt-4 flex justify-between items-center border-t'>
          <LogoutButton />
        </div>
      </aside>
    </>
  )
}
