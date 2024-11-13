// eslint-disable-next-line no-undef
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  rules: {
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // 副作用，就是单纯 import 没 from
          ['^\\u0000'],
          // 前端框架 全家桶
          ['^react'],
          ['^vue'],
          ['^solid'],
          // node 内置
          ['^node:', '^node:.*\\u0000$'],
          // mono 包，@foo
          ['^@?\\w', '^@?\\w.*\\u0000$'],
          // 自定义别名的包，@/bar
          ['(?<!\\u0000)$', '(?<=\\u0000)$'],
          // 相对路径
          ['^\\..*\\u0000$', '^\\.'],
          // 样式引入
          ['^.+\\.(s?css|less)$'],
        ],
      },
    ],
  },
};
