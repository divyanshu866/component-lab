export const metadata = {
  title: "Sign In – ComponentLab",
};
import GITHUB from "@/components/github-sign-in";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
export default async function SignInPage() {
  const session = await auth();

  if (session) redirect("/workspace");
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white px-10 py-30 rounded-lg shadow-md w-full max-w-lg">
        <Link href="/">
          <h1 className="text-2xl text-black font-semibold mb-4 text-center">
            Sign In
          </h1>
        </Link>

        <GITHUB />

        <form
          method="post"
          action="/api/auth/callback/credentials/"
          className=""
        >
          <label className="block mb-2">
            <span className="text-gray-700">Email</span>
            <input
              name="email"
              type="email"
              required
              className="mt-1 text-gray-800 block w-full border rounded px-3 py-2"
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Password</span>
            <input
              name="password"
              type="password"
              required
              className="mt-1 text-gray-800 block w-full border rounded px-3 py-2"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
