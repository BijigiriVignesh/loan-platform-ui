"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Settings, Database, Lock, Bell } from "lucide-react"

export default function SystemSettings() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">System Settings</h1>
        <p className="text-muted-foreground">Configure system-wide settings and preferences</p>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            General Settings
          </CardTitle>
          <CardDescription>Basic system configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Platform Name</label>
              <Input defaultValue="AssetLend" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Support Email</label>
              <Input type="email" defaultValue="support@assetlend.com" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Platform URL</label>
            <Input defaultValue="https://assetlend.com" />
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <p className="font-medium">Maintenance Mode</p>
              <p className="text-sm text-muted-foreground">Temporarily disable platform access</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Loan Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Loan Configuration
          </CardTitle>
          <CardDescription>Configure loan parameters and limits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Minimum Loan Amount (₹)</label>
              <Input type="number" defaultValue="5000" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Maximum Loan Amount (₹)</label>
              <Input type="number" defaultValue="500000" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Default Interest Rate (%)</label>
              <Input type="number" defaultValue="12" step="0.1" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Default Loan Tenure (months)</label>
              <Input type="number" defaultValue="12" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Security Settings
          </CardTitle>
          <CardDescription>Manage security and access control</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">Require 2FA for all admin accounts</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between border-t border-border pt-6">
            <div>
              <p className="font-medium">Session Timeout</p>
              <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
            </div>
            <Input type="number" defaultValue="30" className="w-20" />
          </div>
          <div className="flex items-center justify-between border-t border-border pt-6">
            <div>
              <p className="font-medium">IP Whitelist</p>
              <p className="text-sm text-muted-foreground">Restrict admin access to specific IPs</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notification Settings
          </CardTitle>
          <CardDescription>Configure system notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Send email alerts for critical events</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between border-t border-border pt-6">
            <div>
              <p className="font-medium">SMS Notifications</p>
              <p className="text-sm text-muted-foreground">Send SMS alerts for urgent issues</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between border-t border-border pt-6">
            <div>
              <p className="font-medium">Daily Reports</p>
              <p className="text-sm text-muted-foreground">Send daily summary reports</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex gap-3 justify-end">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  )
}
