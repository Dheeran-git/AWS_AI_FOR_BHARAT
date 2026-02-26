import { Globe, Moon, Sun, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSarathiStore } from '@/lib/store'
import { Button } from '@/components/ui/Button'
import { INDIAN_LANGUAGES } from '@/lib/utils'

interface NavbarProps {
  variant?: 'landing' | 'app'
}

export function Navbar({ variant = 'landing' }: NavbarProps) {
  const { user, logout, darkMode, toggleDarkMode, selectedLanguage, setLanguage } = useSarathiStore()
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleLangChange = (code: string) => {
    setLanguage(code)
    i18n.changeLanguage(code)
    setLangOpen(false)
  }

  return (
    <nav
      aria-label="Main navigation"
      className={
        variant === 'landing'
          ? 'bg-[#1e3a5f] text-white sticky top-0 z-40 shadow-lg'
          : 'bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700 sticky top-0 z-40 shadow-sm'
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 font-bold text-xl"
            aria-label="Sarathi Home"
          >
            <img src="/sarathi-logo.svg" alt="" className="w-8 h-8" aria-hidden="true" />
            <span className={variant === 'landing' ? 'text-white' : 'text-[#1e3a5f] dark:text-white'}>
              Sarathi
            </span>
          </Link>

          {/* Desktop right actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  variant === 'landing'
                    ? 'text-white/80 hover:text-white hover:bg-white/10'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
                aria-label={t('common.language')}
                aria-expanded={langOpen}
              >
                <Globe className="w-4 h-4" aria-hidden="true" />
                <span>{INDIAN_LANGUAGES.find((l) => l.code === selectedLanguage)?.name.split(' ')[0] ?? 'EN'}</span>
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 py-2 z-50">
                  {INDIAN_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLangChange(lang.code)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${
                        selectedLanguage === lang.code ? 'text-[#1e3a5f] dark:text-amber-400 font-semibold' : 'text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-xl transition-colors ${
                variant === 'landing'
                  ? 'text-white/80 hover:text-white hover:bg-white/10'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
              aria-label={t('common.darkMode')}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Auth actions */}
            {user ? (
              <div className="flex items-center gap-3">
                <span className={`text-sm font-medium ${variant === 'landing' ? 'text-white/90' : 'text-slate-700 dark:text-slate-200'}`}>
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                    variant === 'landing'
                      ? 'text-white/80 hover:text-white'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  aria-label={t('nav.logout')}
                >
                  <LogOut className="w-4 h-4" />
                  {t('nav.logout')}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="accent"
                  size="sm"
                  onClick={() => navigate('/login')}
                >
                  {t('nav.checkEligibility')}
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#1e3050] border-t border-white/10 px-4 py-4 space-y-3">
          <Button variant="accent" size="sm" className="w-full" onClick={() => { navigate('/login'); setMobileOpen(false) }}>
            {t('nav.checkEligibility')}
          </Button>
          <button
            onClick={toggleDarkMode}
            className="w-full flex items-center justify-center gap-2 text-white/80 hover:text-white text-sm py-2"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          {user && (
            <button onClick={handleLogout} className="w-full text-center text-white/80 text-sm py-2">
              {t('nav.logout')}
            </button>
          )}
        </div>
      )}
    </nav>
  )
}
