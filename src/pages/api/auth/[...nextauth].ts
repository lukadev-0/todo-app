import NextAuth, { type NextAuthOptions } from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '../../../server/db/client'
import { env } from '../../../env/server.mjs'
import { Account } from '@prisma/client'

const discordProvider = DiscordProvider({
  clientId: env.DISCORD_CLIENT_ID,
  clientSecret: env.DISCORD_CLIENT_SECRET,
  authorization: 'https://discord.com/api/oauth2/authorize?scope=identify',
})

export const authOptions: NextAuthOptions = {
  callbacks: {
    async session({ session, user }) {
      const account = await prisma.account.findFirst({
        where: {
          userId: user.id,
          provider: 'discord',
        },
      })

      if (!account)
        throw new Error('User does not have an associated Discord account')

      if (account.expires_at! <= Math.floor(Date.now() / 1000)) {
        const newProfile = await refreshDiscordToken(account)
        if (session.user) {
          Object.assign(session.user, newProfile)
        }
      }

      if (session.user) {
        session.user.id = user.id
      }

      return session
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [discordProvider],
  pages: {
    signIn: '/auth/signin',
  },
}

async function refreshDiscordToken(account: Account) {
  const response = await fetch(discordProvider.token as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: env.DISCORD_CLIENT_ID,
      client_secret: env.DISCORD_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: account.refresh_token!,
    }),
  })

  if (!response.ok) throw new Error('Failed to refresh Discord token')

  const data = (await response.json()) as {
    access_token: string
    refresh_token: string
    expires_in: number
    scope: string
    token_type: string
  }

  const accessTokenExpiresAt = Math.floor(Date.now() / 1000 + data.expires_in)

  const updatedAccount = await prisma.account.update({
    where: {
      id: account.id,
    },
    data: {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: accessTokenExpiresAt,
      scope: data.scope,
      token_type: data.token_type,
    },
  })

  return await updateUserData(updatedAccount)
}

async function updateUserData(account: Account) {
  const response = await fetch(discordProvider.userinfo as string, {
    headers: {
      Authorization: `${account.token_type} ${account.access_token}`,
    },
  })

  if (!response.ok) {
    console.log(await response.json())
    throw new Error('Failed to fetch Discord user data')
  }

  const data = await response.json()
  const profile = await discordProvider.profile!(data, {})
  delete profile.id

  await prisma.user.update({
    where: {
      id: account.userId,
    },
    data: profile,
  })

  return profile
}

export default NextAuth(authOptions)
