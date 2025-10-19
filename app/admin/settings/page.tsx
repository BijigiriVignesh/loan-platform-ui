"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">System Settings</h1>
        <p className="text-muted-foreground">Configure system-wide settings</p>
      </div>

      <Button asChild>
        <Link href="/admin/dashboard">Back to Dashboard</Link>
      </Button>

      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">Settings interface will be displayed here</p>
        </CardContent>
      </Card>
    </div>
  )
}
