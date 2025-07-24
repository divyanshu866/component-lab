import Editor from "@/components/Editor";
import Console from "@/components/Console";
import Navbar from "@/components/Navbar";
// import { useState } from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function workspace() {
  const session = await auth();

  if (!session) redirect("/sign-in");
  console.log(session);
  return (
    <>
      <Navbar />

      <Editor />
      <Console />
    </>
  );
}
