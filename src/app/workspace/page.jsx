"use client";
import Editor from "@/components/Editor";
import Console from "@/components/Console";
import { useConsole } from "@/context/ConsoleContext";

export default function workspace() {
  const { showConsole, setShowConsole } = useConsole();

  return (
    <>
      <Editor showConsole={showConsole} setShowConsole={setShowConsole} />
      <Console showConsole={showConsole} setShowConsole={setShowConsole} />
    </>
  );
}
