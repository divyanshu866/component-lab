// app/workspace/layout.tsx
"use client";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { ConsoleProvider } from "@/context/ConsoleContext";
import { useConsole } from "@/context/ConsoleContext";
export default function WorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full h-full flex flex-row bg-neutral-900 text-white">
      <Sidebar />

      <div className="h-full w-full flex flex-col">
        <ConsoleProvider>
          <Navbar />
          {children}
        </ConsoleProvider>
      </div>
    </main>
  );
}
