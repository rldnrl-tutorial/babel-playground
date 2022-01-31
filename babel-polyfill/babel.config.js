const presets = [
  // @babel/preset-env를 사용한다.
  [
    "@babel/preset-env",
    {
      // targets 속성으로 지원하는 브라우저 정보를 입력한다.
      // 시장 점유율이 0.25% 이상이고 업데이트가 종료되지 않은 브라우저를 입력했다.
      // targets: "> 0.25%, not dead",

      // 크롬 버전을 최소 40으로 설정한다.
      targets: {
        chrome: "40",
      },
      // 폴리필과 관련된 설정이다.
      // useBuiltIns 속성에 entry를 입력하면 지원하는 브라우저에서 필요한 폴리필만 포함시킨다.
      // useBuiltIns: "entry",
      useBuiltIns: "usage",
      corejs: {
        // 바벨에게 core-js 버전을 알려준다.
        version: 3,
        proposals: true,
      },
    },
  ],
];

module.exports = {
  presets,
};
