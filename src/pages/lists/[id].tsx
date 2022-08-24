import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import AppHeader from '../../components/layout/AppHeader'
import ListItem from '../../components/ListItem'
import LoadingSpinner from '../../components/LoadingSpinner'
import LoadingSkeletonPage from '../../components/LoadingSkeletonPage'
import { trpc } from '../../utils/trpc'
import { useRequiredSession } from '../../utils/useRequiredSession'
import clsx from 'clsx'

const ListPage: NextPage = () => {
  const session = useRequiredSession()
  const router = useRouter()
  const queryClient = trpc.useContext()
  const [newItemBody, setNewItemBody] = useState('')

  const id = parseInt(router.query.id as string)

  const list = trpc.useQuery(['lists.getById', { id }], {
    enabled: router.isReady,
    placeholderData: () => {
      return queryClient
        .getQueryData(['lists.getAll'])
        ?.find(list => list.id === id)
    },
  })

  const addItem = trpc.useMutation(['listItem.create'], {
    onMutate: async newItem => {
      const previousData = queryClient.getQueryData(['lists.getById', { id }])

      if (previousData) {
        await queryClient.cancelQuery(['lists.getById', { id }])

        queryClient.setQueryData(['lists.getById', { id }], {
          ...previousData,
          items: [
            ...previousData.items,
            {
              ...newItem,
              completed: false,
              id: -Date.now(),
            },
          ],
        })
      }

      return { previousData }
    },

    onError: (_err, _newItem, context) => {
      if (context && context.previousData) {
        queryClient.setQueryData(
          ['lists.getById', { id }],
          context.previousData
        )
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries(['lists.getById', { id }])
    },
  })

  if (!session.data) {
    return <LoadingSkeletonPage />
  }

  return (
    <>
      <Head>
        <title>
          {list.data?.name ? `${list.data.name} - Todo App` : 'Todo App'}
        </title>
      </Head>

      <AppHeader title={list.data?.name} />

      <main className="pt-14 p-4 mx-auto max-w-screen-xl min-h-screen flex items-center justify-center">
        <div
          className={clsx(
            'mt-4 p-6 bg-gray-100 shadow border border-gray-300 rounded-2xl w-full max-w-lg dark:bg-gray-800',
            'dark:border-gray-600 mx-auto'
          )}
        >
          <h1 className="text-lg font-bold text-gray-900 whitespace-pre break-words dark:text-gray-200">
            {list.data?.name}
          </h1>

          {list.data?.description && (
            <p className="text-gray-700 break-words dark:text-gray-400">
              {list.data.description}
            </p>
          )}

          {!list.data?.items ? (
            <div className="h-16 flex items-center justify-center text-black dark:text-white">
              <LoadingSpinner />
              <div className="sr-only">Loading...</div>
            </div>
          ) : (
            <>
              <ul className="mt-4 space-y-1">
                {list.data.items.map(item => (
                  <li key={item.id}>
                    <ListItem item={item} />
                  </li>
                ))}
              </ul>

              <form
                className="relative flex items-center text-black dark:text-white mt-2"
                onSubmit={e => {
                  e.preventDefault()
                  setNewItemBody('')

                  addItem.mutate({
                    listId: id,
                    body: newItemBody,
                  })
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 left-[2px] absolute pointer-events-none"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  placeholder="Add item..."
                  className="bg-transparent outline-none pl-8 w-full"
                  value={newItemBody}
                  onChange={e => setNewItemBody(e.target.value)}
                />
              </form>
            </>
          )}
        </div>
      </main>
    </>
  )
}

export default ListPage
