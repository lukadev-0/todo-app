import AppHeader from './layout/AppHeader'
import LoadingSpinner from './LoadingSpinner'

export default function LoadingSkeletonPage() {
  return (
    <div className="pt-14 flex items-center justify-center h-screen">
      <LoadingSpinner className="text-black dark:text-white" />
      <div className="sr-only">Loading...</div>
    </div>
  )
}
