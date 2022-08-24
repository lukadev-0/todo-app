import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

/**
 * `useSession({ required: true })` does not use Next.js's router
 * causing a full page reload.
 */
export function useRequiredSession() {
  const session = useSession()
  const router = useRouter()

  if (session.status === 'unauthenticated') {
    router.replace(
      `/auth/signin?callbackUrl=${encodeURIComponent(
        router.asPath
      )}&error=SessionRequired`
    )
  }

  return session
}
