import { z } from 'zod'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import Button from '../../components/Button'
import Dialog from '../../components/Dialog'
import AppHeader from '../../components/layout/AppHeader'
import ListsEntry from '../../components/ListsEntry'
import LoadingSkeletonPage from '../../components/LoadingSkeletonPage'
import LoadingSpinner from '../../components/LoadingSpinner'
import TextField from '../../components/TextField'
import { trpc } from '../../utils/trpc'
import { useRequiredSession } from '../../utils/useRequiredSession'
import Link from 'next/link'
import { useRouter } from 'next/router'

const ListsPage: NextPage = () => {
  const session = useRequiredSession()
  const [isCreatingNewList, setIsCreatingNewList] = useState(false)
  const router = useRouter()
  const queryClient = trpc.useContext()

  const lists = trpc.useQuery(['lists.getAll'])
  const createList = trpc.useMutation(['lists.create'], {
    onSuccess(data) {
      queryClient.setQueryData(['lists.getAll'], prevData => {
        return [...(prevData ?? []), data]
      })
      router.push(`/lists/${data.id}`)
    },
  })

  if (!session.data) {
    return <LoadingSkeletonPage />
  }

  return (
    <>
      <Head>
        <title>Lists - Todo App</title>
      </Head>

      <AppHeader title="Todo App" />

      <main className="pt-14 p-4 mx-auto max-w-screen-xl">
        <div className="mt-4 flex items-center">
          <h1 className="my-5 text-2xl font-bold text-gray-800 dark:text-gray-200">
            Your Lists
          </h1>

          <Button
            small
            className="ml-auto"
            onClick={() => {
              createList.reset()
              setIsCreatingNewList(true)
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>Create List</span>
          </Button>
        </div>

        {lists.isLoading ? (
          <div className="h-24 flex items-center justify-center">
            <LoadingSpinner className="text-black dark:text-white" />
          </div>
        ) : lists.data?.length === 0 ? (
          <div className="h-24 flex flex-col items-center justify-center -space-y-1">
            <p className="text-gray-500 dark:text-gray-400">
              You do not have any lists.
            </p>
            <button
              className="text-primary-700 font-semibold dark:text-primary-400"
              onClick={() => {
                setIsCreatingNewList(true)
              }}
            >
              Create your first list
            </button>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
            {lists.data!.map(list => (
              <li key={list.id}>
                <Link href={`/lists/${list.id}`} passHref>
                  <ListsEntry>{list.name}</ListsEntry>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>

      <Dialog
        open={isCreatingNewList}
        onClose={() => setIsCreatingNewList(false)}
        title="Create new list"
      >
        <Formik
          initialValues={{ name: '' }}
          validationSchema={toFormikValidationSchema(
            z.object({
              name: z.string().min(1).max(50),
            })
          )}
          onSubmit={(values, actions) => {
            createList.mutate(values, {
              onError: () => actions.setSubmitting(false),
            })
          }}
        >
          {({ errors, submitCount, isSubmitting }) => (
            <Form>
              {createList.isError && (
                <div
                  className={
                    'bg-danger-600/25 border border-danger-600/50 text-black/80 dark:text-white/80 px-4 py-2 w-full my-2 rounded'
                  }
                >
                  {createList.error.message}
                </div>
              )}

              <Field
                as={TextField}
                name="name"
                label="Name"
                className="mt-2"
                autoComplete="off"
                error={submitCount > 0 && errors.name}
              />
              {submitCount > 0 && errors.name && (
                <div className="text-danger-600 dark:text-danger-400">
                  {errors.name}
                </div>
              )}

              <div className="flex space-x-3 items-center mt-2">
                <Button type="submit" disabled={isSubmitting} primary>
                  Create
                </Button>

                {createList.isLoading && (
                  <LoadingSpinner className="text-black dark:text-white" />
                )}
              </div>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  )
}

export default ListsPage
