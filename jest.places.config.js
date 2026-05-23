/** Minimal Jest config for pure-TS data-layer tests (no React Native env needed) */
module.exports = {
  testEnvironment: "node",
  transform: {
    "\\.[jt]sx?$": [
      "babel-jest",
      {
        configFile: "./babel.config.js",
        caller: { name: "jest", supportsStaticESM: false },
      },
    ],
  },
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|babel-preset-expo)",
  ],
  testMatch: ["**/src/__tests__/places.test.ts"],
};
