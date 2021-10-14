import fs from "fs";
import directoryTree from "directory-tree";

const directoriesByPath = new Map<string, DirectoryItem[]>();

export enum DirectoryItemType {
  FILE = "file",
  DIRECTORY = "directory"
}

export type DirectoryItem = {
  name: string;
  type: DirectoryItemType;
};

const processDirectories = (
  directories: string[]
): Map<string, DirectoryItem[]> => {
  directories.forEach((directory: string) => {
    directoriesByPath.set(directory, processDirectory(directory));
  });

  return directoriesByPath;
};

const processDirectory = (directory: string): DirectoryItem[] => {
  const directories: DirectoryItem[] = [];
  fs.readdirSync(directory).forEach(file => {
    const fileObject = fs.statSync(`${directory}/${file}`);
    const directoryItem: DirectoryItem = {
      name: file,
      type: fileObject.isDirectory()
        ? DirectoryItemType.DIRECTORY
        : DirectoryItemType.FILE
    };
    directories.push(directoryItem);
  });

  return directories;
};

export default processDirectories;
