export enum DirectoryItemType {
  DIRECTORY = "directory",
  FILE = "file"
}

export type DirectoryItem = {
  type: DirectoryItemType;
  name: string;
  file?: string;
  children?: DirectoryItem[];
  collapsed?: boolean;
};
