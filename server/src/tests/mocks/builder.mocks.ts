import { DirectoryItem, DirectoryItemType } from "../../models/directory-item.model";

export const emptyWatchedDirectories: DirectoryItem[] = [];

export const watchedDirectoriesWithOneDirectoryMock: DirectoryItem[] = [
  {
    name: '/watched-directory',
    type: DirectoryItemType.DIRECTORY,
    children: [{
      name: 'test1',
      type: DirectoryItemType.DIRECTORY,
      file: undefined,
      children: [{
        name: 'test2',
        type: DirectoryItemType.DIRECTORY,
        file: undefined,
        children: [{
          name: 'test3.pdf',
          type: DirectoryItemType.FILE,
          children: undefined,
          file: 'pdf',
        }],
      }],
    }],
  }
];

export const watchedDirectoriesWithOneDirectoryAndTheFileRemovedMock: DirectoryItem[] = [
  {
    name: '/watched-directory',
    type: DirectoryItemType.DIRECTORY,
    children: [{
      name: 'test1',
      type: DirectoryItemType.DIRECTORY,
      file: undefined,
      children: [{
        name: 'test2',
        type: DirectoryItemType.DIRECTORY,
        file: undefined,
        children: [],
      }],
    }],
  }
]
