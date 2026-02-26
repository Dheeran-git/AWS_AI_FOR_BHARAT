import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useSarathiStore } from '@/lib/store'
import { formatCurrencyFull } from '@/lib/utils'

interface Step3Props {
  onSubmit: () => void
  onBack: () => void
  isLoading: boolean
}

export function Step3Review({ onSubmit, onBack, isLoading }: Step3Props) {
  const { t } = useTranslation()
  const { citizenProfile } = useSarathiStore()
  const [consented, setConsented] = useState(false)

  const fields = [
    { label: t('eligibility.name'), value: citizenProfile.name },
    { label: t('eligibility.age'), value: citizenProfile.age },
    { label: t('eligibility.gender'), value: citizenProfile.gender },
    { label: t('eligibility.state'), value: citizenProfile.state },
    { label: t('eligibility.district'), value: citizenProfile.district },
    { label: t('eligibility.panchayat'), value: citizenProfile.panchayat },
    { label: t('eligibility.householdSize'), value: citizenProfile.householdSize },
    {
      label: t('eligibility.monthlyIncome'),
      value: citizenProfile.totalIncome !== undefined
        ? formatCurrencyFull(citizenProfile.totalIncome) + '/month'
        : '—',
    },
    { label: t('eligibility.caste'), value: citizenProfile.caste?.toUpperCase() },
    { label: t('eligibility.bpl'), value: citizenProfile.bplStatus ? 'Yes' : 'No' },
    { label: t('eligibility.disability'), value: citizenProfile.disabilityStatus ? 'Yes' : 'No' },
    { label: t('eligibility.widow'), value: citizenProfile.isWidow ? 'Yes' : 'No' },
    { label: t('eligibility.migrant'), value: citizenProfile.isMigrant ? 'Yes' : 'No' },
  ]

  return (
    <div className="space-y-6">
      {/* Summary */}
      <Card variant="bordered" className="p-5">
        <h3 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wider">
          Your Information
        </h3>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-3">
          {fields.map(({ label, value }) => (
            <div key={label} className="flex flex-col">
              <dt className="text-xs text-slate-500">{label}</dt>
              <dd className="text-sm font-medium text-slate-800 capitalize">{String(value ?? '—')}</dd>
            </div>
          ))}
        </dl>
      </Card>

      {/* Consent */}
      <label className="flex gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors">
        <div className="flex-shrink-0 mt-0.5">
          <div
            onClick={() => setConsented(!consented)}
            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
              consented ? 'bg-[#1e3a5f] border-[#1e3a5f]' : 'border-slate-400 bg-white'
            }`}
            role="checkbox"
            aria-checked={consented}
            tabIndex={0}
            onKeyDown={(e) => e.key === ' ' && setConsented(!consented)}
            aria-label={t('eligibility.consentTitle')}
          >
            {consented && <CheckCircle2 className="w-3.5 h-3.5 text-white" aria-hidden="true" />}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-800 mb-1">{t('eligibility.consentTitle')}</p>
          <p className="text-xs text-slate-600 leading-relaxed">{t('eligibility.consentText')}</p>
        </div>
      </label>

      <div className="flex gap-3">
        <Button type="button" variant="secondary" size="lg" className="flex-1" onClick={onBack}>
          ← {t('eligibility.back')}
        </Button>
        <Button
          type="button"
          variant="accent"
          size="lg"
          className="flex-1"
          disabled={!consented}
          loading={isLoading}
          onClick={onSubmit}
        >
          {isLoading ? t('eligibility.checking') : t('eligibility.submit')}
        </Button>
      </div>
    </div>
  )
}
