"use client"

import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"

interface DateNavigationProps {
  selectedDate: Date
  viewMode: "day" | "week" | "month"
  onNavigate: (direction: "prev" | "next") => void
  onTodayClick: () => void
  onViewModeChange: (mode: "day" | "week" | "month") => void
  onTemplatesClick: () => void
}

export function DateNavigation({
  selectedDate,
  viewMode,
  onNavigate,
  onTodayClick,
  onViewModeChange,
  onTemplatesClick,
}: DateNavigationProps) {
  return (
    <div className="mb-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
      <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto">
        <button
          onClick={() => onNavigate("prev")}
          className="p-2 rounded-lg hover:bg-gray-200 transition-colors flex-shrink-0"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

        <div className="px-3 lg:px-4 py-2 bg-white rounded-lg border border-gray-200 flex items-center gap-2 flex-shrink-0">
          <Calendar className="w-4 h-4 text-gray-600" />
          <span className="font-medium text-gray-900 text-sm lg:text-base whitespace-nowrap">
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        <button
          onClick={() => onNavigate("next")}
          className="p-2 rounded-lg hover:bg-gray-200 transition-colors flex-shrink-0"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>

        <button
          onClick={onTodayClick}
          className="px-3 lg:px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium text-sm lg:text-base flex-shrink-0"
        >
          Today
        </button>
      </div>

      <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto">
        <button
          onClick={onTemplatesClick}
          className="px-3 lg:px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium border border-gray-200 flex items-center gap-2 text-sm lg:text-base whitespace-nowrap"
        >
          <span className="text-lg">⚡</span>
          <span className="hidden sm:inline">Quick Start Template</span>
          <span className="sm:hidden">Template</span>
        </button>
        <button
          onClick={() => onViewModeChange("day")}
          className={`px-3 lg:px-4 py-2 rounded-lg font-medium transition-all text-sm lg:text-base ${
            viewMode === "day" ? "bg-white text-gray-900 border border-gray-300" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Day
        </button>
        <button
          onClick={() => onViewModeChange("week")}
          className={`px-3 lg:px-4 py-2 rounded-lg font-medium transition-all text-sm lg:text-base ${
            viewMode === "week" ? "bg-orange-500 text-white" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Week
        </button>
        <button
          onClick={() => onViewModeChange("month")}
          className={`px-3 lg:px-4 py-2 rounded-lg font-medium transition-all text-sm lg:text-base ${
            viewMode === "month" ? "bg-orange-500 text-white" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Month
        </button>
      </div>
    </div>
  )
}
