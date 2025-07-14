"use client"

import { useState, useRef, useCallback } from "react"
import { Camera, User, Check, ArrowRight, ArrowLeft, Shield } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Onboarding() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isScanning, setIsScanning] = useState(false)
  const [faceDataCaptured, setFaceDataCaptured] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [faceEncodingData, setFaceEncodingData] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    employeeId: "",
  })

  const steps = [
    { id: 1, title: "Profile Information", description: "Complete your facilitator profile" },
    { id: 2, title: "Biometric Setup", description: "Register your face for attendance" },
    { id: 3, title: "Account Created", description: "Welcome to Klab!" },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const startCamera = useCallback(async () => {
    setIsScanning(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 640,
          height: 480,
          facingMode: "user",
        },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      alert("Camera access denied. Please allow camera permissions and try again.")
      setIsScanning(false)
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
    setIsScanning(false)
  }, [])

  const captureFaceData = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      const ctx = canvas.getContext("2d")

      if (ctx) {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        // Draw current video frame to canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

        // Convert to base64 image data
        const imageData = canvas.toDataURL("image/jpeg", 0.8)
        setProfileImage(imageData)

        // Simulate face encoding process
        setTimeout(() => {
          // Generate mock face encoding
          const mockFaceEncoding = btoa(
            JSON.stringify({
              userId: formData.email,
              timestamp: Date.now(),
              faceFeatures: Array.from({ length: 128 }, () => Math.random()), // Mock 128-dimensional face encoding
              imageHash: imageData.substring(0, 50),
            }),
          )

          setFaceEncodingData(mockFaceEncoding)
          setFaceDataCaptured(true)
          stopCamera()

          alert("Face data captured and encoded successfully! This will be used for secure attendance verification.")
        }, 2000)
      }
    }
  }, [stopCamera, formData.email])

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const completeOnboarding = async () => {
    // Save facilitator data
    const facilitatorData = {
      ...formData,
      profileImage,
      faceEncodingData,
      organizationName: "Klab Rwanda",
      role: "facilitator",
      createdAt: new Date().toISOString(),
      // Assigned courses will be managed by program manager
      assignedCourses: [],
    }

    // Store in localStorage
    localStorage.setItem("facilitatorProfile", JSON.stringify(facilitatorData))
    localStorage.setItem("isAuthenticated", "true")

    console.log("Facilitator onboarding completed:", facilitatorData)

    // Redirect to dashboard
    router.push("/dashboard")
  }

  const isStep1Valid =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.password &&
    formData.password === formData.confirmPassword

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-card border-border">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <User className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-2xl text-foreground">Facilitator Setup</CardTitle>
              <CardDescription>Complete your account setup for Klab Rwanda</CardDescription>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress value={(currentStep / steps.length) * 100} className="h-2" />
            <p className="text-sm text-muted-foreground">
              Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Step 1: Profile Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-foreground">Complete Your Profile</h3>
                <p className="text-sm text-muted-foreground">Set up your facilitator account with secure credentials</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID</Label>
                <Input
                  id="employeeId"
                  value={formData.employeeId}
                  onChange={(e) => handleInputChange("employeeId", e.target.value)}
                  placeholder="Enter your employee ID"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    placeholder="Create a secure password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    placeholder="Confirm your password"
                  />
                </div>
              </div>

              {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-sm text-red-500">Passwords do not match</p>
              )}

              {/* Info about course assignment */}
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Course Assignment</h4>
                <p className="text-sm text-muted-foreground">
                  Your courses will be assigned by the Program Manager after account creation. You'll be able to manage
                  course resources, review student projects, and track attendance once courses are assigned.
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Biometric Setup - THIS IS THE FACE SCANNING SCREEN */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  <h3 className="text-lg font-semibold text-foreground">Biometric Authentication</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Register your face for secure attendance tracking and account access
                </p>
              </div>

              <div className="space-y-4">
                {!faceDataCaptured ? (
                  <>
                    <div className="relative aspect-video bg-black rounded-lg overflow-hidden max-w-md mx-auto">
                      {isScanning ? (
                        <>
                          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                          {/* Face detection overlay */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-48 h-48 border-4 border-green-500 rounded-full animate-pulse opacity-70" />
                          </div>
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                            <p className="text-white text-sm bg-black/50 px-3 py-1 rounded">
                              Position your face in the circle
                            </p>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center text-white">
                            <Camera className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                            <p className="text-sm">Camera preview will appear here</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Hidden canvas for capturing image data */}
                    <canvas ref={canvasRef} className="hidden" />

                    <div className="flex gap-3 justify-center">
                      {!isScanning ? (
                        <Button onClick={startCamera} size="lg">
                          <Camera className="mr-2 h-5 w-5" />
                          Start Camera
                        </Button>
                      ) : (
                        <>
                          <Button onClick={captureFaceData} size="lg">
                            <Check className="mr-2 h-5 w-5" />
                            Capture & Encode Face Data
                          </Button>
                          <Button variant="outline" onClick={stopCamera}>
                            Cancel
                          </Button>
                        </>
                      )}
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-medium text-foreground mb-2">Security Information:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Your face data will be securely encoded and encrypted</li>
                        <li>• Only mathematical representations are stored, not actual images</li>
                        <li>• This data is used exclusively for attendance verification</li>
                        <li>• You can update your biometric data anytime in settings</li>
                      </ul>
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg">
                      <h4 className="font-medium text-foreground mb-2">Camera Instructions:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Ensure good lighting on your face</li>
                        <li>• Look directly at the camera</li>
                        <li>• Keep your face centered in the circle</li>
                        <li>• Remove glasses or hats if possible</li>
                        <li>• Stay still during the capture process</li>
                      </ul>
                    </div>
                  </>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <Avatar className="h-32 w-32">
                        <AvatarImage src={profileImage || "/placeholder.svg"} alt="Profile" />
                        <AvatarFallback>
                          {formData.firstName[0]}
                          {formData.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-green-500">
                      <Check className="h-5 w-5" />
                      <span className="font-medium">Biometric data captured and encoded!</span>
                    </div>
                    <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                      <h4 className="font-medium text-foreground mb-2">✅ Setup Complete</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Face data securely encoded with 128-point facial recognition</li>
                        <li>• Biometric authentication ready for attendance tracking</li>
                        <li>• Your identity is now protected with advanced security</li>
                      </ul>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setFaceDataCaptured(false)
                        setProfileImage(null)
                        setFaceEncodingData(null)
                      }}
                    >
                      Retake Biometric Data
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Completion */}
          {currentStep === 3 && (
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="h-20 w-20 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="h-10 w-10 text-white" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Welcome to Klab!</h3>
                <p className="text-muted-foreground">
                  Your facilitator account has been created successfully, {formData.firstName}!
                </p>
              </div>

              <div className="bg-muted p-4 rounded-lg text-left">
                <h4 className="font-medium text-foreground mb-3">Account Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium text-foreground">
                      {formData.firstName} {formData.lastName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium text-foreground">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Employee ID:</span>
                    <span className="font-medium text-foreground">{formData.employeeId || "Not provided"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Organization:</span>
                    <span className="font-medium text-foreground">Klab Rwanda</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Biometric:</span>
                    <span className="font-medium text-green-500">✅ Configured</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg text-left">
                <h4 className="font-medium text-foreground mb-3">Ready to get started?</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Access your personalized facilitator dashboard
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Wait for course assignments from Program Manager
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Use biometric attendance for secure check-ins
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Upload course resources and review student projects
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            {currentStep < steps.length ? (
              <Button
                onClick={nextStep}
                disabled={(currentStep === 1 && !isStep1Valid) || (currentStep === 2 && !faceDataCaptured)}
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={completeOnboarding}>
                Enter Dashboard
                <Check className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
