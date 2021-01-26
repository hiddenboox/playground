module.exports = {
  extends: ["@synerise/eslint-config-babel"].map(require.resolve),

  parserOptions: {
    requireConfigFile: false,
  },
};
