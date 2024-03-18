'use client'

import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

// https://tailwindcomponents.com/component/radio-buttons-1

interface Props {
  currentTab?: number
  tabOptions?: number[]
}

export const TabBar = ({
  currentTab = 1,
  tabOptions = [1, 2, 3, 4],
}: Props) => {
  const [selected, setselected] = useState(currentTab)
  const router = useRouter()

  // Validate cookies
  useEffect(() => {
    // valida si selected está dentro del rango de opciones
    if (!tabOptions.includes(selected)) {
      // Si selected no está en el rango, lo estable en el primer valor del array (1)
      setselected(tabOptions[0])
    }
  }, [selected, tabOptions])

  const onTabSelected = (tab: number) => {
    setselected(tab)
    setCookie('selectedTab', tab.toString())
    router.refresh()
  }

  return (
    <div
      className={`grid w-full space-x-2 rounded-xl bg-gray-200 p-2
      ${'grid-cols-' + tabOptions.length}
      `}>
      {tabOptions.map(tab => (
        <div key={tab}>
          <input
            checked={selected === tab}
            onChange={() => {}}
            type='radio'
            id={tab.toString()}
            className='peer hidden'
          />
          <label
            className='transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'
            onClick={() => onTabSelected(tab)}>
            {tab}
          </label>
        </div>
      ))}
    </div>
  )
}
