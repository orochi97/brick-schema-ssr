# react、vue、solid 实现低代码 ssr 页面渲染

用一份 schema，分别使用 react、vue、solid 分做渲染引擎生成页面，并结合 node 实现 ssr 渲染。组件使用同一套 `jsx` 实现，各自实现适配各框架的 `useState`，`createContext`，`useContext` 等。

## 安装

```bash
pnpm install
```

## 编译

```bash
pnpm build
```

## 启动

```bash
pnpm run server
```

## 调试客户端

```bash
cd packages/client

pnpm dev:react
# or
pnpm dev:vue
# or
pnpm dev:solid
```

## 调试服务端

```bash
cd packages/server

pnpm dev
```

开发时可以把各工具项目导出文件改成源文件导出，package.json:

```json
{
  "main": "src/index.ts"
}
```

无论那种方式，为了提供 schema，服务器一定要启动，不然会报错。没有做无 schema 兼容。

### 实现功能

1. 基础组件 Button Checkbox Image Radio Text。
2. 高级组件 View List，支持自定义 slot 内容，即子元素动态配置。
3. 全局样式，通过设置 class 属性，classes: { warn: true }，或者根据条件设置 classes: { warn: '!isLogin' }。字段来自于 dataMap 属性声明获取相应字段。叹号表示取反。
4. 提供 api 给非子元素的组件修改 props、style、class 属性。
5. 提供全局 store，组件通过 dataMap 属性声明获取相应字段。
6. 逻辑编排，直接对各组件的 on 事件进行相关编码。
7. 支持注入自定义工具方法，比如 api 请求，可以在逻辑编排里调用。
8. 支持 i18n 国际化，支持插槽变量。国际化 t 方法需要自行注入。

### 分支

- main：实现基础的三端框架适配，作为示例。
- feature-advanced：基于 main 基础上增加功能，只增加对 react 的功能。
- feature-portal：基于 feature-advanced 的可视化编辑器（未完成）。
