export type FileType = {
  type: "file";
};

export type DirectoryType = {
  type: "directory";
  expanded: boolean;
  childExpanded: boolean;
  children: FileTreeNode[];
};

export type FileTreeNode = {
  name: string;
  path: string;
  absolutePath: string;
  relativePath: string;
} & (FileType | DirectoryType);
