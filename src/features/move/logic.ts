import { copyItem } from "../copy/logic";
import { deleteItem } from "../delete/logic";

export async function moveItem(sourcePath: string, destinationDir?: string): Promise<void> {
  try {
    await copyItem(sourcePath, destinationDir);
  }
  catch (error: any) {
    throw new Error(`Failed to move item: ${error.message}`, { cause: error });
  }

  try {
    await deleteItem(sourcePath);
  }
  catch (error: any) {
    throw new Error(`Failed to complete move. The item was copied, but the original could not be deleted: ${error.message}`, { cause: error });
  }
}
