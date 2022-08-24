import clsx from 'clsx'
import React from 'react'
import { Menu, Transition } from '@headlessui/react'

interface Props {
  className?: string
  children?: React.ReactNode
}

export default function MenuItems({ className, ...props }: Props) {
  return (
    <Transition
      enter="transition duration-100 ease-out"
      enterFrom="transform opacity-0"
      enterTo="transform opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform opacity-100"
      leaveTo="transform opacity-0"
      className={className}
    >
      <Menu.Items
        {...props}
        className="flex flex-col bg-gray-100 rounded-lg p-2 shadow-md shadow-black/25 w-56 dark:bg-gray-800 ring-1 ring-black/25"
      />
    </Transition>
  )
}
