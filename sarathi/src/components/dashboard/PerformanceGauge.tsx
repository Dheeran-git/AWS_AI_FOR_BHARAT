import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts'
import { TrendingUp } from 'lucide-react'
import type { PerformanceMetrics } from '@/types/dashboard'
import { useTranslation } from 'react-i18next'

interface PerformanceGaugeProps {
  metrics: PerformanceMetrics
}

export function PerformanceGauge({ metrics }: PerformanceGaugeProps) {
  const { t } = useTranslation()

  const gaugeData = [{ value: metrics.performanceIndex, fill: '#1e3a5f' }]

  const getIndexColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600'
    if (score >= 60) return 'text-amber-600'
    return 'text-red-600'
  }

  return (
    <div className="flex flex-col items-center">
      {/* Radial gauge */}
      <div className="relative w-40 h-40" aria-label={`Performance index: ${metrics.performanceIndex} out of 100`}>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="95%"
            barSize={12}
            data={gaugeData}
            startAngle={180}
            endAngle={0}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
            <RadialBar
              background={{ fill: '#f1f5f9' }}
              dataKey="value"
              cornerRadius={6}
              angleAxisId={0}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold ${getIndexColor(metrics.performanceIndex)}`}>
            {metrics.performanceIndex}
          </span>
          <span className="text-xs text-slate-400">/ 100</span>
        </div>
      </div>

      <h3 className="text-base font-semibold text-slate-800 mt-2 mb-4">{t('dashboard.performance')}</h3>

      {/* Rank */}
      <div className="flex gap-4 mb-4 text-center">
        <div>
          <p className="text-xs text-slate-500">District Rank</p>
          <p className="text-xl font-bold text-[#1e3a5f]">#{metrics.districtRank}</p>
        </div>
        <div className="w-px bg-slate-100" aria-hidden="true" />
        <div>
          <p className="text-xs text-slate-500">State Rank</p>
          <p className="text-xl font-bold text-slate-600">#{metrics.stateRank}</p>
        </div>
      </div>

      {/* Sub-metrics */}
      <div className="w-full space-y-3">
        {[
          { label: t('dashboard.deliverySuccess'), value: metrics.deliverySuccessRate, color: 'success' as const },
          { label: t('dashboard.citizenSatisfaction'), value: metrics.citizenSatisfaction, color: 'primary' as const },
          { label: 'Validation Rate', value: metrics.validationRate, color: 'accent' as const },
        ].map(({ label, value, color }) => (
          <div key={label}>
            <div className="flex justify-between text-xs text-slate-600 mb-1">
              <span>{label}</span>
              <span className="font-semibold">{value.toFixed(1)}%</span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${color === 'success' ? 'bg-emerald-500' : color === 'accent' ? 'bg-[#f59e0b]' : 'bg-[#1e3a5f]'} transition-all duration-700`}
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Trend */}
      <div className="mt-4 flex items-center gap-1.5 text-emerald-600 text-xs font-medium">
        <TrendingUp className="w-4 h-4" aria-hidden="true" />
        Improved 5 points this month
      </div>
    </div>
  )
}
