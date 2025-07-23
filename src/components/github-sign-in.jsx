"use client";
import { signIn } from "next-auth/react";
import { Github } from "lucide-react";

const GITHUB = () => {
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
      className="flex justify-center items-center gap-3 py-3 w-full text-gray-900 bg-white rounded-sm border border-gray-900 cursor-pointer"
    >
      <Github className="bg-gray-900 p-0.5 pt-1 pb-0 fill-white rounded-full text-white"></Github>{" "}
      Sign in with GitHub
    </button>
  );
};

export default GITHUB;
