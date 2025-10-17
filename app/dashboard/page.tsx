"use client"

import { useState, useEffect, useRef } from "react"
import type { Template } from "@/types/todo"
import { DashboardSidebar } from "@/components/dashboard/sidebar/DashboardSidebar"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { DateNavigation } from "@/components/dashboard/DateNavigation"
import { FilterBar } from "@/components/dashboard/FilterBar"
import { TaskInput } from "@/components/dashboard/TaskInput"
import { DayView } from "@/components/dashboard/views/DayView"
import { WeekView } from "@/components/dashboard/views/WeekView"
import { MonthView } from "@/components/dashboard/views/MonthView"
import { TagManager } from "@/components/dashboard/TagManager"
import { TemplatesPanel } from "@/components/dashboard/TemplatesPanel"
import { TodoList } from "@/components/dashboard/TodoList"
import { useTodos } from "@/hooks/useTodos"
import { useTags } from "@/hooks/useTags"
import { useFilters } from "@/hooks/useFilters"


export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("week")

  
  const [showTagManager, setShowTagManager] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)
 
  const [miniCalendarDate, setMiniCalendarDate] = useState(new Date())
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const { todos, addTodo, toggleTodo, deleteTodo, updateTodo } = useTodos()
  const { customTags, addTag, removeTag, editTag } = useTags()
  const { filterTag, filterCompleted, setFilterTag, setFilterCompleted, getFilteredTodos } = useFilters(
    todos,
    selectedDate,
    viewMode,
  )






  const getMiniCalendarDays = () => {
    const year = miniCalendarDate.getFullYear()
    const month = miniCalendarDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    let firstDayOfWeek = firstDay.getDay()
    firstDayOfWeek = firstDayOfWeek === 0 ? 7 : firstDayOfWeek
    const prevMonthLastDay = new Date(year, month, 0).getDate()
    const days = []
    for (let i = firstDayOfWeek - 1; i > 0; i--) {
      days.push({ date: prevMonthLastDay - i + 1, isCurrentMonth: false, isPrevMonth: true })
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ date: day, isCurrentMonth: true, isPrevMonth: false })
    }
    const remainingDays = 42 - days.length
    for (let day = 1; day <= remainingDays; day++) {
      days.push({ date: day, isCurrentMonth: false, isPrevMonth: false })
    }
    return days
  }

  const selectMiniCalendarDate = (day: number, isCurrentMonth: boolean, isPrevMonth: boolean) => {
    const newDate = new Date(miniCalendarDate)
    if (!isCurrentMonth) {
      if (isPrevMonth) {
        newDate.setMonth(newDate.getMonth() - 1)
      } else {
        newDate.setMonth(newDate.getMonth() + 1)
      }
    }
    newDate.setDate(day)
    setSelectedDate(newDate)
    setMiniCalendarDate(newDate)
    setShowMobileMenu(false)
  }

  const filteredTodos = getFilteredTodos()
  const completedCount = filteredTodos.filter((t) => t.done).length
  const totalCount = filteredTodos.length

  return (
    <div className="flex min-h-screen bg-white transition-colors duration-300 flex-col lg:flex-row">
      {showMobileMenu && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setShowMobileMenu(false)} />
      )}

      <DashboardSidebar
        showMobileMenu={showMobileMenu}
        onCloseMobileMenu={() => setShowMobileMenu(false)}
        miniCalendarDate={miniCalendarDate}
        onNavigateMiniCalendar={(direction) => {
          const newDate = new Date(miniCalendarDate)
          newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1))
          setMiniCalendarDate(newDate)
        }}
        onSelectMiniCalendarDate={selectMiniCalendarDate}
        getMiniCalendarDays={getMiniCalendarDays}
        onTodayClick={() => {
          setSelectedDate(new Date())
          setViewMode("day")
          setShowMobileMenu(false)
        }}
        onTomorrowClick={() => {
          const tomorrow = new Date()
          tomorrow.setDate(tomorrow.getDate() + 1)
          setSelectedDate(tomorrow)
          setViewMode("day")
          setShowMobileMenu(false)
        }}
        onThisWeekClick={() => {
          setViewMode("week")
          setShowMobileMenu(false)
        }}
        customTags={customTags}
        filterTag={filterTag}
        onListClick={(tagName) => {
          setFilterTag(Number(tagName))
          setShowMobileMenu(false)
        }}
        onTagClick={(tagName) => {
          setFilterTag(filterTag === Number(tagName) ? null : Number(tagName))
          setShowMobileMenu(false)
        }}
        onManageTagsClick={() => {
          setShowTagManager(!showTagManager)
          setShowMobileMenu(false)
        }}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onMenuClick={() => setShowMobileMenu(true)} />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <DateNavigation
            selectedDate={selectedDate}
            viewMode={viewMode}
            onNavigate={(direction) => {
              const newDate = new Date(selectedDate)
              if (viewMode === "day") {
                newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1))
              } else if (viewMode === "week") {
                newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7))
              } else if (viewMode === "month") {
                newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1))
              }
              setSelectedDate(newDate)
            }}
            onTodayClick={() => setSelectedDate(new Date())}
            onViewModeChange={setViewMode}
            onTemplatesClick={() => setShowTemplates(!showTemplates)}
          />




          {showTemplates && (
            <TemplatesPanel
              setShowTemplates={setShowTemplates}
              selectedDate={selectedDate}
              getFilteredTodos={getFilteredTodos}
              addTodo={addTodo}
              ></TemplatesPanel>
          )}

          {showTagManager && (
            <TagManager customTags={customTags} onAddTag={addTag} onRemoveTag={removeTag} onEditTag={editTag}
            onClose={() => setShowTagManager(false)} />
          )}

          {viewMode === "month" && (
            <MonthView selectedDate={selectedDate} todos={todos} onSelectDate={setSelectedDate} />
          )}
          {viewMode === "week" && <WeekView selectedDate={selectedDate} todos={todos} onSelectDate={setSelectedDate} />}
          {viewMode === "day" && <DayView selectedDate={selectedDate} onSelectDate={setSelectedDate} />}

          <FilterBar
            filterTag={filterTag}
            filterCompleted={filterCompleted}
            customTags={customTags}
            totalCount={totalCount}
            completedCount={completedCount}
            onFilterTagChange={setFilterTag}
            onFilterCompletedChange={setFilterCompleted}
          />


            <TaskInput
            addTodo={addTodo}
            selectedDate= {selectedDate}
            customTags={customTags}

          />
          
          <TodoList
            todos={filteredTodos}
            customTags={customTags}
            onToggleTodo={toggleTodo}
            onDeleteTodo={deleteTodo}
            onUpdateTodo={updateTodo}
          />

        </main>
      </div>
    </div>
  )
}
