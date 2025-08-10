"use client";

import React from "react";
import {
  DefaultReactSuggestionItem,
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
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { InputBadgeBlock } from "./customblocks/Input";
import { getMentionMenuItems } from "./custom_menu/inputs";
import { useGetInputs } from "@/hooks/getInputs";
import { Button } from "../ui/button";

export default function Editor() {
  const inputs = useGetInputs();
  const schema = BlockNoteSchema.create({
    blockSpecs: {
      ...defaultBlockSpecs,
      tool: ToolBadgeBlock,
      input : InputBadgeBlock
    },
  }); 
  const editor = useCreateBlockNote({
    schema,
    initialContent: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Your prompt comes here",
            styles: { bold: true },
          },
        ],
      }
    ],
  });

  const getCustomSlashMenuItems = (editor: BlockNoteEditor<any>) => [
    ...getToolSlashMenuItems(editor),
    ...getDefaultReactSlashMenuItems(editor), 
  ];

  const mentionItems = getMentionMenuItems(editor , inputs);
  console.log(editor.document); 

  return (
    <> 
    <div className="space-x-4">
    <Button onClick={()=> 
      {const blocks = editor.document;
      console.log(blocks.filter((block)=> block.type === "input"))}
    }>Get Inputs</Button>
    <Button onClick={()=> 
      {const blocks = editor.document;
      console.log(blocks.filter(block=> block.type === "tool"))}
    }>Get Tools</Button>
    <Button onClick={()=> 
      {const blocks = editor.document;
      console.log(blocks.filter(block => block.type === "paragraph"))}
    }>Get Prompts</Button>
    </div>
    <BlockNoteView theme={"light"} editor={editor} slashMenu={false}>
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
