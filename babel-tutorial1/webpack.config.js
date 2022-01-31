const path = require("path");

module.exports = {
  entry: "./src/code.tsx", // 웹팩으로 번들링할 파일을 지정한다.
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "code.bundle.js", // 번들링된 결과를 dist/code.bundle.js 파일로 저장한다.
  },
  module: {
    // 자바스크립트 파일을 babel-loader가 처리하도록 설정한다.
    // babel-loader은 바벨의 설정 파일을 이용하므로
    // 이전에 만든 babel.config.js 파일의 내용이 설정값으로 사용된다.
    rules: [{ test: /\.(js|mjs|jsx|ts|tsx)$/, use: "babel-loader" }],
  },
  // 웹팩은 기본적으로 자바스크립트 파일을 압축한다.
  optimization: { minimizer: [] },
};
