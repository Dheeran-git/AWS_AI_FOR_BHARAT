import { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'accent'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-[#1e3a5f] hover:bg-[#1e3050] text-white shadow-sm hover:shadow-md',
  secondary:
    'bg-white hover:bg-slate-50 text-[#1e3a5f] border border-slate-200 shadow-sm hover:shadow-md',
  ghost:
    'bg-transparent hover:bg-slate-100 text-slate-700',
  danger:
    'bg-red-600 hover:bg-red-700 text-white shadow-sm',
  accent:
    'bg-[#f59e0b] hover:bg-[#d97706] text-[#1e3a5f] font-semibold shadow-sm hover:shadow-md',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-7 py-3.5 text-base gap-2.5',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center font-medium rounded-xl',
          'transition-all duration-200 cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f]/50',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
        ) : (
          leftIcon && <span aria-hidden="true">{leftIcon}</span>
        )}
        {children}
        {!loading && rightIcon && <span aria-hidden="true">{rightIcon}</span>}
      </button>
    )
  }
)
Button.displayName = 'Button'
