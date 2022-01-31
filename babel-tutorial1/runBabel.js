const babel = require("@babel/core"); // @babel/core 모듈을 가져온다.
const fs = require("fs");

const filename = "./src/code.tsx";
const source = fs.readFileSync(filename, "utf8"); // 컴파일할 파일의 내용을 가져온다.

// 바벨 플러그인과 프리셋을 설정한다.
const presets = ["@babel/preset-react", "@babel/preset-typescript"];
const plugins = [
  "@babel/plugin-transform-arrow-functions",
  "@babel/plugin-transform-template-literals",
  "@babel/plugin-transform-typescript",
];

// transformSync 함수를 호출해서 바벨을 실행한다.
const { code } = babel.transformSync(source, {
  filename,
  presets,
  plugins,
  configFile: false, // config 파일을 사용하지 않도록 설정한다.
});

console.log(code);
