import { useEffect } from 'react'
import { useSarathiStore } from '@/lib/store'

export function useOfflineStatus() {
  const { isOffline, setOffline } = useSarathiStore()

  useEffect(() => {
    const handleOnline = () => setOffline(false)
    const handleOffline = () => setOffline(true)

    setOffline(!navigator.onLine)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [setOffline])

  return { isOffline }
}
