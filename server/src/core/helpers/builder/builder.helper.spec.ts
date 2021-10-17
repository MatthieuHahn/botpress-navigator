import { DirectoryItemType } from "../../../models/directory-item.model";
import {
  emptyWatchedDirectories,
  watchedDirectoriesWithOneDirectoryAndTheFileRemovedMock,
  watchedDirectoriesWithOneDirectoryMock
} from "../../../tests/mocks/builder.mocks";
import { watchedDirectories } from "../../directory-builder/directory-builder";
import { addDirectoryItem, removeDirectoryItem } from "./builder.helper";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MockedSocket = require('socket.io-mock');

beforeEach(() => {
  watchedDirectories.length = 0;
});

describe("Builder Helper", () => {
  describe("addDirectoryItem", () => {
    describe("when there is one watched directory and it matches the path", () => {
      it('Should add the directory', () => {
        // Arrange
        const pathMock = '/watched-directory/test1/test2/test3.pdf';
        const socket = new MockedSocket();
        watchedDirectories.push({
          name: '/watched-directory',
          type: DirectoryItemType.DIRECTORY,
          children: [],
        });

        // Act
        addDirectoryItem(pathMock, socket, DirectoryItemType.FILE);

        // Expect
        expect(watchedDirectories).toEqual(watchedDirectoriesWithOneDirectoryMock);
      });
    });

    describe("when there are no watched directories", () => {
      it('Should not add the directory', () => {
        // Arrange
        const pathMock = '/watched-directory/test1/test2/test3.pdf';
        const socket = new MockedSocket();

        // Act
        addDirectoryItem(pathMock, socket, DirectoryItemType.FILE);

        // Expect
        expect(watchedDirectories).toEqual(emptyWatchedDirectories);
      });
    });

    describe("when there is a watched directories but it doesn't match the path", () => {
      it('Should not add the directory', () => {
        // Arrange
        const pathMock = '/watched-directory/test1/test2/test3.pdf';
        const socket = new MockedSocket();
        watchedDirectories.push({
          name: '/no-match-for-me',
          type: DirectoryItemType.DIRECTORY,
          children: [],
        });

        // Act
        addDirectoryItem(pathMock, socket, DirectoryItemType.FILE);

        // Expect
        expect(watchedDirectories).toEqual([{
          name: '/no-match-for-me',
          type: DirectoryItemType.DIRECTORY,
          children: [],
        }]);
      });
    });
  });

  describe("removeDirectoryItem", () => {
    describe("when the path matches a directory item to be removed", () => {
      it('Should remove the directory item', () => {
        // Arrange
        const pathMock = '/watched-directory/test1/test2/test3.pdf';
        const socket = new MockedSocket();
        watchedDirectories.push({
          name: '/watched-directory',
          type: DirectoryItemType.DIRECTORY,
          children: [],
        });
        addDirectoryItem(pathMock, socket, DirectoryItemType.FILE);

        // Act
        removeDirectoryItem(pathMock, socket);

        // Expect
        expect(watchedDirectories).toEqual(watchedDirectoriesWithOneDirectoryAndTheFileRemovedMock);
      });
    });

    describe("when the path doesn't match a directory item to be removed", () => {
      it('Should not remove the directory item', () => {
        // Arrange
        const pathMock = '/watched-directory/test1/test2/test3.pdf';
        const socket = new MockedSocket();
        watchedDirectories.push({
          name: '/no-match-for-me',
          type: DirectoryItemType.DIRECTORY,
          children: [],
        });
        addDirectoryItem(pathMock, socket, DirectoryItemType.FILE);

        // Act
        removeDirectoryItem(pathMock, socket);

        // Expect
        expect(watchedDirectories).toEqual([{
          name: '/no-match-for-me',
          type: DirectoryItemType.DIRECTORY,
          children: [],
        }]);
      });
    });
  });
});
