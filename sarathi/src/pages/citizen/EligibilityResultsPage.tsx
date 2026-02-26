import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertTriangle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useSarathiStore } from '@/lib/store'
import { SchemeCard } from '@/components/citizen/SchemeCard'
import { BenefitBundleCard } from '@/components/citizen/BenefitBundle'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { formatCurrency } from '@/lib/utils'

export function EligibilityResultsPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { eligibilityResult, citizenProfile, resetCitizenProfile } = useSarathiStore()

  if (!eligibilityResult) {
    navigate('/eligibility')
    return null
  }

  const eligibleSchemes = eligibilityResult.eligibleSchemes.filter(
    (s) => s.eligibilityStatus === 'eligible'
  )
  const totalValue = eligibilityResult.optimalBundles[0]?.totalValue ?? 0
  const topBundle = eligibilityResult.optimalBundles[0]

  const handleStartOver = () => {
    resetCitizenProfile()
    navigate('/eligibility')
  }

  return (
    <div>
      {/* Back + header */}
      <button
        onClick={() => navigate('/eligibility')}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors mb-6 text-sm font-medium"
        aria-label="Back to eligibility check"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      {/* Success banner */}
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2a4f80] rounded-2xl p-6 mb-8 text-white">
        <div className="flex items-center gap-3 mb-3">
          <CheckCircle2 className="w-8 h-8 text-emerald-400" aria-hidden="true" />
          <div>
            <h1 className="text-xl font-bold">{t('results.title')}</h1>
            <p className="text-white/70 text-sm">Based on your profile, {citizenProfile.name}</p>
          </div>
        </div>
        <p className="text-3xl font-bold">
          {t('results.eligible')}{' '}
          <span className="text-[#f59e0b]">{eligibleSchemes.length}</span>{' '}
          {t('results.schemes')}{' '}
          <span className="text-emerald-400">{formatCurrency(totalValue)}</span>
          <span className="text-lg font-normal text-white/70"> {t('results.perYear')}</span>
        </p>
      </div>

      {/* Conflicts */}
      {eligibilityResult.conflictsDetected.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" aria-hidden="true" />
            {t('results.conflictsTitle')}
          </h2>
          <div className="space-y-3">
            {eligibilityResult.conflictsDetected.map((conflict) => (
              <Alert key={`${conflict.schemeA}-${conflict.schemeB}`} variant="warning">
                {conflict.explanation}
              </Alert>
            ))}
          </div>
        </div>
      )}

      {/* Optimal bundle */}
      {topBundle && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">{t('results.optimalBundle')}</h2>
          <BenefitBundleCard
            bundle={topBundle}
            schemes={eligibilityResult.eligibleSchemes}
            isTopBundle
          />
          {eligibilityResult.optimalBundles.length > 1 && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {eligibilityResult.optimalBundles.slice(1).map((bundle) => (
                <BenefitBundleCard
                  key={bundle.bundleId}
                  bundle={bundle}
                  schemes={eligibilityResult.eligibleSchemes}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* All schemes */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          All Eligible Schemes ({eligibilityResult.eligibleSchemes.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {eligibilityResult.eligibleSchemes.map((scheme) => (
            <SchemeCard key={scheme.schemeId} scheme={scheme} />
          ))}
        </div>
      </div>

      {/* Start over */}
      <div className="flex justify-center pb-8">
        <Button variant="ghost" onClick={handleStartOver} className="text-slate-500">
          Check eligibility for someone else
        </Button>
      </div>
    </div>
  )
}
