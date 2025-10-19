"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, Shield, CheckCircle, Upload, X } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [step, setStep] = useState(1)
  const [emailOtp, setEmailOtp] = useState("")
  const [phoneOtp, setPhoneOtp] = useState("")
  const [otpSent, setOtpSent] = useState({ email: false, phone: false })
  const [aadhaarFile, setAadhaarFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    district: "",
    address: "",
    pincode: "",
    pan: "",
  })

  const districts = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
    "Kanpur",
    "Nagpur",
  ]

  const handleSendOtp = async (type: "email" | "phone") => {
    setIsLoading(true)
    // Simulate OTP sending
    setTimeout(() => {
      setOtpSent((prev) => ({ ...prev, [type]: true }))
      setIsLoading(false)
    }, 1000)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAadhaarFile(file)
    }
  }

  const removeFile = () => {
    setAadhaarFile(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (step === 1) {
      // Validate step 1
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        setError("Please fill in all required fields")
        return
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match")
        return
      }
      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters")
        return
      }
      setStep(2)
    } else if (step === 2) {
      // Validate OTP step
      if (!otpSent.email || !otpSent.phone) {
        setError("Please send OTP to both email and phone")
        return
      }
      if (!emailOtp || !phoneOtp) {
        setError("Please enter both OTP codes")
        return
      }
      if (emailOtp.length !== 6 || phoneOtp.length !== 6) {
        setError("OTP must be 6 digits")
        return
      }
      setStep(3)
    } else {
      // Validate step 3 and submit
      if (!formData.district || !formData.address || !formData.pincode || !aadhaarFile || !formData.pan) {
        setError("Please fill in all required fields and upload Aadhaar document")
        return
      }

      setIsLoading(true)
      // Simulate API call
      setTimeout(() => {
        router.push("/(customer)/dashboard")
        setIsLoading(false)
      }, 1500)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      district: value,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            <h1 className="text-xl sm:text-2xl font-bold">AssetLend</h1>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground">Create your account to get started</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-1 sm:space-x-2 overflow-x-auto pb-2">
          <div
            className={`flex items-center space-x-1 sm:space-x-2 ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}
          >
            <div
              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 text-xs sm:text-sm ${step >= 1 ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"}`}
            >
              {step > 1 ? <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" /> : "1"}
            </div>
            <span className="text-xs font-medium whitespace-nowrap">Account</span>
          </div>
          <div className={`w-3 h-0.5 sm:w-4 ${step > 1 ? "bg-primary" : "bg-muted-foreground"}`} />
          <div
            className={`flex items-center space-x-1 sm:space-x-2 ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}
          >
            <div
              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 text-xs sm:text-sm ${step >= 2 ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"}`}
            >
              {step > 2 ? <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" /> : "2"}
            </div>
            <span className="text-xs font-medium whitespace-nowrap">Verify</span>
          </div>
          <div className={`w-3 h-0.5 sm:w-4 ${step > 2 ? "bg-primary" : "bg-muted-foreground"}`} />
          <div
            className={`flex items-center space-x-1 sm:space-x-2 ${step >= 3 ? "text-primary" : "text-muted-foreground"}`}
          >
            <div
              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 text-xs sm:text-sm ${step >= 3 ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"}`}
            >
              3
            </div>
            <span className="text-xs font-medium whitespace-nowrap">Details</span>
          </div>
        </div>

        {/* Registration Form */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg sm:text-xl">
              {step === 1 ? "Create Account" : step === 2 ? "Verify Identity" : "Personal Details"}
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              {step === 1
                ? "Enter your basic information to get started"
                : step === 2
                  ? "Verify your email and phone number"
                  : "Complete your profile with additional details"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {step === 1 ? (
                <>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </>
              ) : step === 2 ? (
                <>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Email Verification</Label>
                      <div className="flex gap-2">
                        <Input value={formData.email} disabled className="flex-1 text-xs sm:text-sm" />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => handleSendOtp("email")}
                          disabled={otpSent.email || isLoading}
                          className="bg-transparent text-xs sm:text-sm px-2 sm:px-4"
                          size="sm"
                        >
                          {otpSent.email ? "Sent" : "Send OTP"}
                        </Button>
                      </div>
                      {otpSent.email && (
                        <Input
                          placeholder="Enter 6-digit OTP"
                          value={emailOtp}
                          onChange={(e) => setEmailOtp(e.target.value)}
                          maxLength={6}
                          required
                        />
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Phone Verification</Label>
                      <div className="flex gap-2">
                        <Input value={formData.phone} disabled className="flex-1 text-xs sm:text-sm" />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => handleSendOtp("phone")}
                          disabled={otpSent.phone || isLoading}
                          className="bg-transparent text-xs sm:text-sm px-2 sm:px-4"
                          size="sm"
                        >
                          {otpSent.phone ? "Sent" : "Send OTP"}
                        </Button>
                      </div>
                      {otpSent.phone && (
                        <Input
                          placeholder="Enter 6-digit OTP"
                          value={phoneOtp}
                          onChange={(e) => setPhoneOtp(e.target.value)}
                          maxLength={6}
                          required
                        />
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="district">District</Label>
                    <Select onValueChange={handleSelectChange} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your district" />
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="Enter your full address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pincode">PIN Code</Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      placeholder="400001"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="aadhaar">Aadhaar Document</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-3 sm:p-4">
                      {!aadhaarFile ? (
                        <div className="text-center">
                          <Upload className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-xs sm:text-sm text-muted-foreground mb-2">Upload Aadhaar Card</p>
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="aadhaar-upload"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => document.getElementById("aadhaar-upload")?.click()}
                            className="bg-transparent text-xs sm:text-sm"
                          >
                            Choose File
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/10 rounded flex items-center justify-center">
                              <Upload className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                            </div>
                            <div>
                              <p className="text-xs sm:text-sm font-medium truncate max-w-[150px] sm:max-w-none">
                                {aadhaarFile.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {(aadhaarFile.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <Button type="button" variant="ghost" size="sm" onClick={removeFile}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pan">PAN Number</Label>
                    <Input
                      id="pan"
                      name="pan"
                      placeholder="ABCDE1234F"
                      value={formData.pan}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </>
              )}

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full sm:flex-1 bg-transparent"
                    onClick={() => setStep(step - 1)}
                  >
                    Back
                  </Button>
                )}
                <Button type="submit" className="w-full sm:flex-1 h-10 sm:h-11" disabled={isLoading}>
                  {isLoading ? "Processing..." : step === 3 ? "Create Account" : "Continue"}
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
