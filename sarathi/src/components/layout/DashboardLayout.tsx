import { Outlet } from 'react-router-dom'
import { Bell, Search } from 'lucide-react'
import { Sidebar } from './Sidebar'
import { OfflineBanner } from './OfflineBanner'
import { useOfflineStatus } from '@/hooks/useOfflineStatus'
import { useSarathiStore } from '@/lib/store'
import { getInitials } from '@/lib/utils'

export function DashboardLayout() {
  useOfflineStatus()
  const { user } = useSarathiStore()

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      <Sidebar />
      <div className="flex-1 ml-60 flex flex-col min-h-screen">
        <OfflineBanner />
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 sticky top-0 z-20">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search citizens, schemes..."
              className="flex-1 text-sm border-none outline-none bg-transparent placeholder-slate-400 text-slate-700"
              aria-label="Search"
            />
          </div>
          <div className="flex items-center gap-4">
            <button
              className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-600"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" aria-hidden="true" />
            </button>
            {user && (
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full bg-[#1e3a5f] text-white text-xs font-bold flex items-center justify-center"
                  aria-hidden="true"
                >
                  {getInitials(user.name)}
                </div>
                <span className="text-sm font-medium text-slate-700">{user.name}</span>
              </div>
            )}
          </div>
        </header>

        <main id="main-content" className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
