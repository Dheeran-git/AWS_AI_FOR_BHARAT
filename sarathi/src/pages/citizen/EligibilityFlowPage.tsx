import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { WizardProgress } from '@/components/citizen/EligibilityWizard/WizardProgress'
import { Step1Profile } from '@/components/citizen/EligibilityWizard/Step1Profile'
import { Step2Household } from '@/components/citizen/EligibilityWizard/Step2Household'
import { Step3Review } from '@/components/citizen/EligibilityWizard/Step3Review'
import { Card } from '@/components/ui/Card'
import { useSarathiStore } from '@/lib/store'
import { useCheckEligibility } from '@/hooks/useEligibility'

export function EligibilityFlowPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { wizardStep, setWizardStep, citizenProfile } = useSarathiStore()
  const { mutate: checkEligibility, isPending } = useCheckEligibility()

  const handleNext = () => setWizardStep(wizardStep + 1)
  const handleBack = () => setWizardStep(wizardStep - 1)

  const handleSubmit = () => {
    checkEligibility(citizenProfile, {
      onSuccess: () => navigate('/eligibility/results'),
    })
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">{t('eligibility.title')}</h1>
        <p className="text-slate-500 text-sm max-w-md mx-auto">{t('eligibility.subtitle')}</p>
      </div>

      {/* Wizard progress */}
      <WizardProgress currentStep={wizardStep} />

      {/* Step card */}
      <Card variant="elevated" className="shadow-lg">
        <h2 className="text-lg font-semibold text-slate-800 mb-6">
          {wizardStep === 1 && t('eligibility.step1Title')}
          {wizardStep === 2 && t('eligibility.step2Title')}
          {wizardStep === 3 && t('eligibility.step3Title')}
        </h2>

        {wizardStep === 1 && <Step1Profile onNext={handleNext} />}
        {wizardStep === 2 && <Step2Household onNext={handleNext} onBack={handleBack} />}
        {wizardStep === 3 && (
          <Step3Review onSubmit={handleSubmit} onBack={handleBack} isLoading={isPending} />
        )}
      </Card>
    </div>
  )
}
