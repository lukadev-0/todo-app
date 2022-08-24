import clsx from 'clsx'
import React from 'react'
import { Menu } from '@headlessui/react'
import { WithComponentProps } from '../../types/WithComponentProps'

interface Props<T> {
  as?: T
  className?: string
  children?: React.ReactNode
}

export default function MenuItem<T extends React.ElementType = 'button'>({
  className,
  as,
  ...props
}: WithComponentProps<Props<T>, T>) {
  const Component = as ?? 'button'

  return (
    <Menu.Item>
      {({ active }) => (
        <Component
          {...props}
          className={clsx(
            'h-8 px-2 rounded flex items-center space-x-2 text-gray-700 dark:text-gray-300',
            { 'bg-black/10 dark:bg-white/10': active },
            className
          )}
        />
      )}
    </Menu.Item>
  )
}
