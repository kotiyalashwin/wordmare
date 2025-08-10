
import { BlockNoteEditor, insertOrUpdateBlock } from "@blocknote/core";


export const getMentionMenuItems = (editor : BlockNoteEditor<any> , inputs:string[]) => {
    return inputs.map((input) => ({
      title: input,
      onItemClick: () => {
        // This is the key part: when an item is clicked, we insert the block.
        insertOrUpdateBlock(editor, {
          type : "input",
          props : {
            selectedInput : input
          }
        })
      },
      group : "Inputs", 
    }));
  };