"use client"

import { Menu, CheckCircle2 } from "lucide-react"

interface DashboardHeaderProps {
  onMenuClick: () => void
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={onMenuClick} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors mr-2">
              <Menu className="w-5 h-5 text-gray-700" />
            </button>
            <CheckCircle2 className="w-6 h-6 lg:w-7 lg:h-7 text-purple-500" />
            <h1 className="font-bold text-xl lg:text-2xl text-gray-900">Dashboard</h1>
          </div>
        </div>
      </div>
    </header>
  )
}
