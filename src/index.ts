import http from "http";
import express from "express";
import serverConfigProvider from "./infrastructure/server-config-provider";
import processDirectories from "./core/directory-processor";

const { port: serverPort } = serverConfigProvider();

const directories: string[] = process.argv.slice(2);

console.log(processDirectories(directories));

const app = express();
const server = http.createServer(app);
server.listen(serverPort, () => console.log(`Listening on port ${serverPort}`));
