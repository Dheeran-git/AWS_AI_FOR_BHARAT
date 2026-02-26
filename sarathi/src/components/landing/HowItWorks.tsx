import { Mic, Search, CheckCircle2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const steps = [
  {
    step: 1,
    icon: Mic,
    titleKey: 'landing.step1',
    descKey: 'landing.step1Desc',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    step: 2,
    icon: Search,
    titleKey: 'landing.step2',
    descKey: 'landing.step2Desc',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    step: 3,
    icon: CheckCircle2,
    titleKey: 'landing.step3',
    descKey: 'landing.step3Desc',
    color: 'bg-emerald-100 text-emerald-600',
  },
]

export function HowItWorks() {
  const { t } = useTranslation()

  return (
    <section className="py-20 bg-white" aria-labelledby="how-it-works-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2
            id="how-it-works-title"
            className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4"
          >
            {t('landing.howItWorksTitle')}
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Simple, guided, and available in your language — even without literacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div
            className="hidden md:block absolute top-10 left-1/3 right-1/3 h-0.5 bg-slate-200"
            aria-hidden="true"
          />

          {steps.map(({ step, icon: Icon, titleKey, descKey, color }) => (
            <div
              key={step}
              className="flex flex-col items-center text-center relative"
            >
              {/* Step number */}
              <div className="relative mb-6">
                <div
                  className={`w-20 h-20 rounded-2xl flex items-center justify-center ${color} shadow-sm`}
                  aria-hidden="true"
                >
                  <Icon className="w-8 h-8" />
                </div>
                <span className="absolute -top-2 -right-2 w-7 h-7 bg-[#1e3a5f] text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md">
                  {step}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{t(titleKey)}</h3>
              <p className="text-slate-500 text-base leading-relaxed max-w-xs">{t(descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
