"use client"

import { useAuth } from "@/contexts/auth-context"
import { LandingPage } from "@/components/landing/landing-page"
import { UserDashboard } from "@/components/dashboards/user-dashboard"
import { AdminDashboard } from "@/components/dashboards/admin-dashboard"
import { SuperAdminDashboard } from "@/components/dashboards/super-admin-dashboard"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default function HomePage() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-white">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-chapa-green mx-auto"></div>
          <p className="text-gray-600">Loading Chapa Dashboard...</p>
        </div>
      </div>
    )
  }

  // Show landing page if user is not logged in
  if (!user) {
    return <LandingPage />
  }

  
  const renderDashboard = () => {
    switch (user.role) {
      case "user":
        return <UserDashboard />
      case "admin":
        return <AdminDashboard />
      case "super_admin":
        return <SuperAdminDashboard />
      default:
        return <UserDashboard />
    }
  }

  return <DashboardLayout>{renderDashboard()}</DashboardLayout>
}
