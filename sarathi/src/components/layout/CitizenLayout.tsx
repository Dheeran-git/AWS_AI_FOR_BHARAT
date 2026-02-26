import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { OfflineBanner } from './OfflineBanner'
import { useOfflineStatus } from '@/hooks/useOfflineStatus'

export function CitizenLayout() {
  useOfflineStatus()

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <OfflineBanner />
      <Navbar variant="landing" />
      <main id="main-content" className="max-w-2xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
