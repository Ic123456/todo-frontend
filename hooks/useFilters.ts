"use client"

import { useState, useCallback } from "react"
import type { Todo } from "@/types/todo"

export function useFilters(todos: Todo[], selectedDate: Date, viewMode: "day" | "week" | "month") {
const [filterTag, setFilterTag] = useState<number | null>(null)
  const [filterCompleted, setFilterCompleted] = useState<"all" | "completed" | "incomplete">("all")

  const getFilteredTodos = useCallback(() => {
    let filtered = todos

    // The view mode only affects the calendar display, not the todo filtering
    filtered = filtered.filter((todo) => todo.day === selectedDate.toISOString().split("T")[0])

    // Filter by tag
    if (filterTag) {
      filtered = filtered.filter((todo) => todo.tags.includes(filterTag))
    }

    // Filter by completion status
    if (filterCompleted === "completed") {
      filtered = filtered.filter((todo) => todo.done)
    } else if (filterCompleted === "incomplete") {
      filtered = filtered.filter((todo) => !todo.done)
    }

    return filtered
  }, [todos, selectedDate, viewMode, filterTag, filterCompleted])

  return {
    filterTag,
    filterCompleted,
    setFilterTag,
    setFilterCompleted,
    getFilteredTodos,
  }
}



