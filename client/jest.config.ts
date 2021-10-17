import type { Config } from '@jest/types';
import { defaults } from 'jest-config';

/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
const config: Config.InitialOptions = {
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },

  moduleFileExtensions: [
    ...defaults.moduleFileExtensions,
    // tell Jest to handle *.vue files
    'vue',
  ],

  moduleNameMapper: {
    // support the same @ -> src alias mapping in source code
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  setupFiles: ['<rootDir>/tests/jest.setup.ts', 'jest-canvas-mock'],

  snapshotSerializers: ['jest-serializer-vue'],

  testEnvironment: 'jsdom',

  testRunner: 'jest-circus/runner',

  transform: {
    // process *.vue files with vue-jest
    '^.+\\.vue$': require.resolve('vue-jest'),
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': require.resolve(
      'jest-transform-stub',
    ),
    '^.+\\.jsx?$': require.resolve('babel-jest'),
    '^.+\\.tsx?$': require.resolve('ts-jest'),
  },

  transformIgnorePatterns: ['node_modules/?!(vue-plugin-load-script)'],

  watchPlugins: [
    require.resolve('jest-watch-typeahead/filename'),
    require.resolve('jest-watch-typeahead/testname'),
  ],
};

export default config;
