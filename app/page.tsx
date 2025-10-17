"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { logout } from "@/utils/auth";
import { verifyToken, refreshToken } from "@/utils/auth";
export default function HomePage() {
  const [displayText, setDisplayText] = useState("");
  const fullText = "JUST DO IT.";
  const [index, setIndex] = useState(0);
  const [token, settoken] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (index < fullText.length) {
        setDisplayText((prev) => prev + fullText[index]);
        setIndex(index + 1);
      } else {
        // Reset animation after a pause
        setTimeout(() => {
          setDisplayText("");
          setIndex(0);
        }, 2000);
      }
    }, 150);
    return () => clearTimeout(timeout);
  }, [index]);

useEffect(() => {
  async function handleTokenCheck() {
    const storedToken = localStorage.getItem("access_token");
    if (!storedToken) {
      setMounted(true);
      return;
    }

    try {
      const res = await verifyToken(storedToken);
      settoken(storedToken);
    } catch {
      try {
        const newToken = await refreshToken();
        localStorage.setItem("access_token", newToken);
        settoken(newToken);
      } catch {
        localStorage.removeItem("access_token");
        settoken("");
      }
    } finally {
      setMounted(true);
    }
  }

  handleTokenCheck();
}, []);

  async function handleLogOut() {
    try {
      await logout(token);
      localStorage.removeItem("access_token")
      settoken("");
      
      window.location.reload();
    } catch (error: any) {
    }
  }

    if (!mounted) return null; // or a small loading skeleton


  return (
    <div className="min-h-screen bg-[#f5f5f5] transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-green-500 rounded-lg"></div>
            <span className="font-bold text-xl text-gray-900">
              Lovable Todo
            </span>
          </div>
          <div className="flex items-center gap-4">
            {!token && (
              <>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}

            {token && (
              <button
                onClick={handleLogOut}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center space-y-6">
          {/* Typing Animation */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-black text-gray-900 tracking-tight">
            {displayText}
            <span className="animate-pulse">|</span>
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A minimal workspace for capturing one thing at a time.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-4 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-4 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Today
            </Link>
          </div>
        </div>
      </main>

      {/* Features Preview */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Quick Templates
            </h3>
            <p className="text-sm text-gray-600">
              Pre-built templates for students to organize their day or week
              instantly.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">🏷️</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Smart Tags
            </h3>
            <p className="text-sm text-gray-600">
              Organize tasks with custom tags and filter by category, priority,
              or subject.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">📅</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Week & Month Planning
            </h3>
            <p className="text-sm text-gray-600">
              Plan your entire week or month with timeline views and progress
              tracking.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
