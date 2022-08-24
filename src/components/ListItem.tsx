import type { ListItem } from '@prisma/client'
import clsx from 'clsx'
import { trpc } from '../utils/trpc'
import Checkbox from './Checkbox'

interface Props {
  item: ListItem
}

export default function ListItem({ item }: Props) {
  const queryClient = trpc.useContext()

  const updateItem = trpc.useMutation(['listItem.update'], {
    onMutate: async newItem => {
      const id = item.listId
      const previousData = queryClient.getQueryData(['lists.getById', { id }])

      if (previousData) {
        await queryClient.cancelQuery(['lists.getById', { id }])

        queryClient.setQueryData(['lists.getById', { id }], {
          ...previousData,
          items: previousData.items.map(currItem => {
            if (currItem.id === item.id) {
              return {
                ...currItem,
                ...newItem.data,
              }
            }
            return currItem
          }),
        })
      }

      return { previousData }
    },

    onError: (_err, _newItem, context) => {
      if (context && context.previousData) {
        queryClient.setQueryData(
          ['lists.getById', { id: item.listId }],
          context.previousData
        )
      }
    },
  })

  return (
    <label className="flex items-center space-x-2 group">
      <Checkbox
        checked={item.completed}
        onChange={e => {
          updateItem.mutate({
            id: item.id,
            data: { completed: e.target.checked },
          })
        }}
        disabled={item.id < 0}
      />
      <span
        className={clsx({
          'text-gray-800 dark:text-gray-200': !item.completed,
          'line-through text-gray-700 dark:text-gray-300': item.completed,
        })}
      >
        {item.body}
      </span>
    </label>
  )
}
