import { Home, Users, FileText, IndianRupee } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useDashboard } from '@/hooks/useDashboard'
import { useSarathiStore } from '@/lib/store'
import { KPICard } from '@/components/dashboard/KPICard'
import { AlertsList } from '@/components/dashboard/AlertsList'
import { InvisibleCitizensTable } from '@/components/dashboard/InvisibleCitizensTable'
import { PerformanceGauge } from '@/components/dashboard/PerformanceGauge'
import { LifeEventsTimeline } from '@/components/dashboard/LifeEventsTimeline'
import { SkeletonCard, SkeletonTable } from '@/components/ui/Skeleton'
import { Alert } from '@/components/ui/Alert'
import { formatCurrency } from '@/lib/utils'

export function DashboardHome() {
  const { t } = useTranslation()
  const { user } = useSarathiStore()
  const panchayatId = user?.panchayatId ?? 'UP-AGR-BAN-001'
  const { data, isLoading, error } = useDashboard(panchayatId)

  if (error) {
    return (
      <Alert variant="error" title="Failed to load dashboard">
        {t('common.error')}
      </Alert>
    )
  }

  if (isLoading || !data) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => <SkeletonCard key={i} lines={2} />)}
        </div>
        <SkeletonCard lines={5} />
        <SkeletonTable rows={4} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{t('dashboard.title')}</h1>
        <p className="text-slate-500 text-sm mt-1">{data.panchayatName}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title={t('dashboard.totalHouseholds')}
          value={data.summary.totalHouseholds}
          icon={Home}
          subtitle={`${data.summary.enrolledHouseholds} enrolled`}
        />
        <KPICard
          title={t('dashboard.invisibleCitizens')}
          value={data.summary.invisibleCitizens}
          icon={Users}
          urgent
          subtitle="Need immediate outreach"
        />
        <KPICard
          title={t('dashboard.pendingApps')}
          value={data.summary.pendingApplications}
          icon={FileText}
          trend={{ value: '3 new today', positive: false }}
        />
        <KPICard
          title={t('dashboard.benefitsSecured')}
          value={formatCurrency(data.summary.totalBenefitsSecured)}
          icon={IndianRupee}
          trend={{ value: '12% this month', positive: true }}
        />
      </div>

      {/* Main content: 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Alerts + Life Events */}
        <div className="lg:col-span-2 space-y-6">
          {/* Priority Alerts */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-slate-800">{t('dashboard.alerts')}</h2>
              <span className="text-xs text-slate-500 bg-red-50 text-red-600 font-medium px-2.5 py-1 rounded-full">
                {data.alerts.filter((a) => a.priority === 'high').length} high priority
              </span>
            </div>
            <AlertsList alerts={data.alerts} limit={4} />
          </div>

          {/* Life Events */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-base font-semibold text-slate-800 mb-5">{t('dashboard.lifeEvents')}</h2>
            <LifeEventsTimeline events={data.lifeEvents} />
          </div>
        </div>

        {/* Right: Performance */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col items-center">
          <PerformanceGauge metrics={data.performance} />
        </div>
      </div>

      {/* Invisible Citizens Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-slate-800">{t('dashboard.outreachList')}</h2>
          <span className="text-xs font-medium text-slate-500">
            {data.invisibleCitizens.filter((c) => c.outreachStatus === 'pending').length} pending
          </span>
        </div>
        <InvisibleCitizensTable citizens={data.invisibleCitizens} />
      </div>
    </div>
  )
}
