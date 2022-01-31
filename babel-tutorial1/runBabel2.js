const babel = require("@babel/core");
const fs = require("fs");

const filename = "./src/code.tsx";
const source = fs.readFileSync(filename, "utf8");
const presets = ["@babel/preset-react", "@babel/preset-typescript"];

// 코드를 생성하지 않고 AST만 생성한다.
const { ast } = babel.transformSync(source, {
  filename,
  ast: true,
  code: false,
  presets,
  configFile: false, // config 파일을 사용하지 않도록 설정한다.
});

// 이렇게 만들어진 AST로부터 첫 번째 설정의 플러그인이 반영된 코드를 생성한다.
const { code: code1 } = babel.transformFromAstSync(ast, source, {
  filename,
  plugins: ["@babel/plugin-transform-arrow-functions"],
  configFile: false,
});

// 두 번째 설정이 적용된 코드를 생성한다.
const { code: code2 } = babel.transformFromAstSync(ast, source, {
  filename,
  plugins: ["@babel/plugin-transform-template-literals"],
  configFile: false,
});

console.log("code1:\n", code1);
console.log("code2:\n", code2);
