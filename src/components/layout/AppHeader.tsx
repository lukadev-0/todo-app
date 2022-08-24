import HeaderUser from './HeaderUser'

interface Props {
  title?: string
}

export default function AppHeader({ title }: Props) {
  return (
    <header className="bg-white-100/40 dark:bg-gray-900/40 backdrop-blur-lg fixed top-0 w-full border-b border-gray-400 dark:border-gray-700">
      <div className="mx-auto max-w-screen-2xl px-4 flex items-center h-14">
        <div
          className="transition-opacity duration-500"
          style={{
            opacity: title ? 1 : 0,
          }}
        >
          {title && (
            <h6 className="text-gray-800 dark:text-gray-100 font-semibold">
              {title}
            </h6>
          )}
        </div>

        <div className="ml-auto">
          <HeaderUser />
        </div>
      </div>
    </header>
  )
}
