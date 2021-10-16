import { io, Socket } from 'socket.io-client';

const connectToSocket = (): Socket => io(process.env.VUE_APP_SOCKET_PATH, { transports: ['websocket'] });

export default connectToSocket;
