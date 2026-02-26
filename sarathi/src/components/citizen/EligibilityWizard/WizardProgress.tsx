import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

const steps = [
  { id: 1, labelKey: 'eligibility.step1Title' },
  { id: 2, labelKey: 'eligibility.step2Title' },
  { id: 3, labelKey: 'eligibility.step3Title' },
]

interface WizardProgressProps {
  currentStep: number
}

export function WizardProgress({ currentStep }: WizardProgressProps) {
  const { t } = useTranslation()

  return (
    <nav aria-label="Eligibility check progress" className="mb-8">
      <ol className="flex items-center">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id
          const isCurrent = currentStep === step.id

          return (
            <li key={step.id} className={cn('flex items-center', index < steps.length - 1 && 'flex-1')}>
              {/* Step circle */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 border-2',
                    isCompleted
                      ? 'bg-[#1e3a5f] border-[#1e3a5f] text-white'
                      : isCurrent
                      ? 'bg-white border-[#1e3a5f] text-[#1e3a5f]'
                      : 'bg-white border-slate-300 text-slate-400'
                  )}
                  aria-current={isCurrent ? 'step' : undefined}
                  aria-label={`Step ${step.id}: ${t(step.labelKey)}${isCompleted ? ' (completed)' : isCurrent ? ' (current)' : ''}`}
                >
                  {isCompleted ? <Check className="w-4 h-4" aria-hidden="true" /> : step.id}
                </div>
                <span
                  className={cn(
                    'text-xs font-medium mt-1.5 text-center max-w-20 leading-tight hidden sm:block',
                    isCurrent ? 'text-[#1e3a5f]' : isCompleted ? 'text-slate-600' : 'text-slate-400'
                  )}
                >
                  {t(step.labelKey)}
                </span>
              </div>

              {/* Connector */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-0.5 mx-3 transition-colors duration-300',
                    currentStep > step.id ? 'bg-[#1e3a5f]' : 'bg-slate-200'
                  )}
                  aria-hidden="true"
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
