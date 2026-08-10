"use client";
import Editor from "@/components/Editor";
import Console from "@/components/Console";
import Sidebar from "@/components/Sidebar";
import { useEditorContext } from "@/context/EditorContext";
import React, { useState } from "react";
import HtmlIFrame from "@/components/Preview/HtmlIFrame";
import ReactIFrame from "./Preview/ReactIFrame";
const WorkspaceClient = ({ user }) => {
  const { targetTech } = useEditorContext();
  const isMobile = false;

  return (
    <>
      <div className="flex flex-1 h-0 bg-transparent">
        <Sidebar isMobile={isMobile} />
        <div className={`flex flex-col flex-1 w-0 relative bg-transparent`}>
          <div className={`flex flex-1 justify-end h-0 bg-transparent`}>
            <Editor user={user} isMobile={isMobile} />
            {targetTech === "HTML" && <HtmlIFrame isMobile={isMobile} />}
            {targetTech === "REACT" && <ReactIFrame isMobile={isMobile} />}
          </div>
          <Console />
        </div>
      </div>
    </>
  );
};
export default WorkspaceClient;
