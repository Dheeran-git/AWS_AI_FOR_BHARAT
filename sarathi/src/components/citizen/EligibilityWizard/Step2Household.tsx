import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useSarathiStore } from '@/lib/store'

const schema = z.object({
  householdSize: z.coerce.number().min(1).max(30),
  totalIncome: z.coerce.number().min(0),
  caste: z.enum(['general', 'obc', 'sc', 'st']),
  disabilityStatus: z.boolean(),
  bplStatus: z.boolean(),
  isWidow: z.boolean(),
  isMigrant: z.boolean(),
  isPregnant: z.boolean(),
})

type Step2Data = z.infer<typeof schema>

interface Step2Props {
  onNext: () => void
  onBack: () => void
}

const toggleFields = [
  { name: 'disabilityStatus' as const, labelKey: 'eligibility.disability' },
  { name: 'bplStatus' as const, labelKey: 'eligibility.bpl' },
  { name: 'isWidow' as const, labelKey: 'eligibility.widow' },
  { name: 'isMigrant' as const, labelKey: 'eligibility.migrant' },
  { name: 'isPregnant' as const, labelKey: 'eligibility.pregnant' },
]

export function Step2Household({ onNext, onBack }: Step2Props) {
  const { t } = useTranslation()
  const { citizenProfile, updateCitizenProfile } = useSarathiStore()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Step2Data>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema) as any,
    defaultValues: {
      householdSize: citizenProfile.householdSize ?? 4,
      totalIncome: citizenProfile.totalIncome ?? 0,
      caste: citizenProfile.caste ?? 'sc',
      disabilityStatus: citizenProfile.disabilityStatus ?? false,
      bplStatus: citizenProfile.bplStatus ?? true,
      isWidow: citizenProfile.isWidow ?? false,
      isMigrant: citizenProfile.isMigrant ?? false,
      isPregnant: citizenProfile.isPregnant ?? false,
    },
  })

  const onSubmit = (data: Step2Data) => {
    updateCitizenProfile(data)
    onNext()
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-5" noValidate>
      <div className="grid grid-cols-2 gap-4">
        <Input
          label={t('eligibility.householdSize')}
          type="number"
          min={1}
          max={30}
          required
          error={errors.householdSize?.message}
          {...register('householdSize')}
        />
        <Input
          label={t('eligibility.monthlyIncome')}
          type="number"
          min={0}
          hint="Monthly in ₹ (0 if no income)"
          error={errors.totalIncome?.message}
          {...register('totalIncome')}
        />
      </div>

      {/* Caste */}
      <div>
        <label className="text-sm font-medium text-slate-700 block mb-2">
          {t('eligibility.caste')} <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-4 gap-2">
          {(['general', 'obc', 'sc', 'st'] as const).map((c) => (
            <label
              key={c}
              className="flex items-center justify-center py-3 border-2 rounded-xl text-sm font-semibold cursor-pointer transition-all has-[:checked]:border-[#1e3a5f] has-[:checked]:bg-[#1e3a5f]/5 has-[:checked]:text-[#1e3a5f] border-slate-200 text-slate-600 hover:border-slate-300 uppercase"
            >
              <input type="radio" value={c} className="sr-only" {...register('caste')} />
              {t(`eligibility.${c}`)}
            </label>
          ))}
        </div>
      </div>

      {/* Toggle fields */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-slate-700">Special Circumstances</p>
        {toggleFields.map(({ name, labelKey }) => {
          const checked = watch(name)
          return (
            <label
              key={name}
              className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors"
            >
              <span className="text-sm text-slate-700 font-medium">{t(labelKey)}</span>
              <button
                type="button"
                role="switch"
                aria-checked={checked}
                onClick={() => setValue(name, !checked)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] ${
                  checked ? 'bg-[#1e3a5f]' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                    checked ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </label>
          )
        })}
      </div>

      <div className="flex gap-3 mt-2">
        <Button type="button" variant="secondary" size="lg" className="flex-1" onClick={onBack}>
          ← {t('eligibility.back')}
        </Button>
        <Button type="submit" variant="primary" size="lg" className="flex-1">
          {t('eligibility.next')} →
        </Button>
      </div>
    </form>
  )
}
