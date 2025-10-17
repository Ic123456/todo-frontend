"use client";

import { useState, useEffect, useRef } from "react";
import type { Todo } from "@/types/todo";
import { handleTodo } from "@/utils/backendapi";
import { todo } from "node:test";

export function useTodos() {
  const timeoutRefTodo = useRef<NodeJS.Timeout | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function fetchTodo() {
      try {
        const response = await handleTodo("get");
        setTodos(
          response.map((todo: any) => ({
            id: todo.id,
            text: todo.title,
            time: todo.time,
            day: todo.date,
            done: todo.completed,
            tags: todo.tags,
            notes: todo.description,
            week: todo.week,
          }))
        );
      } catch (error) {
      }
    }

    fetchTodo();
  }, []);

  const addTodo = async (todo: Todo) => {
    try {
      const response = await handleTodo("post", {
        title: todo.text,
        description: "",
        date: todo.day,
        time: todo.time,
        tags: todo.tags,
        completed: todo.done,
        week: todo.week,
      });

      const newTodo = {
        id: response.id,
        text: response.title,
        time: response.time,
        day: response.date,
        done: response.completed,
        tags: response.tags,
        notes: response.description,
        week: response.week,
      };

      setTodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (err) {
    }
  };

  const toggleTodo = async (id: number) => {
    // Clear previous timeout if user toggles too fast
    if (timeoutRefTodo.current) clearTimeout(timeoutRefTodo.current);

    // Optimistically update the UI first
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );

    // Schedule backend update with debounce (3s)
    timeoutRefTodo.current = setTimeout(async () => {
      try {
        // Get the updated todo’s latest value
        const updatedTodo = todos.find((todo) => todo.id === id);
        if (!updatedTodo) return;

        await handleTodo("patch", {
          id,
          completed: !updatedTodo.done, // ✅ correct field name for backend
        });
      } catch (err) {
      }
    }, 1000);
  };

  const deleteTodo = async (id: number) => {
    try {
      await handleTodo("delete", {
        id: id,
      });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
    }
  };

  const updateTodo = async (id: number, updates: Partial<Todo>) => {
    try {
      // Send the update to backend
      await handleTodo("patch", {
        id,
        title: updates.text, // map frontend field names to backend fields
        description: updates.notes,
        time: updates.time || undefined,
        tags: updates.tags,
        completed: updates.done,
      });

      // Update local state after successful patch
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
      );
    } catch (err) {
    }
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
  };
}
