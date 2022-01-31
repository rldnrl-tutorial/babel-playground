# Babel Tutorial3
## 전체 설정 파일과 지역 설정 파일
### 바벨 설정 파일의 두 가지 버전
1. 모든 자바스크립트 파일에 적용되는 전체 설정 파일(babel.config.js)
2. 자바스크립트 파일의 경로에 따라 결정되는 지역 설정 파일(.babelrc, .babelrc.js, 바벨 설정이 있는 package.json)

<br />

### 바벨 설정 파일
1. package.json, .babelrc, .babelrc.js 파일을 만날 때까지 부모 폴더로 이동한다. 즉, 먼저 지역 파일을 만난다.
2. 프로젝트의 루트의 babel.config.js 파일이 전체 설정 파일이다.
3. 전체 설정 파일과 지역 설정 파일을 병합한다.

<br />

### 예제 코드
```js
// babel.config.js

const presets = ["@babel/preset-react", "@babel/preset-typescript"];
const plugins = [
  [
    "@babel/plugin-transform-template-literals",
    {
      loose: true,
    },
  ],
];

module.exports = {
  presets,
  plugins,
};
```

```json
// src/service1/.babelrc

{
  "plugins": [
    "@babel/plugin-transform-arrow-functions",
    "@babel/plugin-transform-template-literals",
    "@babel/plugin-transform-typescript"
  ]
}
```

```tsx
// src/service1/code1.tsx

import React from 'react'

const element = <div>babel test</div>;
const text = `element type is ${element.type}`;
const add = (a: number, b: number) => a + b;
```

결과
```js
import React from 'react';
const element = /*#__PURE__*/React.createElement("div", null, "babel test");
const text = "element type is ".concat(element.type);

const add = function (a, b) {
  return a + b;
};
```

<br />

1. 전체 설정 파일의 리액트 프리셋이 적용됐다.
2. 지역 설정 파일의 템플릿 리터럴 플러그인이 적용되었다. 전체 설정 파일의 loose 옵션이 적용되지 않은 것을 확인할 수 있다. 이것은 지역 설정이 전체 설정을 덮어쓰기 때문이다.
3. 지역 설정 파일의 화살표 함수 플러그인이 적용됐다.

<br />

`src` 안에 `service2` 폴더를 만들고 그 안에 `folder1` 파일을 만들고, `yarn init`을 해서 `package.json` 파일을 생성해보자.<br />
그리고 `service1`에 있는 `code.tsx`를 `folder1`에 복사를 하자.<br />

결과
```js
import React from 'react';
const element = /*#__PURE__*/React.createElement("div", null, "babel test");
const text = "element type is " + element.type;

const add = (a, b) => a + b
```

전체 설정 파일만 되어 있다.