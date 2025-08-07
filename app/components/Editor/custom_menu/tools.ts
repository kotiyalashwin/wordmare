import { BlockNoteEditor } from "@blocknote/core";
import { DefaultReactSuggestionItem } from "@blocknote/react";
import { FaBrain } from "react-icons/fa";

// const getAiToolsItems =

export const getToolSlashMenuItems = (editor: BlockNoteEditor<any>) => [
  {
    title: "Generative AI Tool",
    onItemClick: () => {
      editor.insertBlocks(
        [
          {
            type: "tool",
            props: {
              toolType: "Generative AI",
              size: "medium",
              variant: "default",
            },
          },
        ],
        editor.getTextCursorPosition().block,
        "after"
      );
    },
    aliases: ["ai", "generative", "gpt", "llm"],
    group: "Tools",
    subtext: "Simple Generation Tool",
  },
  {
    title: "Deep Research Tool",
    onItemClick: () => {
      editor.insertBlocks(
        [
          {
            type: "tool",
            props: {
              toolType: "Deep Research",
              size: "medium",
              variant: "default",
            },
          },
        ],
        editor.getTextCursorPosition().block,
        "after"
      );
    },
    aliases: ["research", "search", "analyze", "investigation"],
    group: "Tools",
    subtext: "Add a Deep Research tool badge",
  },
  {
    title: "Text-to-Speech Tool",
    onItemClick: () => {
      editor.insertBlocks(
        [
          {
            type: "tool",
            props: {
              toolType: "Text-to-Speech",
              size: "medium",
              variant: "default",
            },
          },
        ],
        editor.getTextCursorPosition().block,
        "after"
      );
    },
    aliases: ["tts", "speech", "voice", "audio", "narration"],
    group: "Tools",
    subtext: "Add a Text-to-Speech tool badge",
  },
];
