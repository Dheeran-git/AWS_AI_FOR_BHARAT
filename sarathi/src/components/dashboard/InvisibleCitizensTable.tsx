import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { InvisibleCitizen } from '@/types/dashboard'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Progress } from '@/components/ui/Progress'
import { formatCurrency, getOutreachBadge, getInitials } from '@/lib/utils'

interface TableProps {
  citizens: InvisibleCitizen[]
}

export function InvisibleCitizensTable({ citizens }: TableProps) {
  const { t } = useTranslation()

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-100">
      <table className="w-full text-sm" aria-label={t('dashboard.outreachList')}>
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
              {t('dashboard.name')}
            </th>
            <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 hidden md:table-cell">
              {t('dashboard.vulnerabilityScore')}
            </th>
            <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
              {t('dashboard.eligibleSchemes')}
            </th>
            <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
              {t('dashboard.potentialValue')}
            </th>
            <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
              {t('dashboard.outreachStatus')}
            </th>
            <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
              {t('dashboard.action')}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {citizens.map((citizen) => {
            const badge = getOutreachBadge(citizen.outreachStatus)
            return (
              <tr
                key={citizen.citizenId}
                className="hover:bg-slate-50/50 transition-colors"
              >
                {/* Name + village */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full bg-[#1e3a5f]/10 text-[#1e3a5f] text-xs font-bold flex items-center justify-center flex-shrink-0"
                      aria-hidden="true"
                    >
                      {getInitials(citizen.name)}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{citizen.name}</p>
                      <p className="text-xs text-slate-500">{citizen.village} · {citizen.zeroBenefitDays}d no benefits</p>
                    </div>
                  </div>
                </td>

                {/* Vulnerability */}
                <td className="px-5 py-4 hidden md:table-cell">
                  <div className="w-24">
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>{citizen.vulnerabilityScore}</span>
                    </div>
                    <Progress
                      value={citizen.vulnerabilityScore}
                      size="sm"
                      color={citizen.vulnerabilityScore > 80 ? 'danger' : citizen.vulnerabilityScore > 60 ? 'accent' : 'primary'}
                    />
                  </div>
                </td>

                {/* Schemes count */}
                <td className="px-5 py-4">
                  <span className="text-slate-700 font-medium">{citizen.eligibleSchemesCount} schemes</span>
                </td>

                {/* Value */}
                <td className="px-5 py-4">
                  <span className="text-emerald-600 font-semibold">
                    {formatCurrency(citizen.potentialBenefitValue)}/yr
                  </span>
                </td>

                {/* Status */}
                <td className="px-5 py-4">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${badge.className}`}>
                    {badge.label}
                  </span>
                </td>

                {/* Action */}
                <td className="px-5 py-4">
                  {citizen.outreachStatus !== 'enrolled' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                      className="text-[#1e3a5f] hover:bg-[#1e3a5f]/5"
                    >
                      {t('dashboard.startOutreach')}
                    </Button>
                  )}
                  {citizen.outreachStatus === 'enrolled' && (
                    <Badge intent="success">Enrolled ✓</Badge>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
