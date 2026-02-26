import { http, HttpResponse } from 'msw'
import dashboard from '../fixtures/panchayat-dashboard.json'

export const panchayatHandlers = [
  http.get('/api/panchayat/:panchayatId/dashboard', async () => {
    await new Promise((r) => setTimeout(r, 600))
    return HttpResponse.json(dashboard)
  }),

  http.get('/api/panchayat/:panchayatId/alerts', () => {
    return HttpResponse.json(dashboard.alerts)
  }),

  http.get('/api/panchayat/:panchayatId/performance', () => {
    return HttpResponse.json(dashboard.performance)
  }),

  http.post('/api/panchayat/:panchayatId/outreach', async () => {
    await new Promise((r) => setTimeout(r, 400))
    return HttpResponse.json({ success: true, message: 'Outreach initiated' })
  }),
]
