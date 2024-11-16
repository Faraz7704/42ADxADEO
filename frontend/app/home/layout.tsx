"use client"

import { usePathname } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

function formatPageTitle(pathname: string) {
  const segments = pathname.split("/").filter(Boolean)
  if (segments.length > 1) {
    return segments[segments.length - 1]
      .replace(/-/g, " ")
      .replace(/^\w/, (c) => c.toUpperCase())
  }
  return "Home"
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
      <div className="flex w-full min-h-screen">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Fixed Header */}
          <header className="sticky top-0 z-50 flex h-16 items-center gap-4 px-4 bg-neutral-50 shadow-md w-full">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-4" />

            <h1 className="text-lg font-semibold">{pageTitle}</h1>

            <div className="ml-auto flex items-center gap-4">
              <Input type="text" placeholder="Search..." className="max-w-xs" />
              <Button variant="ghost" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500" />
              </Button>
            </div>
          </header>

          {/* Scrollable Content */}
          <main className="flex-1 overflow-y-auto p-4">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
