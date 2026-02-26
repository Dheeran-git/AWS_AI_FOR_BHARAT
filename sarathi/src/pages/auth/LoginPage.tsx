import { useNavigate, useSearchParams } from 'react-router-dom'
import { User, Building2, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useSarathiStore } from '@/lib/store'
import { OfflineBanner } from '@/components/layout/OfflineBanner'
import { Navbar } from '@/components/layout/Navbar'

export function LoginPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { setUser } = useSarathiStore()

  const preselectedRole = searchParams.get('role')

  const handleCitizenLogin = () => {
    setUser({ id: 'citizen-demo', role: 'citizen', name: 'Demo Citizen' })
    navigate('/eligibility')
  }

  const handleOfficialLogin = () => {
    setUser({
      id: 'official-demo',
      role: 'panchayat_official',
      name: 'Ramesh Verma',
      panchayatId: 'UP-AGR-BAN-001',
      panchayatName: 'Banpur Gram Panchayat',
    })
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <OfflineBanner />
      <Navbar variant="landing" />
      <main id="main-content" className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-12">
        <div className="w-full max-w-lg">
          <div className="text-center mb-10">
            <img src="/sarathi-logo.svg" alt="" className="w-16 h-16 mx-auto mb-4" aria-hidden="true" />
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{t('auth.loginTitle')}</h1>
            <p className="text-slate-500">{t('auth.loginSubtitle')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Citizen card */}
            <button
              onClick={handleCitizenLogin}
              className={`group relative flex flex-col items-center p-8 rounded-2xl border-2 text-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] ${
                preselectedRole === 'citizen'
                  ? 'border-[#f59e0b] bg-amber-50 shadow-lg'
                  : 'border-slate-200 bg-white hover:border-[#f59e0b] hover:bg-amber-50 hover:shadow-md'
              }`}
              aria-label={`${t('auth.citizenRole')} — ${t('auth.citizenDesc')}`}
            >
              <div className="w-16 h-16 bg-[#1e3a5f]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#1e3a5f]/20 transition-colors">
                <User className="w-8 h-8 text-[#1e3a5f]" aria-hidden="true" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">{t('auth.citizenRole')}</h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">{t('auth.citizenDesc')}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1e3a5f] group-hover:gap-2.5 transition-all">
                {t('auth.continue')} <ArrowRight className="w-4 h-4" />
              </span>
              {preselectedRole === 'citizen' && (
                <span className="absolute top-3 right-3 text-xs bg-[#f59e0b] text-[#1e3a5f] font-bold px-2 py-0.5 rounded-full">
                  Selected
                </span>
              )}
            </button>

            {/* Official card */}
            <button
              onClick={handleOfficialLogin}
              className={`group relative flex flex-col items-center p-8 rounded-2xl border-2 text-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] ${
                preselectedRole === 'official'
                  ? 'border-[#1e3a5f] bg-blue-50 shadow-lg'
                  : 'border-slate-200 bg-white hover:border-[#1e3a5f] hover:bg-blue-50 hover:shadow-md'
              }`}
              aria-label={`${t('auth.officialRole')} — ${t('auth.officialDesc')}`}
            >
              <div className="w-16 h-16 bg-[#1e3a5f]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#1e3a5f]/20 transition-colors">
                <Building2 className="w-8 h-8 text-[#1e3a5f]" aria-hidden="true" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">{t('auth.officialRole')}</h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">{t('auth.officialDesc')}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1e3a5f] group-hover:gap-2.5 transition-all">
                {t('auth.continue')} <ArrowRight className="w-4 h-4" />
              </span>
              {preselectedRole === 'official' && (
                <span className="absolute top-3 right-3 text-xs bg-[#1e3a5f] text-white font-bold px-2 py-0.5 rounded-full">
                  Selected
                </span>
              )}
            </button>
          </div>

          <p className="text-center text-xs text-slate-400 mt-8">
            This is a demo of Sarathi. No real data is stored or processed.
          </p>
        </div>
      </main>
    </div>
  )
}
