"use client"

import { useState } from "react"
import {
  Bell,
  BellRing,
  MessageSquare,
  AlertCircle,
  Info,
  CheckCircle,
  Trash2,
  BookMarkedIcon as MarkAsUnread,
} from "lucide-react"

import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "announcement",
      title: "New Program Guidelines",
      message:
        "Updated guidelines for the Software Engineering Bootcamp have been released. Please review the new assessment criteria.",
      sender: "Program Manager",
      timestamp: "2024-01-08T10:30:00Z",
      read: false,
      priority: "high",
    },
    {
      id: 2,
      type: "reminder",
      title: "Missing Submissions Reminder",
      message: "3 students in Tech for Kids program haven't submitted their projects yet. Deadline is tomorrow.",
      sender: "System",
      timestamp: "2024-01-08T09:15:00Z",
      read: false,
      priority: "medium",
    },
    {
      id: 3,
      type: "info",
      title: "Attendance Report Generated",
      message: "Weekly attendance report for all your programs is now available for download.",
      sender: "System",
      timestamp: "2024-01-07T16:45:00Z",
      read: true,
      priority: "low",
    },
    {
      id: 4,
      type: "announcement",
      title: "Holiday Schedule Update",
      message: "Classes will be suspended from January 15-17 due to public holidays. Please inform your trainees.",
      sender: "Program Manager",
      timestamp: "2024-01-07T14:20:00Z",
      read: true,
      priority: "high",
    },
    {
      id: 5,
      type: "reminder",
      title: "Resource Upload Reminder",
      message: "Don't forget to upload the promised resources for next week's classes.",
      sender: "System",
      timestamp: "2024-01-06T11:00:00Z",
      read: false,
      priority: "medium",
    },
  ])

  const notificationStats = [
    {
      title: "Unread",
      value: notifications.filter((n) => !n.read).length.toString(),
      description: "New notifications",
      icon: BellRing,
      color: "text-blue-500",
    },
    {
      title: "High Priority",
      value: notifications.filter((n) => n.priority === "high").length.toString(),
      description: "Urgent items",
      icon: AlertCircle,
      color: "text-red-500",
    },
    {
      title: "This Week",
      value: "12",
      description: "Total notifications",
      icon: Bell,
      color: "text-green-500",
    },
  ]

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "announcement":
        return MessageSquare
      case "reminder":
        return AlertCircle
      case "info":
        return Info
      default:
        return Bell
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "announcement":
        return "text-blue-500"
      case "reminder":
        return "text-yellow-500"
      case "info":
        return "text-green-500"
      default:
        return "text-gray-500"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAsUnread = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: false } : notification)),
    )
  }

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
    alert("All notifications marked as read!")
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      return "Just now"
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  const unreadNotifications = notifications.filter((n) => !n.read)
  const readNotifications = notifications.filter((n) => n.read)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center justify-between w-full">
            <h1 className="text-lg font-semibold">Notifications</h1>
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              Mark All as Read
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Notification Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            {notificationStats.map((stat, index) => (
              <Card key={index} className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Notifications List */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Recent Notifications</CardTitle>
              <CardDescription>Stay updated with announcements and reminders</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="unread" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="unread">Unread ({unreadNotifications.length})</TabsTrigger>
                  <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="unread" className="space-y-4 mt-4">
                  {unreadNotifications.length === 0 ? (
                    <div className="text-center py-8">
                      <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
                      <p className="text-muted-foreground">All caught up! No unread notifications.</p>
                    </div>
                  ) : (
                    unreadNotifications.map((notification) => {
                      const IconComponent = getNotificationIcon(notification.type)
                      return (
                        <div
                          key={notification.id}
                          className="flex items-start gap-4 p-4 rounded-lg bg-muted border-l-4 border-blue-500"
                        >
                          <IconComponent className={`h-5 w-5 mt-1 ${getNotificationColor(notification.type)}`} />
                          <div className="flex-1 space-y-2">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium text-foreground">{notification.title}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                              </div>
                              <Badge className={`${getPriorityColor(notification.priority)} text-white border-0 ml-2`}>
                                {notification.priority}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>From: {notification.sender}</span>
                                <span>•</span>
                                <span>{formatTimestamp(notification.timestamp)}</span>
                              </div>
                              <div className="flex gap-1">
                                <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  )}
                </TabsContent>

                <TabsContent value="all" className="space-y-4 mt-4">
                  {notifications.map((notification) => {
                    const IconComponent = getNotificationIcon(notification.type)
                    return (
                      <div
                        key={notification.id}
                        className={`flex items-start gap-4 p-4 rounded-lg ${
                          notification.read ? "bg-muted/50" : "bg-muted border-l-4 border-blue-500"
                        }`}
                      >
                        <IconComponent className={`h-5 w-5 mt-1 ${getNotificationColor(notification.type)}`} />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4
                                className={`font-medium ${notification.read ? "text-muted-foreground" : "text-foreground"}`}
                              >
                                {notification.title}
                              </h4>
                              <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                            </div>
                            <Badge className={`${getPriorityColor(notification.priority)} text-white border-0 ml-2`}>
                              {notification.priority}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>From: {notification.sender}</span>
                              <span>•</span>
                              <span>{formatTimestamp(notification.timestamp)}</span>
                            </div>
                            <div className="flex gap-1">
                              {notification.read ? (
                                <Button variant="ghost" size="sm" onClick={() => markAsUnread(notification.id)}>
                                  <MarkAsUnread className="h-4 w-4" />
                                </Button>
                              ) : (
                                <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                              )}
                              <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
