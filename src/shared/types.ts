export type FileExplorerOptions = {
  rootPath?: string;
  hiddenFiles?: Array<string>;
  respectGitIgnore?: boolean;
  defaultIde?: "vscode";
};
