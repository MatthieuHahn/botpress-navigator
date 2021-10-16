export enum DirectoryItemType {
  DIRECTORY = 'directory',
  FILE = 'file'
}

export interface DirectoryItem {
  type: DirectoryItemType;
  name: string;
  file?: string;
  children?: DirectoryItem[] | null;
  collapsed?: boolean;
}
