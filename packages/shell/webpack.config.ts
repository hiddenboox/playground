import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import MonacoWebpackPlugin from "monaco-editor-webpack-plugin";
import { container } from "webpack";

const { ModuleFederationPlugin } = container;

const isDevelopment = process.env.NODE_ENV !== "production";

const config = {
  entry: "./src/index.tsx",
  mode: isDevelopment ? "development" : "production",
  devServer: {
    contentBase: path.join(__dirname, "./"),
    port: 3002,
    hotOnly: true,
  },
  output: {
    publicPath: "auto",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        include: path.join(__dirname, "src"),
        use: require.resolve("babel-loader"),
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.ttf$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "shell",
      filename: "remoteEntry.js",
      remotes: {
        navigation: "navigation@http://localhost:3003/remoteEntry.js",
      },
      exposes: {
        "./Shell": "./src/App",
      },
      shared: {
        react: { singleton: true },
        "react-dom": {
          singleton: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new MonacoWebpackPlugin({ languages: ["css"] }),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
};

export default config;
