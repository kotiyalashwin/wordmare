import { BlockNoteEditor, insertOrUpdateBlock } from "@blocknote/core";
import { FaBrain } from "react-icons/fa";

export const getToolSlashMenuItems = (editor: BlockNoteEditor<any>) => [
  {
    title: "Generative AI Tool",
    onItemClick: () => {
      insertOrUpdateBlock(editor, {
        type: "tool",
        props: {
          toolType: "Generative AI",
          size: "medium",
          variant: "default",
        },
      });
    },
    aliases: ["ai", "generative", "gpt", "llm"],
    group: "Tools",
    subtext: "Simple Generation Tool",
  },
  {
    title: "Deep Research Tool",
    onItemClick: () => {

      insertOrUpdateBlock(editor , 
         {
            type: "tool",
            props: {
              toolType: "Deep Research",
              size: "medium",
              variant: "default",
            },
          },
        )
    },
    aliases: ["research", "search", "analyze", "investigation"],
    group: "Tools",
    subtext: "Add a Deep Research tool badge",
  },
  {
    title: "Text-to-Speech Tool",
    onItemClick: () => {
      insertOrUpdateBlock(editor,
        {
            type: "tool",
            props: {
              toolType: "Text-to-Speech",
              size: "medium",
              variant: "default",
            },
          },
       )
    },
    aliases: ["tts", "speech", "voice", "audio", "narration"],
    group: "Tools",
    subtext: "Add a Text-to-Speech tool badge",
  },
];
