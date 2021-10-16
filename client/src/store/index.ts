import Vue from 'vue';
import Vuex from 'vuex';
import storeOptions from './store.config';

Vue.use(Vuex);

const store = new Vuex.Store(storeOptions);

export default store;
