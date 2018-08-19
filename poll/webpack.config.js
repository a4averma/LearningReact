module.exports = {
  entry: "./client/index.js",
  output: {
    filename: "./public/bundle.js"
  },
  module: {
    rules: [
      {
        exclude: /(node_modules|server.js|question.js)/,
        loader: "babel-loader"
      }
    ]
  }
};
