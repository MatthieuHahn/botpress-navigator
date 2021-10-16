import { StoreOptions } from 'vuex';
import { SocketModule } from './modules/socket/socket.module';
import { RootState } from './store.model';

const initialRootState: RootState = {
  loaded: false,
};

const storeOptions: StoreOptions<RootState> = {
  strict: process.env.NODE_ENV !== 'production',
  devtools: process.env.NODE_ENV !== 'production',
  state: initialRootState,
  modules: {
    SocketModule,
  },
};

export default storeOptions;
