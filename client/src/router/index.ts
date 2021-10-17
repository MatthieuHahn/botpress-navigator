import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import FileExplorer from '@/views/FileExplorer/FileExplorer.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'FileExplorer',
    component: FileExplorer,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
