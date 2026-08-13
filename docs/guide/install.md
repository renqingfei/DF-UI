# 安装与使用

::: warning 还没发到 npm
现在只能在本仓库内使用（monorepo 里用 `workspace:*` 互相引用）。
下面的 `npm install` 命令是发布后的用法，先记着。
:::

## PC 端

```bash
pnpm add @df-ui/pc
```

```ts
// main.ts
import { createApp } from 'vue'
import DfUI from '@df-ui/pc'
import '@df-ui/tokens/themes.css' // 四套主题的变量表
import '@df-ui/pc/style' // 组件样式
import App from './App.vue'

createApp(App).use(DfUI).mount('#app')
```

```vue
<template>
  <df-button type="primary" @click="save">保存</df-button>
</template>
```

如果不想让组件库接管页面底色和字体，把 `@df-ui/pc/style` 换成
`@df-ui/pc/style/components`，它只含组件样式。

## H5 端

```bash
pnpm add @df-ui/h5
```

```ts
import DfUI from '@df-ui/h5'
import '@df-ui/tokens/themes.css'
import '@df-ui/h5/style'
```

用法与 PC 端完全一致，不需要改任何属性。

## uniapp 端

```bash
pnpm add @df-ui/uni
```

uni 包是**源码分发**（不打包），因为小程序需要 uni-app 编译器自己处理 `.vue` 源码。

```ts
// main.ts
import { createSSRApp } from 'vue'
import DfUI from '@df-ui/uni'
import App from './App.vue'

export function createApp() {
  const app = createSSRApp(App)
  app.use(DfUI)
  return { app }
}
```

小程序里没有 `<html>` 标签可以挂主题变量，所以**页面外面要包一层根容器**：

```vue
<template>
  <df-config-provider theme="clay">
    <df-button type="primary" @click="submit">下单</df-button>
  </df-config-provider>
</template>
```

## 换主题

三端写法一致：

```ts
import { setTheme } from '@df-ui/core'

setTheme('neon') // 暗夜霓虹
setTheme('clay') // 黏土软糖（默认）
setTheme('bento') // 便当格
setTheme('muted') // 莫兰迪柔雾
```

组件内部想知道当前是什么主题：

```ts
import { useTheme } from '@df-ui/core'

const { theme, themeKey, isDark } = useTheme()
```

## 本仓库开发

```bash
pnpm install

pnpm dev              # 同时起 PC(5180) 与 H5(5181) 预览工程
pnpm docs:dev         # 起这个文档站
pnpm test             # 全部单元测试（含三端一致性校验）
pnpm typecheck        # 类型检查
pnpm themes:validate  # 四套主题令牌一致性校验
```
