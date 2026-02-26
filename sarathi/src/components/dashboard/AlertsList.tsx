import { ArrowRight, Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { DashboardAlert } from '@/types/dashboard'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { formatCurrency, getPriorityColor } from '@/lib/utils'

interface AlertsListProps {
  alerts: DashboardAlert[]
  limit?: number
}

export function AlertsList({ alerts, limit }: AlertsListProps) {
  const { t } = useTranslation()
  const displayed = limit ? alerts.slice(0, limit) : alerts

  return (
    <div className="space-y-3" aria-label={t('dashboard.alerts')}>
      {displayed.map((alert) => (
        <div
          key={alert.alertId}
          className={`flex items-start gap-4 p-4 rounded-xl border-l-4 ${getPriorityColor(alert.priority)}`}
          role="article"
          aria-label={`${alert.priority} priority alert for ${alert.citizenName}`}
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-sm font-semibold text-slate-900">{alert.citizenName}</span>
              <Badge
                intent={
                  alert.priority === 'high' ? 'danger' : alert.priority === 'medium' ? 'warning' : 'info'
                }
              >
                {alert.priority}
              </Badge>
              <Badge intent="neutral">
                {alert.alertType.replace(/_/g, ' ')}
              </Badge>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-2">{alert.details}</p>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="font-semibold text-emerald-600">
                {formatCurrency(alert.potentialBenefitValue)}/yr potential
              </span>
              {alert.deadline && (
                <span className="flex items-center gap-1 text-red-600">
                  <Clock className="w-3 h-3" aria-hidden="true" />
                  Deadline: {new Date(alert.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </span>
              )}
            </div>
          </div>
          <Button
            variant="primary"
            size="sm"
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            className="flex-shrink-0 whitespace-nowrap"
          >
            {t('dashboard.startOutreach')}
          </Button>
        </div>
      ))}
    </div>
  )
}
