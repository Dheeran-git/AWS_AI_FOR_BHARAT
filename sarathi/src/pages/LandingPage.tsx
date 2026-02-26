import { HeroSection } from '@/components/landing/HeroSection'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { InnovationsGrid } from '@/components/landing/InnovationsGrid'
import { ImpactStats } from '@/components/landing/ImpactStats'
import { Navbar } from '@/components/layout/Navbar'
import { OfflineBanner } from '@/components/layout/OfflineBanner'
import { useOfflineStatus } from '@/hooks/useOfflineStatus'

export function LandingPage() {
  useOfflineStatus()

  return (
    <div className="min-h-screen">
      <OfflineBanner />
      <Navbar variant="landing" />
      <main id="main-content">
        <HeroSection />
        <HowItWorks />
        <InnovationsGrid />
        <ImpactStats />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2">
            <img src="/sarathi-logo.svg" alt="" className="w-6 h-6 opacity-70" aria-hidden="true" />
            <span className="font-semibold text-white">Sarathi</span>
            <span>— AWS AI for Bharat Hackathon 2026</span>
          </div>
          <div>
            Built with ❤️ for India's welfare inclusion mission
          </div>
        </div>
      </footer>
    </div>
  )
}
