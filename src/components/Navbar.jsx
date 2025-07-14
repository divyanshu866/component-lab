import { Terminal } from "lucide-react";
import { useConsole } from "@/context/ConsoleContext";

export default function Navbar() {
  const { showConsole, setShowConsole } = useConsole();

  return (
    <nav className="h-14 flex items-center justify-between px-6 bg-[#1f2937] border-b border-neutral-800">
      <div className="text-white font-medium">
        <h1>ComponentLab</h1>
      </div>

      <button
        onClick={() => setShowConsole((prev) => !prev)}
        className="flex items-center text-gray-400 bg-gray-800 hover:text-white p-2 rounded hover:bg-gray-700"
      >
        <Terminal className="w-4 h-4" />
      </button>
    </nav>
  );
}
