// app/workspace/layout.tsx
"use client";
import Sidebar from "@/components/Sidebar";
import { ConsoleProvider } from "@/context/ConsoleContext";
import { EditorProvider } from "@/context/EditorContext";
import { SaveProvider } from "@/context/SaveContext";
export default function WorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <EditorProvider>
      <SaveProvider>
        <ConsoleProvider>
          <main className="w-full h-full flex flex-row bg-neutral-900 text-white">
            <Sidebar />

            <div className="h-full w-full flex flex-col">{children}</div>
          </main>
        </ConsoleProvider>
      </SaveProvider>
    </EditorProvider>
  );
}
