import { ReactNode } from "react"
import Sidebar from "./sidebar"
import Header from "./header"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  )
}

