# Grid / List / NavBar / ActionBar

四个**移动端专属**组件。它们在 PC 上没有对应物 —— 宫格、列表行、顶部标题栏、底部固定操作栏
都是「一屏一件事」的移动端版式产物，硬搬到宽屏上只会显得空。

<script setup>
import MobilePage from '../.vitepress/demos/h5/mobile-page.vue'
</script>

<ThemeSwitch />

<DemoBlock title="拼在一起就是一个真页面" desc="手机框里每一处都能点：宫格、列表行、返回、主操作、底部导航">
  <PhonePreview>
    <MobilePage />
  </PhonePreview>
</DemoBlock>

<<< @/.vitepress/demos/h5/mobile-page.vue

## Grid 宫格

手机首页那块「快捷入口」。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `items` | 列表 `{ label, icon?, name?, badge?, disabled? }` | `GridItem[]` | `[]` |
| `columns` | 一行几列 | `number` | `4` |
| `square` | 每格正方形 | `boolean` | `false` |
| `border` | 画格线 | `boolean` | `false` |
| `gap` | 格与格的间距（`border` 为 true 时无效） | `string \| number` | — |

事件：`itemClick(item, index)`。插槽：`#icon`（参数 `{ item, index }`，用来放真正的图标组件）。

::: tip 格线用 inset 阴影画，不是 border
给每格加 `border` 会让相邻格子的线叠成两像素粗 —— 一眼就能看出来不精致。
:::

## List / ListItem 列表

移动端的信息骨干。

| List 属性 | 说明 | 默认值 |
| --- | --- | --- |
| `card` | 整个列表包成卡片（圆角 + 投影） | `true` |
| `border` | 项与项之间画分隔线 | `true` |

| ListItem 属性 | 说明 | 类型 |
| --- | --- | --- |
| `title` | 左侧主标题 | `string` |
| `label` | 主标题下的一行小字 | `string` |
| `value` | 右侧文字 | `string` |
| `arrow` | 右侧箭头，表示点进去还有下一页 | `boolean` |
| `clickable` | 有按下反馈 | `boolean` |
| `disabled` | 禁用 | `boolean` |

事件：`click`。插槽：`#icon`、`#title`、`#label`、`#value`。

有 `arrow` 或 `clickable` 就算可点；没给 `label` / `value` 时不渲染对应节点，不会留下空行占位。

::: tip 分隔线画在「除第一项以外每一项」的顶部
给每项加下边框，会在列表最后多出一条悬空的线。
:::

## NavBar 顶部标题栏

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `title` | 标题 | `string` | — |
| `show-back` | 显示返回箭头 | `boolean` | `true` |
| `back-text` | 箭头后面的文字 | `string` | — |
| `fixed` | 固定在顶部 | `boolean` | `false` |
| `safe-area` | 顶部补 safe-area，避开刘海与状态栏 | `boolean` | `true` |
| `border` | 底部分隔线 | `boolean` | `false` |

事件：`back`。插槽：`#left`、`#title`、`#right`。

标题**真正居中**：左右两侧固定各占 25% 宽度。只靠 `justify-content: center` 会被左右内容的宽度差顶偏。
返回箭头看着小，可点区域是 44px。

::: warning uni 端要先关掉原生导航栏
在 `pages.json` 里给页面设 `navigationStyle: "custom"`，否则会和小程序自带的导航栏叠在一起。

另外微信小程序右上角的胶囊按钮是系统绘制的、挪不动，自定义导航栏的右侧内容要自己避开它。
:::

## ActionBar 底部固定操作栏

详情页那条「加入购物车 / 立即购买」。

| 属性 | 说明 | 默认值 |
| --- | --- | --- |
| `fixed` | 固定在屏幕底部 | `true` |
| `safe-area` | 底部补 safe-area，避开 iPhone 手势条 | `true` |
| `border` | 顶部分隔线 | `true` |

里面放 `block` 按钮会自动撑满剩余宽度。

::: tip 记得给页面留底部内边距
`fixed` 的操作栏脱离了文档流，页面最后一屏会被它压住。
:::
