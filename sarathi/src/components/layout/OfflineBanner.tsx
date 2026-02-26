import { WifiOff } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useSarathiStore } from '@/lib/store'

export function OfflineBanner() {
  const { isOffline } = useSarathiStore()
  const { t } = useTranslation()

  if (!isOffline) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="w-full bg-amber-500 text-white px-4 py-2 flex items-center justify-center gap-2 text-sm font-medium z-50"
    >
      <WifiOff className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
      <span>{t('common.offline')}</span>
    </div>
  )
}
