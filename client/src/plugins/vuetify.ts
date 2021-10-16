import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

const options = {
  breakpoint: {
    mobileBreakpoint: 736,
    thresholds: {
      xs: 480,
      sm: 736,
      md: 980,
      lg: 1280,
      xl: 1620,
    },
  },
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#00B5A8',
      },
      dark: {
        primary: '#00B5A8',
      },
    },
  },
};

export default new Vuetify(options);
