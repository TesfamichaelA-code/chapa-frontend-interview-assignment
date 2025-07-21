export interface User {
  id: string
  name: string
  email: string
  role: "user" | "admin" | "super_admin"
  avatar?: string
  isActive: boolean
  createdAt: string
}

export interface Transaction {
  id: string
  amount: number
  type: "credit" | "debit"
  description: string
  status: "completed" | "pending" | "failed"
  date: string
  recipient?: string
}

export interface WalletBalance {
  total: number
  available: number
  pending: number
}

export interface SystemStats {
  totalPayments: number
  activeUsers: number
  totalRevenue: number
  transactionsToday: number
}

export interface PaymentSummary {
  userId: string
  userName: string
  totalPayments: number
  totalAmount: number
  lastPayment: string
}
