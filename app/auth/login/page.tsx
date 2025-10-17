"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser } from "@/utils/auth";
import GoogleLoginButton from "@/components/GoogleLoginButton";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("blenderbegtopro@gmail.com");
  const [password, setPassword] = useState("123456789@");
  const [errorMessage, setErrorMessage] = useState(""); // optional
  const [successMessage, setSuccessMessage] = useState(""); // optional

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    async function LoginUser() {
      try {
        const data = await loginUser({
          email,
          password,
        });
        setSuccessMessage(data.message || "Login successfully!");
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } catch (error: any) {
        setErrorMessage(error.message || "Login Failed.");
      }
    }

    // Simulate login
    router.push("/dashboard");
    LoginUser();
  };

  const handleGoogleLogin = () => {
    // Simulate Google login
    router.push("/dashboard");
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
            Welcome back
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Sign in to continue your journey
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
          <form onSubmit={handleLogin} className="space-y-6">
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
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                placeholder="you@example.com"
                required
              />
            </div>

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
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Login */}
          <GoogleLoginButton setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage} />

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            Don't have an account?{" "}
            <Link
              href="/auth/register"
              className="text-red-500 hover:text-red-600 font-semibold"
            >
              Sign up
            </Link>
          </p>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            Forgot Password?{" "}
            <Link
              href="/auth/resetpassword"
              className="text-red-500 hover:text-red-600 font-semibold"
            >
              Reset Password
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
