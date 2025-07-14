"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestInvite() {
  const router = useRouter()

  const createTestInvitation = () => {
    // Create mock invitation data
    const mockInviteData = {
      token: "valid-token-123",
      email: "john.doe@example.com",
      programManagerName: "Sarah Johnson",
      organizationName: "Klab Rwanda",
      expiresAt: "2024-01-15T23:59:59Z",
      programs: ["Software Engineering Bootcamp", "Tech for Kids"],
    }

    // Store invitation data
    localStorage.setItem("facilitatorInvite", JSON.stringify(mockInviteData))

    // Redirect to onboarding
    router.push("/onboarding")
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Test Invitation</CardTitle>
          <CardDescription>Click below to simulate receiving an invitation email</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={createTestInvitation} className="w-full" size="lg">
            Accept Test Invitation & Start Onboarding
          </Button>

          <div className="text-xs text-muted-foreground space-y-1">
            <p>
              <strong>This will simulate:</strong>
            </p>
            <p>• Receiving invitation email</p>
            <p>• Clicking the invitation link</p>
            <p>• Starting the onboarding process</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
