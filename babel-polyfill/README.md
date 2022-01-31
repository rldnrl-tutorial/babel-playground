# 바벨과 폴리필
자바스크립트의 최신 기능을 모두 사용하면서 오래된 브라우저를 지원하려면 바벨로 코드 문법을 변환하는 동시에
폴리필도 사용해야한다. 폴리필은 런타임에 기능을 주입하는 것을 말한다. 런타임에 기능이 존재하는지 검사해서 기능이 없는 경우만 주입한다.
바벨을 사용하더라도 폴리필에 대한 설정은 별도로 해야한다.

<br />

### `core-js` 모듈의 모든 폴리필 사용하기
`core-js`는 바벨에서 폴리필을 위해 공식적으로 지원하는 패키지이다. 가장 간단한 사용법은 `core-js` 모듈을 자바스크립트 코드로 불러오는 것이다.

```js
import 'core-js'

const obj = {
  a: 10,
  b: 20,
  c: 30,
}

const array = Object.values(obj)
const exist = array.includes(20)
```

`core-js` 모듈은 사용법이 간단하지만, 필요하지 않는 폴리필까지 포함되므로 번들 파일의 크기가 커진다.

<br />

### `core-js` 모듈에서 필요한 폴리필만 가져오기
`core-js`로부터 직접 필요한 폴리필만 가져오면 번들 파일의 크기를 줄일 수 있다.

```js
import 'core-js/features/promise'
import 'core-js/features/object/values'
import 'core-js/features/array/includes'

const obj = {
  a: 10,
  b: 20,
  c: 30,
}

const array = Object.values(obj)
const exist = array.includes(20)
```

### @babel/preset-env 프리셋 이용하기

```js
"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.async-iterator.js");
// ...
require("core-js/modules/web.url-search-params.js");

var p = Promise.resolve(10);
var obj = {
  a: 10,
  b: 20,
  c: 30
};
var array = Object.values(obj);
var exist = array.includes(20);
```

모듈이 많이 출력되는 것을 볼 수 있다. 여기에 출력되는 폴리필은 크롬 버전 40에 없는 기능을 위한 것이다.

<br />

불필요하게 많은 폴리필들이 추가 되었다. `useBuiltIns` 속성에 `usage`를 입력하면 코드에서 사용된 기능의 폴리필만 추가된다.

```js
"use strict";
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.object.values.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
require("core-js");

var p = Promise.resolve(10);
var obj = {
  a: 10,
  b: 20,
  c: 30
};
var array = Object.values(obj);
var exist = array.includes(20);
```

