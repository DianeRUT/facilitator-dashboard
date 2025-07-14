"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Users, BookOpen, Calendar, TrendingUp, Clock, CheckCircle, BarChart3, PlusCircle, Eye } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

export default function Dashboard() {
  const router = useRouter()
  const [createSessionOpen, setCreateSessionOpen] = useState(false)
  const [viewProgramOpen, setViewProgramOpen] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState<any>(null)
  const [sessionData, setSessionData] = useState({
    name: "",
    program: "",
    type: "",
    date: "",
    time: "",
    description: "",
  })

  const stats = [
    {
      title: "Active Programs",
      value: "12",
      change: "+2 from last month",
      icon: BookOpen,
      color: "text-website-primary",
      bgColor: "bg-website-primary/10",
    },
    {
      title: "Total Trainees",
      value: "248",
      change: "+18 from last month",
      icon: Users,
      color: "text-website-grey",
      bgColor: "bg-website-grey/10",
    },
    {
      title: "Completion Rate",
      value: "87%",
      change: "+5% from last month",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      title: "Upcoming Sessions",
      value: "24",
      change: "Next 7 days",
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/20",
    },
  ]

  const recentPrograms = [
    {
      id: 1,
      name: "Web Development Bootcamp",
      trainees: 32,
      progress: 75,
      status: "Active",
      nextSession: "Today, 2:00 PM",
      description:
        "Comprehensive full-stack web development program covering HTML, CSS, JavaScript, React, and Node.js",
      startDate: "2024-01-15",
      endDate: "2024-06-15",
      location: "Room A1",
    },
    {
      id: 2,
      name: "Data Science Fundamentals",
      trainees: 28,
      progress: 60,
      status: "Active",
      nextSession: "Tomorrow, 10:00 AM",
      description: "Introduction to data analysis, machine learning, and statistical modeling using Python",
      startDate: "2024-02-01",
      endDate: "2024-05-01",
      location: "Room B2",
    },
    {
      id: 3,
      name: "Mobile App Development",
      trainees: 24,
      progress: 90,
      status: "Ending Soon",
      nextSession: "Friday, 3:00 PM",
      description: "iOS and Android app development using React Native and Flutter",
      startDate: "2024-01-01",
      endDate: "2024-04-01",
      location: "Room C3",
    },
    {
      id: 4,
      name: "UI/UX Design Workshop",
      trainees: 18,
      progress: 45,
      status: "Active",
      nextSession: "Monday, 9:00 AM",
      description: "User interface and experience design principles with hands-on projects",
      startDate: "2024-03-01",
      endDate: "2024-05-15",
      location: "Design Lab",
    },
  ]

  const upcomingSessions = [
    {
      program: "Web Development Bootcamp",
      time: "2:00 PM - 4:00 PM",
      topic: "React Fundamentals",
      trainees: 32,
    },
    {
      program: "Data Science Fundamentals",
      time: "10:00 AM - 12:00 PM",
      topic: "Machine Learning Basics",
      trainees: 28,
    },
    {
      program: "Mobile App Development",
      time: "3:00 PM - 5:00 PM",
      topic: "App Store Deployment",
      trainees: 24,
    },
  ]

  const handleCreateSession = () => {
    if (!sessionData.name || !sessionData.program || !sessionData.type) {
      alert("Please fill in all required fields")
      return
    }

    console.log("Creating session:", sessionData)
    alert(`Session "${sessionData.name}" created successfully!`)
    setCreateSessionOpen(false)
    setSessionData({
      name: "",
      program: "",
      type: "",
      date: "",
      time: "",
      description: "",
    })
  }

  const handleViewProgram = (program: any) => {
    setSelectedProgram(program)
    setViewProgramOpen(true)
  }

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "create-program":
        alert("Redirecting to create program page...")
        break
      case "manage-trainees":
        router.push("/programs")
        break
      case "mark-attendance":
        router.push("/attendance")
        break
      case "view-reports":
        alert("Redirecting to reports page...")
        break
      default:
        break
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, John! Here's what's happening with your programs today.</p>
            </div>
            <div className="flex items-center space-x-2">
              <Dialog open={createSessionOpen} onOpenChange={setCreateSessionOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-website-primary hover:bg-website-primary/90 text-white">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Session
                  </Button>
                </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Session</DialogTitle>
                <DialogDescription>Set up a new class session for your program</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="session-name">Session Name *</Label>
                  <Input
                    id="session-name"
                    placeholder="e.g., React Components Workshop"
                    value={sessionData.name}
                    onChange={(e) => setSessionData({ ...sessionData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="program">Program *</Label>
                  <Select
                    value={sessionData.program}
                    onValueChange={(value) => setSessionData({ ...sessionData, program: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a program" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web-dev">Web Development Bootcamp</SelectItem>
                      <SelectItem value="data-science">Data Science Fundamentals</SelectItem>
                      <SelectItem value="mobile-dev">Mobile App Development</SelectItem>
                      <SelectItem value="ui-ux">UI/UX Design Workshop</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="session-type">Session Type *</Label>
                  <Select
                    value={sessionData.type}
                    onValueChange={(value) => setSessionData({ ...sessionData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select session type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in-person">In-Person</SelectItem>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={sessionData.date}
                      onChange={(e) => setSessionData({ ...sessionData, date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={sessionData.time}
                      onChange={(e) => setSessionData({ ...sessionData, time: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of the session..."
                    value={sessionData.description}
                    onChange={(e) => setSessionData({ ...sessionData, description: e.target.value })}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-website-primary hover:bg-website-primary/90"
                    onClick={handleCreateSession}
                  >
                    Create Session
                  </Button>
                  <Button variant="outline" onClick={() => setCreateSessionOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border border-border bg-card hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Programs */}
        <Card className="col-span-2 border border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Recent Programs</CardTitle>
            <CardDescription>Your active programs and their current progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentPrograms.map((program, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/50"
              >
                <div className="space-y-1">
                  <p className="font-medium text-card-foreground">{program.name}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Users className="mr-1 h-3 w-3" />
                      {program.trainees} trainees
                    </span>
                    <span className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {program.nextSession}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Progress value={program.progress} className="w-32" />
                    <span className="text-sm text-muted-foreground">{program.progress}%</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={program.status === "Active" ? "default" : "secondary"}
                    className={program.status === "Active" ? "bg-website-primary text-white" : ""}
                  >
                    {program.status}
                  </Badge>
                  <Button variant="ghost" size="sm" onClick={() => handleViewProgram(program)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Sessions */}
        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Today's Sessions</CardTitle>
            <CardDescription>Your scheduled sessions for today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingSessions.map((session, index) => (
              <div key={index} className="space-y-2 p-3 rounded-lg border border-border bg-muted/30">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm text-card-foreground">{session.program}</p>
                  <Badge variant="outline" className="text-xs">
                    {session.trainees} trainees
                  </Badge>
                </div>
                <p className="text-sm text-website-primary font-medium">{session.topic}</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  {session.time}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border border-border bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button
              variant="outline"
              className="h-20 flex-col space-y-2 hover:bg-website-primary/10 hover:border-website-primary bg-transparent"
              onClick={() => handleQuickAction("create-program")}
            >
              <BookOpen className="h-6 w-6 text-website-primary" />
              <span className="text-sm">Create Program</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col space-y-2 hover:bg-website-grey/10 hover:border-website-grey bg-transparent"
              onClick={() => handleQuickAction("manage-trainees")}
            >
              <Users className="h-6 w-6 text-website-grey" />
              <span className="text-sm">Manage Trainees</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col space-y-2 hover:bg-green-100 hover:border-green-500 dark:hover:bg-green-900/20 bg-transparent"
              onClick={() => handleQuickAction("mark-attendance")}
            >
              <CheckCircle className="h-6 w-6 text-green-600" />
              <span className="text-sm">Mark Attendance</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col space-y-2 hover:bg-orange-100 hover:border-orange-500 dark:hover:bg-orange-900/20 bg-transparent"
              onClick={() => handleQuickAction("view-reports")}
            >
              <BarChart3 className="h-6 w-6 text-orange-600" />
              <span className="text-sm">View Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Program Details Dialog */}
      <Dialog open={viewProgramOpen} onOpenChange={setViewProgramOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Program Details</DialogTitle>
            <DialogDescription>Detailed information about the selected program</DialogDescription>
          </DialogHeader>
          {selectedProgram && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg text-foreground">{selectedProgram.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{selectedProgram.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Start Date</p>
                  <p className="font-medium text-foreground">
                    {new Date(selectedProgram.startDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">End Date</p>
                  <p className="font-medium text-foreground">
                    {new Date(selectedProgram.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Location</p>
                  <p className="font-medium text-foreground">{selectedProgram.location}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Trainees</p>
                  <p className="font-medium text-foreground">{selectedProgram.trainees}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-foreground">{selectedProgram.progress}%</span>
                </div>
                <Progress value={selectedProgram.progress} className="h-2" />
              </div>

              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-website-primary hover:bg-website-primary/90"
                  onClick={() => router.push("/programs")}
                >
                  View Full Details
                </Button>
                <Button variant="outline" onClick={() => setViewProgramOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
