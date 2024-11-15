"use client"

import { usePathname } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

// Utility to capitalize the first letter of the current page name
function formatPageTitle(pathname: string) {
  const segments = pathname.split("/").filter(Boolean) // Split path and remove empty segments
  if (segments.length > 1) {
    return segments[segments.length - 1]
      .replace(/-/g, " ") // Replace hyphens with spaces
      .replace(/^\w/, (c) => c.toUpperCase()) // Capitalize the first character
  }
  return "Home" // Default for root `/dashboard`
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const pageTitle = formatPageTitle(pathname)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-4 px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-4" />

          {/* Page Title */}
          <h1 className="text-lg font-semibold">{pageTitle}</h1>

          <div className="ml-auto flex items-center gap-4">
            {/* Search Bar */}
            <Input type="text" placeholder="Search..." className="max-w-xs" />

            {/* Notifications */}
            <Button variant="ghost" className="relative">
              <Bell className="w-5 h-5" />
              {/* Notification Badge */}
              <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500" />
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
