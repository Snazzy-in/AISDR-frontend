"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, Megaphone, BarChart2, Settings, Rocket, ChevronLeft, ChevronRight, UsersRound, Package, UserCircle, FlaskConical } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState, useEffect } from "react"

const sidebarItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Campaigns", href: "/campaigns", icon: Megaphone },
  { 
    name: "Leads",
    icon: Users,
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
  },
  {
    name: "Sales Assets",
    icon: Rocket,
    items: [
      {
        name: "Products",
        href: "/sales-assets/products",
        icon: Package,
      },
      {
        name: "Personas",
        href: "/sales-assets/personas",
        icon: UserCircle,
      },
      {
        name: "RocketLab",
        href: "/sales-assets/rocketlab",
        icon: FlaskConical,
      },
    ],
  },
  { name: "Analytics", href: "/analytics", icon: BarChart2 },
  { name: "Settings", href: "/settings", icon: Settings },
]

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
              item.items ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant={pathname.startsWith('/leads') || pathname.startsWith('/audiences') ? "secondary" : "ghost"}
                      className={cn(
                        "w-full flex items-center",
                        collapsed ? "h-12 w-12 p-0 justify-center" : "px-3 justify-start"
                      )}
                    >
                      <item.icon className={cn(
                        "h-4 w-4 flex-shrink-0",
                        !collapsed && "mr-2"
                      )} />
                      {!collapsed && (
                        <span className="truncate">
                          {item.name}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    side={collapsed ? "right" : "bottom"} 
                    align={collapsed ? "start" : "center"}
                    className={cn(
                      "w-56",
                      collapsed && "ml-2"
                    )}
                  >
                    {item.items.map((subItem) => (
                      <DropdownMenuItem key={subItem.name} asChild>
                        <Link href={subItem.href} className="flex items-center w-full">
                          <subItem.icon className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span className="truncate">{subItem.name}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  key={item.name}
                  asChild
                  variant={pathname.startsWith(item.href) ? "secondary" : "ghost"}
                  className={cn(
                    "w-full flex items-center",
                    collapsed ? "h-12 w-12 p-0 justify-center" : "px-3 justify-start"
                  )}
                >
                  <Link href={item.href}>
                    <item.icon className={cn(
                      "h-4 w-4 flex-shrink-0",
                      !collapsed && "mr-2"
                    )} />
                    {!collapsed && (
                      <span className="truncate">
                        {item.name}
                      </span>
                    )}
                  </Link>
                </Button>
              )
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

