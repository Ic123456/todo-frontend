"use client"

import { Check } from "lucide-react"
import type { Todo } from "@/types/todo"

interface WeekViewProps {
  selectedDate: Date
  todos: Todo[]
  onSelectDate: (date: Date) => void
}

export function WeekView({ selectedDate, todos, onSelectDate }: WeekViewProps) {
  const getWeekDays = () => {
    const days = []
    const startOfWeek = new Date(selectedDate)
    const day = startOfWeek.getDay()
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1)
    startOfWeek.setDate(diff)

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      days.push(date)
    }
    return days
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 lg:gap-4 mb-6">
      {getWeekDays().map((date, idx) => {
        const dateStr = date ? date.toISOString().split("T")[0] : ""
        const dayTodos = todos.filter((todo) => todo.day === dateStr)
        const isToday = dateStr === new Date().toISOString().split("T")[0]
        const isSelected = dateStr === selectedDate.toISOString().split("T")[0]
        const completedTodos = dayTodos.filter((t) => t.done).length

        return (
          <button
            key={idx}
            onClick={() => onSelectDate(date || new Date())}
            className={`p-3 lg:p-4 rounded-xl transition-all text-left ${
              isSelected
                ? "bg-purple-100 border-2 border-purple-500"
                : isToday
                  ? "bg-orange-100 border-2 border-orange-500"
                  : "bg-white border border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="text-xs font-medium text-gray-600 mb-1">
              {date ? date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase() : ""}
            </div>
            <div
              className={`text-xl lg:text-2xl font-bold mb-2 ${isSelected ? "text-purple-600" : isToday ? "text-orange-600" : "text-gray-900"}`}
            >
              {date ? date.getDate() : ""}
            </div>
            <div className="text-xs text-gray-600 mb-2">
              {dayTodos.length} tasks
              {dayTodos.length > 0 && (
                <span className="ml-1 text-orange-500 font-medium">
                  {completedTodos}/{dayTodos.length}
                </span>
              )}
            </div>
            {dayTodos.length > 0 && (
              <div className="space-y-1">
                {dayTodos.slice(0, 3).map((todo) => (
                  <div key={todo.id} className="flex items-center gap-1 text-xs">
                    <div
                      className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full flex-shrink-0 ${todo.done ? "bg-orange-500" : "bg-gray-300"}`}
                    >
                      {todo.done && <Check className="w-1.5 h-1.5 lg:w-2 lg:h-2 text-white m-auto" />}
                    </div>
                    <span className={`truncate ${todo.done ? "line-through text-gray-400" : "text-gray-700"}`}>
                      {todo.text}
                    </span>
                  </div>
                ))}
                {dayTodos.length > 3 && <div className="text-xs text-gray-500">+{dayTodos.length - 3} more</div>}
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}
