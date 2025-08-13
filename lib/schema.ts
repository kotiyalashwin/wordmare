import { InputBadgeBlock } from "@/components/Editor/customblocks/Input";
import { ToolBadgeBlock } from "@/components/Editor/customblocks/Tool";
import { BlockNoteSchema, defaultBlockSpecs } from "@blocknote/core";

 export const schema = BlockNoteSchema.create({
    blockSpecs: {
      ...defaultBlockSpecs,
      tool: ToolBadgeBlock,
      input : InputBadgeBlock
    },
  }); 

  export const schemaType = typeof schema;