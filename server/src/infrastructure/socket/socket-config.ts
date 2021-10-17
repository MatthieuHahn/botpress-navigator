import { Server, Socket } from "socket.io";
import { watchedDirectories } from "../../core/directory-builder/directory-builder";
import { DirectoryItem } from "../../models/directory-item.model";
import { GET_DIRECTORIES } from "./socket-events";

export const onConnection = (socket: Socket): void => {
  console.log("connection");
  socket.on(GET_DIRECTORIES, () => onGetDirectories(socket));
};

type socketDirectoryByName = {
  directoriesByName: Map<string, DirectoryItem>;
};

const onGetDirectories = (socket: Socket) => {
  socket.emit("get-directories-success", watchedDirectories);
};

const socketServer = (io: Server): void => {
  io.on("connection", onConnection);
};

export default socketServer;
