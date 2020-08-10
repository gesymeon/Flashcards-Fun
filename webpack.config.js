var path = require("path");
var webpack = require("webpack");
module.exports = {
  entry: {
    main: [
      "./index.js",
      "./insertion-form.js",
      "./landing-page.js",
      "./components/insertion-form-add-flashcard.js",
      "./components/stored-flashcards-edit-flashcards.js",
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-proposal-optional-chaining",
            ],
          },
        },
      },
    ],
  },
  stats: {
    colors: true,
  },
  devtool: "source-map",
  stats: "verbose",
};
