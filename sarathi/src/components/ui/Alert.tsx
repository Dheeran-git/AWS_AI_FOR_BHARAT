import { AlertTriangle, CheckCircle2, Info, XCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type AlertVariant = 'info' | 'success' | 'warning' | 'error'

interface AlertProps {
  variant?: AlertVariant
  title?: string
  children: React.ReactNode
  onDismiss?: () => void
  className?: string
}

const config: Record<AlertVariant, { icon: React.ElementType; classes: string }> = {
  info: { icon: Info, classes: 'bg-blue-50 border-blue-400 text-blue-800' },
  success: { icon: CheckCircle2, classes: 'bg-emerald-50 border-emerald-500 text-emerald-800' },
  warning: { icon: AlertTriangle, classes: 'bg-amber-50 border-amber-400 text-amber-800' },
  error: { icon: XCircle, classes: 'bg-red-50 border-red-500 text-red-800' },
}

export function Alert({ variant = 'info', title, children, onDismiss, className }: AlertProps) {
  const { icon: Icon, classes } = config[variant]
  return (
    <div
      role="alert"
      className={cn(
        'flex gap-3 p-4 rounded-xl border-l-4',
        classes,
        className
      )}
    >
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
      <div className="flex-1 min-w-0">
        {title && <p className="font-semibold text-sm mb-0.5">{title}</p>}
        <div className="text-sm">{children}</div>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 hover:opacity-70 transition-opacity"
          aria-label="Dismiss alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
