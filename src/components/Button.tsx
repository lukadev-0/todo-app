import clsx from 'clsx'
import React from 'react'
import { WithComponentProps } from '../types/WithComponentProps'

interface Props<T extends React.ElementType> {
  as?: T
  className?: string
  primary?: boolean
  small?: boolean
}

export default function Button<T extends React.ElementType = 'button'>({
  primary,
  as,
  className,
  small,
  ...props
}: WithComponentProps<Props<T>, T>) {
  const Component = as ?? 'button'

  return (
    <Component
      {...props}
      className={clsx(
        'rounded-lg font-medium flex items-center space-x-2',
        'disabled:bg-gray-200 disabled:text-gray-600 disabled:dark:bg-gray-800 disabled:dark:text-gray-500',
        {
          'h-10 px-4': !small,
          'h-9 px-3': small,
          'bg-primary-400 dark:text-gray-800 hover:bg-primary-500': primary,
          'bg-gray-300 text-gray-800 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-800 dark:text-gray-200':
            !primary,
        },
        className
      )}
    />
  )
}
