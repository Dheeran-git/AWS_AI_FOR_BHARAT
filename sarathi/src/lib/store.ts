import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CitizenProfile, EligibilityResult } from '@/types/citizen'

export type UserRole = 'citizen' | 'panchayat_official' | 'admin'

export interface AuthUser {
  id: string
  role: UserRole
  name: string
  panchayatId?: string
  panchayatName?: string
}

interface SarathiStore {
  // Auth
  user: AuthUser | null
  setUser: (user: AuthUser | null) => void
  logout: () => void

  // Citizen eligibility flow
  citizenProfile: Partial<CitizenProfile>
  updateCitizenProfile: (partial: Partial<CitizenProfile>) => void
  resetCitizenProfile: () => void
  eligibilityResult: EligibilityResult | null
  setEligibilityResult: (result: EligibilityResult | null) => void

  // UI
  selectedLanguage: string
  setLanguage: (lang: string) => void
  darkMode: boolean
  toggleDarkMode: () => void
  isOffline: boolean
  setOffline: (status: boolean) => void

  // Wizard step
  wizardStep: number
  setWizardStep: (step: number) => void
}

export const useSarathiStore = create<SarathiStore>()(
  persist(
    (set) => ({
      // Auth
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null, citizenProfile: {}, eligibilityResult: null, wizardStep: 1 }),

      // Citizen flow
      citizenProfile: {},
      updateCitizenProfile: (partial) =>
        set((state) => ({ citizenProfile: { ...state.citizenProfile, ...partial } })),
      resetCitizenProfile: () => set({ citizenProfile: {}, eligibilityResult: null, wizardStep: 1 }),
      eligibilityResult: null,
      setEligibilityResult: (result) => set({ eligibilityResult: result }),

      // UI
      selectedLanguage: 'en',
      setLanguage: (lang) => set({ selectedLanguage: lang }),
      darkMode: false,
      toggleDarkMode: () =>
        set((state) => {
          const next = !state.darkMode
          if (next) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
          return { darkMode: next }
        }),
      isOffline: false,
      setOffline: (status) => set({ isOffline: status }),

      wizardStep: 1,
      setWizardStep: (step) => set({ wizardStep: step }),
    }),
    {
      name: 'sarathi-store',
      partialize: (state) => ({
        user: state.user,
        selectedLanguage: state.selectedLanguage,
        darkMode: state.darkMode,
        citizenProfile: state.citizenProfile,
      }),
    }
  )
)
