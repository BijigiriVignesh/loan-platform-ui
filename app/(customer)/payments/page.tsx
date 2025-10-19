"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function CustomerPayments() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payments</h1>
        <p className="text-muted-foreground">Make and track your EMI payments</p>
      </div>

      <Button asChild>
        <Link href="/(customer)/dashboard">Back to Dashboard</Link>
      </Button>

      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">Payment details will be displayed here</p>
        </CardContent>
      </Card>
    </div>
  )
}
