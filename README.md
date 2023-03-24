# todo-mini

项目使用[uni-app](https://zh.uniapp.dcloud.io/quickstart-cli.html)

## 项目开发记录

### 一、初始化项目(特别提醒-Vue2.X的安装方法)

```shell
npx @vue/cli create -p dcloudio/uni-preset-vue todo-mini
```
> 使用 npx 可以不用全局先安装vue cli 工具，直接下载最新工程

### 一、初始化项目(特别提醒-Vue3.X的安装方法)

1. 打开链接https://github.com/dcloudio/uni-preset-vue
2. 切换至`vite-ts`分支
3. Download ZIP到本地解压缩
4. npm i

```shell
npx @vue/cli create -p dcloudio/uni-preset-vue todo-mini
```
> 使用 npx 可以不用全局先安装vue cli 工具，直接下载最新工程

### 二、Sass支持

模板默认是没有支持Sass的。安装sass-loader与node-sass,需要指定版本，版本高了无法运行。
node-sass下载太多坑了，改用sass（纯 node.js 实现的 sass 库）
> sass 最早是由 ruby 实现的而非 node.js 所以它是直接二进制分发或者需要经过 node-gyp 编译，这是大家觉得它安装很“坑”的根源所在。
> 建议就是直接用 sass 这个纯 node.js 实现的 sass 库。

```shell
yarn add sass-loader sass --dev
```