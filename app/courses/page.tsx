"use client"

import { BookOpen, Users, Upload, Eye, MoreHorizontal } from "lucide-react"

import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

export default function Courses() {
  const courses = [
    {
      id: 1,
      name: "JavaScript Fundamentals",
      duration: "8 weeks",
      status: "Active",
      students: 20,
      progress: 65,
      startDate: "2024-01-15",
      endDate: "2024-03-15",
      resources: 12,
      description: "Complete introduction to JavaScript programming",
    },
    {
      id: 2,
      name: "React Components",
      duration: "6 weeks",
      status: "Active",
      students: 15,
      progress: 40,
      startDate: "2024-02-01",
      endDate: "2024-03-15",
      resources: 8,
      description: "Building interactive UIs with React",
    },
    {
      id: 3,
      name: "Web Development Basics",
      duration: "4 weeks",
      status: "Completed",
      students: 18,
      progress: 100,
      startDate: "2023-12-01",
      endDate: "2024-01-01",
      resources: 15,
      description: "HTML, CSS, and basic web development",
    },
    {
      id: 4,
      name: "Node.js Backend",
      duration: "10 weeks",
      status: "Upcoming",
      students: 12,
      progress: 0,
      startDate: "2024-03-01",
      endDate: "2024-05-10",
      resources: 3,
      description: "Server-side development with Node.js",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500"
      case "Completed":
        return "bg-blue-500"
      case "Upcoming":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center justify-between w-full">
            <h1 className="text-lg font-semibold">My Courses</h1>
            <div className="text-sm text-muted-foreground">Courses are assigned by Program Manager</div>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Courses Overview */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">4</div>
                <p className="text-xs text-muted-foreground">2 active, 1 completed, 1 upcoming</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">65</div>
                <p className="text-xs text-muted-foreground">Across all courses</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Resources Uploaded</CardTitle>
                <Upload className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">38</div>
                <p className="text-xs text-muted-foreground">Documents, videos, links</p>
              </CardContent>
            </Card>
          </div>

          {/* Courses Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            {courses.map((course) => (
              <Card key={course.id} className="bg-card border-border">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-foreground">{course.name}</CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Resources
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Users className="mr-2 h-4 w-4" />
                          Manage Students
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={`${getStatusColor(course.status)} text-white border-0`}>
                      {course.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{course.duration}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Start Date</p>
                      <p className="font-medium text-foreground">{new Date(course.startDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">End Date</p>
                      <p className="font-medium text-foreground">{new Date(course.endDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-foreground">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {course.students} students
                      </div>
                      <div className="flex items-center gap-1">
                        <Upload className="h-4 w-4" />
                        {course.resources} resources
                      </div>
                    </div>

                    <Button size="sm" variant="outline">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Info about course assignment */}
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-foreground mb-1">Course Assignment</h4>
                  <p className="text-sm text-muted-foreground">
                    Courses are assigned to you by the Program Manager. Once assigned, you can upload resources, manage
                    student projects, and track attendance for each course. Contact your Program Manager if you need
                    additional courses or have questions about your assignments.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
