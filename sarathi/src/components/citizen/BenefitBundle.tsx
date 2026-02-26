import { Star, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { BenefitBundle as BenefitBundleType, Scheme } from '@/types/citizen'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Progress } from '@/components/ui/Progress'
import { formatCurrency } from '@/lib/utils'

interface BenefitBundleProps {
  bundle: BenefitBundleType
  schemes: Scheme[]
  isTopBundle?: boolean
}

const effortColor = {
  low: 'success',
  medium: 'warning',
  high: 'danger',
} as const

export function BenefitBundleCard({ bundle, schemes, isTopBundle = false }: BenefitBundleProps) {
  const { t } = useTranslation()
  const bundleSchemes = schemes.filter((s) => bundle.schemes.includes(s.schemeId))

  return (
    <Card variant={isTopBundle ? 'accent' : 'default'} className="relative">
      {isTopBundle && (
        <div className="absolute -top-3 left-6">
          <span className="inline-flex items-center gap-1 bg-[#f59e0b] text-[#1e3a5f] text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            <Star className="w-3 h-3 fill-current" aria-hidden="true" />
            {t('results.optimalBundle')}
          </span>
        </div>
      )}

      <div className={isTopBundle ? 'pt-2' : ''}>
        {/* Total value */}
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <p className="text-xs text-slate-500 mb-1">Total Annual Benefit</p>
            <span className="text-3xl font-bold text-emerald-600">{formatCurrency(bundle.totalValue)}</span>
            <span className="text-sm text-slate-500 ml-1">/year</span>
          </div>
          <div className="text-right">
            <Badge intent={effortColor[bundle.applicationEffort]}>
              {bundle.applicationEffort} effort
            </Badge>
          </div>
        </div>

        {/* Approval probability */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-slate-600 mb-1.5">
            <span>Bundle Approval Chance</span>
            <span className="font-bold">{Math.round(bundle.combinedProbability * 100)}%</span>
          </div>
          <Progress value={bundle.combinedProbability * 100} size="sm" color="success" />
        </div>

        {/* Explanation */}
        <p className="text-sm text-slate-600 mb-4 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
          <Zap className="w-3.5 h-3.5 inline mr-1 text-[#f59e0b]" aria-hidden="true" />
          {bundle.explanation}
        </p>

        {/* Included schemes */}
        <div className="mb-5">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Includes {bundleSchemes.length} schemes
          </p>
          <div className="flex flex-wrap gap-1.5">
            {bundleSchemes.map((s) => (
              <span
                key={s.schemeId}
                className="text-xs bg-[#1e3a5f]/5 text-[#1e3a5f] px-2.5 py-1 rounded-full border border-[#1e3a5f]/10"
              >
                {s.schemeName.split(' ').slice(0, 3).join(' ')}
              </span>
            ))}
          </div>
        </div>

        <Button variant={isTopBundle ? 'accent' : 'primary'} size="md" className="w-full">
          {t('results.applyBundle')} ({bundleSchemes.length} schemes)
        </Button>
      </div>
    </Card>
  )
}
