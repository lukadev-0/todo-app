import clsx from 'clsx'
import { ComponentPropsWithoutRef } from 'react'

interface Props extends ComponentPropsWithoutRef<'input'> {
  label: string
  error?: boolean
}

export default function TextField({
  label,
  className,
  error,
  ...props
}: Props) {
  return (
    <label
      className={clsx(
        'block',
        {
          'text-gray-700 dark:text-gray-300 focus-within:text-primary-700 focus-within:dark:text-primary-500':
            !error,
          'text-danger-600 dark:text-danger-400': error,
        },
        className
      )}
    >
      {label}
      <input
        className={clsx(
          'border',
          {
            'border-gray-400 focus:border-primary-700 focus:dark:border-primary-500 dark:border-gray-500':
              !error,
            'border-danger-600 dark:border-danger-400': error,
          },
          'text-black dark:text-white w-full px-3 py-2 rounded-lg outline-none bg-transparent'
        )}
        {...props}
      />
    </label>
  )
}
