import clsx from 'clsx'
import React from 'react'

export default function Checkbox({
  className,
  checked,
  ...props
}: React.ComponentPropsWithoutRef<'input'>) {
  return (
    <span className={clsx('relative w-6 h-6', className)}>
      <input
        type="checkbox"
        className="opacity-0 absolute inset-0"
        checked={checked}
        {...props}
      />

      <div
        className={clsx(
          'absolute inset-0 border rounded text-primary-700 dark:text-primary-500 flex',
          'items-center justify-center',
          {
            'border-gray-400 dark:border-gray-500 group-hover:border-gray-500 dark:group-hover:border-gray-400':
              !props.disabled,
          },
          { 'border-gray-300 dark:border-gray-600': props.disabled }
        )}
      >
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
    </span>
  )
}
