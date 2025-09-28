"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Download,
  Phone,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  MapPin,
  Clock,
  XCircle,
  Eye,
  User,
  Smartphone,
  Laptop,
  Car,
  CreditCard,
} from "lucide-react"
import Link from "next/link"

const mockLoans = [
  {
    id: "LN001",
    borrower: "Rajesh Kumar",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@email.com",
    asset: "iPhone 14 Pro",
    loanAmount: 45000,
    disbursedAmount: 45000,
    outstandingAmount: 32000,
    emiAmount: 4500,
    nextEmiDate: "2024-01-15",
    status: "active",
    riskLevel: "low",
    district: "Mumbai Central",
    tenure: 12,
    interestRate: 12,
    disbursedDate: "2023-12-01",
    lastPaymentDate: "2023-12-15",
    overdueAmount: 0,
    totalPaid: 13000,
    paymentsCompleted: 3,
    collectionAttempts: 0,
  },
  {
    id: "LN002",
    borrower: "Priya Sharma",
    phone: "+91 87654 32109",
    email: "priya.sharma@email.com",
    asset: "MacBook Air M2",
    loanAmount: 85000,
    disbursedAmount: 85000,
    outstandingAmount: 78000,
    emiAmount: 8500,
    nextEmiDate: "2024-01-10",
    status: "overdue",
    riskLevel: "high",
    district: "Delhi South",
    tenure: 12,
    interestRate: 14,
    disbursedDate: "2023-11-15",
    lastPaymentDate: "2023-11-15",
    overdueAmount: 17000,
    totalPaid: 7000,
    paymentsCompleted: 1,
    collectionAttempts: 3,
  },
  {
    id: "LN003",
    borrower: "Amit Patel",
    phone: "+91 76543 21098",
    email: "amit.patel@email.com",
    asset: "Honda City 2020",
    loanAmount: 250000,
    disbursedAmount: 250000,
    outstandingAmount: 0,
    emiAmount: 25000,
    nextEmiDate: null,
    status: "closed",
    riskLevel: "low",
    district: "Ahmedabad West",
    tenure: 12,
    interestRate: 10,
    disbursedDate: "2023-01-01",
    lastPaymentDate: "2023-12-01",
    overdueAmount: 0,
    totalPaid: 250000,
    paymentsCompleted: 12,
    collectionAttempts: 0,
  },
]

