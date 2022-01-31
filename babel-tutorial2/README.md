# Babel Tutorial2
### extends 속성으로 다른 설정 파일 가져오기
```json
// common/.babelrc
{
  "presets": ["@babel/preset-react", "@babel/preset-typescript"],
  "plugins": [
    [
      "@babel/plugin-transform-template-literals",
      {
        "loose": true
      }
    ]
  ]
}
```

<br />

```json
// example-extends/.babelrc
{
  // extends 속성을 이용해서 다른 파일에 있는 설정을 가져온다.
  "extends": "../../common/.babelrc",
  "plugins": [
    "@babel/plugin-transform-arrow-functions",
    // 템플릿 리터럴 플러그인은 가져온 설정에 이미 존재한다.
    // 플러그인 옵션은 현재 파일의 옵션으로 결정된다.
    // 기존에 loose 옵션은 사라진다.
    "@babel/plugin-transform-template-literals", 
    "@babel/plugin-transform-typescript"
  ]
}
```

<br />

### env 속성으로 환경별로 설정하기

```json
// example-env/.babelrc
{
  "presets": ["@babel/preset"],
  "plugins": [
    "@babel/plugin-transform-arrow-functions",
    "@babel/plugin-transform-template-literals", 
    "@babel/plugin-transform-typescript"
  ],
  "env": {
    // env 속성을 이용하면 환경 별로 다른 설정을 줄 수 있다.
    "production": {
      // production 환경에서는 압축 프리셋을 사용하도록 설정한다.
      // 앞에서 설정한 React 프리셋은 유지되고, 압축 프리셋이 추가되는 형태이다.
      "presets": ["minify"]
    }
  }
}
```

<br />

production에서 실행하기

```bash
NODE_ENV=production yarn babel ./src/example-env/code.tsx
```

압축 프리셋이 적용된 내용
```js
const element1=/*#__PURE__*/React.createElement("div",null,"babel Test"),text1="element type is ".concat(element.type),add1=function(c,a){return c+a};
```

<br />

### overrides 속성으로 파일별로 설정하기

```json
// example-overrides/.babelrc
{
  "presets": ["@babel/preset-react", "@babel/preset-typescript"],
  "plugins": ["@babel/plugin-transform-template-literals"],
  "overrides": [
    {
      "include": "./service1", // ./service1 폴더에만 babel 설정을 따로 설정한다.
      "exclude": "./service1/code2.tsx", // ./service1/code2.tsx에만 설정을 적용하지 않는다
      "plugins": ["@babel/plugin-transform-arrow-functions"] // 화살표 함수 적용
    }
  ]
}
```
