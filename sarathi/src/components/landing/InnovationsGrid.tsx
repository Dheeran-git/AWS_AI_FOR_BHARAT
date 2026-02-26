import {
  TrendingUp,
  GitMerge,
  Shield,
  WifiOff,
  MapPin,
  Users,
  Lightbulb,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Card } from '@/components/ui/Card'

const innovations = [
  {
    icon: TrendingUp,
    titleKey: 'innovations.twin',
    descKey: 'innovations.twinDesc',
    gradient: 'from-blue-500/10 to-blue-600/5',
    iconColor: 'text-blue-600',
    badge: 'Novel',
  },
  {
    icon: GitMerge,
    titleKey: 'innovations.conflict',
    descKey: 'innovations.conflictDesc',
    gradient: 'from-violet-500/10 to-violet-600/5',
    iconColor: 'text-violet-600',
    badge: 'Novel',
  },
  {
    icon: Shield,
    titleKey: 'innovations.zkp',
    descKey: 'innovations.zkpDesc',
    gradient: 'from-emerald-500/10 to-emerald-600/5',
    iconColor: 'text-emerald-600',
    badge: 'Novel',
  },
  {
    icon: WifiOff,
    titleKey: 'innovations.offline',
    descKey: 'innovations.offlineDesc',
    gradient: 'from-orange-500/10 to-orange-600/5',
    iconColor: 'text-orange-600',
    badge: 'Novel',
  },
  {
    icon: MapPin,
    titleKey: 'innovations.portability',
    descKey: 'innovations.portabilityDesc',
    gradient: 'from-teal-500/10 to-teal-600/5',
    iconColor: 'text-teal-600',
    badge: 'Novel',
  },
  {
    icon: Users,
    titleKey: 'innovations.community',
    descKey: 'innovations.communityDesc',
    gradient: 'from-pink-500/10 to-pink-600/5',
    iconColor: 'text-pink-600',
    badge: 'Novel',
  },
  {
    icon: Lightbulb,
    titleKey: 'innovations.explainability',
    descKey: 'innovations.explainabilityDesc',
    gradient: 'from-amber-500/10 to-amber-600/5',
    iconColor: 'text-amber-600',
    badge: 'AI',
  },
]

export function InnovationsGrid() {
  const { t } = useTranslation()

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-800" aria-labelledby="innovations-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2
            id="innovations-title"
            className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4"
          >
            {t('landing.innovationsTitle')}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            First-of-kind features that transform welfare delivery from reactive to proactive.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {innovations.map(({ icon: Icon, titleKey, descKey, gradient, iconColor, badge }) => (
            <Card
              key={titleKey}
              variant="interactive"
              className={`bg-gradient-to-br ${gradient} border-0 p-5`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2.5 bg-white dark:bg-slate-700 rounded-xl shadow-sm ${iconColor}`}>
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <span className="text-xs font-semibold bg-[#1e3a5f]/10 dark:bg-white/10 text-[#1e3a5f] dark:text-white px-2 py-0.5 rounded-full">
                  {badge}
                </span>
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 text-sm leading-snug">{t(titleKey)}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">{t(descKey)}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
