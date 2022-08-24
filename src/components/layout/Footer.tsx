export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black/50 px-4">
      <div className="py-16 max-w-screen-xl mx-auto">
        <p className="text-gray-400">
          Built by{' '}
          <a
            href="https://lukadev.vercel.app/"
            className="text-gray-100 hover:underline"
          >
            LukaDev
          </a>{' '}
          with the{' '}
          <a
            href="https://github.com/t3-oss/create-t3-app"
            className="text-gray-100 hover:underline"
          >
            T3 Stack
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
