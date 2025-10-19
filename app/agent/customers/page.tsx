"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AgentCustomers() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Customers</h1>
        <p className="text-muted-foreground">Manage your customers</p>
      </div>

      <Button asChild>
        <Link href="/agent/dashboard">Back to Dashboard</Link>
      </Button>

      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">Customers will be displayed here</p>
        </CardContent>
      </Card>
    </div>
  )
}
