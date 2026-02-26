import { setupWorker } from 'msw/browser'
import { citizenHandlers } from './handlers/citizens'
import { panchayatHandlers } from './handlers/panchayat'

export const worker = setupWorker(...citizenHandlers, ...panchayatHandlers)
