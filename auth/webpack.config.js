const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = (_, argv) => ({
  output: {
    publicPath:
      argv.mode === "development"
        ? "http://localhost:3002/"
        : argv.mode === "production"
        ? "https://auth.yotmart.in/"
        : "",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 3002,
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
      name: "auth",
      filename: "remoteEntry.js",
      remotes: {
        auth:
          argv.mode === "development"
            ? "auth@http://localhost:3002/remoteEntry.js"
            : argv.mode === "production"
            ? "auth@https://auth.yotmart.in/remoteEntry.js"
            : "",
        home:
          argv.mode === "development"
            ? "home@http://localhost:3000/remoteEntry.js"
            : argv.mode === "production"
            ? "home@https://yotmart.in/remoteEntry.js"
            : "",
        cart:
          argv.mode === "development"
            ? "cart@http://localhost:3003/remoteEntry.js"
            : argv.mode === "production"
            ? "cart@https://cart.yotmart.in/remoteEntry.js"
            : "",
        pdp:
          argv.mode === "development"
            ? "pdp@http://localhost:3001/remoteEntry.js"
            : argv.mode === "production"
            ? "pdp@https://pdp.yotmart.in/remoteEntry.js"
            : "",
        plp:
          argv.mode === "development"
            ? "plp@http://localhost:3004/remoteEntry.js"
            : argv.mode === "production"
            ? "plp@https://plp.yotmart.in/remoteEntry.js"
            : "",
        nutritionist:
          argv.mode === "development"
            ? "nutritionist@http://localhost:3006/remoteEntry.js"
            : "nutritionist@https://nutritionist.yotmart.in/remoteEntry.js",
      },
      exposes: {
        "./Login": "./src/components/Login/Login.jsx",
        "./CreateAccount": "./src/components/CreateAccount/CreateAccount.jsx",
        "./ApiService": "./src/rest/ApiService.js",
        "./CheckOutPage": "./src/components/CheckOutPage/CheckOutPage.jsx",
        "./BuyNowPage": "./src/components/BuyNowPage/BuyNowPage.jsx",
        "./ThankYouPage": "./src/components/ThankYouPage/ThankYouPage.jsx",
        "./Orders": "./src/components/Orders/Orders.jsx",
        "./NotFound": "./src/components/NotFound/NotFound.jsx",
        "./Loader": "./src/components/Loader/Loader.jsx",
        "./ForgotPassword":
          "./src/components/ForgotPassword/ForgotPassword.jsx",
        "./PaymentStatus": "./src/components/PaymentStatus/PaymentStatus.jsx",
        "./ResetPassword": "./src/components/ResetPassword/ResetPassword.jsx",
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
