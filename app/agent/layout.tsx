import type React from "react"
import Link from "next/link"
import { LayoutDashboard, Users, FileText, BarChart3, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-bold text-xl text-primary">
              AssetLend
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link
                href="/agent/dashboard"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <Link
                href="/agent/applications"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Applications
              </Link>
              <Link
                href="/agent/customers"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                Customers
              </Link>
              <Link
                href="/agent/reports"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                Reports
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="w-5 h-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48">
                <div className="space-y-2">
                  <Link href="/profile" className="block px-4 py-2 hover:bg-muted rounded">
                    Profile
                  </Link>
                  <button className="w-full text-left px-4 py-2 hover:bg-muted rounded flex items-center gap-2">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
