"use client"

import * as React from "react"
import {
  AudioWaveform,
  HomeIcon,
  User,
  Command,
  Lightbulb,
  FileClock,
  BookDashed,
  FileQuestion,
  

  GalleryVerticalEnd,
  PinIcon
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Abdullah Almansouri",
    email: "abdullah@stuff.adec.ae",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain:[
    {
      title: "Home",
      url: "/home",
      icon: HomeIcon,
    },
    {
      title: "Profile",
      url: "/home/profile",
      icon: User,
    },
    {
      title: "Questions",
      url: "#",
      icon: FileQuestion,
    },
    {
      title: "Answers",
      url: "#",
      icon: Lightbulb,
    },
    {
      title: "History",
      url: "#",
      icon: FileClock,
    },
    {
      title: "Pinned",
      url: "#",
      icon: PinIcon,
    },
    {
      title: "Draft",
      url: "#",
      icon: BookDashed,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
