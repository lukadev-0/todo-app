// src/server/router/index.ts
import { createRouter } from './context'
import superjson from 'superjson'

import { listsRouter } from './lists'
import { listItemRouter } from './listItem'

export const appRouter = createRouter()
  .merge('lists.', listsRouter)
  .merge('listItem.', listItemRouter)
  .transformer(superjson)

// export type definition of API
export type AppRouter = typeof appRouter
