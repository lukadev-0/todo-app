import clsx from 'clsx'
import React from 'react'
import { WithComponentProps } from '../../types/WithComponentProps'

interface Props<T extends React.ElementType> {
  as?: T
  className?: string
}

export default function MenuDivider<T extends React.ElementType = 'div'>({
  as,
  className,
  ...props
}: WithComponentProps<Props<T>, T>) {
  const Component = as ?? 'div'

  return (
    <Component
      {...props}
      className={clsx('my-2 h-px bg-gray-300 dark:bg-gray-700', className)}
    />
  )
}
