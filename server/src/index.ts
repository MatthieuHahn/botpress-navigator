import http from "http";
import express from "express";
import serverConfigProvider from "./infrastructure/config/server-config-provider";
import path from "path";
import compression from "compression";
import cors from "cors";

import configureSocketServer from "./infrastructure/socket/socket-config";

import {
  initializeDirectoryBuilder,
  watchDirectories
} from "./core/directoryBuilder";
import { Server } from "socket.io";

const { port: serverPort } = serverConfigProvider();

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: true,
    credentials: true
  },
  transports: ["websocket"]
});

initializeDirectoryBuilder(io);

const directories: string[] = process.argv.slice(2);

watchDirectories(directories);

configureSocketServer(io);

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

app.use(compression());
app.use(express.static(path.join(__dirname, "./public")));

server.listen(serverPort, () => console.log(`Listening on port ${serverPort}`));
