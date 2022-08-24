import { createProtectedRouter } from './protected-router'
import { z } from 'zod'

export const listItemRouter = createProtectedRouter()
  .mutation('create', {
    input: z.object({
      listId: z.number(),
      body: z.string().min(1),
    }),

    resolve({ ctx, input }) {
      return ctx.prisma.listItem.create({
        data: {
          listId: input.listId,
          body: input.body,
          completed: false,
        },
      })
    },
  })
  .mutation('update', {
    input: z.object({
      id: z.number(),

      data: z
        .object({
          body: z.string().min(1),
          completed: z.boolean(),
        })
        .partial(),
    }),

    resolve({ ctx, input }) {
      return ctx.prisma.listItem.update({
        where: {
          id: input.id,
        },
        data: input.data,
      })
    },
  })
