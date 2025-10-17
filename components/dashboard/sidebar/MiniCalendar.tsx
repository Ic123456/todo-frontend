"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

interface MiniCalendarProps {
  miniCalendarDate: Date
  onNavigate: (direction: "prev" | "next") => void
  onSelectDate: (day: number, isCurrentMonth: boolean, isPrevMonth: boolean) => void
  getMiniCalendarDays: () => { date: number; isCurrentMonth: boolean; isPrevMonth: boolean }[]
}

export function MiniCalendar({ miniCalendarDate, onNavigate, onSelectDate, getMiniCalendarDays }: MiniCalendarProps) {
  return (
    <div className="bg-gray-800 rounded-xl p-4 text-white">
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => onNavigate("prev")} className="p-1 hover:bg-gray-700 rounded transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-sm font-semibold">
          {miniCalendarDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </span>
        <button onClick={() => onNavigate("next")} className="p-1 hover:bg-gray-700 rounded transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
          <div key={day} className="text-center text-xs font-medium text-gray-400">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {getMiniCalendarDays().map((day, idx) => {
          const isToday =
            day.isCurrentMonth &&
            day.date === new Date().getDate() &&
            miniCalendarDate.getMonth() === new Date().getMonth() &&
            miniCalendarDate.getFullYear() === new Date().getFullYear()

          return (
            <button
              key={idx}
              onClick={() => onSelectDate(day.date, day.isCurrentMonth, day.isPrevMonth)}
              className={`aspect-square flex items-center justify-center text-sm rounded-full transition-colors ${
                isToday
                  ? "bg-white text-gray-900 font-bold"
                  : day.isCurrentMonth
                    ? "text-white hover:bg-gray-700"
                    : "text-gray-600 hover:bg-gray-700"
              }`}
            >
              {day.date}
            </button>
          )
        })}
      </div>
    </div>
  )
}
