# todo-mini
vue3 + vite + ts + sass

项目使用[uni-app](https://zh.uniapp.dcloud.io/quickstart-cli.html)

## 项目开发记录

### 一、初始化项目

```shell
npx degit dcloudio/uni-preset-vue#vite-ts your-vue3-project
```
> 使用 npx 可以不用全局先安装vue cli 工具，直接下载最新工程

下载报错的解决方法：

1. 打开链接https://github.com/dcloudio/uni-preset-vue
2. 切换至`vite-ts`分支
3. Download ZIP 到本地解压缩
4. npm i



### 二、Sass 支持

模板默认是没有支持Sass的。安装sass-loader与node-sass,需要指定版本，版本高了无法运行。
node-sass下载太多坑了，改用sass（纯 node.js 实现的 sass 库）
> sass 最早是由 ruby 实现的而非 node.js 所以它是直接二进制分发或者需要经过 node-gyp 编译，这是大家觉得它安装很“坑”的根源所在。
> 建议就是直接用 sass 这个纯 node.js 实现的 sass 库。

```shell
yarn add sass-loader sass --dev
```

### 三、ESLint + Prettier

```shell
npm install eslint prettier --save-dev
npm install eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue --save-dev
npm install @typescript-eslint/eslint-plugin @typescript-eslint/parser --save-dev
```

1. 添加 .eslintrc.js
2. 添加 .prettierrc.js

```js
// .eslintrc.js
module.exports = {
  parser: 'vue-eslint-parser',
  extends: ['plugin:vue/recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'vue/multi-word-component-names': 'off',
  },
}
```

```js
// .prettierrc.js
module.exports = {
  printWidth: 120,
  tabWidth: 2,
  tabs: false,
  semi: false,
  singleQuote: true,
  quoteProps: 'as-needed',
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: 'always',
  endOfLine: 'auto',
}
```

### Husky

lint-staged: 用于实现每次提交只检查本次提交所修改的文件。