const pendingRequests = [
  {
    id: "LR001",
    userId: "U001",
    userName: "Rahul Kumar",
    userPhone: "+91 9876543210",
    asset: "iPhone 14 Pro",
    assetType: "smartphone",
    brand: "Apple",
    model: "iPhone 14 Pro",
    condition: "excellent",
    requestedAmount: 45000,
    estimatedValue: 50000,
    submittedDate: "2025-01-20",
    district: "Mumbai Central",
    photos: ["/iphone-14-pro-front.jpg", "/iphone-14-pro-back.jpg"],
    idProofs: ["/aadhaar-card.jpg"],
    description: "Excellent condition iPhone 14 Pro with original box and accessories. No scratches or damage.",
    purchaseYear: "2023",
    status: "pending",
  },
  {
    id: "LR002",
    userId: "U002",
    userName: "Priya Sharma",
    userPhone: "+91 9876543211",
    asset: "MacBook Air M2",
    assetType: "laptop",
    brand: "Apple",
    model: "MacBook Air M2",
    condition: "good",
    requestedAmount: 65000,
    estimatedValue: 75000,
    submittedDate: "2025-01-19",
    district: "Mumbai Central",
    photos: ["/macbook-air-m2-open.jpg", "/macbook-air-m2-closed.jpg"],
    idProofs: ["/pan-card.jpg"],
    description: "MacBook Air M2 in good condition with minor usage marks. Includes original charger.",
    purchaseYear: "2022",
    status: "pending",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800"
    case "overdue":
      return "bg-red-100 text-red-800"
    case "closed":
      return "bg-gray-100 text-gray-800"
    case "defaulted":
      return "bg-red-200 text-red-900"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "low":
      return "bg-green-100 text-green-800"
    case "medium":
      return "bg-yellow-100 text-yellow-800"
    case "high":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getAssetIcon = (type: string) => {
  switch (type) {
    case "smartphone":
      return <Smartphone className="w-5 h-5" />
    case "laptop":
      return <Laptop className="w-5 h-5" />
    case "vehicle":
      return <Car className="w-5 h-5" />
    default:
      return <CreditCard className="w-5 h-5" />
  }
}

interface ReviewDialogProps {
  request: (typeof pendingRequests)[0]
  onApprove: (requestId: string, terms: any) => void
  onReject: (requestId: string, reason: string) => void
}

function ReviewDialog({ request, onApprove, onReject }: ReviewDialogProps) {
  const [action, setAction] = useState<"approve" | "reject" | null>(null)
  const [approvalTerms, setApprovalTerms] = useState({
    approvedAmount: request.requestedAmount.toString(),
    interestRate: "12",
    tenure: "6",
    planType: "monthly",
    pickupDate: "",
    pickupTime: "",
    pickupLocation: "",
  })
  const [rejectionReason, setRejectionReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (action === "approve") {
      onApprove(request.id, approvalTerms)
    } else if (action === "reject") {
      onReject(request.id, rejectionReason)
    }

    setIsSubmitting(false)
    setAction(null)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="w-4 h-4 mr-2" />
          Review
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Review Loan Request - {request.id}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details" className="text-xs sm:text-sm">
              Asset Details
            </TabsTrigger>
            <TabsTrigger value="photos" className="text-xs sm:text-sm">
              Photos & Docs
            </TabsTrigger>
            <TabsTrigger value="decision" className="text-xs sm:text-sm">
              Make Decision
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
              <Card>
                <CardContent className="p-4 space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <User className="w-4 h-4" />
                    User Information
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Name</p>
                      <p className="font-semibold">{request.userName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="font-semibold">{request.userPhone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">District</p>
                      <p className="font-semibold">{request.district}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    {getAssetIcon(request.assetType)}
                    Asset Information
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Asset</p>
                      <p className="font-semibold">
                        {request.brand} {request.model}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Condition</p>
                      <Badge variant="outline">{request.condition}</Badge>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Requested Amount</p>
                      <p className="font-semibold text-sm sm:text-base text-primary">
                        ₹{request.requestedAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="photos" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {request.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo || "/placeholder.svg"}
                  alt={`Asset photo ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg border"
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="decision" className="space-y-4">
            <div className="flex gap-4 mb-6">
              <Button
                variant={action === "approve" ? "default" : "outline"}
                onClick={() => setAction("approve")}
                className="flex-1"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve
              </Button>
              <Button
                variant={action === "reject" ? "destructive" : "outline"}
                onClick={() => setAction("reject")}
                className="flex-1"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Reject
              </Button>
            </div>

            {action === "approve" && (
              <Card>
                <CardContent className="p-4 space-y-4">
                  <h4 className="font-semibold">Loan Terms</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Approved Amount (₹)</Label>
                      <Input
                        value={approvalTerms.approvedAmount}
                        onChange={(e) => setApprovalTerms((prev) => ({ ...prev, approvedAmount: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label>Interest Rate (% p.a.)</Label>
                      <Input
                        value={approvalTerms.interestRate}
                        onChange={(e) => setApprovalTerms((prev) => ({ ...prev, interestRate: e.target.value }))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {action === "reject" && (
              <Card>
                <CardContent className="p-4">
                  <Label>Rejection Reason</Label>
                  <Textarea
                    placeholder="Please provide a clear reason for rejection..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    rows={4}
                  />
                </CardContent>
              </Card>
            )}

            {action && (
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setAction(null)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={isSubmitting || (action === "reject" && !rejectionReason)}>
                  {isSubmitting ? "Processing..." : action === "approve" ? "Approve Loan" : "Reject Request"}
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [riskFilter, setRiskFilter] = useState("all")
  const [selectedLoan, setSelectedLoan] = useState<any>(null)
  const [collectionNote, setCollectionNote] = useState("")
  const [actionType, setActionType] = useState("")
  const [activeTab, setActiveTab] = useState("loans")
  const [requests, setRequests] = useState(pendingRequests)

  const filteredLoans = mockLoans.filter((loan) => {
    const matchesSearch =
      loan.borrower.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.asset.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || loan.status === statusFilter
    const matchesRisk = riskFilter === "all" || loan.riskLevel === riskFilter
    return matchesSearch && matchesStatus && matchesRisk
  })

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const handleCollectionAction = (loan: any, action: string) => {
    setSelectedLoan(loan)
    setActionType(action)
    setCollectionNote("")
  }

  const submitCollectionAction = () => {
    console.log(`Collection action: ${actionType} for loan ${selectedLoan?.id}`)
    console.log(`Note: ${collectionNote}`)
    setSelectedLoan(null)
    setActionType("")
    setCollectionNote("")
  }

  const handleApprove = (requestId: string, terms: any) => {
    console.log("Approved:", requestId, terms)
    setRequests((prev) => prev.filter((req) => req.id !== requestId))
  }

  const handleReject = (requestId: string, reason: string) => {
    console.log("Rejected:", requestId, reason)
    setRequests((prev) => prev.filter((req) => req.id !== requestId))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage loans and review requests in your district</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <DollarSign className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Loans</p>
                  <p className="text-lg font-semibold">{mockLoans.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Clock className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pending Reviews</p>
                  <p className="text-lg font-semibold">{requests.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active</p>
                  <p className="text-lg font-semibold">{mockLoans.filter((l) => l.status === "active").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Overdue</p>
                  <p className="text-lg font-semibold">{mockLoans.filter((l) => l.status === "overdue").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div>
                <p className="text-sm text-gray-600">Total Disbursed</p>
                <p className="text-lg font-semibold">
                  ₹{(mockLoans.reduce((sum, l) => sum + l.disbursedAmount, 0) / 100000).toFixed(1)}L
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div>
                <p className="text-sm text-gray-600">Outstanding</p>
                <p className="text-lg font-semibold">
                  ₹{(mockLoans.reduce((sum, l) => sum + l.outstandingAmount, 0) / 100000).toFixed(1)}L
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div>
                <p className="text-sm text-gray-600">Overdue Amount</p>
                <p className="text-lg font-semibold text-red-600">
                  ₹{(mockLoans.reduce((sum, l) => sum + l.overdueAmount, 0) / 1000).toFixed(0)}K
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs to separate loans and pending requests */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="loans">Active Loans</TabsTrigger>
            <TabsTrigger value="requests">Pending Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="loans" className="space-y-4">
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search by borrower name, loan ID, or asset..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={riskFilter} onValueChange={setRiskFilter}>
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue placeholder="Risk Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Risk</SelectItem>
                      <SelectItem value="low">Low Risk</SelectItem>
                      <SelectItem value="medium">Medium Risk</SelectItem>
                      <SelectItem value="high">High Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Loans Table */}
            <div className="space-y-4">
              {filteredLoans.map((loan) => (
                <Card key={loan.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4 md:p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex flex-col md:flex-row md:items-center gap-2">
                            <h3 className="font-semibold text-lg">{loan.borrower}</h3>
                            <div className="flex gap-2">
                              <Badge className={getStatusColor(loan.status)}>
                                {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                              </Badge>
                              <Badge className={getRiskColor(loan.riskLevel)}>
                                {loan.riskLevel.charAt(0).toUpperCase() + loan.riskLevel.slice(1)} Risk
                              </Badge>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">Loan ID</p>
                              <p className="font-medium">{loan.id}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Asset</p>
                              <p className="font-medium">{loan.asset}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Outstanding</p>
                              <p className="font-medium">₹{loan.outstandingAmount.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Next EMI</p>
                              <p className="font-medium">
                                {loan.nextEmiDate ? new Date(loan.nextEmiDate).toLocaleDateString() : "N/A"}
                              </p>
                            </div>
                          </div>

                          {loan.overdueAmount > 0 && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                              <div className="flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-red-600" />
                                <span className="text-red-800 font-medium">
                                  Overdue Amount: ₹{loan.overdueAmount.toLocaleString()}
                                </span>
                                <span className="text-red-600 text-sm">
                                  ({loan.collectionAttempts} collection attempts)
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/asset-detail/${loan.id.replace("LN", "AST")}?admin=true`}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Link>
                          </Button>

                          {loan.status === "overdue" && (
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => handleCollectionAction(loan, "call")}>
                                <Phone className="w-4 h-4 mr-1" />
                                Call
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredLoans.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">No loans found matching your criteria.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            {/* Pending Requests Section */}
            <Card>
              <CardContent className="p-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search by name, asset, or request ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {filteredRequests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-3">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                          {getAssetIcon(request.assetType)}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-base sm:text-lg truncate">{request.asset}</h3>
                          <p className="text-sm text-muted-foreground">Request ID: {request.id}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="w-fit">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
                      <div>
                        <p className="text-xs sm:text-sm text-muted-foreground">User</p>
                        <p className="font-semibold text-sm sm:text-base">{request.userName}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">{request.userPhone}</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-muted-foreground">Asset Details</p>
                        <p className="font-semibold text-sm sm:text-base truncate">
                          {request.brand} {request.model}
                        </p>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {request.condition}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-muted-foreground">Requested Amount</p>
                        <p className="font-semibold text-sm sm:text-base text-primary">
                          ₹{request.requestedAmount.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-muted-foreground">Submitted</p>
                        <p className="font-semibold text-sm sm:text-base">
                          {new Date(request.submittedDate).toLocaleDateString()}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs sm:text-sm text-muted-foreground">{request.district}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/asset-detail/${request.id.replace("LR", "AST")}?admin=true`}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredRequests.length === 0 && (
                <Card>
                  <CardContent className="p-8 sm:p-12 text-center">
                    <Clock className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-base sm:text-lg font-semibold mb-2">No pending requests</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">All loan requests have been reviewed.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Collection Action Dialog */}
        <Dialog open={!!selectedLoan} onOpenChange={() => setSelectedLoan(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{actionType === "call" ? "Record Collection Call" : "Mark Loan as Default"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Borrower</Label>
                <p className="font-medium">{selectedLoan?.borrower}</p>
              </div>
              <div>
                <Label>Loan ID</Label>
                <p className="font-medium">{selectedLoan?.id}</p>
              </div>
              <div>
                <Label>Overdue Amount</Label>
                <p className="font-medium text-red-600">₹{selectedLoan?.overdueAmount?.toLocaleString()}</p>
              </div>
              <div>
                <Label htmlFor="collection-note">{actionType === "call" ? "Call Notes" : "Default Reason"}</Label>
                <Textarea
                  id="collection-note"
                  placeholder={
                    actionType === "call"
                      ? "Enter call details and borrower response..."
                      : "Enter reason for marking as default..."
                  }
                  value={collectionNote}
                  onChange={(e) => setCollectionNote(e.target.value)}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={submitCollectionAction} className="flex-1">
                  {actionType === "call" ? "Save Call Record" : "Mark as Default"}
                </Button>
                <Button variant="outline" onClick={() => setSelectedLoan(null)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
