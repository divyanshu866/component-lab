// app/sign-up/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;
    const data = {
      email: form.email.value,
      password: form.password.value,
      confirm: form.confirm.value,
    };

    if (data.password !== data.confirm) {
      setError("Passwords do not match.");
      return;
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/sign-in");
    } else {
      const { message } = await res.json();
      setError(message || "Something went wrong.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white px-10 py-30 rounded-lg shadow-md w-full max-w-lg space-y-4"
      >
        <h1 className="text-2xl text-black font-semibold text-center">
          Create your account
        </h1>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <label className="block">
          <span className="text-gray-700">Email</span>
          <input
            name="email"
            type="email"
            required
            className="mt-1 text-gray-800 block w-full border rounded px-3 py-2"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Password</span>
          <input
            name="password"
            type="password"
            required
            className="mt-1 text-gray-800 block w-full border rounded px-3 py-2"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Confirm Password</span>
          <input
            name="confirm"
            type="password"
            required
            className="mt-1 text-gray-800 block w-full border rounded px-3 py-2"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
        >
          Sign Up
        </button>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/sign-in" className="text-purple-600 hover:underline">
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
}
