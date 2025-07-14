"use client"

import { useState } from "react"
import { Search, MoreHorizontal, Users, Calendar, Clock, BookOpen } from "lucide-react"

import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Programs() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false)
  const [traineesDialogOpen, setTraineesDialogOpen] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState<any>(null)

  // Mock data for assigned programs (facilitators only see their assigned programs)
  const assignedPrograms = [
    {
      id: 1,
      name: "Software Engineering Bootcamp",
      description: "Comprehensive full-stack development program",
      trainees: 24,
      totalCapacity: 30,
      startDate: "2024-01-15",
      endDate: "2024-06-15",
      status: "Active",
      progress: 65,
      nextSession: "Today, 2:00 PM",
      location: "Room A1",
      category: "Development",
      schedule: [
        { day: "Monday", time: "9:00 AM - 12:00 PM", topic: "JavaScript Fundamentals" },
        { day: "Wednesday", time: "2:00 PM - 5:00 PM", topic: "React Components" },
        { day: "Friday", time: "10:00 AM - 1:00 PM", topic: "Node.js Backend" },
      ],
      students: [
        { id: 1, name: "Alice Johnson", email: "alice@klab.rw", attendance: 95, status: "Active" },
        { id: 2, name: "Bob Smith", email: "bob@klab.rw", attendance: 88, status: "Active" },
        { id: 3, name: "Carol Davis", email: "carol@klab.rw", attendance: 92, status: "Active" },
      ],
    },
    {
      id: 2,
      name: "Data Science Fundamentals",
      description: "Introduction to data analysis and machine learning",
      trainees: 18,
      totalCapacity: 25,
      startDate: "2024-02-01",
      endDate: "2024-05-01",
      status: "Active",
      progress: 45,
      nextSession: "Tomorrow, 10:00 AM",
      location: "Room B2",
      category: "Data Science",
      schedule: [
        { day: "Tuesday", time: "10:00 AM - 1:00 PM", topic: "Python for Data Science" },
        { day: "Thursday", time: "2:00 PM - 5:00 PM", topic: "Machine Learning Basics" },
      ],
      students: [
        { id: 4, name: "David Wilson", email: "david@klab.rw", attendance: 90, status: "Active" },
        { id: 5, name: "Emma Brown", email: "emma@klab.rw", attendance: 85, status: "Active" },
      ],
    },
    {
      id: 3,
      name: "Mobile App Development",
      description: "iOS and Android app development with React Native",
      trainees: 15,
      totalCapacity: 20,
      startDate: "2024-01-01",
      endDate: "2024-04-01",
      status: "Ending Soon",
      progress: 90,
      nextSession: "Friday, 3:00 PM",
      location: "Room C3",
      category: "Mobile",
      schedule: [
        { day: "Monday", time: "3:00 PM - 6:00 PM", topic: "React Native Basics" },
        { day: "Friday", time: "1:00 PM - 4:00 PM", topic: "App Store Deployment" },
      ],
      students: [
        { id: 6, name: "Frank Miller", email: "frank@klab.rw", attendance: 93, status: "Active" },
        { id: 7, name: "Grace Lee", email: "grace@klab.rw", attendance: 87, status: "Active" },
      ],
    },
    {
      id: 4,
      name: "UI/UX Design Workshop",
      description: "User interface and experience design principles",
      trainees: 12,
      totalCapacity: 15,
      startDate: "2024-03-01",
      endDate: "2024-05-15",
      status: "Active",
      progress: 30,
      nextSession: "Monday, 9:00 AM",
      location: "Design Lab",
      category: "Design",
      schedule: [
        { day: "Monday", time: "9:00 AM - 12:00 PM", topic: "Design Principles" },
        { day: "Wednesday", time: "2:00 PM - 5:00 PM", topic: "Prototyping Tools" },
      ],
      students: [
        { id: 8, name: "Henry Clark", email: "henry@klab.rw", attendance: 96, status: "Active" },
        { id: 9, name: "Ivy Martinez", email: "ivy@klab.rw", attendance: 89, status: "Active" },
      ],
    },
  ]

  const filteredPrograms = assignedPrograms.filter((program) => {
    const matchesSearch =
      program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || program.status.toLowerCase().replace(" ", "-") === filterStatus
    const matchesCategory = filterCategory === "all" || program.category.toLowerCase() === filterCategory

    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "Ending Soon":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
      case "Completed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
    }
  }

  const handleViewSchedule = (program: any) => {
    setSelectedProgram(program)
    setScheduleDialogOpen(true)
  }

  const handleViewTrainees = (program: any) => {
    setSelectedProgram(program)
    setTraineesDialogOpen(true)
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            <h1 className="text-lg font-semibold">My Programs</h1>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Assigned Programs</h2>
              <p className="text-muted-foreground">Manage your assigned programs and track their progress</p>
            </div>
            {/* Facilitators cannot create new programs */}
            <div className="text-sm text-muted-foreground bg-muted px-3 py-2 rounded-lg">
              Contact admin to request new program assignments
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="ending-soon">Ending Soon</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="data science">Data Science</SelectItem>
                <SelectItem value="mobile">Mobile</SelectItem>
                <SelectItem value="design">Design</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Programs Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPrograms.map((program) => (
              <Card key={program.id} className="bg-card border-border hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg text-foreground">{program.name}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {program.category}
                      </Badge>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleViewTrainees(program)}>View Trainees</DropdownMenuItem>
                        <DropdownMenuItem>Mark Attendance</DropdownMenuItem>
                        <DropdownMenuItem>Upload Resources</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription className="text-sm">{program.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Status Badge */}
                  <div className="flex items-center justify-between">
                    <Badge className={getStatusColor(program.status)}>{program.status}</Badge>
                    <span className="text-sm text-muted-foreground">{program.progress}% Complete</span>
                  </div>

                  {/* Progress Bar */}
                  <Progress value={program.progress} className="h-2" />

                  {/* Program Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">
                        {program.trainees}/{program.totalCapacity}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{new Date(program.startDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Next Session */}
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-website-primary" />
                      <span className="font-medium text-foreground">Next Session:</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {program.nextSession} • {program.location}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-website-primary hover:bg-website-primary/90"
                      onClick={() => handleViewSchedule(program)}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      View Schedule
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => handleViewTrainees(program)}
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Trainees
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredPrograms.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">No programs found</h3>
              <p className="mt-2 text-muted-foreground">
                {searchTerm || filterStatus !== "all" || filterCategory !== "all"
                  ? "Try adjusting your search terms or filters"
                  : "You haven't been assigned any programs yet"}
              </p>
            </div>
          )}

          {/* Summary Stats */}
          <div className="grid gap-4 md:grid-cols-4 mt-8">
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-website-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Programs</p>
                    <p className="text-2xl font-bold text-foreground">{assignedPrograms.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-website-grey" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Trainees</p>
                    <p className="text-2xl font-bold text-foreground">
                      {assignedPrograms.reduce((sum, program) => sum + program.trainees, 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Active Programs</p>
                    <p className="text-2xl font-bold text-foreground">
                      {assignedPrograms.filter((p) => p.status === "Active").length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Progress</p>
                    <p className="text-2xl font-bold text-foreground">
                      {Math.round(
                        assignedPrograms.reduce((sum, program) => sum + program.progress, 0) / assignedPrograms.length,
                      )}
                      %
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Schedule Dialog */}
        <Dialog open={scheduleDialogOpen} onOpenChange={setScheduleDialogOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Program Schedule</DialogTitle>
              <DialogDescription>Weekly schedule for {selectedProgram?.name}</DialogDescription>
            </DialogHeader>
            {selectedProgram && (
              <div className="space-y-4">
                <div className="space-y-3">
                  {selectedProgram.schedule.map((session: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                      <div>
                        <p className="font-medium text-foreground">{session.day}</p>
                        <p className="text-sm text-muted-foreground">{session.topic}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">{session.time}</p>
                        <p className="text-xs text-muted-foreground">{selectedProgram.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full" onClick={() => setScheduleDialogOpen(false)}>
                  Close
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Trainees Dialog */}
        <Dialog open={traineesDialogOpen} onOpenChange={setTraineesDialogOpen}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Program Trainees</DialogTitle>
              <DialogDescription>Students enrolled in {selectedProgram?.name}</DialogDescription>
            </DialogHeader>
            {selectedProgram && (
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedProgram.students.map((student: any) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/placeholder.svg" alt={student.name} />
                              <AvatarFallback>
                                {student.name
                                  .split(" ")
                                  .map((n: string) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{student.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{student.email}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-muted rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${student.attendance}%` }}
                              />
                            </div>
                            <span className="text-sm">{student.attendance}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-100 text-green-700">
                            {student.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Button className="w-full" onClick={() => setTraineesDialogOpen(false)}>
                  Close
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </SidebarInset>
    </SidebarProvider>
  )
}
