import { Server } from "socket.io";
import {
  DirectoryItem,
  DirectoryItemType
} from "../../models/directory-item.model";
import { directoriesByName, isInitializing } from "../directoryBuilder";
import { sortDirectoryItemsByTypeAndName } from "./data.helper";

export const addDirectoryItem = (
  path: string,
  io: Server,
  type: DirectoryItemType
) => {
  Object.keys(directoriesByName).forEach(key => {
    if (path.includes(key) && path !== key) {
      const splittedPath = path.replace(`${key}/`, "").split("/");
      addDirectoryItemToDirectory(splittedPath, directoriesByName[key], type);
    }
  });
  if (!isInitializing) {
    io.emit("update-directories", directoriesByName);
  }
};

export const removeDirectoryItem = (path: string, io: Server) => {
  Object.keys(directoriesByName).forEach(key => {
    let currentDirectoryItem: DirectoryItem | undefined =
      directoriesByName[key];
    if (path.includes(key)) {
      let splittedPath = path.replace(`${key}/`, "").split("/");
      const fileName = splittedPath.pop();
      splittedPath.forEach((pathItem: string) => {
        if (currentDirectoryItem) {
          currentDirectoryItem = currentDirectoryItem.children?.find(
            (child: DirectoryItem) => child.name === pathItem
          );
        }
      });

      if (currentDirectoryItem?.children) {
        const itemIndex = currentDirectoryItem?.children?.findIndex(
          item => item.name === fileName
        );
        currentDirectoryItem?.children?.splice(itemIndex, 1);
      }
    }
  });
  io.emit("update-directories", directoriesByName);
};

export const addDirectoryItemToDirectory = (
  splittedPath: string[],
  directory: DirectoryItem,
  type: DirectoryItemType
): void => {
  const splittedPathItem = splittedPath.shift();
  const isLastPathItem = splittedPath.length === 0;
  const name = splittedPathItem || "error.error";
  const itemType = isLastPathItem ? type : DirectoryItemType.DIRECTORY;
  const directoryItem: DirectoryItem = {
    name,
    type,
    file: itemType === DirectoryItemType.FILE ? name.split(".")[1] : undefined,
    children: itemType !== DirectoryItemType.FILE ? [] : undefined
  };

  const currentDirectoryItem = directory.children?.find(
    item => item.name === directoryItem.name
  );

  if (!currentDirectoryItem && directory.children) {
    directory.children?.push(directoryItem);
    directory.children = sortDirectoryItemsByTypeAndName(directory.children);
  }

  if (!isLastPathItem) {
    return addDirectoryItemToDirectory(
      splittedPath,
      currentDirectoryItem || directoryItem,
      type
    );
  }
};
