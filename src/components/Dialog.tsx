import { Dialog as HeadlessDialog, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { Fragment } from 'react'

interface Props {
  children?: React.ReactNode
  title: string
  open: boolean
  onClose: () => void
}

export default function Dialog({ title, children, open, onClose }: Props) {
  return (
    <Transition appear show={open} as={Fragment}>
      <HeadlessDialog onClose={onClose} as="div" className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HeadlessDialog.Panel
                className={clsx(
                  'w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-900 p-6'
                )}
              >
                <HeadlessDialog.Title className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {title}
                </HeadlessDialog.Title>

                {children}
              </HeadlessDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessDialog>
    </Transition>
  )
}
