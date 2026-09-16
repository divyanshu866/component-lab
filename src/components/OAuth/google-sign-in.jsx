"use client";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
const SignInGoogle = () => {
  const handleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/workspace",
    });
  };
  return (
    <button
      onClick={handleSignIn}
      className="w-full py-3 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center space-x-2 cursor-pointer"
    >
      <Image src="/logos/google.svg" width="20" height="20" alt="Google" />
      <span>Google</span>
    </button>
  );
};

export default SignInGoogle;
