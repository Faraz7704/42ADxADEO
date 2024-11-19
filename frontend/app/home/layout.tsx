"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, Search } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import uaeFlag from "@/public/uae-flag.png";
import ukFlag from "@/public/uk-flag.svg";

function formatPageTitle(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 1) {
    return segments[segments.length - 1]
      .replace(/-/g, " ")
      .replace(/^[a-zA-Z]/, (c) => c.toUpperCase());
  }
  return "Home";
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [language, setLanguage] = useState("English");
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

  const handleLanguageChange = () => {
    setLanguage((prevLanguage) => (prevLanguage === "English" ? "العربية" : "English"));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setIsNotificationOpen(false);
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

            <div className="ml-auto flex items-center gap-2 relative">
              {pathname !== "/home" && (
                <div className="relative max-w-md w-full">
                  <Input type="text" placeholder="Search..." className="pl-10 w-full" />
                  <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 min-w-[50px] md:min-w-[20px]">
                    <Image
                      src={language === "English" ? ukFlag : uaeFlag}
                      alt={language === "English" ? "UK Flag" : "UAE Flag"}
                      width={15}
                      height={15}
                    />
                    <span className="hidden md:inline">{language}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleLanguageChange}>
                    {language === "English" ? (
                      <div className="flex items-center gap-2">
                        <Image src={uaeFlag} alt="UAE Flag" width={15} height={15} />
                        <span>العربية</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Image src={ukFlag} alt="UK Flag" width={15} height={15} />
                        <span>English</span>
                      </div>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                ref={buttonRef}
                variant="ghost"
                className="relative"
                onClick={handleNotificationClick}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500" />
              </Button>

              {isNotificationOpen && (
                <div
                  ref={notificationRef}
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