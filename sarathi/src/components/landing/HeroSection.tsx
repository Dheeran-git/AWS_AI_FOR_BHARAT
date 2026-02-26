import { ArrowRight, Mic, LayoutDashboard } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/Button'

export function HeroSection() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <section
      className="relative bg-gradient-to-br from-[#1e3a5f] via-[#243f6a] to-[#0f1f35] text-white overflow-hidden"
      aria-label="Hero"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-[#f59e0b] blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-blue-400 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm font-medium mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 bg-[#f59e0b] rounded-full animate-pulse" aria-hidden="true" />
            AWS AI for Bharat Hackathon 2026
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
            {t('landing.heroTitle')}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('landing.heroSubtitle')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="accent"
              size="lg"
              onClick={() => navigate('/login?role=citizen')}
              rightIcon={<ArrowRight className="w-5 h-5" />}
              leftIcon={<Mic className="w-5 h-5" />}
              aria-label="Check welfare eligibility as a citizen"
            >
              {t('landing.ctaCitizen')}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/login?role=official')}
              rightIcon={<LayoutDashboard className="w-5 h-5" />}
              className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent"
              aria-label="Access Panchayat Dashboard"
            >
              {t('landing.ctaPanchayat')}
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-8 text-white/60 text-sm">
            <span className="flex items-center gap-2">
              <span className="text-[#f59e0b] font-bold text-lg">22+</span> Indian Languages
            </span>
            <span className="w-px h-4 bg-white/20" aria-hidden="true" />
            <span className="flex items-center gap-2">
              <span className="text-[#f59e0b] font-bold text-lg">700+</span> Welfare Schemes
            </span>
            <span className="w-px h-4 bg-white/20" aria-hidden="true" />
            <span className="flex items-center gap-2">
              <span className="text-[#f59e0b] font-bold text-lg">100M+</span> Citizens Served
            </span>
            <span className="w-px h-4 bg-white/20" aria-hidden="true" />
            <span>Powered by AWS AI</span>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L1440 0V60H0Z" fill="#f8fafc" />
        </svg>
      </div>
    </section>
  )
}
