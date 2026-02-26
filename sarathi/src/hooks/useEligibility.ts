import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { useSarathiStore } from '@/lib/store'
import type { CitizenProfile, EligibilityResult } from '@/types/citizen'

export function useCheckEligibility() {
  const { setEligibilityResult } = useSarathiStore()

  return useMutation({
    mutationFn: async (profile: Partial<CitizenProfile>) => {
      // Register citizen first
      const regRes = await api.post('/citizens/register', {
        name: profile.name,
        age: profile.age,
        gender: profile.gender,
        location: {
          state: profile.state,
          district: profile.district,
          panchayat: profile.panchayat,
        },
        household: {
          member_count: profile.householdSize,
          total_income: (profile.totalIncome ?? 0) * 12,
        },
        attributes: {
          caste: profile.caste,
          disability_status: profile.disabilityStatus,
          bpl_status: profile.bplStatus,
        },
        preferred_language: profile.preferredLanguage ?? 'en',
      })

      const citizenId: string = regRes.data.citizen_id

      // Then fetch eligibility
      const eligRes = await api.get<EligibilityResult>(
        `/citizens/${citizenId}/eligibility`,
        { params: { include_conflicts: true, include_explanations: true } }
      )
      return eligRes.data
    },
    onSuccess: (data) => {
      setEligibilityResult(data)
    },
  })
}
