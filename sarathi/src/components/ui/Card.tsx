import { cn } from '@/lib/utils'

type CardVariant = 'default' | 'elevated' | 'bordered' | 'interactive' | 'accent'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
}

const variantClasses: Record<CardVariant, string> = {
  default: 'bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700',
  elevated: 'bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700',
  bordered: 'bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700',
  interactive:
    'bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer',
  accent:
    'bg-white dark:bg-slate-800 rounded-2xl border-2 border-[#f59e0b] shadow-md',
}

export function Card({ variant = 'default', className, children, ...props }: CardProps) {
  return (
    <div className={cn(variantClasses[variant], 'p-6', className)} {...props}>
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex items-center justify-between mb-4', className)} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('text-lg font-semibold text-slate-800 dark:text-slate-100', className)} {...props}>
      {children}
    </h3>
  )
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  )
}
