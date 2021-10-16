import config from "config";

export type ServerConfig = {
  port: number;
};

const serverConfigProvider = (): ServerConfig => {
  return config.get<ServerConfig>("server");
};

export default serverConfigProvider;
