"use client";

import { useState, useEffect, useRef } from "react";
import type { CustomTag } from "@/types/todo";
import { handleTag } from "@/utils/backendapi";

export function useTags() {
  const [customTags, setCustomTags] = useState<CustomTag[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function fetchTags() {
      try {
        const response = await handleTag("get");
        setCustomTags(response);
      } catch (error) {
      }
    }

    fetchTags();
  }, []);

  const addTag = async (name: string, color: string) => {
    try {
      const newTag = await handleTag("post", { name, color });
      setCustomTags((prev) => [...prev, newTag]);
    } catch (error) {
    }
  };

  const removeTag = async (id: number) => {
    try {
      await handleTag("delete", { id });
      setCustomTags(customTags.filter((tag) => tag.id !== id));
    } catch (error) {
    }
  };

  const editTag = async (id: number, name: string, color: string) => {
    try {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      // Update UI instantly
      setCustomTags((prev) =>
        prev.map((tag) => (tag.id === id ? { ...tag, name, color } : tag))
      );

      // Send backend update after 5s delay
      timeoutRef.current = setTimeout(async () => {
        try {
          await handleTag("put", { id, name, color });
        } catch (error) {
        }
      }, 5000);
    } catch (error) {
    }
  };
  
  return {
    customTags,
    addTag,
    removeTag,
    editTag,
  };
}
