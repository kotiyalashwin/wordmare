"use client";

import React from "react";
import {
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
  useCreateBlockNote,
} from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import {
  BlockNoteEditor,
  BlockNoteSchema,
  defaultBlockSpecs,
  filterSuggestionItems,
} from "@blocknote/core";
import { ToolBadgeBlock } from "./customblocks/Tool";
import { getToolSlashMenuItems } from "./custom_menu/tools";
import { InputBadgeBlock } from "./customblocks/Input";
import { getMentionMenuItems } from "./custom_menu/inputs";
import { useGetInputs } from "@/hooks/getInputs";
import { Button } from "../ui/button";
import { processBlocksAndStoreContent } from "@/lib/getTasks";
import { useGetTasks } from "@/hooks/getTasks";
import { schema } from "@/lib/schema";
import InputBox from "../core/InputBox";
import { poppins } from "@/app/fonts";
import useFlowNameStore from "@/store/flowname";
import { useSidebar } from "../core/sidebar";

export const EditorComponent = () => {
  const { setName } = useFlowNameStore();
  const { toggleSidebar } = useSidebar();
  const editor = useCreateBlockNote({
    schema,
  });
  return (
    <>
      <div className="w-full p-4">
        <Button
          onClick={() => {
            processBlocksAndStoreContent(editor);
            toggleSidebar();
          }}
          className="absolute z-10  bottom-10 left-1/2 -translate-x-1/2"
        >
          Run
        </Button>
        <input
          className={`w-full ${poppins.className}
                   placeholder:text-neutral-400
                   text-black
                   font-medium
                   text-5xl outline-none`}
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Flow Name"
        />
        <InputBox />
      </div>
      <div className="flex justify-center">
        <div className="h-[4px] w-[95%] self-center bg-neutral-400/25" />
      </div>
      <div className="p-4">
        <Editor editor={editor} />
      </div>
    </>
  );
};

function Editor({ editor }: { editor: BlockNoteEditor<any> }) {
  const inputs = useGetInputs();

  const getCustomSlashMenuItems = (editor: BlockNoteEditor<any>) => [
    ...getToolSlashMenuItems(editor),
    ...getDefaultReactSlashMenuItems(editor),
  ];

  const mentionItems = getMentionMenuItems(editor, inputs);

  return (
    <>
      <BlockNoteView
        className="min-h-screen"
        theme={"light"}
        editor={editor}
        slashMenu={false}
      >
        <SuggestionMenuController
          triggerCharacter={"/"}
          getItems={async (query) =>
            filterSuggestionItems(getCustomSlashMenuItems(editor), query)
          }
        />
        <SuggestionMenuController
          triggerCharacter={"@"}
          getItems={(query) => Promise.resolve(mentionItems)}
        />
      </BlockNoteView>
    </>
  );
}
