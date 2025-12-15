"use client";
import Preview from "@/components/Preview";
import Editor from "@/components/Editor";
import Console from "@/components/Console";
import Sidebar from "@/components/Sidebar";
import { useEditorContext } from "@/context/EditorContext";
import React, { useState } from "react";

const WorkspaceClient = ({ user }) => {
  const isMobile = false;
  return (
    <>
      <div className="flex flex-1 h-0">
        <Sidebar isMobile={isMobile} />
        <div className={`flex flex-col flex-1 w-0 relative`}>
          <div className={`flex flex-1 h-0`}>
            <Editor isMobile={isMobile} />
            <Preview isMobile={isMobile} />
          </div>
          <Console />
        </div>
      </div>
    </>
  );
};
export default WorkspaceClient;
