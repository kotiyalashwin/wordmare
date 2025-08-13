"use client";

import { EditorComponent } from "@/components/Editor/Editor";
import { Button } from "@/components/ui/button";
import {
  SidebarProvider,
  useSidebar,
  Sidebar,
} from "@/components/core/sidebar";
import React from "react";
import { MainContentSidebar } from "@/components/sidebar/maincontent";
import { getFlowName } from "@/hooks/getName";

const PageContent = () => {
  const name = getFlowName();

  return (
    <div className="w-screen overflow-y-hidden p-4 rounded-lg justify-center h-screen flex bg-gray-400/10 ">
      <div className="max-w-5xl w-full shadow-xl bg-white relative">
        <EditorComponent />
      </div>

      <Sidebar title={name}>
        <MainContentSidebar />
      </Sidebar>
    </div>
  );
};

const Page = () => {
  return (
    <SidebarProvider>
      <PageContent />
    </SidebarProvider>
  );
};

export default Page;
