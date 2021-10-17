import chokidar from "chokidar";
import { Server } from "socket.io";
import {
  DirectoryItem,
  DirectoryItemType
} from "../../models/directory-item.model";
import { addDirectoryItem, removeDirectoryItem } from "../helpers/file.helper";

let watcher: chokidar.FSWatcher;
export let isInitializing: boolean;

export const watchedDirectories: DirectoryItem[] = [];

export const initializeDirectoryBuilder = (
  io: Server,
  directories: string[]
) => {
  isInitializing = true;
  watcher = chokidar.watch("file, dir, glob, or array", {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true
  });

  addListenersToWatcher(io);
  watchDirectories(directories);
};

const watchDirectories = (directorList: string[]) => {
  directorList.forEach((directory: string) => {
    const directoryItem: DirectoryItem = {
      name: directory,
      type: DirectoryItemType.DIRECTORY,
      collapsed: true,
      children: []
    };
    watchedDirectories.push(directoryItem);
  });

  watcher.add(directorList);
};

const addListenersToWatcher = (io: Server) => {
  const log = console.log.bind(console);
  watcher
    .on("add", path => addDirectoryItem(path, io, DirectoryItemType.FILE))
    .on("unlink", path => removeDirectoryItem(path, io))
    .on("addDir", path =>
      addDirectoryItem(path, io, DirectoryItemType.DIRECTORY)
    )
    .on("unlinkDir", path => removeDirectoryItem(path, io))
    .on("error", error => log(`Watcher error: ${error}`))
    .on("ready", () => {
      isInitializing = false;
    });
};
