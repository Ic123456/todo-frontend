"use client"

import { List } from "lucide-react"
import type { CustomTag } from "@/types/todo"

interface ListsSectionProps {
  tags: CustomTag[]
  onListClick: (tagName: string) => void
}

export function ListsSection({ tags, onListClick }: ListsSectionProps) {
  return (
    <div className="pt-4 mt-4 border-t border-gray-200">
      <div className="text-xs font-semibold text-gray-500 uppercase mb-2 px-3">Lists</div>
      {tags.slice(0, 4).map((tag) => (
        <button
          key={tag.id}
          onClick={() => onListClick(tag.name)}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
        >
          <List className="w-5 h-5" />
          <span className="font-medium">{tag.name}</span>
        </button>
      ))}
    </div>
  )
}
