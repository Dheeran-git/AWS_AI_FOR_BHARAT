import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import type { DashboardData } from '@/types/dashboard'

export function useDashboard(panchayatId: string) {
  return useQuery({
    queryKey: ['dashboard', panchayatId],
    queryFn: async () => {
      const res = await api.get<DashboardData>(`/panchayat/${panchayatId}/dashboard`)
      return res.data
    },
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: true,
  })
}
