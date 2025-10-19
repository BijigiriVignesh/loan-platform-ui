import type React from "react"
import Link from "next/link"
import { LayoutDashboard, Users, Settings } from "lucide-react"

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-bold text-primary">AssetLend Super Admin</h1>
            <nav className="hidden md:flex gap-6">
              <Link
                href="/super-admin"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <Link
                href="/super-admin/users"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Users className="w-4 h-4" />
                Users & Roles
              </Link>
              <Link
                href="/super-admin/settings"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">Super Admin</p>
              <p className="text-xs text-muted-foreground">System Administrator</p>
            </div>
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-primary">SA</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
