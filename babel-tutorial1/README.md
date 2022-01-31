# babel
### babel이란?
바벨은 입력과 출력이 모드 자바스크립트 코드인 컴파일러이다. 바벨을 이용해서 ES6를 ES5로 변환해주고, 리액트 JSX 문법, 타입스크립트와 같은 정적 타입 언어, 코드 압축, 제안 단계에 있는 문법을 사용할 수 있다.

<br />

```tsx
// code.tsx
const element = <div>babel test</div>;
const text = `element type is ${element.type}`;
const add = (a: number, b: number) => a + b;
```

<br />

다음 명령어를 입력해보자.
```
yarn babel src/code.tsx --presets=@babel/preset-react,@babel/preset-typescript --plugins=@babel/plugin-transform-arrow-functions,@babel/plugin-transform-template-literals,@babel/plugin-transform-typescript
```

<br />

출력 결과
```js
const element = React.createElement("div", null, "babel test");
const text = "element type is ".concat(element.type);

const add = function (a, b) {
  return a + b;
};
```

<br />

babel은 환경 설정 파일을 만드는 것이 좋다. babel.config.js 파일을 만들어서 설정한다. 
<br />
바벨 6는 .babelrc, 바벨 7은 babel.config.js로 설정 파일을 이름을 정하면 된다.

<br />

컴파일된 결과를 파일로 저장하고 싶다면 다음과 같이 입력하면 된다.

```bash
// 파일 단위로 처리
yarn babel src/code.tsx --out-file dist.js

// 폴더 단위로 처리
yarn babel src --out-file dist.js
```

<br />

### 웹팩의 babel-loader로 실행하기
```bash
yarn add webpack webpack-cli babel-loader
```

<br />

### 웹팩 설정 파일

```js
// webpack.config.js
const path = require("path");

module.exports = {
  entry: "./src/code.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "code.bundle.js",
  },
  module: {
    rules: [{ test: /\.(js|mjs|jsx|ts|tsx)$/, use: "babel-loader" }],
  },
  optimization: { minimizer: [] },
};

```

<br />

### babel/core를 직접 이용하기
@babel/cli와 babel-loader는 모드 @babel/core를 이용해서 바벨을 실행한다. 이번에는 @babel/core를 직접 이용하는 코드를 작성해보자.

```js
const babel = require("@babel/core");
const fs = require("fs");

const filename = "./src/code.tsx";
const source = fs.readFileSync(filename, "utf8");

const presets = ["@babel/preset-react", "@babel/preset-typescript"];
const plugins = [
  "@babel/plugin-transform-arrow-functions",
  "@babel/plugin-transform-template-literals",
  "@babel/plugin-transform-typescript",
];

const { code } = babel.transformSync(source, {
  filename,
  presets,
  plugins,
  configFile: false,
});

console.log(code);
```

@babel/core 모듈을 직접 사용하는 방식은 자유도가 높다는 장점이 있다. 바벨은 컴파일 시 다음 세 단계를 거친다.

- Parse: 입력된 코드로부터 AST를 생성한다.
- Transform: AST를 원하는 형태로 변환한다.
- Generate: AST를 코드로 출력한다.

AST는 코드의 구문이 분석된 결과를 담고 있는 구조체이다. 
코드가 같다면 AST도 같기 때문에 같은 코드에 대해서 하나의 AST를 만들어 놓고 재사용할 수 있다.