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
