# botpress-navigator

## Prerequisites

The following items must be installed:

- nodeJs
- npm package manager
- yarn package manager

## How to run

1. Install dependencies: `npm run install`
2. Open 2 command lines
3. In the first: `cd server` then `npm run start:dev [first directory] [second directory] [...]`
4. In the second: `cd client` then `yarn serve``

All is set !

## Architecture choices

### Backend

The backend runs in `node 16`, with `Express` and `socket.io`.

I chose to use socket io to exchange realtime events with the front-end client. This way, the file and directory changes are sent directly to the front-end.

I use the Chokidar npm module to initialize the directories and catch the file and directory changes. This module is also the one used by VSCode.

### Front-End

The front-end runs on Vue 2 with the Vuex store and Vuetify for the UI.

## How it works

### Backend

Once the server has be started with directories as args in the command line, it:

1. Initializes the express and socket-io regarding the configuration set in the `config/default.json`
2. It initializes the chokidar watcher, and starts watching the files in the directories to build the `directoriesByName` variable. Once initialized, the data is sent to the Front-End with socket-io.
3. Every file and directory change is then caught and sent to the Front-End by socket-io.

### Front-End

1. Once the app is started, the Home component dispatches the Vuex store connect action witch connects the Front-End to the socket.
2. The home then dispatches the GET_DIRECTORIES actions that calls gets the directories through the socket the first time around.
3. The Front-End socket listens to the update directories event, which uses the vuex store to update the directories getter via the mutations.
