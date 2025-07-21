"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Eye, EyeOff, Shield, CheckCircle, ArrowLeft } from "lucide-react"
import Image from "next/image"

interface LoginFormProps {
  onBack?: () => void
}

export function LoginForm({ onBack }: LoginFormProps = {}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null)
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const { login } = useAuth()
  const { toast } = useToast()

  // Real-time validation
  useEffect(() => {
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address")
    } else {
      setEmailError("")
    }
  }, [email])

  useEffect(() => {
    if (password && password.length < 6) {
      setPasswordError("Password must be at least 6 characters")
    } else {
      setPasswordError("")
    }
  }, [password])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    
    if (!email || !password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    if (emailError || passwordError) {
      toast({
        title: "Invalid Input",
        description: "Please correct the errors before submitting.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      await login(email, password)
      toast({
        title: "Welcome to Chapa! 🎉",
        description: "You have successfully logged in to your dashboard.",
        className: "success-pulse",
      })
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Invalid email or password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const demoCredentials = [
    {
      role: "User",
      email: "user@chapa.co",
      password: "user123",
      description: "Access user dashboard with wallet and transactions",
      icon: "👤",
    },
    {
      role: "Admin",
      email: "admin@chapa.co",
      password: "admin123",
      description: "Manage users and view payment analytics",
      icon: "👨‍💼",
    },
    {
      role: "Super Admin",
      email: "superadmin@chapa.co",
      password: "super123",
      description: "Full system control and admin management",
      icon: "🔐",
    },
  ]

  const fillDemoCredentials = (demo: (typeof demoCredentials)[0]) => {
    setSelectedDemo(demo.email)
    setEmail(demo.email)
    setPassword(demo.password)
    setTimeout(() => setSelectedDemo(null), 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="w-full max-w-md space-y-6 animate-scale-in">
        
        {onBack && (
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-chapa-green mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        )}

        
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-6">
            <Image
              src="/chapa-official-logo.png"
              alt="Chapa - Ethiopian Payment Gateway"
              width={140}
              height={45}
              className="h-12 w-auto"
              priority
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome Back</h1>
            <p className="text-gray-600 dark:text-gray-400">Sign in to your Chapa dashboard</p>
          </div>
        </div>

        
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl font-semibold text-center">Sign In</CardTitle>
            <CardDescription className="text-center">Enter your credentials to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`pr-10 transition-all duration-200 ${
                      emailError
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : email && !emailError
                          ? "border-green-500 focus:border-green-500 focus:ring-green-500"
                          : ""
                    }`}
                    required
                  />
                  {email && !emailError && (
                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                  )}
                </div>
                {emailError && <p className="text-xs text-red-500 animate-slide-in-left">{emailError}</p>}
              </div>

        
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`pr-10 transition-all duration-200 ${
                      passwordError
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : password && !passwordError
                          ? "border-green-500 focus:border-green-500 focus:ring-green-500"
                          : ""
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {passwordError && <p className="text-xs text-red-500 animate-slide-in-left">{passwordError}</p>}
              </div>

        
              <Button
                type="submit"
                className="w-full bg-chapa-green hover:bg-chapa-green/90 text-white font-medium py-2.5 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                disabled={isLoading || !!emailError || !!passwordError}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

        
            <div className="text-center">
              <button className="text-sm text-chapa-green hover:underline transition-colors">
                Forgot your password?
              </button>
            </div>
          </CardContent>
        </Card>

        
        <Card className="shadow-lg border-0 bg-white/60 backdrop-blur-sm dark:bg-gray-800/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Shield className="h-4 w-4 text-chapa-green" />
              Demo Credentials
            </CardTitle>
            <CardDescription className="text-xs">Click any credential below to auto-fill the form</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {demoCredentials.map((cred, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-md hover:scale-[1.02] ${
                  selectedDemo === cred.email
                    ? "border-chapa-green bg-green-50 dark:bg-green-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-chapa-green/50"
                }`}
                onClick={() => fillDemoCredentials(cred)}
              >
                <div className="flex items-start gap-3">
                  <span className="text-lg">{cred.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm text-gray-900 dark:text-white">{cred.role}</span>
                      {selectedDemo === cred.email && (
                        <CheckCircle className="h-4 w-4 text-chapa-green animate-scale-in" />
                      )}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{cred.description}</p>
                    <div className="space-y-1">
                      <div className="text-xs font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        📧 {cred.email}
                      </div>
                      <div className="text-xs font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        🔑 {cred.password}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        
        <div className="text-center text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <p>🔒 This is a demo application for interview purposes</p>
          <p>All data is simulated and no real transactions occur</p>
        </div>
      </div>
    </div>
  )
}
