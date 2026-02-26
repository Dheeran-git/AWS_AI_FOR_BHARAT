import { cn } from '@/lib/utils'

type BadgeIntent = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'primary'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  intent?: BadgeIntent
}

const intentClasses: Record<BadgeIntent, string> = {
  success: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  warning: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  danger: 'bg-red-50 text-red-700 ring-1 ring-red-200',
  info: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
  neutral: 'bg-slate-100 text-slate-600 ring-1 ring-slate-200',
  primary: 'bg-[#1e3a5f]/10 text-[#1e3a5f] ring-1 ring-[#1e3a5f]/20',
}

export function Badge({ intent = 'neutral', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium',
        intentClasses[intent],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
