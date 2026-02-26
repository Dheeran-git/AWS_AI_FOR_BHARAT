import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-slate-700">
            {label}
            {props.required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-4 py-3 rounded-xl border bg-white text-slate-900 placeholder-slate-400',
            'transition-all duration-150 text-sm',
            'focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 focus:border-[#1e3a5f]',
            'disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed',
            error
              ? 'border-red-400 focus:ring-red-300 focus:border-red-500'
              : 'border-slate-200 hover:border-slate-300',
            className
          )}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-red-600" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-xs text-slate-500">
            {hint}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className, id, ...props }, ref) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={selectId} className="text-sm font-medium text-slate-700">
            {label}
            {props.required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'w-full px-4 py-3 rounded-xl border bg-white text-slate-900',
            'transition-all duration-150 text-sm cursor-pointer appearance-none',
            'focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 focus:border-[#1e3a5f]',
            error ? 'border-red-400' : 'border-slate-200 hover:border-slate-300',
            className
          )}
          aria-invalid={error ? 'true' : undefined}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-xs text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)
Select.displayName = 'Select'
