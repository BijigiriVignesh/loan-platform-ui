"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AdminUsersAccess() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Users & Access Management</h1>
        <p className="text-muted-foreground">Manage user roles and permissions</p>
      </div>

      <Button asChild>
        <Link href="/admin/dashboard">Back to Dashboard</Link>
      </Button>

      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">User management interface will be displayed here</p>
        </CardContent>
      </Card>
    </div>
  )
}
