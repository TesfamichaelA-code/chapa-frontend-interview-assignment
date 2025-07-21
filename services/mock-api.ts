import type { User, Transaction, WalletBalance, SystemStats, PaymentSummary } from "@/types"


const mockUsers: User[] = [
  {
    id: "1",
    name: "Dawit Tesfaye",
    email: "user@chapa.co",
    role: "user",
    isActive: true,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Hanan Bekele",
    email: "admin@chapa.co",
    role: "admin",
    isActive: true,
    createdAt: "2024-01-10",
  },
  {
    id: "3",
    name: "Yohannes Girma",
    email: "superadmin@chapa.co",
    role: "super_admin",
    isActive: true,
    createdAt: "2024-01-01",
  },
  {
    id: "4",
    name: "Almaz Haile",
    email: "almaz@example.com",
    role: "user",
    isActive: true,
    createdAt: "2024-02-01",
  },
  {
    id: "5",
    name: "Bereket Wolde",
    email: "bereket@example.com",
    role: "user",
    isActive: false,
    createdAt: "2024-02-05",
  },
]

const mockTransactions: Transaction[] = [
  {
    id: "1",
    amount: 1500.0,
    type: "credit",
    description: "Payment received from Almaz Haile",
    status: "completed",
    date: "2024-01-20",
    recipient: "Almaz Haile",
  },
  {
    id: "2",
    amount: 250.0,
    type: "debit",
    description: "Transfer to Bereket Wolde",
    status: "completed",
    date: "2024-01-19",
    recipient: "Bereket Wolde",
  },
  {
    id: "3",
    amount: 750.0,
    type: "credit",
    description: "Refund processed",
    status: "pending",
    date: "2024-01-18",
  },
  {
    id: "4",
    amount: 2000.0,
    type: "debit",
    description: "Withdrawal to bank account",
    status: "completed",
    date: "2024-01-17",
  },
  {
    id: "5",
    amount: 500.0,
    type: "credit",
    description: "Payment from merchant",
    status: "failed",
    date: "2024-01-16",
  },
]

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const mockApiService = {

  async login(email: string, password: string): Promise<User> {
    await delay(1000) 

    const user = mockUsers.find((u) => u.email === email)
    if (!user) {
      throw new Error("Invalid credentials")
    }

   
    const validPasswords: Record<string, string> = {
      "user@chapa.co": "user123",
      "admin@chapa.co": "admin123",
      "superadmin@chapa.co": "super123",
    }

    if (validPasswords[email] !== password) {
      throw new Error("Invalid credentials")
    }

    return user
  },

  
  async getWalletBalance(): Promise<WalletBalance> {
    await delay(800)
    return {
      total: 15750.5,
      available: 14250.5,
      pending: 1500.0,
    }
  },

  async getTransactions(): Promise<Transaction[]> {
    await delay(600)
    return mockTransactions
  },

  async createTransaction(amount: number, recipient: string, description: string): Promise<Transaction> {
    await delay(1200)

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      amount,
      type: "debit",
      description,
      status: "pending",
      date: new Date().toISOString().split("T")[0],
      recipient,
    }

    mockTransactions.unshift(newTransaction)
    return newTransaction
  },

  
  async getUsers(): Promise<User[]> {
    await delay(700)
    return mockUsers.filter((u) => u.role !== "super_admin")
  },

  async toggleUserStatus(userId: string): Promise<User> {
    await delay(500)

    const user = mockUsers.find((u) => u.id === userId)
    if (!user) throw new Error("User not found")

    user.isActive = !user.isActive
    return user
  },

  async getPaymentSummaries(): Promise<PaymentSummary[]> {
    await delay(900)

    return [
      {
        userId: "1",
        userName: "Dawit Tesfaye",
        totalPayments: 15,
        totalAmount: 12500.0,
        lastPayment: "2024-01-20",
      },
      {
        userId: "4",
        userName: "Almaz Haile",
        totalPayments: 8,
        totalAmount: 6750.0,
        lastPayment: "2024-01-19",
      },
      {
        userId: "5",
        userName: "Bereket Wolde",
        totalPayments: 12,
        totalAmount: 9200.0,
        lastPayment: "2024-01-18",
      },
    ]
  },

 
  async getSystemStats(): Promise<SystemStats> {
    await delay(1000)

    return {
      totalPayments: 1247,
      activeUsers: 156,
      totalRevenue: 2847500.0,
      transactionsToday: 23,
    }
  },

  async addAdmin(name: string, email: string): Promise<User> {
    await delay(800)

    const newAdmin: User = {
      id: Date.now().toString(),
      name,
      email,
      role: "admin",
      isActive: true,
      createdAt: new Date().toISOString().split("T")[0],
    }

    mockUsers.push(newAdmin)
    return newAdmin
  },

  async removeAdmin(adminId: string): Promise<void> {
    await delay(600)

    const index = mockUsers.findIndex((u) => u.id === adminId && u.role === "admin")
    if (index > -1) {
      mockUsers.splice(index, 1)
    }
  },
}
