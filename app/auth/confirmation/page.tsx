"use client"

import Link from "next/link"

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Check your email</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            We've sent a confirmation link to your email address. Please check your inbox and click the link to verify
            your account.
          </p>

          <div className="space-y-4">
            <Link
              href="/auth/login"
              className="block w-full py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Go to Login
            </Link>

            <Link
            href="/resendemail"
            className="w-full py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors">
              Resend confirmation email
            </Link>
          </div>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-500 mt-6">
          Didn't receive the email? Check your spam folder or{" "}
          <Link href="/auth/register" className="text-green-500 hover:text-green-600 font-semibold">
            try again
          </Link>
        </p>
      </div>
    </div>
  )
}
