import clsx from 'clsx'
import React from 'react'
import { WithComponentProps } from '../types/WithComponentProps'

interface Props<T extends React.ElementType> {
  as?: T
  className?: string
}

export default function ListsEntry<T extends React.ElementType = 'a'>({
  as,
  className,
  ...props
}: WithComponentProps<Props<T>, T>) {
  const Component = as ?? 'a'

  return (
    <Component
      {...props}
      className={clsx(
        'border border-gray-400 dark:border-gray-700 p-2 flex items-center rounded text-gray-700',
        'space-x-2 bg-white hover:bg-gray-200 w-full',
        'dark:border-gray-600 dark:bg-gray-900 hover:dark:bg-gray-800 dark:text-gray-300',
        className
      )}
    />
  )
}
