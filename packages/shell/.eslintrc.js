module.exports = {
  extends: ["@synerise/eslint-config-babel"].map(require.resolve),

  parserOptions: {
    babelOptions: {
      configFile: require.resolve("./babel.config"),
    },
  },

  overrides: [
    {
      files: ["**/*.ts?(x)"],

      extends: [
        "@synerise/eslint-config-typescript",
        "@synerise/eslint-config-typescript-frontend",
      ].map(require.resolve),

      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"].map(require.resolve),
      },

      settings: {
        "import/parsers": {
          "@typescript-eslint/parser": [".ts", ".tsx"],
        },
        "import/resolver": {
          typescript: {
            project: require.resolve("./tsconfig.json"),
            alwaysTryTypes: true,
          },
        },
      },
    },
  ],
};
