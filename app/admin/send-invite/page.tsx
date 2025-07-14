"use client"

import { useState } from "react"
import { Send, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

export default function SendInvite() {
  const [inviteData, setInviteData] = useState({
    email: "",
    programManagerName: "Sarah Johnson",
    organizationName: "Klab Rwanda",
    customMessage: "",
  })

  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([])

  const availablePrograms = [
    "Software Engineering Bootcamp",
    "Tech for Kids",
    "Sales Training Program",
    "Digital Marketing Essentials",
    "Data Science Fundamentals",
    "Mobile App Development",
  ]

  const handleProgramToggle = (program: string) => {
    setSelectedPrograms((prev) => (prev.includes(program) ? prev.filter((p) => p !== program) : [...prev, program]))
  }

  const generateInviteLink = () => {
    // Generate a secure token (in real app, this would be generated server-side)
    const token = `invite-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    return `${window.location.origin}/invite/${token}`
  }

  const sendInvitation = () => {
    if (!inviteData.email || selectedPrograms.length === 0) {
      alert("Please fill in email and select at least one program")
      return
    }

    const inviteLink = generateInviteLink()

    // In real app, this would send an actual email
    const emailContent = `
Subject: Facilitator Invitation - ${inviteData.organizationName}

Dear Facilitator,

You have been invited to join ${inviteData.organizationName} as a facilitator by ${inviteData.programManagerName}.

Programs assigned to you:
${selectedPrograms.map((p) => `• ${p}`).join("\n")}

To accept this invitation and complete your setup, please click the link below:
${inviteLink}

This invitation will expire in 7 days.

${inviteData.customMessage ? `\nPersonal message:\n${inviteData.customMessage}` : ""}

Best regards,
${inviteData.programManagerName}
Program Manager, ${inviteData.organizationName}
    `

    // Simulate sending email
    console.log("Email sent:", emailContent)

    // Copy invite link to clipboard
    navigator.clipboard.writeText(inviteLink)

    alert(
      `✅ Invitation sent successfully!\n\nInvite link copied to clipboard:\n${inviteLink}\n\n(In production, this would be sent via email)`,
    )

    // Reset form
    setInviteData((prev) => ({ ...prev, email: "", customMessage: "" }))
    setSelectedPrograms([])
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-xl text-foreground">Send Facilitator Invitation</CardTitle>
                <CardDescription>Invite a new facilitator to join your organization</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Program Manager Info */}
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-medium text-foreground mb-3">Invitation Details</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pmName">Program Manager Name</Label>
                  <Input
                    id="pmName"
                    value={inviteData.programManagerName}
                    onChange={(e) => setInviteData((prev) => ({ ...prev, programManagerName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orgName">Organization Name</Label>
                  <Input
                    id="orgName"
                    value={inviteData.organizationName}
                    onChange={(e) => setInviteData((prev) => ({ ...prev, organizationName: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            {/* Facilitator Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Facilitator Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={inviteData.email}
                onChange={(e) => setInviteData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="facilitator@example.com"
              />
            </div>

            {/* Program Selection */}
            <div className="space-y-3">
              <Label>Assign Programs *</Label>
              <div className="grid grid-cols-2 gap-3">
                {availablePrograms.map((program) => (
                  <div key={program} className="flex items-center space-x-2">
                    <Checkbox
                      id={program}
                      checked={selectedPrograms.includes(program)}
                      onCheckedChange={() => handleProgramToggle(program)}
                    />
                    <Label htmlFor={program} className="text-sm font-normal">
                      {program}
                    </Label>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">Selected: {selectedPrograms.length} program(s)</p>
            </div>

            {/* Custom Message */}
            <div className="space-y-2">
              <Label htmlFor="message">Personal Message (Optional)</Label>
              <Textarea
                id="message"
                value={inviteData.customMessage}
                onChange={(e) => setInviteData((prev) => ({ ...prev, customMessage: e.target.value }))}
                placeholder="Add a personal welcome message..."
                rows={3}
              />
            </div>

            {/* Preview */}
            {inviteData.email && selectedPrograms.length > 0 && (
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Invitation Preview</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>
                    <strong>To:</strong> {inviteData.email}
                  </p>
                  <p>
                    <strong>From:</strong> {inviteData.programManagerName}
                  </p>
                  <p>
                    <strong>Organization:</strong> {inviteData.organizationName}
                  </p>
                  <p>
                    <strong>Programs:</strong> {selectedPrograms.join(", ")}
                  </p>
                  <p>
                    <strong>Expires:</strong> 7 days from now
                  </p>
                </div>
              </div>
            )}

            {/* Send Button */}
            <Button
              onClick={sendInvitation}
              className="w-full"
              size="lg"
              disabled={!inviteData.email || selectedPrograms.length === 0}
            >
              <Send className="mr-2 h-5 w-5" />
              Send Invitation
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              The facilitator will receive an email with a secure link to complete their setup.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
