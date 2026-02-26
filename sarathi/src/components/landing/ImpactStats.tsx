import { useTranslation } from 'react-i18next'

const stats = [
  { valueKey: 'landing.stat1', descKey: 'landing.stat1Desc' },
  { valueKey: 'landing.stat2', descKey: 'landing.stat2Desc' },
  { valueKey: 'landing.stat3', descKey: 'landing.stat3Desc' },
  { valueKey: 'landing.stat4', descKey: 'landing.stat4Desc' },
]

export function ImpactStats() {
  const { t } = useTranslation()

  return (
    <section
      className="py-20 bg-[#1e3a5f] text-white"
      aria-labelledby="impact-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2
            id="impact-title"
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            {t('landing.impactTitle')}
          </h2>
          <p className="text-white/70 text-lg">
            Measurable outcomes for citizens and administrators
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ valueKey, descKey }) => (
            <div key={valueKey} className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-[#f59e0b] mb-3">
                {t(valueKey)}
              </div>
              <p className="text-white/70 text-sm sm:text-base leading-snug">{t(descKey)}</p>
            </div>
          ))}
        </div>

        {/* AWS badge */}
        <div className="mt-16 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-2xl px-6 py-4 backdrop-blur-sm">
            <div className="bg-[#f59e0b] text-[#1e3a5f] font-bold text-xs px-2.5 py-1 rounded-lg">
              AWS
            </div>
            <span className="text-white/90 text-sm font-medium">
              Built on Amazon Web Services — Neptune, Bedrock, Lex, Lambda, DynamoDB
            </span>
          </div>
          <p className="text-white/50 text-xs">
            Sarathi is India's first AI-powered welfare delivery engine — designed for the poorest, the illiterate, and the invisible.
          </p>
        </div>
      </div>
    </section>
  )
}
