"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, Megaphone, BarChart2, Settings, Rocket, ChevronLeft, ChevronRight, UsersRound } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

const sidebarItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Campaigns", href: "/campaigns", icon: Megaphone },
  { name: "Analytics", href: "/analytics", icon: BarChart2 },
  { name: "Settings", href: "/settings", icon: Settings },
]

const leadsAndAudiences = {
  title: "Leads & Audiences",
  items: [
    {
      name: "All Leads",
      href: "/leads",
      icon: Users,
    },
    {
      name: "Audiences",
      href: "/audiences",
      icon: UsersRound,
    },
  ],
}

export default function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return true
      const saved = localStorage.getItem('sidebarCollapsed')
      return saved ? JSON.parse(saved) : false
    }
    return false
  })

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(collapsed))
  }, [collapsed])

  return (
    <div className={cn(
      "sticky top-0 h-screen border-r bg-gray-100/40 dark:bg-gray-800/40 transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex h-full flex-col gap-2">
        <div className={cn(
          "flex h-[60px] items-center border-b px-6",
          collapsed && "justify-center px-2"
        )}>
          <Link className="flex items-center gap-2 font-semibold" href="/">
            <Rocket className="h-5 w-5" />
            {!collapsed && <span>RocketSDR</span>}
          </Link>
        </div>

        <div className="flex-1 overflow-auto py-2">
          <nav className={cn(
            "grid items-start px-4 text-sm font-medium gap-1",
            collapsed && "px-2"
          )}>
            {/* Main navigation items */}
            {sidebarItems.map((item) => (
              <Button
                key={item.name}
                asChild
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "justify-start",
                  collapsed ? "h-12 w-12 p-0" : "w-full"
                )}
              >
                <Link href={item.href} className={cn(
                  "flex items-center",
                  collapsed && "justify-center"
                )}>
                  <item.icon className={cn(
                    "h-4 w-4",
                    !collapsed && "mr-2"
                  )} />
                  {!collapsed && item.name}
                </Link>
              </Button>
            ))}

            {/* Leads & Audiences section */}
            {!collapsed && (
              <div className="mt-4 mb-2 px-2 text-xs font-semibold text-muted-foreground">
                {leadsAndAudiences.title}
              </div>
            )}
            {leadsAndAudiences.items.map((item) => (
              <Button
                key={item.name}
                asChild
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "justify-start",
                  collapsed ? "h-12 w-12 p-0" : "w-full"
                )}
              >
                <Link href={item.href} className={cn(
                  "flex items-center",
                  collapsed && "justify-center"
                )}>
                  <item.icon className={cn(
                    "h-4 w-4",
                    !collapsed && "mr-2"
                  )} />
                  {!collapsed && item.name}
                </Link>
              </Button>
            ))}
          </nav>
        </div>

        <div className={cn(
          "border-t p-4",
          collapsed && "flex justify-center p-2"
        )}>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "w-full",
              collapsed && "h-12 w-12 p-0"
            )}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Collapse
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

