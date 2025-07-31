"use client";
import Preview from "@/components/Preview";
import Editor from "@/components/Editor";
import Console from "@/components/Console";
import Sidebar from "@/components/Sidebar";
import { useEditorContext } from "@/context/EditorContext";
import React from "react";

const WorkspaceClient = ({ user }) => {
  return (
    <>
      <div className="flex flex-1 h-0">
        <Sidebar />
        <div className={`flex flex-col flex-1 w-0 relative`}>
          <div className={`flex flex-1 h-0`}>
            <Editor />
            <Preview />
          </div>
          <Console />
        </div>
      </div>
    </>
  );
};
export default WorkspaceClient;
