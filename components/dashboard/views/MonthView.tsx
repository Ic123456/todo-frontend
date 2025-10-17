"use client"

import type { Todo } from "@/types/todo"

interface MonthViewProps {
  selectedDate: Date
  todos: Todo[]
  onSelectDate: (date: Date) => void
}

export function MonthView({ selectedDate, todos, onSelectDate }: MonthViewProps) {
  const getMonthDays = () => {
    const year = selectedDate.getFullYear()
    const month = selectedDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()

    let firstDayOfWeek = firstDay.getDay()
    firstDayOfWeek = firstDayOfWeek === 0 ? 7 : firstDayOfWeek

    const days = []

    for (let i = 1; i < firstDayOfWeek; i++) {
      days.push(null)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  return (
    <div>
      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 text-center">
        {selectedDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
      </h2>

      <div className="grid grid-cols-7 gap-2 lg:gap-4 mb-4">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} className="text-center text-xs lg:text-sm font-semibold text-gray-600">
            <span className="hidden sm:inline">{day}</span>
            <span className="sm:hidden">{day.slice(0, 1)}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 lg:gap-4">
        {getMonthDays().map((date, idx) => {
          if (!date) return <div key={idx} className="aspect-square"></div>

          const dateStr = date.toISOString().split("T")[0]
          const dayTodos = todos.filter((todo) => todo.day === dateStr)
          const isToday = dateStr === new Date().toISOString().split("T")[0]
          const isSelected = dateStr === selectedDate.toISOString().split("T")[0]
          const completedTodos = dayTodos.filter((t) => t.done).length

          return (
            <button
              key={idx}
              onClick={() => onSelectDate(date)}
              className={`aspect-square p-2 lg:p-3 rounded-xl transition-all text-left flex flex-col ${
                isSelected
                  ? "bg-purple-100 border-2 border-purple-500"
                  : isToday
                    ? "bg-orange-100 border-2 border-orange-500"
                    : "bg-white border border-gray-200 hover:border-gray-300"
              }`}
            >
              <div
                className={`text-base lg:text-xl font-bold mb-1 ${isSelected ? "text-purple-600" : isToday ? "text-orange-600" : "text-gray-900"}`}
              >
                {date.getDate()}
              </div>
              {dayTodos.length > 0 && (
                <>
                  <div className="w-full h-1 bg-orange-500 rounded-full mb-1"></div>
                  <div className="text-xs text-gray-600 font-medium">
                    {completedTodos}/{dayTodos.length}
                  </div>
                </>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
