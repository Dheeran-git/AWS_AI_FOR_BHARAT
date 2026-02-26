import { http, HttpResponse } from 'msw'
import eligibilityResult from '../fixtures/eligibility-result.json'

export const citizenHandlers = [
  http.post('/api/citizens/register', async () => {
    await new Promise((r) => setTimeout(r, 800))
    return HttpResponse.json({
      citizen_id: 'mock-citizen-001',
      status: 'success',
      message: 'Registration successful',
      next_steps: ['Upload income certificate', 'Visit Panchayat for verification'],
      eligible_schemes_count: 8,
      estimated_benefit_value: 724000,
    })
  }),

  http.get('/api/citizens/:citizenId/eligibility', async () => {
    await new Promise((r) => setTimeout(r, 1200))
    return HttpResponse.json(eligibilityResult)
  }),

  http.get('/api/citizens/:citizenId', () => {
    return HttpResponse.json({
      citizen_id: 'mock-citizen-001',
      name: 'Savitri Devi',
      phone: '+91-9876543210',
      preferred_language: 'hi',
      location: { state: 'Uttar Pradesh', district: 'Agra', panchayat: 'Banpur' },
    })
  }),
]
