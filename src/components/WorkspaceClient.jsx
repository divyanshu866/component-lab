"use client";

import Editor from "@/components/Editor";
import Console from "@/components/Console";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import WebBundleIFrame from "@/components/Preview/WebBundleIFrame";
import ReactIFrame from "./Preview/ReactIFrame";

const getIsMobile = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 767px)").matches;

const WorkspaceClient = ({ user }) => {
  const [isMobile, setIsMobile] = useState(getIsMobile);

  useEffect(() => {
    function handleResize() {
      const mediaQuery = window.matchMedia("(max-width: 767px)");
      const updateIsMobile = (event) => setIsMobile(event.matches);

      setIsMobile(mediaQuery.matches);
      mediaQuery.addEventListener("change", updateIsMobile);
      return () => mediaQuery.removeEventListener("change", updateIsMobile);
    }
    handleResize();
  }, []);

  return (
    <div className="flex min-h-0 min-w-0 flex-1 bg-transparent overflow-hidden relative">
      <Sidebar />
      <div className="relative flex min-h-0 min-w-0 flex-1 flex-col bg-transparent">
        <div className="relative flex min-h-0 flex-1 justify-start bg-backgroundDark">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_72%_58%_at_50%_43%,rgba(124,58,237,0.15)_0%,rgba(124,58,237,0.09)_28%,rgba(124,58,237,0.035)_52%,transparent_76%),radial-gradient(ellipse_38%_32%_at_18%_78%,rgba(217,70,239,0.055)_0%,transparent_72%),radial-gradient(ellipse_38%_32%_at_84%_18%,rgba(99,102,241,0.05)_0%,transparent_72%)]" />
          <Editor user={user} isMobile={isMobile} />
          <WebBundleIFrame isMobile={isMobile} />
          <ReactIFrame isMobile={isMobile} />
        </div>
        <Console />
      </div>
    </div>
  );
};

export default WorkspaceClient;
