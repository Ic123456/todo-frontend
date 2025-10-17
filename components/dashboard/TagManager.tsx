"use client";
import { useRef } from "react";
import { X } from "lucide-react";
import type { CustomTag } from "@/types/todo";
import { handleTag } from "@/utils/backendapi";

interface TagManagerProps {
  customTags: CustomTag[];
  onAddTag: (name: string, color: string) => void;
  onRemoveTag: (id: number) => void;
  onEditTag: (id: number, name: string, color: string) => void;
  onClose: () => void;
}

export function TagManager({
  customTags,
  onAddTag,
  onRemoveTag,
  onEditTag,
  onClose,
}: TagManagerProps) {
  

  function handleChange(id: number, name: string, color: string) {
    onEditTag(id, name, color);
  }

  return (
    <div className="mb-6 p-4 bg-white rounded-xl border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Manage Tags</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Close tag manager"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="space-y-2 mb-4">
        {customTags.map((tag) => (
          <div key={tag.id} className="flex items-center gap-2">
            <input
              type="color"
              value={tag.color}
              onChange={(e) => {
                handleChange(tag.id, tag.name, e.target.value);
              }}
              className="w-8 h-8 rounded cursor-pointer"
            />
            <input
              type="text"
              value={tag.name}
              onChange={(e) => {
                handleChange(tag.id, e.target.value, tag.color);
              }}
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900"
            />
            <button
              onClick={() => {
                onRemoveTag(tag.id);
              }}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="color"
          id="new-tag-color"
          defaultValue="#3b82f6"
          className="w-8 h-8 rounded cursor-pointer"
        />
        <input
          type="text"
          id="new-tag-name"
          placeholder="New tag name..."
          className="flex-1 px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900"
        />
        <button
          onClick={() => {
            const nameInput = document.getElementById(
              "new-tag-name"
            ) as HTMLInputElement;
            const colorInput = document.getElementById(
              "new-tag-color"
            ) as HTMLInputElement;
            if (nameInput.value) {
              onAddTag(nameInput.value, colorInput.value);

              nameInput.value = "";
            }
          }}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Add Tag
        </button>
      </div>
    </div>
  );
}
