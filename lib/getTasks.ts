import { TaskContent, useTaskStore } from "@/store/task";
import { BlockNoteEditor } from "@blocknote/core";
export function processBlocksAndStoreContent(editor: BlockNoteEditor<any>) {
  const blocks = editor.document;

  if (!blocks || blocks.length === 0) {
    useTaskStore.getState().setTasks([]);
    return;
  }

  const tasks: TaskContent[] = [];
  let currentPrompt = "";
  let newTask: TaskContent = {};

  for (const block of blocks) {
    if (block.type === "tool" || block.type === "input") {
      if (block.type === "tool") {
        newTask.prompt = currentPrompt.trim();
        newTask.tool = block.props.toolType;
        tasks.push(newTask);
        newTask = {};
        currentPrompt = "";
      } else if (block.type === "input") {
        newTask.input = {
          id: block.id,
          type: "input",
          content: block.props.selectedInput,
        };
      }
    } else {
      if (Array.isArray(block.content) && block.content.length > 0) {
        const firstInlineContent = block.content[0];
        if (firstInlineContent && "text" in firstInlineContent) {
          const blockContent = firstInlineContent.text;
          if (blockContent) {
            currentPrompt += blockContent + " ";
          }
        }
      }
    }
  }

  // Handle any remaining content after the last special block
  if (currentPrompt.trim()) {
    tasks.push({
      prompt: currentPrompt.trim(),
    });
  }

  useTaskStore.getState().setTasks(tasks);
}
