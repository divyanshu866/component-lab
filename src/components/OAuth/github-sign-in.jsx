"use client";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
const SignInGithub = () => {
  const handleSignIn = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/workspace",
    });
  };
  return (
    <button
      onClick={handleSignIn}
      className="w-full py-3 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center space-x-2 cursor-pointer"
    >
      <Image src="/logos/github.svg" width="20" height="20" alt="GitHub" />
      <span>GitHub</span>
    </button>
  );
};

export default SignInGithub;
