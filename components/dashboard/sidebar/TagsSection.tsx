"use client"

import { Plus } from "lucide-react"
import type { CustomTag } from "@/types/todo"

interface TagsSectionProps {
  tags: CustomTag[]
  filterTag: number | null
  onTagClick: (tagName: string) => void
  onManageTagsClick: () => void
}

export function TagsSection({ tags, filterTag, onTagClick, onManageTagsClick }: TagsSectionProps) {
  return (
    <div className="pt-4 mt-4 border-t border-gray-200">
      <div className="text-xs font-semibold text-gray-500 uppercase mb-2 px-3">Tags</div>
      {tags.map((tag) => (
        <button
          key={tag.id}
          onClick={() => onTagClick(tag.name)}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            filterTag === tag.id ? "bg-purple-100 text-purple-700" : "hover:bg-gray-100 text-gray-700"
          }`}
        >
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tag.color }} />
          <span className="font-medium text-sm">{tag.name}</span>
        </button>
      ))}
      <button
        onClick={onManageTagsClick}
        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors mt-2"
      >
        <Plus className="w-4 h-4" />
        <span className="text-sm">Manage Tags</span>
      </button>
    </div>
  )
}
