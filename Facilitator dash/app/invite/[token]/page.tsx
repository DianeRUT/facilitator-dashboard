"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function InviteAcceptance() {
  const params = useParams()
  const router = useRouter()
  const [inviteStatus, setInviteStatus] = useState<"loading" | "valid" | "invalid" | "expired">("loading")
  const [inviteData, setInviteData] = useState<any>(null)

  const token = params.token as string

  useEffect(() => {
    // Simulate invite validation
    const validateInvite = async () => {
      try {
        // In real app, this would be an API call to validate the token
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Simulate different invite states
        const mockInvites = {
          "valid-token-123": {
            status: "valid",
            email: "john.doe@example.com",
            programManagerName: "Sarah Johnson",
            organizationName: "Klab Rwanda",
            expiresAt: "2024-01-15T23:59:59Z",
            programs: ["Software Engineering Bootcamp", "Tech for Kids"],
          },
          "expired-token-456": {
            status: "expired",
          },
        }

        const invite = mockInvites[token as keyof typeof mockInvites]

        if (invite) {
          setInviteStatus(invite.status as any)
          setInviteData(invite)
        } else {
          setInviteStatus("invalid")
        }
      } catch (error) {
        setInviteStatus("invalid")
      }
    }

    if (token) {
      validateInvite()
    } else {
      setInviteStatus("invalid")
    }
  }, [token])

  const acceptInvite = () => {
    // Store invite data in localStorage for onboarding
    localStorage.setItem("facilitatorInvite", JSON.stringify({ token, ...inviteData }))
    router.push("/onboarding")
  }

  const declineInvite = () => {
    // Handle invite decline
    alert("Invitation declined. You can close this window.")
  }

  if (inviteStatus === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <h2 className="text-lg font-semibold text-foreground mb-2">Validating Invitation</h2>
            <p className="text-muted-foreground">Please wait while we verify your invitation...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (inviteStatus === "invalid") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-8">
            <XCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
            <h2 className="text-xl font-semibold text-red-500 mb-2">Invalid Invitation</h2>
            <p className="text-muted-foreground mb-4">
              This invitation link is invalid or has been tampered with. Please contact your Program Manager for a new
              invitation.
            </p>
            <Button variant="outline" onClick={() => window.close()}>
              Close Window
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (inviteStatus === "expired") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-8">
            <XCircle className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
            <h2 className="text-xl font-semibold text-yellow-600 mb-2">Invitation Expired</h2>
            <p className="text-muted-foreground mb-4">
              This invitation has expired. Please contact your Program Manager to request a new invitation.
            </p>
            <Button variant="outline" onClick={() => window.close()}>
              Close Window
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-card border-border">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-2xl text-foreground">Facilitator Invitation</CardTitle>
              <CardDescription>You've been invited to join Klab as a facilitator</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Invitation Details */}
          <div className="bg-muted p-4 rounded-lg space-y-3">
            <div>
              <h4 className="font-medium text-foreground mb-3">Invitation Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Organization:</span>
                  <span className="font-medium text-foreground">{inviteData.organizationName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Invited by:</span>
                  <span className="font-medium text-foreground">{inviteData.programManagerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium text-foreground">{inviteData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Expires:</span>
                  <span className="font-medium text-foreground">
                    {new Date(inviteData.expiresAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Assigned Programs */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Assigned Programs</h4>
            <div className="space-y-2">
              {inviteData.programs.map((program: string, index: number) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-foreground">{program}</span>
                </div>
              ))}
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">What happens next?</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Complete your profile setup</li>
              <li>• Set up biometric authentication</li>
              <li>• Access your facilitator dashboard</li>
              <li>• Start managing your assigned programs</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button onClick={acceptInvite} className="flex-1">
              Accept Invitation
            </Button>
            <Button variant="outline" onClick={declineInvite}>
              Decline
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            By accepting this invitation, you agree to Klab's terms of service and privacy policy.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
