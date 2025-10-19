"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, TrendingUp, AlertCircle, CheckCircle, Clock, Settings } from "lucide-react"
import Link from "next/link"

export default function SuperAdminDashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "1,245",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Active Districts",
      value: "50",
      icon: TrendingUp,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Pending Approvals",
      value: "23",
      icon: Clock,
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
    },
    {
      title: "System Alerts",
      value: "5",
      icon: AlertCircle,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
  ]

  const recentActivity = [
    {
      id: 1,
      type: "user_created",
      description: "New district admin created",
      details: "Rajesh Kumar - Mumbai Central",
      timestamp: "2 hours ago",
      status: "success",
    },
    {
      id: 2,
      type: "role_updated",
      description: "User role updated",
      details: "Priya Sharma - Agent to Senior Agent",
      timestamp: "4 hours ago",
      status: "success",
    },
    {
      id: 3,
      type: "system_alert",
      description: "High transaction volume detected",
      details: "Delhi region - 500+ transactions today",
      timestamp: "6 hours ago",
      status: "warning",
    },
    {
      id: 4,
      type: "user_disabled",
      description: "User account disabled",
      details: "Amit Singh - Inactive for 30 days",
      timestamp: "1 day ago",
      status: "info",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Super Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage users, roles, and system settings</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="hover:border-primary/20 transition-colors">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}
                  >
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Today
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm mb-1">{stat.title}</p>
                <p className="text-2xl sm:text-3xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-muted">
                    {activity.status === "success" && <CheckCircle className="w-5 h-5 text-chart-3" />}
                    {activity.status === "warning" && <AlertCircle className="w-5 h-5 text-chart-3" />}
                    {activity.status === "info" && <Clock className="w-5 h-5 text-primary" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm sm:text-base">{activity.description}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{activity.details}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full justify-start">
              <Link href="/super-admin/users">
                <Users className="w-4 h-4 mr-2" />
                Manage Users
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start bg-transparent">
              <Link href="/super-admin/settings">
                <Settings className="w-4 h-4 mr-2" />
                System Settings
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start bg-transparent">
              <Link href="/admin/loans">
                <TrendingUp className="w-4 h-4 mr-2" />
                View All Districts
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
