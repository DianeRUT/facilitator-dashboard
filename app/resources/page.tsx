"use client"

import { useState } from "react"
import { Upload, FileText, Video, Link, Trash2, Eye, Download, Plus } from "lucide-react"

import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Resources() {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState("")
  const [resourceType, setResourceType] = useState("")

  const programs = [
    { id: "1", name: "Software Engineering Bootcamp" },
    { id: "2", name: "Tech for Kids" },
    { id: "3", name: "Sales Training Program" },
    { id: "4", name: "Digital Marketing Essentials" },
  ]

  const resources = [
    {
      id: 1,
      name: "JavaScript Fundamentals.pdf",
      type: "PDF",
      program: "Software Engineering Bootcamp",
      uploadDate: "2024-01-08",
      size: "2.4 MB",
      downloads: 18,
      description: "Complete guide to JavaScript basics",
    },
    {
      id: 2,
      name: "React Components Tutorial",
      type: "Video",
      program: "Software Engineering Bootcamp",
      uploadDate: "2024-01-07",
      size: "45.2 MB",
      downloads: 15,
      description: "Step-by-step React components tutorial",
    },
    {
      id: 3,
      name: "Scratch Programming Guide",
      type: "Link",
      program: "Tech for Kids",
      uploadDate: "2024-01-06",
      size: "-",
      downloads: 12,
      description: "External link to Scratch programming resources",
    },
    {
      id: 4,
      name: "Sales Techniques Handbook.docx",
      type: "Document",
      program: "Sales Training Program",
      uploadDate: "2024-01-05",
      size: "1.8 MB",
      downloads: 22,
      description: "Advanced sales strategies and techniques",
    },
  ]

  const resourceStats = [
    {
      title: "Total Resources",
      value: "28",
      description: "Across all programs",
      icon: FileText,
    },
    {
      title: "This Month",
      value: "8",
      description: "New uploads",
      icon: Upload,
    },
    {
      title: "Total Downloads",
      value: "156",
      description: "By trainees",
      icon: Download,
    },
  ]

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "PDF":
      case "Document":
        return FileText
      case "Video":
        return Video
      case "Link":
        return Link
      default:
        return FileText
    }
  }

  const getResourceColor = (type: string) => {
    switch (type) {
      case "PDF":
        return "bg-red-500"
      case "Video":
        return "bg-blue-500"
      case "Link":
        return "bg-green-500"
      case "Document":
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
            <h1 className="text-lg font-semibold">Resource Management</h1>
            <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Upload Resource
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Upload New Resource</DialogTitle>
                  <DialogDescription>Add a new resource for your trainees to access</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="program">Target Program</Label>
                    <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a program" />
                      </SelectTrigger>
                      <SelectContent>
                        {programs.map((program) => (
                          <SelectItem key={program.id} value={program.id}>
                            {program.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Resource Type</Label>
                    <Select value={resourceType} onValueChange={setResourceType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select resource type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF Document</SelectItem>
                        <SelectItem value="video">Video File</SelectItem>
                        <SelectItem value="document">Document</SelectItem>
                        <SelectItem value="link">External Link</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Resource Title</Label>
                    <Input id="title" placeholder="Enter resource title" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Brief description of the resource" />
                  </div>

                  {resourceType === "link" ? (
                    <div className="space-y-2">
                      <Label htmlFor="url">URL</Label>
                      <Input id="url" type="url" placeholder="https://example.com" />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="file">File Upload</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-4">
                          <Button variant="outline">Choose File</Button>
                          <p className="mt-2 text-sm text-gray-500">or drag and drop your file here</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button className="flex-1" onClick={() => setUploadDialogOpen(false)}>
                      Upload Resource
                    </Button>
                    <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Resource Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            {resourceStats.map((stat, index) => (
              <Card key={index} className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Resources Table */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Uploaded Resources</CardTitle>
              <CardDescription>Manage your educational resources</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Resource</TableHead>
                    <TableHead>Program</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Downloads</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resources.map((resource) => {
                    const IconComponent = getResourceIcon(resource.type)
                    return (
                      <TableRow key={resource.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <IconComponent className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium text-foreground">{resource.name}</p>
                              <p className="text-xs text-muted-foreground">{resource.description}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{resource.program}</TableCell>
                        <TableCell>
                          <Badge className={`${getResourceColor(resource.type)} text-white border-0`}>
                            {resource.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(resource.uploadDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-muted-foreground">{resource.size}</TableCell>
                        <TableCell className="text-muted-foreground">{resource.downloads}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                •••
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
