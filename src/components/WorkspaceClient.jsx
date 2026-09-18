"use client";
import Editor from "@/components/Editor";
import Console from "@/components/Console";
import Sidebar from "@/components/Sidebar";
import { useEditorContext } from "@/context/EditorContext";
import React, { useState } from "react";
import WebBundleIFrame from "@/components/Preview/WebBundleIFrame";
import ReactIFrame from "./Preview/ReactIFrame";
const WorkspaceClient = ({ user }) => {
  const isMobile = false;

  return (
    <>
      <div className="flex flex-1 h-0 bg-transparent">
        <Sidebar isMobile={isMobile} />
        <div className={`flex flex-col flex-1 w-0 relative bg-transparent`}>
          <div
            className={`flex flex-1 justify-end h-0 bg-backgroundDark relative`}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_72%_58%_at_50%_43%,rgba(124,58,237,0.15)_0%,rgba(124,58,237,0.09)_28%,rgba(124,58,237,0.035)_52%,transparent_76%),radial-gradient(ellipse_38%_32%_at_18%_78%,rgba(217,70,239,0.055)_0%,transparent_72%),radial-gradient(ellipse_38%_32%_at_84%_18%,rgba(99,102,241,0.05)_0%,transparent_72%)]" />
            <Editor user={user} isMobile={isMobile} />
            <WebBundleIFrame isMobile={isMobile} />
            <ReactIFrame isMobile={isMobile} />
          </div>
          <Console />
        </div>
      </div>
    </>
  );
};
export default WorkspaceClient;
