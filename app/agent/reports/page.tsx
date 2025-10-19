"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AgentReports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground">View your performance reports</p>
      </div>

      <Button asChild>
        <Link href="/agent/dashboard">Back to Dashboard</Link>
      </Button>

      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">Reports will be displayed here</p>
        </CardContent>
      </Card>
    </div>
  )
}
