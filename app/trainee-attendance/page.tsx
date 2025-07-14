"use client"

import { useState, useRef, useCallback } from "react"
import { Camera, CheckCircle, User, Scan } from "lucide-react"
import { useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function TraineeAttendance() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session")
  const facilitator = searchParams.get("facilitator")

  const [isScanning, setIsScanning] = useState(false)
  const [attendanceMarked, setAttendanceMarked] = useState(false)
  const [studentName, setStudentName] = useState("")
  const [scanningProgress, setScanningProgress] = useState(0)
  const [faceDetected, setFaceDetected] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const startCamera = useCallback(async () => {
    if (!studentName.trim()) {
      alert("Please enter your name first")
      return
    }

    setIsScanning(true)
    setScanningProgress(0)
    setFaceDetected(false)

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

        // Simulate face detection
        const detectionInterval = setInterval(() => {
          setScanningProgress((prev) => {
            if (prev >= 100) {
              clearInterval(detectionInterval)
              setFaceDetected(true)
              return 100
            }
            return prev + 15
          })
        }, 300)
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      alert("Camera access denied. Please allow camera permissions and try again.")
      setIsScanning(false)
    }
  }, [studentName])

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
    setIsScanning(false)
    setScanningProgress(0)
    setFaceDetected(false)
  }, [])

  const markAttendance = useCallback(() => {
    if (!faceDetected) {
      alert("Please wait for face detection to complete")
      return
    }

    // Simulate attendance marking
    setTimeout(() => {
      setAttendanceMarked(true)
      stopCamera()
      alert(`Attendance marked successfully for ${studentName}!`)
    }, 1500)
  }, [faceDetected, studentName, stopCamera])

  if (!sessionId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-6">
            <h2 className="text-xl font-semibold text-red-500 mb-2">Invalid Session</h2>
            <p className="text-muted-foreground">This attendance link is invalid or has expired.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card border-border">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <User className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-xl text-foreground">Klab Attendance</CardTitle>
              <CardDescription>Mark your attendance for today's class</CardDescription>
            </div>
          </div>

          <div className="space-y-2">
            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500">
              Session Active
            </Badge>
            <p className="text-sm text-muted-foreground">Facilitator: {facilitator?.replace("-", " ") || "Unknown"}</p>
            <p className="text-xs text-muted-foreground">Session ID: {sessionId}</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {!attendanceMarked ? (
            <>
              {/* Student Name Input */}
              <div className="space-y-2">
                <Label htmlFor="studentName">Your Full Name</Label>
                <Input
                  id="studentName"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter your full name"
                  disabled={isScanning}
                />
              </div>

              {/* Camera Section */}
              <div className="space-y-4">
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                  {isScanning ? (
                    <>
                      <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />

                      {/* Face detection overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className={`w-40 h-40 border-4 rounded-full transition-colors duration-300 ${
                            faceDetected ? "border-green-500" : "border-yellow-500 animate-pulse"
                          }`}
                        />
                      </div>

                      {/* Progress indicator */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-black/70 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white text-sm">
                              {faceDetected ? "Face detected!" : "Detecting face..."}
                            </span>
                            <span className="text-white text-sm">{scanningProgress}%</span>
                          </div>
                          <div className="w-full bg-gray-600 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${
                                faceDetected ? "bg-green-500" : "bg-yellow-500"
                              }`}
                              style={{ width: `${scanningProgress}%` }}
                            />
                          </div>
                        </div>
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
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {!isScanning ? (
                  <Button onClick={startCamera} className="flex-1" disabled={!studentName.trim()}>
                    <Camera className="mr-2 h-4 w-4" />
                    Start Camera
                  </Button>
                ) : (
                  <>
                    <Button onClick={markAttendance} disabled={!faceDetected} className="flex-1">
                      {faceDetected ? (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Mark Attendance
                        </>
                      ) : (
                        <>
                          <Scan className="mr-2 h-4 w-4" />
                          Scanning...
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={stopCamera}>
                      Cancel
                    </Button>
                  </>
                )}
              </div>

              {/* Instructions */}
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Instructions:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Enter your full name above</li>
                  <li>• Allow camera access when prompted</li>
                  <li>• Position your face in the circle</li>
                  <li>• Wait for face detection to complete</li>
                  <li>• Click "Mark Attendance" when ready</li>
                </ul>
              </div>
            </>
          ) : (
            /* Success State */
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="h-16 w-16 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Attendance Marked!</h3>
                <p className="text-muted-foreground">
                  Thank you, {studentName}. Your attendance has been recorded successfully.
                </p>
              </div>

              <div className="bg-muted p-4 rounded-lg text-left">
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>
                    <strong>Time:</strong> {new Date().toLocaleTimeString()}
                  </p>
                  <p>
                    <strong>Date:</strong> {new Date().toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Session:</strong> {sessionId}
                  </p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">You can now close this window and join the class.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
