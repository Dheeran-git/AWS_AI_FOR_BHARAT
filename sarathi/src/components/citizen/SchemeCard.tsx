import { ExternalLink, FileText, AlertTriangle, Clock, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Scheme } from '@/types/citizen'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Progress } from '@/components/ui/Progress'
import { formatCurrency } from '@/lib/utils'

const categoryColors: Record<string, string> = {
  Housing: 'info',
  Health: 'success',
  Education: 'warning',
  Pension: 'neutral',
  Energy: 'warning',
  'Food Security': 'success',
  'Financial Inclusion': 'primary',
}

interface SchemeCardProps {
  scheme: Scheme
}

export function SchemeCard({ scheme }: SchemeCardProps) {
  const { t } = useTranslation()

  const intent = categoryColors[scheme.category] as 'info' | 'success' | 'warning' | 'neutral' | 'primary' | 'danger' | undefined

  return (
    <Card
      variant={scheme.eligibilityStatus === 'eligible' ? 'default' : 'bordered'}
      className={`relative ${scheme.conflictsWith.length > 0 ? 'border-amber-200' : ''}`}
    >
      {/* Category + Status */}
      <div className="flex items-start justify-between mb-3">
        <Badge intent={intent ?? 'neutral'}>{scheme.category}</Badge>
        <Badge intent={scheme.eligibilityStatus === 'eligible' ? 'success' : 'warning'}>
          {t(`results.${scheme.eligibilityStatus}`)}
        </Badge>
      </div>

      {/* Scheme name */}
      <h3 className="text-base font-semibold text-slate-900 mb-2 leading-snug">
        {scheme.schemeName}
      </h3>

      {/* Benefit value */}
      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-2xl font-bold text-emerald-600">
          {formatCurrency(scheme.benefitValue)}
        </span>
        <span className="text-xs text-slate-500">
          {scheme.benefitType === 'recurring' ? t('common.perYear') : '(one-time)'}
        </span>
      </div>

      {/* Trust Score */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-xs text-slate-600">
          <span className="font-medium">{t('results.trustScore')}</span>
          <span className="font-bold text-[#1e3a5f]">
            {Math.round(scheme.trustScore.approvalProbability * 100)}%
          </span>
        </div>
        <Progress
          value={scheme.trustScore.approvalProbability * 100}
          size="sm"
          color={scheme.trustScore.approvalProbability > 0.75 ? 'success' : scheme.trustScore.approvalProbability > 0.5 ? 'accent' : 'danger'}
        />
      </div>

      {/* Meta info */}
      <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" aria-hidden="true" />
          {scheme.trustScore.estimatedProcessingDays} {t('results.days')}
        </span>
        <span className="flex items-center gap-1">
          <Users className="w-3.5 h-3.5" aria-hidden="true" />
          {Math.round(scheme.trustScore.communitySuccessRate * 100)}% {t('results.communitySuccess')}
        </span>
      </div>

      {/* Missing documents */}
      {scheme.explanation.missingDocuments.length > 0 && (
        <div className="mb-4 p-3 bg-amber-50 rounded-xl border border-amber-100">
          <p className="text-xs font-semibold text-amber-700 mb-1.5 flex items-center gap-1">
            <FileText className="w-3.5 h-3.5" aria-hidden="true" />
            Documents needed:
          </p>
          <ul className="space-y-1">
            {scheme.explanation.missingDocuments.map((doc) => (
              <li key={doc} className="text-xs text-amber-700 flex items-center gap-1">
                <span className="w-1 h-1 bg-amber-500 rounded-full flex-shrink-0" aria-hidden="true" />
                {doc}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Conflict warning */}
      {scheme.conflictsWith.length > 0 && (
        <div className="mb-4 flex items-start gap-1.5 p-2.5 bg-amber-50 rounded-lg border border-amber-200">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-xs text-amber-700">
            Conflicts with {scheme.conflictsWith.length} other scheme(s)
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="secondary" size="sm" className="flex-1" leftIcon={<ExternalLink className="w-3.5 h-3.5" />}>
          {t('results.learnMore')}
        </Button>
        <Button
          variant={scheme.eligibilityStatus === 'eligible' ? 'primary' : 'ghost'}
          size="sm"
          className="flex-1"
        >
          {t('results.apply')}
        </Button>
      </div>
    </Card>
  )
}
