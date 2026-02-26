import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CitizenLayout } from '@/components/layout/CitizenLayout'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Skeleton } from '@/components/ui/Skeleton'
import { useSarathiStore } from '@/lib/store'

// Lazy load pages for code splitting
const LandingPage = lazy(() =>
  import('@/pages/LandingPage').then((m) => ({ default: m.LandingPage }))
)
const LoginPage = lazy(() =>
  import('@/pages/auth/LoginPage').then((m) => ({ default: m.LoginPage }))
)
const EligibilityFlowPage = lazy(() =>
  import('@/pages/citizen/EligibilityFlowPage').then((m) => ({ default: m.EligibilityFlowPage }))
)
const EligibilityResultsPage = lazy(() =>
  import('@/pages/citizen/EligibilityResultsPage').then((m) => ({
    default: m.EligibilityResultsPage,
  }))
)
const DashboardHome = lazy(() =>
  import('@/pages/dashboard/DashboardHome').then((m) => ({ default: m.DashboardHome }))
)

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-64 space-y-3">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  )
}

// Guard for protected routes
function RequireAuth({ children, role }: { children: React.ReactNode; role?: string }) {
  const { user } = useSarathiStore()
  if (!user) return <Navigate to="/login" replace />
  if (role && user.role !== role) return <Navigate to="/" replace />
  return <>{children}</>
}

export default function App() {
  const { darkMode } = useSarathiStore()

  // Restore dark mode on mount
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Citizen flow — uses CitizenLayout (mobile-first) */}
          <Route element={<CitizenLayout />}>
            <Route
              path="/eligibility"
              element={
                <RequireAuth>
                  <EligibilityFlowPage />
                </RequireAuth>
              }
            />
            <Route
              path="/eligibility/results"
              element={
                <RequireAuth>
                  <EligibilityResultsPage />
                </RequireAuth>
              }
            />
          </Route>

          {/* Panchayat Dashboard — uses DashboardLayout (sidebar) */}
          <Route
            path="/dashboard"
            element={
              <RequireAuth role="panchayat_official">
                <DashboardLayout />
              </RequireAuth>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="alerts" element={<DashboardHome />} />
            <Route path="outreach" element={<DashboardHome />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
