"use client";

import { useState, useRef, useEffect } from "react";
import { X, Edit2 } from "lucide-react";
import type { Todo, CustomTag } from "@/types/todo";
import { handleTodo } from "@/utils/backendapi";

interface TodoListProps {
  todos: Todo[];
  customTags: CustomTag[];
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
  onUpdateTodo: (id: number, updates: Partial<Todo>) => void;
}

export function TodoList({
  todos,
  customTags,
  onToggleTodo,
  onDeleteTodo,
  onUpdateTodo,
}: TodoListProps) {

  const [editingTodo, setEditingTodo] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [editTime, setEditTime] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [editTags, setEditTags] = useState<number[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    setVisibleTodos(
      new Set(
        todos.filter((t) => t.id !== undefined).map((t) => t.id as number)
      )
    );
  }, [todos]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const todoId = entry.target.getAttribute("data-todo-id");
            if (todoId) {
              setVisibleTodos((prev) => new Set(prev).add(Number(todoId)));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const startEditTodo = (todo: Todo) => {
    if (todo.id !== undefined) {
      setEditingTodo(todo.id);
    }
    setEditText(todo.text);
    setEditTime(todo.time || "");
    setEditNotes(todo.notes);
    setEditTags(todo.tags);
  };

  const saveEditTodo = () => {
    if (!editingTodo) return;

    onUpdateTodo(editingTodo, {
      text: editText,
      time: editTime,
      notes: editNotes,
      tags: editTags,
    });
    setEditingTodo(null);
  };
  



  if (todos.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg font-medium mb-2">No tasks yet</p>
        <p className="text-sm">Add your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo, idx) => (
        <div
          key={todo.id}
          data-todo-id={todo.id}
          ref={(el) => {
            if (
              el &&
              observerRef.current &&
              todo.id &&
              !visibleTodos.has(todo.id)
            ) {
              observerRef.current.observe(el);
            }
          }}
          className={`transition-all duration-500 ${
            todo.id && visibleTodos.has(todo.id)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: `${idx * 50}ms` }}
        >
          {editingTodo === todo.id ? (
            <div className="p-4 bg-white rounded-xl border-2 border-purple-500 shadow-lg">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full px-3 py-2 mb-2 rounded-lg border border-gray-300 bg-white text-gray-900"
              />
              <input
                type="time"
                value={editTime}
                onChange={(e) => setEditTime(e.target.value)}
                className="w-full px-3 py-2 mb-2 rounded-lg border border-gray-300 bg-white text-gray-900"
              />
              <textarea
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                placeholder="Add notes..."
                className="w-full px-3 py-2 mb-2 rounded-lg border border-gray-300 bg-white text-gray-900"
                rows={3}
              />
              <div className="flex flex-wrap gap-2 mb-2">
                {customTags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => {
                      if (editTags.includes(tag.id)) {
                        setEditTags(editTags.filter((t) => t !== tag.id));
                      } else {
                        setEditTags([...editTags, tag.id]);
                      }
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all border-2 ${
                      editTags.includes(tag.id)
                        ? "text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 border-gray-300"
                    }`}
                    style={
                      editTags.includes(tag.id)
                        ? {
                            backgroundColor: tag.color,
                            borderColor: tag.color,
                          }
                        : {}
                    }
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    if (todo.id !== undefined) {
                      saveEditTodo();
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingTodo(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => {
                    if (todo.id !== undefined) {
                    
                      onToggleTodo(todo.id);
                    }
                  }}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500 cursor-pointer"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {todo.time && (
                      <span className="text-xs font-medium text-gray-500">
                        {todo.time}
                      </span>
                    )}
                    <span
                      className={`text-sm font-medium ${
                        todo.done
                          ? "line-through text-gray-400"
                          : "text-gray-900"
                      }`}
                    >
                      {todo.text}
                    </span>
                  </div>
                  {todo.notes && (
                    <p className="text-xs text-gray-600 mb-2">{todo.notes}</p>
                  )}
                  {todo.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {todo.tags.map((tagName, i) => {
                        const tag = customTags.find((t) => t.id === tagName);
                        return (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-full text-xs font-medium border-2"
                            style={{
                              backgroundColor: "transparent",
                              borderColor: tag?.color || "#6b7280",
                              color: tag?.color || "#6b7280",
                            }}
                          >
                            {tag?.name ?? "Unknown"}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => startEditTodo(todo)}
                    className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (todo.id !== undefined) {
                        onDeleteTodo(todo.id);
                      }
                    }}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
