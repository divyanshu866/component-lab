import Editor from "@/components/Editor";
import Console from "@/components/Console";
import Sidebar from "@/components/Sidebar";

import Navbar from "@/components/Navbar";
// import { useState } from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Preview from "@/components/Preview";

export default async function workspace() {
  const session = await auth();

  if (!session) redirect("/sign-in");
  console.log("SESSION===>", session);
  return (
    <>
      <Navbar user={session.user} />
      <div className="flex flex-1 h-0">
        <Sidebar />
        <div className="flex flex-col flex-1 w-0 relative">
          <div className="flex flex-1 h-0">
            <Editor />
            <Preview />
          </div>

          <Console />
        </div>
      </div>
    </>
  );
}
