<template>
  <v-expansion-panels v-if="directories.length > 0">
    <v-expansion-panel
      v-for="directory in directories"
      :key="directory.name"
    >
      <v-expansion-panel-header>
        <h2>{{ directory.name }}</h2>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-treeview
          v-model="tree[directory.name]"
          :items="directory.children"
          activatable
          item-key="name"
          open-on-click
        >
          <template v-slot:prepend="{ item, open }">
            <v-icon v-if="!item.file">
              {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
            </v-icon>
            <v-icon v-else>
              {{ files[item.file] || 'mdi-file' }}
            </v-icon>
          </template>
        </v-treeview>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';
import { CONNECT_TO_SOCKET, GET_DIRECTORIES, SOCKET_MODULE } from '@/store/actions/socket/socket.actions';

export default {
  name: 'FileExplorer',
  data: () => ({
    selected: [],
    tree: {},
    files: {
      html: 'mdi-language-html5',
      js: 'mdi-nodejs',
      json: 'mdi-code-json',
      md: 'mdi-language-markdown',
      pdf: 'mdi-file-pdf-box',
      png: 'mdi-file-image',
      jpg: 'mdi-file-image',
      txt: 'mdi-file-document-outline',
      xls: 'mdi-file-excel',
      xlsx: 'mdi-file-excel',
    },
  }),
  computed: {
    ...mapGetters(SOCKET_MODULE, ['directories']),
  },
  methods: {
    ...mapActions(SOCKET_MODULE, [CONNECT_TO_SOCKET, GET_DIRECTORIES]),
  },
  mounted() {
    this[CONNECT_TO_SOCKET]();
    this[GET_DIRECTORIES]();

  },
};
</script>
