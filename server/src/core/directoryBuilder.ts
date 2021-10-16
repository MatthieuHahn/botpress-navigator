import chokidar from "chokidar";
import { Server } from "socket.io";
import {
  DirectoryItem,
  DirectoryItemType
} from "../models/directory-item.model";
import { addDirectoryItem, removeDirectoryItem } from "./helpers/file.helper";

let watcher: chokidar.FSWatcher;
export let isInitializing: boolean;

export const directoriesByName: any = {};

export const initializeDirectoryBuilder = (io: Server) => {
  const log = console.log.bind(console);
  isInitializing = true;
  watcher = chokidar.watch("file, dir, glob, or array", {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true
  });
  // Add event listeners.
  watcher
    .on("add", path => addDirectoryItem(path, io, DirectoryItemType.FILE))
    .on("change", path => log(`File ${path} has been changed`))
    .on("unlink", path => removeDirectoryItem(path, io))
    .on("addDir", path =>
      addDirectoryItem(path, io, DirectoryItemType.DIRECTORY)
    )
    .on("unlinkDir", path => removeDirectoryItem(path, io))
    .on("error", error => log(`Watcher error: ${error}`))
    .on("ready", () => {
      isInitializing = false;
    })
    .on("raw", (event, path, details) => {
      // internal
      log("Raw event info:", event, path, details);
    });
};

export const watchDirectories = (directories: string[]) => {
  directories.forEach((directory: string) => {
    const directoryItem: DirectoryItem = {
      name: directory,
      type: DirectoryItemType.DIRECTORY,
      collapsed: true,
      children: []
    };
    directoriesByName[directory] = directoryItem;
  });

  watcher.add(directories);
};
