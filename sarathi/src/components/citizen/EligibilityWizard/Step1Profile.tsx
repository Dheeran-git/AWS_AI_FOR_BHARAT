import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { Input, Select } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useSarathiStore } from '@/lib/store'
import { INDIAN_STATES, INDIAN_LANGUAGES } from '@/lib/utils'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.coerce.number().min(1).max(120),
  gender: z.enum(['male', 'female', 'other']),
  state: z.string().min(1, 'Please select a state'),
  district: z.string().min(2, 'Please enter your district'),
  panchayat: z.string().min(2, 'Please enter your panchayat or village'),
  preferredLanguage: z.string().min(1),
})

type Step1Data = z.infer<typeof schema>

interface Step1Props {
  onNext: () => void
}

export function Step1Profile({ onNext }: Step1Props) {
  const { t } = useTranslation()
  const { citizenProfile, updateCitizenProfile } = useSarathiStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1Data>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema) as any,
    defaultValues: {
      name: citizenProfile.name ?? '',
      age: citizenProfile.age ?? 30,
      gender: citizenProfile.gender ?? 'female',
      state: citizenProfile.state ?? '',
      district: citizenProfile.district ?? '',
      panchayat: citizenProfile.panchayat ?? '',
      preferredLanguage: citizenProfile.preferredLanguage ?? 'hi',
    },
  })

  const onSubmit = (data: Step1Data) => {
    updateCitizenProfile(data)
    onNext()
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-5" noValidate>
      <Input
        label={t('eligibility.name')}
        placeholder="e.g. Savitri Devi"
        required
        error={errors.name?.message}
        {...register('name')}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label={t('eligibility.age')}
          type="number"
          placeholder="e.g. 38"
          required
          min={1}
          max={120}
          error={errors.age?.message}
          {...register('age')}
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700">
            {t('eligibility.gender')} <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['female', 'male', 'other'] as const).map((g) => (
              <label
                key={g}
                className="flex items-center justify-center gap-1 px-2 py-3 border-2 rounded-xl text-sm font-medium cursor-pointer transition-all has-[:checked]:border-[#1e3a5f] has-[:checked]:bg-[#1e3a5f]/5 has-[:checked]:text-[#1e3a5f] border-slate-200 text-slate-600 hover:border-slate-300"
              >
                <input
                  type="radio"
                  value={g}
                  className="sr-only"
                  {...register('gender')}
                />
                {t(`eligibility.${g}`)}
              </label>
            ))}
          </div>
        </div>
      </div>

      <Select
        label={t('eligibility.state')}
        placeholder="Select state"
        required
        options={INDIAN_STATES.map((s) => ({ value: s, label: s }))}
        error={errors.state?.message}
        {...register('state')}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label={t('eligibility.district')}
          placeholder="e.g. Agra"
          required
          error={errors.district?.message}
          {...register('district')}
        />
        <Input
          label={t('eligibility.panchayat')}
          placeholder="e.g. Banpur"
          required
          error={errors.panchayat?.message}
          {...register('panchayat')}
        />
      </div>

      <Select
        label={t('eligibility.language')}
        options={INDIAN_LANGUAGES.map((l) => ({ value: l.code, label: l.name }))}
        {...register('preferredLanguage')}
      />

      <Button type="submit" variant="primary" size="lg" className="w-full mt-2">
        {t('eligibility.next')} →
      </Button>
    </form>
  )
}
