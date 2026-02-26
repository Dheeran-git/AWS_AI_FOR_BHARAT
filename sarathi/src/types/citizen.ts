export interface CitizenProfile {
  name: string
  age: number
  gender: 'male' | 'female' | 'other'
  state: string
  district: string
  panchayat: string
  preferredLanguage: string
  phone?: string
  // Household
  householdSize: number
  totalIncome: number
  caste: 'general' | 'obc' | 'sc' | 'st'
  disabilityStatus: boolean
  bplStatus: boolean
  // Special circumstances
  isWidow: boolean
  isMigrant: boolean
  isPregnant: boolean
  isElderly: boolean
}

export interface EligibilityResult {
  citizenId: string
  evaluationTimestamp: string
  eligibleSchemes: Scheme[]
  optimalBundles: BenefitBundle[]
  conflictsDetected: SchemeConflict[]
}

export interface Scheme {
  schemeId: string
  schemeName: string
  category: string
  benefitValue: number
  benefitType: 'one-time' | 'recurring' | 'in-kind'
  confidence: number
  eligibilityStatus: 'eligible' | 'ineligible' | 'needs_verification'
  explanation: {
    summary: string
    criteriaMatched: string[]
    criteriaUnmatched: string[]
    missingDocuments: string[]
  }
  trustScore: {
    approvalProbability: number
    estimatedProcessingDays: number
    communitySuccessRate: number
  }
  deadline?: string
  conflictsWith: string[]
}

export interface BenefitBundle {
  bundleId: string
  schemes: string[]
  totalValue: number
  coverageBreadth: number
  applicationEffort: 'low' | 'medium' | 'high'
  combinedProbability: number
  explanation: string
  schemeDetails?: Scheme[]
}

export interface SchemeConflict {
  schemeA: string
  schemeB: string
  conflictType: 'mutual_exclusion' | 'purpose_lock' | 'quota_limit'
  explanation: string
}
