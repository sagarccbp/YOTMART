const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = (_, argv) => ({
  output: {
    publicPath:
      argv.mode === "development"
        ? "http://localhost:3006/"
        : argv.mode === "production"
        ? "https://nutritionist.yotmart.in/"
        : "",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 3006,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "nutritionist",
      filename: "remoteEntry.js",
      remotes: {
        auth:
          argv.mode === "development"
            ? "auth@http://localhost:3002/remoteEntry.js"
            : "auth@https://auth.yotmart.in/remoteEntry.js",
        home:
          argv.mode === "development"
            ? "home@http://localhost:3000/remoteEntry.js"
            : "home@https://yotmart.in/remoteEntry.js",
        cart:
          argv.mode === "development"
            ? "cart@http://localhost:3003/remoteEntry.js"
            : "cart@https://cart.yotmart.in/remoteEntry.js",
        pdp:
          argv.mode === "development"
            ? "pdp@http://localhost:3001/remoteEntry.js"
            : "pdp@https://pdp.yotmart.in/remoteEntry.js",
        plp:
          argv.mode === "development"
            ? "plp@http://localhost:3004/remoteEntry.js"
            : "plp@https://plp.yotmart.in/remoteEntry.js",
        nutritionist:
          argv.mode === "development"
            ? "nutritionist@http://localhost:3006/remoteEntry.js"
            : "nutritionist@https://nutritionist.yotmart.in/remoteEntry.js",
      },

      exposes: {
        "./NutritionistModal":
          "./src/components/NutritionistModal/NutritionistModal.jsx",
        "./MyDiets": "./src/components/MyDiets/MyDiets.jsx",
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      favicon: "./src/favicon.ico",
    }),
  ],
});
