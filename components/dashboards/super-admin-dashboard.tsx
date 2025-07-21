"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { mockApiService } from "@/services/mock-api"
import type { User, PaymentSummary, SystemStats } from "@/types"
import {
  Users,
  DollarSign,
  UserCheck,
  UserX,
  Loader2,
  BarChart3,
  Plus,
  Trash2,
  Shield,
  TrendingUp,
  Calendar,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function SuperAdminDashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [paymentSummaries, setPaymentSummaries] = useState<PaymentSummary[]>([])
  const [systemStats, setSystemStats] = useState<SystemStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [updatingUser, setUpdatingUser] = useState<string | null>(null)
  const [isAddingAdmin, setIsAddingAdmin] = useState(false)
  const [newAdminName, setNewAdminName] = useState("")
  const [newAdminEmail, setNewAdminEmail] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadSuperAdminData()
  }, [])

  const loadSuperAdminData = async () => {
    try {
      const [usersData, paymentsData, statsData] = await Promise.all([
        mockApiService.getUsers(),
        mockApiService.getPaymentSummaries(),
        mockApiService.getSystemStats(),
      ])
      setUsers(usersData)
      setPaymentSummaries(paymentsData)
      setSystemStats(statsData)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load super admin data",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleUserStatus = async (userId: string) => {
    setUpdatingUser(userId)
    try {
      const updatedUser = await mockApiService.toggleUserStatus(userId)
      setUsers((prev) => prev.map((user) => (user.id === userId ? updatedUser : user)))
      toast({
        title: "User Updated",
        description: `User has been ${updatedUser.isActive ? "activated" : "deactivated"}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user status",
        variant: "destructive",
      })
    } finally {
      setUpdatingUser(null)
    }
  }

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsAddingAdmin(true)

    try {
      const newAdmin = await mockApiService.addAdmin(newAdminName, newAdminEmail)
      setUsers((prev) => [...prev, newAdmin])
      setNewAdminName("")
      setNewAdminEmail("")
      setIsDialogOpen(false)
      toast({
        title: "Admin Added",
        description: "New admin has been successfully added",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add admin",
        variant: "destructive",
      })
    } finally {
      setIsAddingAdmin(false)
    }
  }

  const handleRemoveAdmin = async (adminId: string) => {
    try {
      await mockApiService.removeAdmin(adminId)
      setUsers((prev) => prev.filter((user) => user.id !== adminId))
      toast({
        title: "Admin Removed",
        description: "Admin has been successfully removed",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove admin",
        variant: "destructive",
      })
    }
  }

  const totalUsers = users.length
  const activeUsers = users.filter((u) => u.isActive).length
  const adminUsers = users.filter((u) => u.role === "admin")

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Super Admin Dashboard</h2>
        <p className="text-muted-foreground">Complete system overview and administrative controls.</p>
      </div>

      {/* System Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats?.totalPayments.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              System-wide
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats?.activeUsers}</div>
            <p className="text-xs text-muted-foreground">Platform users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${systemStats?.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All-time revenue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Transactions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats?.transactionsToday}</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Admin Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Admin Management
              </span>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Admin
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Admin</DialogTitle>
                    <DialogDescription>Create a new admin account with administrative privileges.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddAdmin}>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="Enter admin name"
                          value={newAdminName}
                          onChange={(e) => setNewAdminName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter admin email"
                          value={newAdminEmail}
                          onChange={(e) => setNewAdminEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" disabled={isAddingAdmin}>
                        {isAddingAdmin && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Add Admin
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardTitle>
            <CardDescription>Manage administrative accounts and permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {adminUsers.map((admin) => (
                <div key={admin.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{admin.name}</p>
                    <p className="text-sm text-muted-foreground">{admin.email}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        <Shield className="h-3 w-3 mr-1" />
                        Admin
                      </Badge>
                      <span className="text-xs text-muted-foreground">Since {admin.createdAt}</span>
                    </div>
                  </div>
                  <Button variant="destructive" size="sm" onClick={() => handleRemoveAdmin(admin.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User Management */}
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Activate or deactivate user accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {users
                .filter((u) => u.role === "user")
                .map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant={user.isActive ? "default" : "secondary"}>
                          {user.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <span className="text-xs text-muted-foreground">Joined {user.createdAt}</span>
                      </div>
                    </div>
                    <Button
                      variant={user.isActive ? "destructive" : "default"}
                      size="sm"
                      onClick={() => handleToggleUserStatus(user.id)}
                      disabled={updatingUser === user.id}
                    >
                      {updatingUser === user.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : user.isActive ? (
                        <UserX className="h-4 w-4" />
                      ) : (
                        <UserCheck className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Summaries */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Analytics</CardTitle>
          <CardDescription>Comprehensive overview of user payment activities</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Total Payments</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Last Payment</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentSummaries.map((summary) => {
                const user = users.find((u) => u.id === summary.userId)
                return (
                  <TableRow key={summary.userId}>
                    <TableCell className="font-medium">{summary.userName}</TableCell>
                    <TableCell>{summary.totalPayments}</TableCell>
                    <TableCell>${summary.totalAmount.toLocaleString()}</TableCell>
                    <TableCell>{summary.lastPayment}</TableCell>
                    <TableCell>
                      <Badge variant={user?.isActive ? "default" : "secondary"}>
                        {user?.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
