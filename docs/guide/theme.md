# 四套主题

DF UI 内置四套主题，**不是四种配色，是四种气质**。它们各自完整，不互相覆盖。

<ThemeSwitch />

::: tip 点上面那排按钮
本页所有示例会整套换肤 —— 包括圆角、阴影、控件高度、动效曲线，不只是颜色。
:::

<script setup>
import ButtonType from '../.vitepress/demos/pc/button-type.vue'
import ButtonVariant from '../.vitepress/demos/pc/button-variant.vue'
import ButtonSize from '../.vitepress/demos/pc/button-size.vue'
</script>

<DemoBlock title="切主题时，这些会一起变">
  <ButtonType />
  <ButtonVariant />
  <ButtonSize />
</DemoBlock>

## 四套主题的定位

| key | 名字 | 长什么样 | 适合 |
| --- | --- | --- | --- |
| `neon` | 暗夜霓虹 | 近黑底 + 荧光绿，关键元素发光 | 开发工具、数据平台、AI 产品 |
| `clay` | 黏土软糖（**默认**） | 圆润厚实，控件像捏出来的软胶 | 面向普通用户的 App、小程序 |
| `bento` | 便当格 | 零边框零阴影，靠色块和留白分区 | 后台管理、数据看板、官网 |
| `muted` | 莫兰迪柔雾 | 低饱和暖灰，安静不刺眼 | 内容类、效率工具 |

## 为什么是四套，而不是一套加色板

因为这四套的差别不在颜色 —— 便当格是"不画线、不打阴影"，黏土是"处处凹凸"，
这是结构性差异，靠调主色调不出来。

工程上这么做反而更省：

- 组件代码**只写一份**，它压根不知道自己身处哪套主题
- 主题只是一份"颜色尺寸配置表"，四套之间 key 完全一致（有测试守着）
- 加第五套主题 = 多写一份配置，不动任何组件代码

## 令牌一览

每套主题实现 50 个令牌，分成这几类：

| 类别 | 令牌 | 说明 |
| --- | --- | --- |
| 背景层次 | `color-bg` `color-surface` `color-surface-2/3` | 页面底 → 卡片 → 更高层 |
| 文字 | `color-text-1/2/3` | 主要 / 次要 / 辅助 |
| 品牌 | `color-brand` `color-brand-fg` `color-brand-soft` `color-accent` | 主色、主色上的文字色、浅底、点缀色 |
| 语义 | `color-ok/warn/err` 及各自 `-bg` | 成功 / 警告 / 错误 |
| 骨架屏 | `color-skeleton` `color-skeleton-shine` | 占位块与扫光 |
| 圆角 | `radius-sm/md/lg/pill` | |
| 阴影 | `shadow-card/btn/ctrl/well/glow` | 卡片 / 按钮 / 控件 / 内凹 / 辉光 |
| 控件高度 | `control-h-sm/md/lg` | **桌面端** |
| 移动端尺寸 | `m-control-h-sm/md/lg` `m-page-padding` `m-card-padding` 等 9 项 | **不得复用桌面值** |
| 字体动效 | `font-family` `font-weight-title` `motion-press/duration/easing` | |

所有令牌都是 CSS 变量，前缀统一 `--df-`：`color-brand` → `--df-color-brand`。

## 自己改配色

### 只改几个颜色

覆盖 CSS 变量即可，作用域随你定：

```css
/* 全站 */
:root {
  --df-color-brand: #0f62fe;
}

/* 只改某个页面 */
.my-page {
  --df-color-brand: #0f62fe;
}
```

### 派生一套自己的主题

```ts
import { defineTheme } from '@df-ui/tokens'

export const brandTheme = defineTheme('bento', {
  key: 'brand',
  name: '公司品牌主题',
  tokens: {
    'color-brand': '#0F62FE',
    'color-accent': '#FF6B00',
  },
})
```

以 `bento` 为底，只覆盖列出的令牌，其余全部继承。

## 深色主题

四套里 `neon` 是深色，其余三套是浅色。切主题时会同步设置 `color-scheme`，
所以浏览器的滚动条、表单控件也会跟着变深浅，不需要额外处理。
