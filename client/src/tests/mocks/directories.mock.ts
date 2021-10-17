import { DirectoryItem, DirectoryItemType } from '@/models/directory-item/directory-item.model';

export const directoriesMock: DirectoryItem[] =
  [
    {
      name: 'directory1',
      type: DirectoryItemType.DIRECTORY,
      children: [
        {
          name: 'directory1.1',
          type: DirectoryItemType.DIRECTORY,
          children: [],
        },
        {
          name: 'directory1.2',
          type: DirectoryItemType.DIRECTORY,
          children: [],
        },
        {
          name: 'file1',
          type: DirectoryItemType.FILE,
          file: 'pdf',
        }
      ],
    },
    {
      name: 'directory2',
      type: DirectoryItemType.DIRECTORY,
      children: [
        {
          name: 'directory2.1',
          type: DirectoryItemType.DIRECTORY,
          children: [],
        },
        {
          name: 'directory2.2',
          type: DirectoryItemType.DIRECTORY,
          children: [],
        },
        {
          name: 'file2',
          type: DirectoryItemType.FILE,
          file: 'pdf',
        }
      ],
    }
  ];
