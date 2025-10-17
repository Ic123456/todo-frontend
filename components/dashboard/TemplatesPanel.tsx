"use client";

import { X, Trash2, Edit2, NutIcon } from "lucide-react";
import { useState, useEffect } from "react";
import type { Template, Todo } from "@/types/todo";
import { handleTemplate, handleTodo } from "@/utils/backendapi";

interface TemplatesPanelProps {
  setShowTemplates: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDate: Date;
  getFilteredTodos: () => Todo[];
  addTodo: (todo: Todo) => void;
}

export function TemplatesPanel({
  setShowTemplates,
  selectedDate,
  getFilteredTodos,
  addTodo,
}: TemplatesPanelProps) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

useEffect(() => {
  async function fetchTemplate() {
    try {
      const response = await handleTemplate("get");

      setTemplates(
        response.map((tem: any) => ({
          id: tem.id,
          name: tem.name,
          tasks: tem.template_todos?.map((task: any) => ({
            text: task.title,
            time: task.time,
            notes: task.description || "",
            tags: task.tags || [],
            done: task.completed || false,
          })) || [],
        }))
      );
    } catch{
    }
  }

  fetchTemplate();
}, []);



  const handleEditClick = (template: Template) => {
    setEditingId(template.id);
    setEditName(template.name);
  };

  const handleSaveEdit = (id: string) => {
    if (editName.trim()) {

      async function EditName() {
        await handleTemplate("patch", {
          id: Number(id),
          name: editName,
        });
      }
      EditName();
      editTemplate(id, editName);
    }

    setEditingId(null);
    setEditName("");
  };

  const addCustomTemplate = (name: string) => {
    const selectedDayTodos = getFilteredTodos().filter((todo) => !todo.done);
    if (selectedDayTodos.length === 0) return;

    async function handleaddtemplate() {
      try {
        const res = await handleTemplate("post", {
          name,
          date: selectedDate.toISOString().split("T")[0],
        });

        const newTemplate: Template = {
          id: res.id,
          name,
          tasks: selectedDayTodos.map(({ day, ...rest }) => rest),
        };
        setTemplates([...templates, newTemplate]);
      } catch (err) {
      }
    }
    handleaddtemplate();
  };

const applyTemplate = async (template: Template) => {
  const newTodos = template.tasks.map((task) => ({
    ...task,
    id: Number(Date.now().toString() + Math.random()),
    day: selectedDate.toISOString().split("T")[0],
  }));

  // Send each new todo to the backend
  for (const todo of newTodos) {
    await handleTodo("post", {
      title: todo.text,
      description: todo.notes,
      date: todo.day,
      time: todo.time || undefined,
      tags: todo.tags.map(Number),
      completed: todo.done,
    });
  }

  // Optionally add them to local state too
  newTodos.forEach((todo) => addTodo(todo));

  setShowTemplates(false);
};

  const deleteTemplate = (id: string) => {
    setTemplates(templates.filter((t) => t.id !== id));
  };

  const editTemplate = (id: string, name: string) => {
    setTemplates(templates.map((t) => (t.id === id ? { ...t, name } : t)));
  };

  return (
    <div className="mb-6 p-4 bg-white rounded-xl border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Quick Start Templates</h3>
        <button
          onClick={() => setShowTemplates(false)}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Close templates panel"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {templates.map((template) => (
          <div key={template.id} className="relative group">
            {editingId === template.id ? (
              <div className="p-4 bg-gray-50 rounded-lg border-2 border-blue-500">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-2 py-1 mb-2 rounded border border-gray-300"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveEdit(template.id);
                    if (e.key === "Escape") setEditingId(null);
                  }}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSaveEdit(template.id)}
                    className="flex-1 px-2 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="flex-1 px-2 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={() => applyTemplate(template)}
                  className="w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
                >
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {template.name}
                  </h4>
                  <p className="text-xs text-gray-600">
                    {template.tasks.length} tasks
                  </p>
                </button>
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick(template);
                    }}
                    className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-blue-50 transition-colors"
                    aria-label="Edit template"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-blue-600" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`Delete template "${template.name}"?`)) {
                        async function DeleteTemplate() {
                          try{
                            await handleTemplate("delete", {
                              id: Number(template.id)
                            })
                          }catch (err) {
                        }
                        }
                        DeleteTemplate()
                        deleteTemplate(template.id);
                      }
                    }}
                    className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-red-50 transition-colors"
                    aria-label="Delete template"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-600" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Template name..."
          id="template-name"
          className="flex-1 px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900"
        />
        <button
          onClick={() => {
            const input = document.getElementById(
              "template-name"
            ) as HTMLInputElement;
            if (input.value) {
              addCustomTemplate(input.value);
              input.value = "";
            }
          }}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Save Current as Template
        </button>
      </div>
    </div>
  );
}
