"use client"

import { Clock, Calendar, Inbox } from "lucide-react"

interface NavigationLinksProps {
  onTodayClick: () => void
  onTomorrowClick: () => void
  onThisWeekClick: () => void
}

export function NavigationLinks({ onTodayClick, onTomorrowClick, onThisWeekClick }: NavigationLinksProps) {
  return (
    <nav className="space-y-1">
      <button
        onClick={onTodayClick}
        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
      >
        <Clock className="w-5 h-5" />
        <span className="font-medium">Today</span>
      </button>

      <button
        onClick={onTomorrowClick}
        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
      >
        <Calendar className="w-5 h-5" />
        <span className="font-medium">Tomorrow</span>
      </button>

      <button
        onClick={onThisWeekClick}
        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
      >
        <Inbox className="w-5 h-5" />
        <span className="font-medium">This Week</span>
      </button>
    </nav>
  )
}
