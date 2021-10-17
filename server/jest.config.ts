import type { Config } from "@jest/types"

/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */
const config: Config.InitialOptions = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ["src/**/*.ts"],

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // A preset that is used as a base for Jest's configuration
  preset: "ts-jest",

  // The test environment that will be used for testing
  testEnvironment: "node",

  // An array of regexp pattern strings that are matched against all test paths before executing the test.
  // If the test path matches any of the patterns, it will be skipped.
  testPathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/node_modules/"]
}
export default config
