"use client"

interface DayViewProps {
  selectedDate: Date
  onSelectDate: (date: Date) => void
}

export function DayView({ selectedDate, onSelectDate }: DayViewProps) {
  const getDayPills = () => {
    const pills = []
    for (let i = -3; i <= 3; i++) {
      const date = new Date(selectedDate)
      date.setDate(date.getDate() + i)
      pills.push(date)
    }
    return pills
  }

  return (
    <div className="mb-6 overflow-x-auto">
      <div className="flex gap-2 pb-2">
        {getDayPills().map((date, idx) => {
          const isSelected = date.toISOString().split("T")[0] === selectedDate.toISOString().split("T")[0]
          const isToday = date.toISOString().split("T")[0] === new Date().toISOString().split("T")[0]

          return (
            <button
              key={idx}
              onClick={() => onSelectDate(date)}
              className={`flex-shrink-0 px-4 py-3 rounded-xl transition-all ${
                isSelected ? "bg-purple-500 text-white shadow-lg scale-105" : "bg-white text-gray-700 hover:scale-105"
              } ${isToday && !isSelected ? "ring-2 ring-orange-500" : ""}`}
            >
              <div className="text-xs font-medium">{date.toLocaleDateString("en-US", { weekday: "short" })}</div>
              <div className="text-lg font-bold">{date.getDate()}</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
