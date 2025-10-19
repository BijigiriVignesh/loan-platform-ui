"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function CustomerLoans() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Loans</h1>
        <p className="text-muted-foreground">View and manage all your loans</p>
      </div>

      <Button asChild>
        <Link href="/(customer)/dashboard">Back to Dashboard</Link>
      </Button>

      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">Loan details will be displayed here</p>
        </CardContent>
      </Card>
    </div>
  )
}
