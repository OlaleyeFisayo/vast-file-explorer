export type FileType = {
  type: "file";
};

export type DirectoryType = {
  type: "directory";
  expanded: boolean;
  children: Map<string, FileTreeNode>;
};

export type FileTreeNode = {
  name: string;
  path: string;
} & (FileType | DirectoryType);
