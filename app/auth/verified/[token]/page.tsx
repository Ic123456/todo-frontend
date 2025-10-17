"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { confirmEmail } from "@/utils/auth";


export default function VerifiedPage() {
  const router = useRouter();
  const { token } = useParams<{ token: string }>();
  const [countdown, setCountdown] = useState(3);
  const [status, setStatus] = useState("");
useEffect(() => {
  if (!token) return;

  let timer: NodeJS.Timeout;

  async function getTokenUrl() {
    try {
      const data = await confirmEmail({ token }); // ✅ backend message
      setStatus(data.message || "verified");

      // start countdown
      timer = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } catch (error: any) {
      setStatus(error.message || "Error");

      timer = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
  }

  getTokenUrl();

  return () => clearInterval(timer);
}, [token]);


useEffect(() => {
  if (countdown === 0) {
    if (status === "Account activated successfully!" || status === "You are already verified" || status === 'verified') {
      router.push("/auth/login");
    } else if (status === "Activation link is invalid!") {
      router.push("/auth/resendemail");
    } else if (status === "Error") {
      router.push("/auth/register");
    }
  }
}, [countdown, status, router]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        {/* Success Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center animate-bounce">
            <svg
              className="w-10 h-10 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Email Confirmed!
          </h1>
          {status === "verified" && (
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Your account has been successfully verified. Redirecting you to
              the Login Page in {countdown} seconds...
            </p>
          )}

          {status === "You are already verified" && (
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {status} Redirecting you to the Login Page in {countdown}{" "}
              seconds...
            </p>
          )}

          {status === "Activation link is invalid!" && (
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {status} Redirecting you to the Resend Email Page in {countdown}{" "}
              seconds...
            </p>
          )}

          <div className="space-y-4">
            <Link
              href="/"
              className="block w-full py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
