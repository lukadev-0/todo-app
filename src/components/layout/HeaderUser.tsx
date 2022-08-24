import { Menu } from '@headlessui/react'
import clsx from 'clsx'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import MenuDivider from '../menu/MenuDivider'
import MenuItem from '../menu/MenuItem'
import MenuItems from '../menu/MenuItems'

const DEFAULT_AVATAR = 'https://cdn.discordapp.com/embed/avatars/0.png'

export default function HeaderUser() {
  const session = useSession()

  if (!session.data) return null

  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <Menu.Button
            className={clsx(
              'w-8 h-8 rounded-full relative transition-shadow ring-transparent',
              ' ring-offset-0',
              {
                'ring-0 hover:ring-4 hover:ring-black/10 hover:dark:ring-white/10':
                  !open,
                'ring-black/10 dark:ring-white/10 ring-4': open,
              }
            )}
          >
            <Image
              layout="fill"
              quality={100}
              src={`${session.data.user?.image}?size=32` ?? DEFAULT_AVATAR}
              alt="profile"
              className="rounded-full bg-gray-800"
            />
          </Menu.Button>

          <MenuItems className="absolute top-10 right-0">
            <div className="flex items-center space-x-2 px-3 pt-2 pb-1">
              <Image
                width={40}
                height={40}
                src={`${session.data.user?.image}?size=40`}
                alt=""
                className="rounded-full"
              />
              <h6 className="font-semibold text-gray-900 dark:text-gray-200">
                {session.data.user?.name}
              </h6>
            </div>

            <MenuDivider />

            <Link href="/lists" passHref>
              <MenuItem as="a">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>

                <span>Your Lists</span>
              </MenuItem>
            </Link>

            <MenuDivider />

            <MenuItem onClick={() => signOut({ redirect: false })}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>

              <span>Sign Out</span>
            </MenuItem>
          </MenuItems>
        </>
      )}
    </Menu>
  )
}
