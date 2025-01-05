import type { Config } from "@jest/types";

const baseDir = "<rootDir>/src";
const baseTestDir = "<rootDir>/test";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    `${baseDir}/utils/*.ts`,
    `${baseDir}/components/**/*.tsx`,
  ],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testMatch: [`${baseTestDir}/**/*test.ts`, `${baseTestDir}/**/**/*test.tsx`],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy", // Mock CSS and SCSS
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/test/mocks/fileMock.js", // Add this line for image files
  },
};

export default config;
