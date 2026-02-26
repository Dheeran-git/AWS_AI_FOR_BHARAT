import { type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface KPICardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: { value: string; positive: boolean }
  urgent?: boolean
  className?: string
  subtitle?: string
}

export function KPICard({ title, value, icon: Icon, trend, urgent, subtitle, className }: KPICardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl border p-5 shadow-sm hover:shadow-md transition-shadow',
        urgent ? 'border-red-200 bg-red-50' : 'border-slate-100',
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className={cn(
            'p-2.5 rounded-xl',
            urgent ? 'bg-red-100 text-red-600' : 'bg-[#1e3a5f]/10 text-[#1e3a5f]'
          )}
        >
          <Icon className="w-5 h-5" aria-hidden="true" />
        </div>
        {trend && (
          <span
            className={cn(
              'text-xs font-semibold px-2 py-0.5 rounded-full',
              trend.positive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
            )}
          >
            {trend.positive ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-slate-900 mb-1">
        {typeof value === 'number' ? value.toLocaleString('en-IN') : value}
      </p>
      <p className={cn('text-sm font-medium', urgent ? 'text-red-700' : 'text-slate-600')}>
        {title}
      </p>
      {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
    </div>
  )
}
