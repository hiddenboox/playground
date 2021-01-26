import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import { container } from "webpack";

const { ModuleFederationPlugin } = container;

const isDevelopment = process.env.NODE_ENV !== "production";

const config = {
  entry: "./src/index.tsx",
  mode: isDevelopment ? "development" : "production",
  devServer: {
    contentBase: path.join(__dirname, "./"),
    port: 3003,
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
      name: "navigation",
      filename: "remoteEntry.js",
      exposes: {
        "./Navigation": "./src/Navigation",
      },
      remotes: {
        shell: "shell@http://localhost:3002/remoteEntry.js",
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
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
};

export default config;
