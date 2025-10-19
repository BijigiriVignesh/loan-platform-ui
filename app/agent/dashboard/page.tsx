"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AgentDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Agent Dashboard</h1>
        <p className="text-muted-foreground">Manage your applications and customers</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Active Applications</p>
            <p className="text-2xl font-bold">12</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Total Customers</p>
            <p className="text-2xl font-bold">45</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Pending Review</p>
            <p className="text-2xl font-bold">5</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Approved This Month</p>
            <p className="text-2xl font-bold">8</p>
          </CardContent>
        </Card>
      </div>

      <Button asChild>
        <Link href="/agent/applications">View Applications</Link>
      </Button>
    </div>
  )
}
