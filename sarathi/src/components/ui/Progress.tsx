import { cn } from '@/lib/utils'

interface ProgressProps {
  value: number
  max?: number
  label?: string
  showValue?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'accent' | 'success' | 'danger'
  className?: string
}

const sizeClasses = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' }
const colorClasses = {
  primary: 'bg-[#1e3a5f]',
  accent: 'bg-[#f59e0b]',
  success: 'bg-emerald-500',
  danger: 'bg-red-500',
}

export function Progress({
  value,
  max = 100,
  label,
  showValue = false,
  size = 'md',
  color = 'primary',
  className,
}: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-xs font-medium text-slate-600">{label}</span>}
          {showValue && <span className="text-xs font-semibold text-slate-700">{Math.round(pct)}%</span>}
        </div>
      )}
      <div
        className={cn('w-full bg-slate-100 rounded-full overflow-hidden', sizeClasses[size])}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <div
          className={cn('h-full rounded-full transition-all duration-700 ease-out', colorClasses[color])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
