import openEditor from "open-editor";

export async function openInEditor(path: string): Promise<void> {
  try {
    await openEditor([path]);
  }
  catch (error: any) {
    console.error(error);
    throw new Error(JSON.stringify(error));
  }
}
