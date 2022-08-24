import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Button from '../Button'
import { Menu } from '@headlessui/react'
import MenuItems from '../menu/MenuItems'
import MenuDivider from '../menu/MenuDivider'
import MenuItem from '../menu/MenuItem'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import HeaderUser from './HeaderUser'

const SIGN_IN_PAGE_URL = `/auth/signin?callbackUrl=${encodeURIComponent(
  '/lists'
)}`

export default function Header() {
  const session = useSession()
  const router = useRouter()

  return (
    <header className="px-4">
      <div className="h-20 mx-auto max-w-screen-xl flex items-center">
        <h6 className="font-semibold text-gray-900 dark:text-gray-100">
          Todo App
        </h6>

        <div
          className="ml-auto flex items-center transition-opacity duration-500"
          style={{
            opacity: session.status === 'loading' ? 0 : 1,
          }}
        >
          {session.data ? (
            <HeaderUser />
          ) : (
            <div className="flex items-center space-x-4">
              <Link href={SIGN_IN_PAGE_URL} passHref>
                <Button primary small as="a">
                  Sign In
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
