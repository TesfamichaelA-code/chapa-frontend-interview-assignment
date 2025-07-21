"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LoginForm } from "@/components/auth/login-form"
import {
  ArrowRight,
  Shield,
  Zap,
  Globe,
  Users,
  CreditCard,
  CheckCircle,
  Star,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Target,
  Lightbulb,
  Code,
  Building,
  Award,
  Rocket,
  Sun,
  Moon,
} from "lucide-react"
import Image from "next/image"
import { useTheme } from "next-themes"

export function LandingPage() {
  const [showLogin, setShowLogin] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (showLogin) {
    return <LoginForm onBack={() => setShowLogin(false)} />
  }

  const coreValues = [
    {
      icon: <Target className="h-8 w-8 text-chapa-green" />,
      title: "Empower",
      description:
        "You own a business? We want to see how far we can go with you. Empowering businesses to reach their full potential.",
      number: "1",
    },
    {
      icon: <Zap className="h-8 w-8 text-chapa-green" />,
      title: "Enable",
      description:
        "Discover where and how to leverage our system. Our aim is to provide you with the optimal solution.",
      number: "2",
    },
    {
      icon: <Code className="h-8 w-8 text-chapa-green" />,
      title: "Develop",
      description: "Develop with us, learn with us. We are endeavoring to create the best for all.",
      number: "3",
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-chapa-green" />,
      title: "Innovate",
      description: "Create and build upon your growth. We embrace innovation, and we are passionate about it.",
      number: "4",
    },
  ]

  const services = [
    {
      icon: <CreditCard className="h-8 w-8 text-chapa-green" />,
      title: "Payment Gateways",
      description: "Secure, reliable payment processing for businesses of all sizes across Ethiopia and beyond.",
    },
    {
      icon: <Globe className="h-8 w-8 text-chapa-green" />,
      title: "APIs & Integration",
      description: "Comprehensive APIs and developer tools to integrate payments seamlessly into your applications.",
    },
    {
      icon: <Shield className="h-8 w-8 text-chapa-green" />,
      title: "Bill Aggregator Solutions",
      description: "Streamlined bill payment solutions with comprehensive financial data and secure methods.",
    },
    {
      icon: <Building className="h-8 w-8 text-chapa-green" />,
      title: "Payment Equipment",
      description: "Modern payment applications and equipment for smooth business transactions anywhere.",
    },
  ]

  const testimonials = [
    {
      name: "Meron Tadesse",
      role: "CEO, EthioTech Solutions",
      content:
        "Chapa has revolutionized how Ethiopian businesses handle payments. The local understanding combined with global standards is exactly what we needed.",
      rating: 5,
      avatar: "MT",
    },
    {
      name: "Daniel Kifle",
      role: "Founder, Addis Marketplace",
      content:
        "Finally, a payment solution built by Ethiopians for Ethiopians. The integration was seamless and support is outstanding.",
      rating: 5,
      avatar: "DK",
    },
    {
      name: "Sara Bekele",
      role: "Finance Director, Horn Enterprises",
      content:
        "Chapa's commitment to security and innovation gives us confidence. They truly understand the challenges of developing markets.",
      rating: 5,
      avatar: "SB",
    },
  ]

  const stats = [
    { label: "Years of Innovation", value: "4+", icon: <Award className="h-6 w-6" />, since: "Since 2020" },
    { label: "Ethiopian Businesses", value: "1000+", icon: <Building className="h-6 w-6" />, since: "And Growing" },
    { label: "Team Members", value: "50+", icon: <Users className="h-6 w-6" />, since: "Home-grown Talent" },
    { label: "Uptime Guarantee", value: "99.9%", icon: <Shield className="h-6 w-6" />, since: "Always Available" },
  ]

  const keyTeamMembers = [
    { name: "Israel Goytom", role: "Co-founder - TechnoKing", avatar: "IG" },
    { name: "Nael Hailemariam", role: "Co-founder - CEO", avatar: "NH" },
    { name: "Tesfaye Hailemikael", role: "Board Chairman", avatar: "TH" },
    { name: "Kidus Yared", role: "Engineering Lead", avatar: "KY" },
    { name: "Bilen Gizachew", role: "Product Manager", avatar: "BG" },
    { name: "Helina Zeleke", role: "Director of Customer Service", avatar: "HZ" },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/95 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
      
            <div className="flex items-center">
              <Image
                src="/chapa-official-logo.png"
                alt="Chapa - Ethiopian Payment Gateway"
                width={140}
                height={45}
                className="h-10 w-auto"
                priority
              />
              <div className="hidden lg:block ml-4 text-sm text-gray-600 dark:text-gray-400 border-l border-gray-300 dark:border-gray-600 pl-4">
                Ethiopian Financial Service & Data Engineering
              </div>
            </div>

      
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-gray-600 hover:text-chapa-green transition-colors font-medium">
                About
              </a>
              <a href="#services" className="text-gray-600 hover:text-chapa-green transition-colors font-medium">
                Services
              </a>
              <a href="#values" className="text-gray-600 hover:text-chapa-green transition-colors font-medium">
                Our Values
              </a>
              <a href="#team" className="text-gray-600 hover:text-chapa-green transition-colors font-medium">
                Team
              </a>
      
              {mounted && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="text-gray-600 hover:text-chapa-green"
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => setShowLogin(true)}
                className="border-chapa-green text-chapa-green hover:bg-chapa-green hover:text-white transition-all duration-200"
              >
                Sign In
              </Button>
              <Button
                onClick={() => setShowLogin(true)}
                className="bg-chapa-green hover:bg-chapa-green/90 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Get Started
              </Button>
            </div>

      
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

      
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 animate-slide-in-left bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
              <div className="flex flex-col space-y-4">
                <a
                  href="#about"
                  className="text-gray-600 hover:text-chapa-green transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </a>
                <a
                  href="#services"
                  className="text-gray-600 hover:text-chapa-green transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Services
                </a>
                <a
                  href="#values"
                  className="text-gray-600 hover:text-chapa-green transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Our Values
                </a>
                <a
                  href="#team"
                  className="text-gray-600 hover:text-chapa-green transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Team
                </a>
      
                {mounted && (
                  <Button
                    variant="ghost"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="justify-start text-gray-600 hover:text-chapa-green"
                  >
                    {theme === "dark" ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </Button>
                )}
                <div className="flex flex-col space-y-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowLogin(true)
                      setMobileMenuOpen(false)
                    }}
                    className="border-chapa-green text-chapa-green hover:bg-chapa-green hover:text-white"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => {
                      setShowLogin(true)
                      setMobileMenuOpen(false)
                    }}
                    className="bg-chapa-green hover:bg-chapa-green/90 text-white"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%2393C5FD fillOpacity=0.05%3E%3Ccircle cx=30 cy=30 r=2/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-in-left">
              <div className="space-y-6">
                <Badge className="bg-chapa-green/10 text-chapa-green border-chapa-green/20 hover:bg-chapa-green/20 px-4 py-2 text-sm font-medium">
                  🇪🇹 Proudly Ethiopian • Est. 2020 • Addis Ababa
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  Why{" "}
                  <span className="text-chapa-green bg-gradient-to-r from-chapa-green to-green-400 bg-clip-text text-transparent">
                    Chapa?
                  </span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                  Simple to connect with the youth through a deeper yet light-spirited humor - a vernacular term for
                  'Money'. Ethiopia's leading online payment gateway enabling businesses to accept digital payments from
                  anyone, anywhere, anytime.
                </p>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-xl border-l-4 border-chapa-green shadow-sm">
                  <p className="text-gray-700 dark:text-gray-300 italic text-lg">
                    "Giving you the safest, quickest, and most modern approach to make and receive payments to and from
                    anywhere in the world."
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => setShowLogin(true)}
                  className="bg-chapa-green hover:bg-chapa-green/90 text-white px-8 py-4 text-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-chapa-green text-chapa-green hover:bg-chapa-green hover:text-white px-8 py-4 text-lg font-medium bg-white/80 backdrop-blur-sm transition-all duration-200"
                >
                  Contact Now
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-chapa-green" />
                  Home-grown Engineers
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-chapa-green" />
                  Ethiopian-built
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-chapa-green" />
                  Global Standards
                </div>
              </div>
            </div>

            <div className="relative animate-slide-in-right">
              <div className="relative z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Image src="/chapa-official-logo.png" alt="Chapa" width={80} height={25} className="h-6 w-auto" />
                      <span className="text-lg font-semibold text-gray-900 dark:text-white">Dashboard</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 animate-pulse">
                      Live
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Today's Revenue</p>
                      <p className="text-2xl font-bold text-chapa-green">ETB 285,450</p>
                      <p className="text-xs text-green-600 dark:text-green-400">↗ +12.5%</p>
                    </div>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Transactions</p>
                      <p className="text-2xl font-bold text-chapa-green">1,247</p>
                      <p className="text-xs text-green-600 dark:text-green-400">↗ +8.2%</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: "Payment from Meron's Shop", amount: "+ETB 2,500", time: "2 min ago", type: "credit" },
                      { name: "Transfer to Daniel's Store", amount: "-ETB 1,200", time: "5 min ago", type: "debit" },
                      { name: "Mobile Money Payment", amount: "+ETB 850", time: "1 hour ago", type: "credit" },
                    ].map((transaction, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-2 h-2 rounded-full ${transaction.type === "credit" ? "bg-green-500" : "bg-red-500"}`}
                          ></div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white text-sm">{transaction.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{transaction.time}</p>
                          </div>
                        </div>
                        <p
                          className={`font-semibold text-sm ${
                            transaction.amount.startsWith("+")
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {transaction.amount}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-chapa-green/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-16 bg-white dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center space-y-3 animate-fade-in group hover:scale-105 transition-transform duration-200"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center text-chapa-green group-hover:scale-110 transition-transform duration-200">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-gray-900 dark:text-white font-medium">{stat.label}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.since}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">Chapa's Prime Focus</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Established in 2020 and headquartered in Addis Ababa, Ethiopia by a team of home-grown engineers,
              researchers, and entrepreneurs. The inevitable increase in global trade which has been visibly troubled by
              inconvenient payment methods served as the strongest initiative behind the establishment of Chapa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="p-3 bg-chapa-green/10 rounded-xl group-hover:bg-chapa-green/20 transition-colors duration-200">
                    <Target className="h-6 w-6 text-chapa-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-lg">Resolve Payment Issues</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      Addressing payment and transaction issues that are prevalent in developing countries with
                      innovative solutions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="p-3 bg-chapa-green/10 rounded-xl group-hover:bg-chapa-green/20 transition-colors duration-200">
                    <Lightbulb className="h-6 w-6 text-chapa-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-lg">Explore Opportunities</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      Exploring novel and untapped business opportunities in collaboration with our customers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="p-3 bg-chapa-green/10 rounded-xl group-hover:bg-chapa-green/20 transition-colors duration-200">
                    <Rocket className="h-6 w-6 text-chapa-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-lg">Empower Growth</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      Empowering businesses and developers with comprehensive financial solutions and tools.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <Image src="/chapa-official-logo.png" alt="Chapa" width={100} height={32} className="h-8 w-auto" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Sense of Duty</h3>
              </div>
              <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  Chapa stands firmly on its foundational morals and values, which drive its mission. The company is
                  committed to upholding the <strong className="text-chapa-green">security and privacy</strong> of our
                  customers, ensuring their trust remains paramount.
                </p>
                <p>
                  Moreover, the spirit of <strong className="text-chapa-green">loyalty</strong> extends not only within
                  the team but also towards all external parties. Lastly, the pursuit of{" "}
                  <strong className="text-chapa-green">quality</strong> remains a core principle guiding Chapa's
                  endeavors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section id="values" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">Our Core Values</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              The four pillars that guide everything we do at Chapa
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 animate-scale-in relative overflow-hidden group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute top-4 right-4 w-8 h-8 bg-chapa-green/10 rounded-full flex items-center justify-center group-hover:bg-chapa-green/20 transition-colors duration-200">
                  <span className="text-chapa-green font-bold text-sm">{value.number}</span>
                </div>
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-full w-fit group-hover:scale-110 transition-transform duration-200">
                    {value.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600 dark:text-gray-400 leading-relaxed">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      
      <section id="services" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">Our Services</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Chapa empowers emerging companies and developers with a comprehensive range of financial services and
              solutions designed for the Ethiopian market.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 animate-scale-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-full w-fit group-hover:scale-110 transition-transform duration-200">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600 dark:text-gray-400 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Image src="/chapa-official-logo.png" alt="Chapa" width={80} height={25} className="h-6 w-auto" />
                <span className="text-lg font-semibold text-gray-900 dark:text-white">Promise</span>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Gain access to comprehensive financial data, secure payment methods, and Bill Aggregator Solutions.
                We're here to assist you whenever you need smooth business transactions, exploring novel and untapped
                business prospects together with our customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      
      <section id="team" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">Meet The Team</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Home-grown engineers, researchers, and entrepreneurs building the future of payments in Ethiopia
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {keyTeamMembers.map((member, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-scale-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-chapa-green text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                    {member.avatar}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">{member.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              And many more talented individuals working together to revolutionize payments in Ethiopia
            </p>
            <Badge className="bg-chapa-green/10 text-chapa-green border-chapa-green/20 px-4 py-2">
              50+ Team Members Strong 🇪🇹
            </Badge>
          </div>
        </div>
      </section>

      
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              Trusted by Ethiopian Businesses
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              See what our customers have to say about their experience with Chapa
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 animate-slide-in-left group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 italic leading-relaxed">"{testimonial.content}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-chapa-green text-white rounded-full flex items-center justify-center font-semibold group-hover:scale-110 transition-transform duration-200">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-20 bg-gradient-to-r from-chapa-green to-green-400 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%23ffffff fillOpacity=0.1%3E%3Ccircle cx=30 cy=30 r=2/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
          <div className="space-y-8 text-white">
            <div className="flex justify-center mb-6">
              <Image
                src="/chapa-official-logo.png"
                alt="Chapa"
                width={160}
                height={50}
                className="h-12 w-auto brightness-0 invert"
              />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold">Ready to Join the Chapa Family?</h2>
            <p className="text-xl opacity-90 leading-relaxed">
              Join thousands of Ethiopian businesses already using Chapa to grow their revenue and streamline their
              payments. Built by Ethiopians, for Ethiopians.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => setShowLogin(true)}
                className="bg-white text-chapa-green hover:bg-gray-100 px-8 py-4 text-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-chapa-green px-8 py-4 text-lg font-medium bg-transparent backdrop-blur-sm transition-all duration-200"
              >
                Contact Our Team
              </Button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm opacity-80">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Ethiopian-built solution
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Local support team
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Global standards
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Image
                src="/chapa-official-logo.png"
                alt="Chapa"
                width={140}
                height={45}
                className="h-10 w-auto brightness-0 invert"
              />
              <p className="text-gray-400 leading-relaxed">
                Ethiopia's leading online payment gateway enabling businesses to accept digital payments from anyone,
                anywhere, anytime. Built by home-grown engineers since 2020.
              </p>
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white p-2 hover:bg-gray-800 transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white p-2 hover:bg-gray-800 transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white p-2 hover:bg-gray-800 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white p-2 hover:bg-gray-800 transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors hover:underline">
                    Payment Gateways
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors hover:underline">
                    Mobile Money Integration
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors hover:underline">
                    API Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors hover:underline">
                    Bill Aggregator Solutions
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors hover:underline">
                    About Chapa
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors hover:underline">
                    Our Team
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors hover:underline">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors hover:underline">
                    Our Memories
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">Contact</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-chapa-green" />
                  Addis Ababa, Ethiopia
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-chapa-green" />
                  hello@chapa.co
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-chapa-green" />
                  +251 911 123 456
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 Chapa. All rights reserved. Proudly Ethiopian 🇪🇹</p>
            <div className="flex space-x-6 text-sm text-gray-400 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors hover:underline">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors hover:underline">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors hover:underline">
                Security
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
