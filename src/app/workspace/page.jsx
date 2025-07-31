import Navbar from "@/components/Navbar";
// import { useState } from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

import WorkspaceClient from "@/components/WorkspaceClient";

export default async function workspace() {
  const session = await auth();

  ("use client");
  if (!session) redirect("/sign-in");
  console.log("SESSION===>", session);
  return (
    <>
      <Navbar user={session.user} />
      <WorkspaceClient user={session.user} />
    </>
  );
}
