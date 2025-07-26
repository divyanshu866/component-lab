export const metadata = {
  title: "Sign In – ComponentLab",
};
import { signIn } from "next-auth/react";
import SignInGithub from "@/components/github-sign-in";
import { auth } from "@/lib/auth";
import { ArrowRight, Code2, Github, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
export default async function SignInPage() {
  const session = await auth();

  if (session) redirect("/workspace");
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Simplified animated background for sign in */}
      <div className="absolute inset-0 opacity-30 z-0">
        <img src="/GradientBackground.jpg" alt="" />
      </div>
      <div className="w-full max-w-md z-10">
        <div className="flex flex-col justify-center items-center text-center mb-8">
          <img src="newlogo.svg" className="w-40 h-40" alt="" />
          <img src="/name.svg" className="" alt="" />
          <p className="text-gray-400 mt-5">
            Sign in to start building amazing components
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 shadow-2xl">
          {/* <div className="space-y-6">
            <div>
              <div className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:border-purple-500 focus:outline-none text-white placeholder-gray-400 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <div className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:border-purple-500 focus:outline-none text-white placeholder-gray-400 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-600 bg-white/5"
                />
                <span className="text-sm text-gray-400">Remember me</span>
              </div>
              <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                Forgot password?
              </button>
            </div>

            <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 font-medium flex items-center justify-center space-x-2">
              <span>Sign In</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div> */}

          <div className="mt-6 text-center">
            {/* <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-gray-400">
                  Or continue with
                </span>
              </div>
            </div> */}

            <SignInGithub />
          </div>

          {/* <div className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <button className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
              Sign up
            </button>
          </div> */}
        </div>
        <Link
          href={"/"}
          className="mt-6 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
