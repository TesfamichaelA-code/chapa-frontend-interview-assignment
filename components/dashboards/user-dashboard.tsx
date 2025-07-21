"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { mockApiService } from "@/services/mock-api"
import type { WalletBalance, Transaction } from "@/types"
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle,
  XCircle,
  Send,
  Loader2,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  History,
  Download,
  Eye,
  EyeOff,
  RefreshCw,
  AlertCircle,
  Info,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function UserDashboard() {
  const [balance, setBalance] = useState<WalletBalance | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [amount, setAmount] = useState("")
  const [recipient, setRecipient] = useState("")
  const [description, setDescription] = useState("")
  const [showBalance, setShowBalance] = useState(true)
  const [transactionFilter, setTransactionFilter] = useState("all")
  const [amountError, setAmountError] = useState("")
  const [recipientError, setRecipientError] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    loadDashboardData()
  }, [])

  
  useEffect(() => {
    if (amount) {
      const numAmount = Number.parseFloat(amount)
      if (isNaN(numAmount) || numAmount <= 0) {
        setAmountError("Please enter a valid amount")
      } else if (balance && numAmount > balance.available) {
        setAmountError("Insufficient funds")
      } else {
        setAmountError("")
      }
    } else {
      setAmountError("")
    }
  }, [amount, balance])

  useEffect(() => {
    if (recipient && recipient.length < 3) {
      setRecipientError("Recipient name must be at least 3 characters")
    } else {
      setRecipientError("")
    }
  }, [recipient])

  const loadDashboardData = async () => {
    try {
      const [balanceData, transactionsData] = await Promise.all([
        mockApiService.getWalletBalance(),
        mockApiService.getTransactions(),
      ])
      setBalance(balanceData)
      setTransactions(transactionsData)
    } catch (error) {
      toast({
        title: "Error Loading Data",
        description: "Failed to load dashboard data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const refreshData = async () => {
    setIsRefreshing(true)
    try {
      await loadDashboardData()
      toast({
        title: "Data Refreshed",
        description: "Your dashboard has been updated with the latest information.",
      })
    } catch (error) {
      toast({
        title: "Refresh Failed",
        description: "Could not refresh data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleTransaction = async (e: React.FormEvent) => {
    e.preventDefault()

    if (amountError || recipientError) {
      toast({
        title: "Invalid Input",
        description: "Please correct the errors before submitting.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const newTransaction = await mockApiService.createTransaction(
        Number.parseFloat(amount),
        recipient,
        description || `Payment to ${recipient}`,
      )

      setTransactions((prev) => [newTransaction, ...prev])

  
      if (balance) {
        setBalance({
          ...balance,
          available: balance.available - Number.parseFloat(amount),
          pending: balance.pending + Number.parseFloat(amount),
        })
      }

      // Reset form
      setAmount("")
      setRecipient("")
      setDescription("")

      toast({
        title: "Transaction Initiated Successfully! 🎉",
        description: `$${Number.parseFloat(amount).toLocaleString()} sent to ${recipient}`,
        className: "success-pulse",
      })
    } catch (error) {
      toast({
        title: "Transaction Failed",
        description: "Unable to process your transaction. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "default",
      pending: "secondary",
      failed: "destructive",
    } as const

    return (
      <Badge variant={variants[status as keyof typeof variants] || "default"} className="text-xs">
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const filteredTransactions = transactions.filter((transaction) => {
    if (transactionFilter === "all") return true
    if (transactionFilter === "credit") return transaction.type === "credit"
    if (transactionFilter === "debit") return transaction.type === "debit"
    if (transactionFilter === "pending") return transaction.status === "pending"
    return true
  })

  const getBalanceChange = () => {
    const recentTransactions = transactions.slice(0, 5)
    const totalChange = recentTransactions.reduce((sum, t) => {
      return sum + (t.type === "credit" ? t.amount : -t.amount)
    }, 0)
    return totalChange
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Loading Skeletons */}
        <div className="space-y-2">
          <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-96 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2].map((i) => (
            <div key={i} className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  const balanceChange = getBalanceChange()

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Welcome back! 👋</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Here's an overview of your wallet and recent transactions.
          </p>
        </div>
        <Button
          onClick={refreshData}
          variant="outline"
          size="sm"
          disabled={isRefreshing}
          className="flex items-center gap-2 bg-transparent"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

  
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-green-600 to-green-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/90">Total Balance</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBalance(!showBalance)}
                className="h-6 w-6 p-0 text-white/80 hover:text-white hover:bg-white/20"
              >
                {showBalance ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
              </Button>
              <Wallet className="h-4 w-4 text-white/80" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {showBalance ? `$${balance?.total.toLocaleString()}` : "••••••"}
            </div>
            <p className="text-xs text-white/80 flex items-center mt-1">
              {balanceChange >= 0 ? (
                <TrendingUp className="inline h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="inline h-3 w-3 mr-1" />
              )}
              {balanceChange >= 0 ? "+" : ""}${balanceChange.toLocaleString()} this week
            </p>
          </CardContent>
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Available</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {showBalance ? `$${balance?.available.toLocaleString()}` : "••••••"}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center mt-1">
              <CreditCard className="inline h-3 w-3 mr-1" />
              Ready to use
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {showBalance ? `$${balance?.pending.toLocaleString()}` : "••••••"}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center mt-1">
              <AlertCircle className="inline h-3 w-3 mr-1" />
              Processing
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Transaction Form */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
              <div className="p-2 bg-chapa-green/10 rounded-lg">
                <Send className="h-5 w-5 text-chapa-green" />
              </div>
              Send Money
            </CardTitle>
            <CardDescription>Transfer money to another user instantly and securely.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTransaction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-sm font-medium">
                  Amount ($)
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className={`pl-10 ${
                      amountError
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : amount && !amountError
                          ? "border-green-500 focus:border-green-500 focus:ring-green-500"
                          : ""
                    }`}
                    required
                  />
                </div>
                {amountError && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {amountError}
                  </p>
                )}
                {balance && amount && !amountError && (
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Info className="h-3 w-3" />
                    Remaining balance: ${(balance.available - Number.parseFloat(amount || "0")).toLocaleString()}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipient" className="text-sm font-medium">
                  Recipient
                </Label>
                <Input
                  id="recipient"
                  placeholder="Enter recipient name or email"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className={`${
                    recipientError
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : recipient && !recipientError
                        ? "border-green-500 focus:border-green-500 focus:ring-green-500"
                        : ""
                  }`}
                  required
                />
                {recipientError && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {recipientError}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Description (Optional)
                </Label>
                <Textarea
                  id="description"
                  placeholder="What's this payment for?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-chapa-green hover:bg-chapa-green/90 text-white font-medium py-2.5 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                disabled={isSubmitting || !!amountError || !!recipientError || !amount || !recipient}
              >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? "Processing..." : "Send Money"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <History className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  Recent Transactions
                </CardTitle>
                <CardDescription>Your latest payment activity</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Select value={transactionFilter} onValueChange={setTransactionFilter}>
                  <SelectTrigger className="w-32 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="credit">Received</SelectItem>
                    <SelectItem value="debit">Sent</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredTransactions.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No transactions found</p>
                  <p className="text-sm">Try adjusting your filter</p>
                </div>
              ) : (
                filteredTransactions.slice(0, 6).map((transaction, index) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-700 rounded-lg hover:shadow-md transition-all duration-200 animate-slide-in-left"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-full ${
                          transaction.type === "credit"
                            ? "bg-green-50 dark:bg-green-900/20"
                            : "bg-red-50 dark:bg-red-900/20"
                        }`}
                      >
                        {transaction.type === "credit" ? (
                          <ArrowDownLeft className="h-4 w-4 text-green-600 dark:text-green-400" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4 text-red-600 dark:text-red-400" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm text-gray-900 dark:text-white truncate">
                          {transaction.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(transaction.date).toLocaleDateString()}
                          </p>
                          {getStatusIcon(transaction.status)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <p
                        className={`font-semibold ${
                          transaction.type === "credit"
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {transaction.type === "credit" ? "+" : "-"}${transaction.amount.toLocaleString()}
                      </p>
                      {getStatusBadge(transaction.status)}
                    </div>
                  </div>
                ))
              )}

              {filteredTransactions.length > 6 && (
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  View All Transactions ({filteredTransactions.length})
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
