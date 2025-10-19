"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { AlertTriangle } from "lucide-react"

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 text-center space-y-4">
          <AlertTriangle className="w-12 h-12 text-yellow-600 mx-auto" />
          <h1 className="text-2xl font-bold">Page Not Found</h1>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
          <Button asChild className="w-full">
            <Link href="/">Go to Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
