"use client";

import type React from "react";

import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/utils/auth";

export default function RegisterPage() {
  const { token } = useParams<{ token: string }>();
  const router = useRouter();
  const [password, setPassword] = useState("123456789@");
  const [password2, setPassword2] = useState("123456789@");
  const [errorMessage, setErrorMessage] = useState(""); // optional
  const [successMessage, setSuccessMessage] = useState(""); // optional

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    async function ResetPasswordForUser() {
      setErrorMessage("");
      setSuccessMessage("");
      try {
        const data = await resetPassword({
          token,
          new_password: password,
          confirm_new_password: password2,
        });
        setSuccessMessage(data.message || "PasswordReset is successfully!");
        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
      } catch (error: any) {
        setErrorMessage(error.message || "PasswordReset Failed.");
      }
    }

    ResetPasswordForUser();
    setPassword("");
    setPassword2("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-green-500 rounded-lg"></div>
            <span className="font-bold text-2xl text-gray-900 dark:text-white">
              Lovable Todo
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">
            Reset Password
          </h1>
        </div>

        {/* ResetPassword Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
          <form onSubmit={handleRegister} className="space-y-6">
            {/* 🧠 Error Message */}
            {errorMessage && (
              <p className="text-red-500 text-sm font-medium">{errorMessage}</p>
            )}

            {/* ✅ Success Message */}
            {successMessage && (
              <p className="text-green-600 text-sm font-medium">
                {successMessage}. redirecting to login page
              </p>
            )}

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Confirm Password
              </label>
              <input
                id="password2"
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
