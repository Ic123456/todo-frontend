"use client";

import type React from "react";

import { Filter, Bell, CheckCircle } from "lucide-react";
import type { CustomTag } from "@/types/todo";

interface FilterBarProps {
  filterTag: number | null;
  filterCompleted: "all" | "completed" | "incomplete";
  customTags: CustomTag[];
  totalCount: number;
  completedCount: number;
  onFilterTagChange: (tag: number | null) => void;
  onFilterCompletedChange: (filter: "all" | "completed" | "incomplete") => void;
}

export function FilterBar({
  filterTag,
  filterCompleted,
  customTags,
  totalCount,
  completedCount,
  onFilterTagChange,
  onFilterCompletedChange,
}: FilterBarProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">Filter:</span>
      </div>

      <select
        value={filterTag ?? ""}
        onChange={(e) => onFilterTagChange(Number(e.target.value))}
        className="px-3 py-1 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm"
      >
        <option value="">All Tags</option>
        {customTags.map((tag) => (
          <option key={tag.id} value={tag.id}>
            {tag.name}
          </option>
        ))}
      </select>

      <select
        value={filterCompleted}
        onChange={(e) => onFilterCompletedChange(e.target.value as any)}
        className="px-3 py-1 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm"
      >
        <option value="all">All Tasks</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>

      <div className="ml-auto flex items-center gap-4">
        <div
          className="relative 
        
        flex items-center gap-2 px-3 py-1.5 bg-purple-50 rounded-lg border border-purple-200
        "
        >
          <span className="text-sm font-medium text-gray-700  ">
            Total Tasks:
          </span>
          <span className="text-sm font-bold text-purple-600">
            {totalCount}
          </span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 rounded-lg border border-orange-200">
          <CheckCircle className="w-4 h-4 text-orange-600" />
          <span className="text-sm font-medium text-gray-700">Completed:</span>
          <span className="text-sm font-bold text-orange-600">
            {completedCount}
          </span>
        </div>
      </div>
    </div>
  );
}
