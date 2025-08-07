"use client";

import React from "react";
import {
  DefaultReactSuggestionItem,
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
  useCreateBlockNote,
} from "@blocknote/react";
// Or, you can use ariakit, shadcn, etc.
import { BlockNoteView } from "@blocknote/mantine";
// Default styles for the mantine editor
import "@blocknote/mantine/style.css";
// Include the included Inter font
import "@blocknote/core/fonts/inter.css";
import {
  BlockNoteEditor,
  BlockNoteSchema,
  defaultBlockSpecs,
  filterSuggestionItems,
  insertOrUpdateBlock,
} from "@blocknote/core";
import { ToolBadgeBlock } from "./customblocks/Tool";
import { getToolSlashMenuItems } from "./custom_menu/tools";
import { HiOutlineGlobeAlt } from "react-icons/hi";

const insertHelloWorldItem = (editor: BlockNoteEditor) => ({
  title: "Insert Hello World",
  onItemClick: () =>
    insertOrUpdateBlock(editor, {
      type: "paragraph",
      content: [{ type: "text", text: "Hello World", styles: { bold: true } }],
    }),
  aliases: ["helloworld", "hw"],
  group: "Other",
  icon: <HiOutlineGlobeAlt size={18} />,
  subtext: "Used to insert a block with 'Hello World' below.",
});

export default function Editor() {
  const schema = BlockNoteSchema.create({
    blockSpecs: {
      ...defaultBlockSpecs,
      tool: ToolBadgeBlock,
    },
  }); // Create a new editor instance
  const editor = useCreateBlockNote({
    schema,
    initialContent: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "",
            styles: { bold: true },
          },
        ],
      },
      //   {
      //     type: "tool",
      //     props: {
      //       toolType: "Generative AI",
      //       size: "medium",
      //       variant: "default",
      //     },
      //   },
    ],
  });

  const getCustomSlashMenuItems = (editor: BlockNoteEditor<any>) => [
    ...getToolSlashMenuItems(editor),
    ...getDefaultReactSlashMenuItems(editor),
    insertHelloWorldItem(editor),
  ];

  // Render the editor
  return (
    <BlockNoteView theme={"light"} editor={editor} slashMenu={false}>
      <SuggestionMenuController
        triggerCharacter={"/"}
        // Replaces the default Slash Menu items with our custom ones
        getItems={async (query) =>
          filterSuggestionItems(getCustomSlashMenuItems(editor), query)
        }
      />
    </BlockNoteView>
  );
}
