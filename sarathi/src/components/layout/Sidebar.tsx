import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Bell,
  MapPin,
  LogOut,
  TrendingUp,
  BarChart3,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useSarathiStore } from '@/lib/store'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'nav.dashboard' },
  { to: '/dashboard/alerts', icon: Bell, label: 'nav.alerts' },
  { to: '/dashboard/outreach', icon: MapPin, label: 'nav.outreach' },
]

export function Sidebar() {
  const { user, logout } = useSarathiStore()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <aside
      className="w-60 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-700 h-screen flex flex-col fixed top-0 left-0 z-30"
      aria-label="Sidebar navigation"
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-slate-100 dark:border-slate-700">
        <img src="/sarathi-logo.svg" alt="" className="w-7 h-7" aria-hidden="true" />
        <span className="font-bold text-[#1e3a5f] text-lg">Sarathi</span>
      </div>

      {/* User info */}
      {user && (
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium mb-1">
            {user.role === 'panchayat_official' ? 'Panchayat Official' : 'Admin'}
          </p>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{user.name}</p>
          {user.panchayatName && (
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">{user.panchayatName}</p>
          )}
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto" aria-label="Dashboard sections">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/dashboard'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                isActive
                  ? 'bg-[#1e3a5f]/10 dark:bg-white/10 text-[#1e3a5f] dark:text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              )
            }
          >
            <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
            {t(label)}
          </NavLink>
        ))}
      </nav>

      {/* Performance pill */}
      <div className="mx-3 mb-3 p-4 bg-[#1e3a5f]/5 dark:bg-slate-800 rounded-xl border border-[#1e3a5f]/10 dark:border-slate-600">
        <div className="flex items-center gap-2 mb-2">
          <BarChart3 className="w-4 h-4 text-[#1e3a5f]" aria-hidden="true" />
          <span className="text-xs font-semibold text-[#1e3a5f]">Performance Index</span>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-bold text-[#1e3a5f]">78</span>
          <span className="text-xs text-slate-500 dark:text-slate-400 mb-1">/ 100</span>
          <div className="ml-auto flex items-center gap-1 text-emerald-600">
            <TrendingUp className="w-3 h-3" />
            <span className="text-xs font-medium">+5 this month</span>
          </div>
        </div>
        <div className="mt-2 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full bg-[#1e3a5f] rounded-full transition-all" style={{ width: '78%' }} />
        </div>
      </div>

      {/* Logout */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-colors"
        >
          <LogOut className="w-4 h-4" aria-hidden="true" />
          {t('nav.logout')}
        </button>
      </div>
    </aside>
  )
}
