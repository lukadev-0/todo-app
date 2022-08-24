import { createProtectedRouter } from './protected-router'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'

export const listsRouter = createProtectedRouter()
  .mutation('create', {
    input: z.object({
      name: z.string(),
    }),

    resolve({ ctx, input }) {
      return ctx.prisma.list.create({
        data: {
          name: input.name,
          userId: ctx.session.user.id,
        },
      })
    },
  })
  .query('getAll', {
    resolve({ ctx }) {
      return ctx.prisma.list.findMany({
        where: {
          userId: ctx.session.user.id,
        },
        select: {
          id: true,
          name: true,
        },
      })
    },
  })
  .query('getById', {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ ctx, input }) {
      const list = await ctx.prisma.list.findUnique({
        where: { id: input.id },
        include: {
          items: {
            orderBy: {
              createdAt: 'asc',
            },
          },
        },
      })

      if (!list)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No list with id ${input.id}`,
        })

      if (list.userId !== ctx.session.user.id)
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: `You are not allowed to access this list`,
        })

      return list
    },
  })
