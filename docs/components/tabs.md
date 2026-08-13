# Tabs / TabBar

Tabs 是横向切换的标签页；TabBar 是移动端的底部导航栏（PC 端对应的是侧边菜单，尚未实现）。

<script setup>
import TabsAll from '../.vitepress/demos/pc/tabs-all.vue'
</script>

<ThemeSwitch />

<DemoBlock title="三种形态 + 徽标 + 禁用项">
  <TabsAll />
</DemoBlock>

<<< @/.vitepress/demos/pc/tabs-all.vue

## Tabs 只管切 name，不接管内容

内容区完全交给使用方 —— 这样它既能配合 `v-if` 切内容，也能配合路由跳转，
不会因为「组件帮你管了内容」而在路由场景里打架。

## 关于下划线的一个取舍

下划线**不会从上一个标签滑到下一个**，而是直接出现在激活项上。

要做滑动，就必须知道每个标签的宽度和位置。网页端能同步量，小程序端只能走异步接口，
还得处理字体加载完成后的重排、容器滚动、窗口缩放。为了一个过渡动画引入一整套测量机制，
收益远低于成本。

现在的做法是把下划线画在每一项内部，只有激活项那个显示出来 ——
**宽度天然等于标签宽度，三端表现完全一致，零测量**。

## Tabs API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `model-value` / `v-model` | 当前激活项的 `name` | `string \| number \| boolean` | 第一个可用项 |
| `items` | 标签列表 `{ label, name, disabled?, badge? }` | `TabItem[]` | `[]` |
| `type` | 形态 | `line` \| `card` \| `segment` | `line` |
| `scrollable` | 超出宽度时横向滚动 | `boolean` | `true` |
| `equal-width` | 每个标签等宽平分（与 `scrollable` 互斥） | `boolean` | `false` |
| `disabled` | 整体禁用 | `boolean` | `false` |

`badge` 传数字显示数字，传 `true` 显示小圆点，不传不显示。

事件：`update:model-value`、`change`、`tabClick`（点了任意标签都触发，包括禁用项与已激活项）。
插槽：`default`（内容区）、`#nav`（完全自定义标签栏）。

## TabBar API（仅移动端）

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `model-value` / `v-model` | 当前激活项的 `name` | `string \| number \| boolean` | 第一个可用项 |
| `items` | 列表 `{ label, name, icon?, badge?, disabled? }` | `TabBarItem[]` | `[]` |
| `fixed` | 固定在屏幕底部 | `boolean` | `true` |
| `safe-area` | 底部补 safe-area，避开 iPhone 手势条 | `boolean` | `true` |

事件：`update:model-value`、`change`。插槽：`#icon`（参数 `{ item }`，用来放真正的图标组件）。

::: warning 用了 TabBar 就别再配原生 tabBar
uni 端如果在 `pages.json` 里配了原生 `tabBar`，就不要再用这个组件 —— 两个会叠在一起。

自定义导航栏的好处是能跟着四套主题换肤；代价是切页时会有一帧闪动（原生 tabBar 是常驻的）。
:::

::: tip 记得给页面留底部内边距
`fixed` 的 TabBar 脱离了文档流，页面最后一屏会被它压住。
页面容器要留 `padding-bottom: calc(var(--df-m-tabbar-h) + env(safe-area-inset-bottom))`。
:::
