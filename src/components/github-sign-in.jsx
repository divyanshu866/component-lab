"use client";
import { signIn } from "next-auth/react";
import { Github } from "lucide-react";

const SignInGithub = () => {
  return (
    // <form
    //   action={async () => {
    //     "use server";
    //     await signIn("github");
    //   }}
    //   className=""
    // >
    //   <button className="flex justify-center items-center gap-3 py-3 w-full text-gray-900 bg-white rounded-sm border border-gray-900 cursor-pointer">
    //     <Github className="bg-gray-900 p-0.5 pt-1 pb-0 fill-white rounded-full text-white"></Github>{" "}
    //     Continue with GitHub
    //   </button>
    // </form>

    <button
      onClick={() => signIn("github")}
      className="mt-4 w-full py-3 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center space-x-2 cursor-pointer"
    >
      <Github className="w-5 h-5" />
      <span>GitHub</span>
    </button>
  );
};

export default SignInGithub;
