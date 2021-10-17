import { SocketModule, SocketState } from '@/store/modules/socket/socket.module';
import {
  CONNECT_TO_SOCKET,
  GET_DIRECTORIES,
  GET_DIRECTORIES_SUCCESS,
  UPDATE_DIRECTORIES
} from '@/store/actions/socket/socket.actions';
import { directoriesMock } from '@/tests/mocks/directories.mock';

describe('UserModule', () => {
  let state;

  const defaultState: SocketState = {
    directories: {},
    status: {
      error: null,
      areLoading: false,
    },
  };

  const commit = jest.fn();

  beforeEach(() => {
    state = defaultState;
  });

  describe('Testing Actions', () => {
    beforeEach(() => {
      SocketModule.actions[CONNECT_TO_SOCKET]({ commit } as any);
    });

    describe('when the user is sending the GET_DIRECTORIES', () => {
      it('should commit and dispatch or die', async () => {
        // Act
        await SocketModule.actions[GET_DIRECTORIES]({ commit } as any);

        // Assert
        expect(commit)
          .toHaveBeenCalledWith(GET_DIRECTORIES);
      });
    });
  });

  describe('Testing Mutations', () => {
    let internalState = {
      ...defaultState,
    };
    describe('When the mutation is GET_DIRECTORIES', () => {
      it('should update the state', () => {
        SocketModule.mutations[GET_DIRECTORIES](internalState);
        expect(internalState.status.areLoading)
          .toEqual(true);
      });
    });
    describe('When the mutation is GET_DIRECTORIES_SUCCESS', () => {
      it('should update the state', () => {
        SocketModule.mutations[GET_DIRECTORIES_SUCCESS](internalState, directoriesMock);
        expect(internalState.directories)
          .toEqual(directoriesMock);
        expect(internalState.status.areLoading)
          .toEqual(false);
      });
      describe('When the mutation is UPDATE_DIRECTORIES', () => {
        it('should update the state', () => {
          SocketModule.mutations[UPDATE_DIRECTORIES](internalState, directoriesMock);
          expect(internalState.directories)
            .toEqual(directoriesMock);
        });
      });
    });

    describe('Testing Getters', () => {
      describe('loggedInUser', () => {
        describe('when the socket state is null', () => {
          it('should return null', () => {
            expect(
              SocketModule.getters.directories(
                {},
                {
                  socketState: null,
                },
              ),
            )
              .toEqual({});
          });
        });

        describe('when the socket state has default values', () => {
          it('should return null', () => {
            expect(
              SocketModule.getters.directories(
                {},
                {
                  socketState: state,
                },
              ),
            )
              .toEqual({});
          });
        });

        describe('when the socket state has updated values', () => {
          it('should return the current directories', () => {
            expect(
              SocketModule.getters.directories(
                {},
                {
                  socketState: {
                    ...state,
                    directories: directoriesMock,
                  },
                },
              ),
            )
              .toEqual(directoriesMock);
          });
        });
      });
    });
  });
});
