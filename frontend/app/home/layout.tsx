"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

function formatPageTitle(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 1) {
    return segments[segments.length - 1]
      .replace(/-/g, " ")
      .replace(/^\w/, (c) => c.toUpperCase());
  }
  return "Home";
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Example notifications data
  const notifications = [
    { id: 1, question: "What are the renewable energy plans for residential buildings?", time: "5 mins ago" },
    { id: 2, question: "What is the process to obtain a medical license as a doctor?", time: "10 mins ago" },
    { id: 3, question: "What are the upcoming heritage festivals in Abu Dhabi?", time: "20 mins ago" },
  ];

  const handleNotificationClick = () => {
    setIsNotificationOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current && // Dropdown exists
        !notificationRef.current.contains(event.target as Node) && // Click is not inside the dropdown
        !buttonRef.current?.contains(event.target as Node) // Click is not on the button
      ) {
        setIsNotificationOpen(false); // Close dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen">
        <AppSidebar />

        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-50 flex h-16 items-center gap-4 px-4 bg-neutral-50 shadow-md w-full">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-4" />

            <h1 className="text-lg font-semibold">{formatPageTitle(pathname)}</h1>

            <div className="ml-auto flex items-center gap-4 relative">
              <Input type="text" placeholder="Search..." className="max-w-xs" />

              <Button
                ref={buttonRef} // Attach ref to the button
                variant="ghost"
                className="relative"
                onClick={handleNotificationClick} // Toggle dropdown
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500" />
              </Button>

              {isNotificationOpen && (
                <div
                  ref={notificationRef} // Attach ref to dropdown
                  className="absolute top-10 right-0 w-80 bg-white shadow-md rounded-md p-4 z-50"
                >
                  <h3 className="text-sm font-semibold">Notifications</h3>
                  <ul className="space-y-2 mt-2">
                    {notifications.map((notification) => (
                      <li
                        key={notification.id}
                        className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                        onClick={() => console.log(notification.question)}
                      >
                        <div>
                          <p className="text-sm">{notification.question}</p>
                          <p className="text-xs text-gray-500">{notification.time}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
