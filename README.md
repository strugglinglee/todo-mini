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

### 四、Husky + lint-staged + commitlint

`husky`： 是一个 Git Hook 工具，借助 husky 我们可以在 git 提交的不同生命周期进行一些自动化操作
`lint-staged`: 用于实现每次提交只检查本次提交所修改的文件
`commitlint`: 提交时 commit 信息规范校验配置流程

1. 下载依赖
```shell
npm i husky lint-staged @commitlint/cli @commitlint/config-conventional -D
```

2. package.json 文件中添加 scripts 

```json
"scripts": {
    "prepare": "husky install",
    "lint": "eslint src",
    "lint-staged": "lint-staged",
    "commitlint": "commitlint --config commitlint.config.js -e -V"
}
```

3. 执行 npm run prepare

生成了.husky 文件夹

4. 添加 pre-commit 钩子

```shell
npx husky add .husky/pre-commit "npm run lint-staged"
```
> 执行完根目录会自动生成一个 .husky/pre-commit  脚本

5. 创建 .lintstagedrc 配置文件

```json
{
    "src/**/*.{js,vue}": "npm run lint"
}
```

6. 添加 commit-msg 钩子

```shell
npx husky add .husky/commit-msg "npm run commitlint"
```

7. 创建 commitlint.config.js 配置文件

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      // type枚举
      2,
      'always',
      [
        'build', // 编译相关的修改，例如发布版本、对项目构建或者依赖的改动
        'feat', // 新功能
        'fix', // 修补bug
        'docs', // 文档修改
        'style', // 代码格式修改, 注意不是 css 修改
        'refactor', // 重构
        'perf', // 优化相关，比如提升性能、体验
        'test', // 测试用例修改
        'revert', // 代码回滚
        'ci', // 持续集成修改
        'config', // 配置修改
        'chore', // 其他改动
      ],
    ],
    'type-empty': [2, 'never'], // never: type不能为空; always: type必须为空
    'type-case': [0, 'always', 'lower-case'], // type必须小写，upper-case大写，camel-case小驼峰，kebab-case短横线，pascal-case大驼峰，等等
    'scope-empty': [0],
    'scope-case': [0],
    'subject-empty': [2, 'never'], // subject不能为空
    'subject-case': [0],
    'subject-full-stop': [0, 'never', '.'], // subject以.为结束标记
    'header-max-length': [2, 'always', 72], // header最长72
    'body-leading-blank': [0], // body换行
    'footer-leading-blank': [0, 'always'], // footer以空行开头
  },
}
```


### 五、inquirer + shelljs 玩转命令行

`inquirer` inquirer 是一个常用的交互式终端用户界面集合。 简单来说 inquirer 是可以让我们很方便的做各种终端交互行为的一个库

`shelljs` node 中使用命令行的工具

1. 下载依赖
  
```shell
npm install inquirer@^8.0.0 shelljs -D
```
2. 创建脚本文件

```js
// script/dev.js
const inquirer = require('inquirer')
const shell = require('shelljs') // 执行文件操作
const config = [
  {
    name: 'H5',
    value: 'npm run dev:h5',
  },
  {
    name: '微信小程序',
    value: 'npm run dev:mp-weixin',
  },
  ...
]

inquirer
  .prompt([
    {
      type: 'list',
      name: 'buildScript',
      message: '请选择你要编译的环境',
      choices: config,
    },
  ])
  .then((answers) => {
    if (!answers.buildScript) return
    shell.exec(answers.buildScript)
  })
```
3. Package.json 加入命令

```json
"scripts": {
    "dev": "node scripts/dev.js",
}
```

4. 执行 `npm run dev` 即可进行环境选择编译

### 六、vant-weapp组件库接入

1. 进入[github:vant-weapp](https://github.com/youzan/vant-weapp)

2. 将解压缩之后的dist包改名为vant放入在src下新建的wxcomponents文件夹下


task:

接入云开发
CI
文档整理
接入组件库