"use client"

import { X, Home } from "lucide-react"
import Link from "next/link"
import type { CustomTag } from "@/types/todo"
import { MiniCalendar } from "./MiniCalendar"
import { NavigationLinks } from "./NavigationLinks"
import { ListsSection } from "./ListsSection"
import { TagsSection } from "./TagsSection"

interface DashboardSidebarProps {
  showMobileMenu: boolean
  onCloseMobileMenu: () => void
  miniCalendarDate: Date
  onNavigateMiniCalendar: (direction: "prev" | "next") => void
  onSelectMiniCalendarDate: (day: number, isCurrentMonth: boolean, isPrevMonth: boolean) => void
  getMiniCalendarDays: () => { date: number; isCurrentMonth: boolean; isPrevMonth: boolean }[]
  onTodayClick: () => void
  onTomorrowClick: () => void
  onThisWeekClick: () => void
  customTags: CustomTag[]
  filterTag: number | null
  onListClick: (tagName: string) => void
  onTagClick: (tagName: string) => void
  onManageTagsClick: () => void
}

export function DashboardSidebar({
  showMobileMenu,
  onCloseMobileMenu,
  miniCalendarDate,
  onNavigateMiniCalendar,
  onSelectMiniCalendarDate,
  getMiniCalendarDays,
  onTodayClick,
  onTomorrowClick,
  onThisWeekClick,
  customTags,
  filterTag,
  onListClick,
  onTagClick,
  onManageTagsClick,
}: DashboardSidebarProps) {





  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex-col transition-transform duration-300 lg:translate-x-0 ${showMobileMenu ? "translate-x-0 flex" : "-translate-x-full lg:flex"}`}
    >
      <div className="lg:hidden flex justify-end p-4">
        <button onClick={onCloseMobileMenu} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <X className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      <div className="p-4 border-b border-gray-200">
        <Link href="/" className="flex items-center gap-2 text-gray-900 hover:text-purple-500">
          <Home className="w-5 h-5" />
          <span className="font-semibold">Home</span>
        </Link>
      </div>

      <div className="p-4 border-b border-gray-200">
        <MiniCalendar
          miniCalendarDate={miniCalendarDate}
          onNavigate={onNavigateMiniCalendar}
          onSelectDate={onSelectMiniCalendarDate}
          getMiniCalendarDays={getMiniCalendarDays}
        />
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <NavigationLinks
          onTodayClick={onTodayClick}
          onTomorrowClick={onTomorrowClick}
          onThisWeekClick={onThisWeekClick}
        />

        <ListsSection tags={customTags} onListClick={onListClick} />

        <TagsSection
          tags={customTags}
          filterTag={filterTag}
          onTagClick={onTagClick}
          onManageTagsClick={onManageTagsClick}
        />
      </div>
    </aside>
  )
}
