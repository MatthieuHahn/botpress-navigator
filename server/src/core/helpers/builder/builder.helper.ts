import { Server } from "socket.io";
import {
  DirectoryItem,
  DirectoryItemType
} from "../../../models/directory-item.model";
import {
  isInitializing,
  watchedDirectories,
} from "../../directory-builder/directory-builder";
import { sortDirectoryItemsByTypeAndName } from "../data/data.helper";

export const addDirectoryItem = (
  path: string,
  io: Server,
  type: DirectoryItemType
): void => {
  watchedDirectories.forEach(directory => {
    if (path.includes(directory.name) && path !== directory.name) {
      const splittedPath = path.replace(`${directory.name}/`, "").split("/");
      addDirectoryItemToDirectory(splittedPath, directory, type);
    }
  });
  if (!isInitializing) {
    io.emit("update-directories", watchedDirectories);
  }
};

export const removeDirectoryItem = (path: string, io: Server): void => {
  watchedDirectories.forEach(directory => {
    if (path.includes(directory.name)) {
      // initialize current directory item
      let currentDirectoryItem: DirectoryItem | undefined = { ...directory };

      // split the path to iterate through the directories
      const splitPath = path.replace(`${directory.name}/`, "").split("/");

      // Get the last directory item and remove it from the array
      const lastDirectoryItemName = splitPath.pop();

      // iterate through the array to find the directory item
      // containing the item we want to delete
      splitPath.forEach((pathItem: string) => {
        if (currentDirectoryItem) {
          currentDirectoryItem = currentDirectoryItem.children?.find(
            (child: DirectoryItem) => child.name === pathItem
          );
        }
      });

      // As a security, check if this item has children
      if (currentDirectoryItem?.children) {
        // Find the item index corresponding to the item we want to remove and remove it
        const itemIndex = currentDirectoryItem?.children?.findIndex(
          item => item.name === lastDirectoryItemName
        );
        currentDirectoryItem?.children?.splice(itemIndex, 1);
      }
    }
  });

  // Emit the update on the socket
  io.emit("update-directories", watchedDirectories);
};

// addDirectoryItemToDirectory is a function that will call itself
// recursively until the item is added at the right place
export const addDirectoryItemToDirectory = (
  splittedPath: string[],
  directory: DirectoryItem,
  type: DirectoryItemType
): void => {
  // Init the directoryItem we will be adding
  const splittedPathItem = splittedPath.shift();
  const isLastPathItem = splittedPath.length === 0;
  const name = splittedPathItem || "error.error";
  const itemType = isLastPathItem ? type : DirectoryItemType.DIRECTORY;
  const directoryItem: DirectoryItem = {
    name,
    type: itemType,
    file: itemType === DirectoryItemType.FILE ? name.split(".")[1] : undefined,
    children: itemType !== DirectoryItemType.FILE ? [] : undefined
  };

  // Check if the directory item already exists
  const currentDirectoryItem = directory.children?.find(
    item => item.name === directoryItem.name
  );

  // If it doesn't exist and it has children (security to avoid errors),
  // Add the item and sort the children array
  if (!currentDirectoryItem && directory.children) {
    directory.children?.push(directoryItem);
    directory.children = sortDirectoryItemsByTypeAndName(directory.children);
  }

  // If the current directory item is not the last item from the path,
  // recursively call the function
  if (!isLastPathItem) {
    return addDirectoryItemToDirectory(
      splittedPath,
      currentDirectoryItem || directoryItem,
      type
    );
  }
};
