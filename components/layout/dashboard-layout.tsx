"use client"

import type React from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, Bell, Shield, Crown, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"
import { useState, useEffect } from "react"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [notifications] = useState(3) 

  useEffect(() => {
    setMounted(true)
  }, [])

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "super_admin":
        return "destructive"
      case "admin":
        return "secondary"
      default:
        return "default"
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "super_admin":
        return "Super Admin"
      case "admin":
        return "Admin"
      default:
        return "User"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "super_admin":
        return <Crown className="h-3 w-3" />
      case "admin":
        return <Shield className="h-3 w-3" />
      default:
        return <User className="h-3 w-3" />
    }
  }

  const getWelcomeMessage = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 17) return "Good afternoon"
    return "Good evening"
  }

  const handleLogout = () => {
    logout()
    
    setTimeout(() => {
      window.location.reload()
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md dark:bg-gray-800/80 shadow-sm">
        <div className="flex h-16 items-center px-6">
    
          <div className="flex items-center space-x-4">
            <Image
              src="/chapa-official-logo.png"
              alt="Chapa Dashboard"
              width={120}
              height={38}
              className="h-9 w-auto"
              priority
            />
            <div className="hidden sm:block">
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Dashboard</h1>
            </div>
          </div>

    
          <div className="ml-auto flex items-center space-x-4">
    
            <div className="hidden md:block text-sm text-gray-600 dark:text-gray-400">
              {getWelcomeMessage()}, {user?.name?.split(" ")[0]}!
            </div>

    
            <Badge
              variant={getRoleBadgeVariant(user?.role || "user")}
              className="flex items-center gap-1 animate-slide-in-right"
            >
              {getRoleIcon(user?.role || "user")}
              {getRoleLabel(user?.role || "user")}
            </Badge>

    
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center animate-pulse">
                  {notifications}
                </span>
              )}
            </Button>

    
            {mounted && (
              <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            )}

    
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-chapa-green text-chapa-green hover:bg-chapa-green hover:text-white bg-transparent"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

    
      <main className="p-6">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  )
}
