import { Store } from 'vuex-mock-store';
import { createLocalVue, shallowMount } from '@vue/test-utils';

import FileExplorer from './FileExplorer.vue';
import {
  CONNECT_TO_SOCKET,
  GET_DIRECTORIES,
  SOCKET_MODULE
} from '@/store/actions/socket/socket.actions';
import { directoriesMock } from '@/tests/mocks/directories.mock';

const localVue = createLocalVue();
describe('FileExplorer', () => {
  let store;
  let wrapper;

  const getStore = () =>
    new Store({
      getters: {
        [`${SOCKET_MODULE}/directories`]: directoriesMock,
      },
      state: {
        [SOCKET_MODULE]: {

          actions: {
            [CONNECT_TO_SOCKET]: jest.fn(),
            [GET_DIRECTORIES]: jest.fn(),
          },
        },
      },
    });

  const whenComponentIsMounted = ({ $store = getStore() } = {}) => {
    store = $store;
    return shallowMount(FileExplorer, {
      mocks: {
        $store,
      },
      localVue,
      stubs: [
        'v-expansion-panels',
        'v-expansion-panel',
        'v-expansion-panel-header',
        'v-expansion-panel-content',
        'v-treeview',
      ],
    });
  };

  describe('when mounted', () => {
    beforeEach(() => {
      wrapper = whenComponentIsMounted();
    });

    it('should connect to websocket and get directories', () => {
      expect(store.dispatch)
        .toHaveBeenCalledWith(`${SOCKET_MODULE}/${CONNECT_TO_SOCKET}`);
      expect(store.dispatch)
        .toHaveBeenCalledWith(`${SOCKET_MODULE}/${GET_DIRECTORIES}`);
    });

    describe('and there are no directories', () => {
      beforeEach(() => {
        store.getters[`${SOCKET_MODULE}/directories`] = {};
      });

      it('should render an empty page', () => {
        expect(wrapper)
          .toMatchSnapshot();
      });
    });

    describe('and there are directories', () => {
      beforeEach(() => {
        store.getters[`${SOCKET_MODULE}/directories`] = directoriesMock;
      });

      it('should render the treeview for each directory', () => {
        expect(wrapper)
          .toMatchSnapshot();
      });
    });
  });
});
