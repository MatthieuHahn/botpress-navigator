import { DirectoryItem } from '@/models/directory-item/directory-item.model';
import connectToSocket from '@/socket/socket';
import {
  CONNECT_TO_SOCKET,
  GET_DIRECTORIES,
  GET_DIRECTORIES_SUCCESS, UPDATE_DIRECTORIES,
} from '@/store/actions/socket/socket.actions';
import { Socket } from 'socket.io-client';
import { RootState } from '@/store/store.model';
import { ActionContext } from 'vuex';

export interface SocketState {
  directories: Map<string, DirectoryItem>,
  status: {
    areLoading: true,
    error: null,
  }
}

const state: SocketState = {
  directories: new Map<string, DirectoryItem>(),
  status: {
    areLoading: true,
    error: null,
  },
};

let socket: Socket;

const actions = {
  [CONNECT_TO_SOCKET](context: ActionContext<SocketState, RootState>) {
    socket = connectToSocket();
    socket.on(
      'get-directories-success',
      (directories) => {
        context.commit(GET_DIRECTORIES_SUCCESS, directories);
      },
    );

    socket.on(
      'update-directories',
      (directories) => {
        context.commit(UPDATE_DIRECTORIES, directories);
      },
    );
  },
  [GET_DIRECTORIES]() {
    socket.emit('get-directories');
  },
};

const mutations = {
  [GET_DIRECTORIES](socketState: SocketState) {
    socketState.status.areLoading = true;
  },
  [GET_DIRECTORIES_SUCCESS](socketState: SocketState, directories: Map<string, DirectoryItem>) {
    socketState.directories = directories;
  },
  [UPDATE_DIRECTORIES](socketState: SocketState, directories: Map<string, DirectoryItem>) {
    socketState.directories = directories;
  },
};

const getters = {
  socketState: (state: SocketState): SocketState => state,
  directories: (
    _,
    { socketState }: { socketState: SocketState },
  ) => socketState?.directories,
};

export const SocketModule = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};
