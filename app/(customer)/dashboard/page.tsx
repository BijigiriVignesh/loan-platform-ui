"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Smartphone, Laptop, Car, Clock, CheckCircle, Calendar, IndianRupee, Eye } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Mock data for demonstration
const loanRequests = [
  {
    id: "LR001",
    asset: "iPhone 14 Pro",
    type: "phone",
    amount: 45000,
    status: "active",
    submittedDate: "2025-01-15",
    approvedAmount: 42000,
    interestRate: 12,
    tenure: 6,
    nextEMI: "2025-02-15",
    emiAmount: 7500,
    remainingAmount: 28000,
    paidEmis: 2,
    totalEmis: 6,
    overdueAmount: 0,
  },
  {
    id: "LR002",
    asset: "MacBook Air M2",
    type: "laptop",
    amount: 65000,
    status: "pending",
    submittedDate: "2025-01-18",
    approvedAmount: null,
    interestRate: null,
    tenure: null,
  },
  {
    id: "LR003",
    asset: "Honda City 2020",
    type: "car",
    amount: 250000,
    status: "rejected",
    submittedDate: "2025-01-10",
    reason: "Asset valuation mismatch",
  },
  {
    id: "LR004",
    asset: "iPhone 13",
    type: "phone",
    amount: 35000,
    status: "closed",
    submittedDate: "2024-12-01",
    approvedAmount: 32000,
    closedDate: "2025-01-15",
  },
]

export default function CustomerDashboard() {
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredRequests = filterStatus === "all" ? loanRequests : loanRequests.filter((r) => r.status === filterStatus)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAssetIcon = (type: string) => {
    switch (type) {
      case "phone":
        return <Smartphone className="w-5 h-5" />
      case "laptop":
        return <Laptop className="w-5 h-5" />
      case "car":
        return <Car className="w-5 h-5" />
      default:
        return <Smartphone className="w-5 h-5" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Manage your loan requests and payments</p>
        </div>
        <Button asChild>
          <Link href="/(customer)/loans">
            <Plus className="w-4 h-4 mr-2" />
            New Loan Request
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Loans</p>
                <p className="text-2xl font-bold">1</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">1</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Borrowed</p>
                <p className="text-2xl font-bold">₹42K</p>
              </div>
              <IndianRupee className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Next EMI</p>
                <p className="text-2xl font-bold">₹7.5K</p>
              </div>
              <Calendar className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex gap-4">
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Requests</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Loan Requests */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <Card key={request.id}>
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-3">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    {getAssetIcon(request.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg">{request.asset}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">Request ID: {request.id}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(request.status)}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </Badge>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground">Requested Amount</p>
                  <p className="font-semibold">₹{request.amount.toLocaleString()}</p>
                </div>
                {request.approvedAmount && (
                  <div>
                    <p className="text-xs text-muted-foreground">Approved Amount</p>
                    <p className="font-semibold">₹{request.approvedAmount.toLocaleString()}</p>
                  </div>
                )}
                {request.interestRate && (
                  <div>
                    <p className="text-xs text-muted-foreground">Interest Rate</p>
                    <p className="font-semibold">{request.interestRate}% p.a.</p>
                  </div>
                )}
                {request.tenure && (
                  <div>
                    <p className="text-xs text-muted-foreground">Tenure</p>
                    <p className="font-semibold">{request.tenure} months</p>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/request/${request.id}`}>
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Link>
                </Button>
                {request.status === "active" && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/(customer)/payments">Make Payment</Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
