"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function RequestDetailPage() {
  const params = useParams()
  const requestID = params.requestID

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Request Details</h1>
        <p className="text-muted-foreground">Request ID: {requestID}</p>
      </div>

      <Button asChild>
        <Link href="/">Back</Link>
      </Button>

      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">Request details will be displayed here based on user role</p>
        </CardContent>
      </Card>
    </div>
  )
}
