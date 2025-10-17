"use client";

import type { CustomTag } from "@/types/todo";
import type { Todo } from "@/types/todo";
import { useState } from "react";

interface TaskInputProps {
  addTodo: (todo: Todo) => void;
  selectedDate: Date;
  customTags: CustomTag[];
}

export function TaskInput({
  addTodo,
  selectedDate,
  customTags,
}: TaskInputProps) {
  const [newTodo, setNewTodo] = useState("");
  const [newTime, setNewTime] = useState("");
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const handleAddTodo = () => {
    const getWeekNumber = (date: Date) => {
      const d = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
      );
      const dayNum = d.getUTCDay() || 7;
      d.setUTCDate(d.getUTCDate() + 4 - dayNum);
      const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
      return Math.ceil(
        ((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
      );
    };

    if (!newTodo.trim()) return;


        addTodo({
          text: newTodo,
          time: newTime || undefined,
          day: selectedDate.toISOString().split("T")[0],
          done: false,
          tags: selectedTags,
          notes:"",
          week: getWeekNumber(selectedDate),
        });

      
    setNewTodo("");
    setNewTime("");
    setSelectedTags([]);
  };

  const onToggleTag = (id:  number) => {
    if (selectedTags.includes(id)) {
      setSelectedTags(selectedTags.filter((t) => t !== id));
    } else {
      setSelectedTags([...selectedTags, id]);
    }
  };

  return (
    <div className="mb-6 p-3 lg:p-4 bg-white rounded-xl border border-gray-200">
      <div className="flex flex-col sm:flex-row gap-2 mb-3">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
          placeholder="Write a todo..."
          className="flex-1 px-3 lg:px-4 py-2 lg:py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm lg:text-base"
        />
        <input
          type="time"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
          className="px-3 lg:px-4 py-2 lg:py-3 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm lg:text-base"
        />
        <button
          onClick={handleAddTodo}
          className="px-4 lg:px-6 py-2 lg:py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-semibold text-sm lg:text-base"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {customTags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => onToggleTag(tag.id)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all border-2 ${
              selectedTags.includes(tag.id)
                ? "text-white shadow-lg scale-105"
                : "bg-white text-gray-700 border-gray-300"
            }`}
            style={
              selectedTags.includes(tag.id)
                ? { backgroundColor: tag.color, borderColor: tag.color }
                : {}
            }
          >
            {tag.name}
          </button>
        ))}
      </div>
    </div>
  );
}
