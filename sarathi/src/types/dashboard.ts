export interface DashboardData {
  panchayatId: string
  panchayatName: string
  generatedAt: string
  summary: {
    totalHouseholds: number
    enrolledHouseholds: number
    invisibleCitizens: number
    pendingApplications: number
    totalBenefitsSecured: number
  }
  alerts: DashboardAlert[]
  lifeEvents: LifeEventEntry[]
  performance: PerformanceMetrics
  invisibleCitizens: InvisibleCitizen[]
}

export interface DashboardAlert {
  alertId: string
  alertType: 'newly_eligible' | 'life_event' | 'deadline' | 'invisible_citizen'
  priority: 'high' | 'medium' | 'low'
  citizenId: string
  citizenName: string
  details: string
  eligibleSchemes: string[]
  potentialBenefitValue: number
  actionRequired: string
  deadline?: string
}

export interface LifeEventEntry {
  eventId: string
  eventType: string
  citizenId: string
  citizenName: string
  eventDate: string
  triggeredSchemes: string[]
  outreachStatus: 'pending' | 'contacted' | 'enrolled'
}

export interface PerformanceMetrics {
  deliverySuccessRate: number
  averageProcessingDays: number
  citizenSatisfaction: number
  validationRate: number
  performanceIndex: number
  districtRank: number
  stateRank: number
}

export interface InvisibleCitizen {
  citizenId: string
  name: string
  village: string
  vulnerabilityScore: number
  eligibleSchemesCount: number
  potentialBenefitValue: number
  outreachStatus: 'pending' | 'contacted' | 'enrolled'
  zeroBenefitDays: number
}
