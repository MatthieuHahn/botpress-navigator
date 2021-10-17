import http from "http";
import express from "express";
import serverConfigProvider from "./infrastructure/config/server-config-provider";

import configureSocketServer from "./infrastructure/socket/socket-config";

import { initializeDirectoryBuilder } from "./core/directory-builder/directory-builder";
import { Server } from "socket.io";

const { port: serverPort } = serverConfigProvider();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: true,
    credentials: true
  },
  transports: ["websocket"]
});

const directories: string[] = process.argv.slice(2);

initializeDirectoryBuilder(io, directories);

configureSocketServer(io);

server.listen(serverPort, () => console.log(`Listening on port ${serverPort}`));
