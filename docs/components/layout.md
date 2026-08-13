# Row / Col / Space / Divider

四个排版组件：栅格分栏、自动间距、分割线。用来替代到处手写的 `margin` 和 `float`。

<script setup>
import LayoutAll from '../.vitepress/demos/pc/layout-all.vue'
import LayoutGrid from '../.vitepress/demos/pc/layout-grid.vue'
</script>

<ThemeSwitch />

<DemoBlock title="Row / Col 栅格" desc="24 等分制；把窗口拖窄看响应式那一排">
  <LayoutGrid />
</DemoBlock>

<<< @/.vitepress/demos/pc/layout-grid.vue

## Row / Col API

| Row 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `gutter` | 列与列之间的间距 | `string \| number` | `0` |
| `justify` | 主轴对齐 | `start` \| `center` \| `end` \| `between` \| `around` | `start` |
| `align` | 交叉轴对齐 | `top` \| `middle` \| `bottom` \| `stretch` | `top` |
| `wrap` | 一行放不下自动折行 | `boolean` | `true` |

| Col 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `span` | 占多少份（共 24 份） | `number` | `24` |
| `offset` | 向右偏移多少份 | `number` | `0` |
| `sm` | 窄屏（< 768px）下占多少份 | `number` | — |
| `md` | 中屏（≥ 992px）下占多少份 | `number` | — |
| `lg` | 宽屏（≥ 1200px）下占多少份 | `number` | — |

::: tip 为什么是 24 份
24 能被 2 / 3 / 4 / 6 / 8 / 12 整除，是最好分的数。和 Element、Ant Design 一致，换过来不用重新适应。
:::

::: tip 响应式没有用 JS
断点靠类名 + 媒体查询实现，不监听 `resize` —— 监听在小程序端要走异步接口，
而且窗口拖动时会疯狂触发。`gutter` 用负 margin + 子元素 padding，不用 `flex gap`：
`gap` 会把折行时的行间距也算进去，上下间距会对不齐。
:::

<DemoBlock title="Space 间距与 Divider 分割线">
  <LayoutAll />
</DemoBlock>

<<< @/.vitepress/demos/pc/layout-all.vue

## Space 为什么比手写 margin 好

手写 `margin-right: 10px` 有两个老毛病：最后一项多出一截空隙；某一项被 `v-if` 干掉后，
它的 margin 也跟着消失，剩下的元素间距就乱了。`Space` 用 flex `gap`，这两件事都不会发生。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `direction` | 排列方向 | `horizontal` \| `vertical` | `horizontal` |
| `size` | 预设档位或具体像素 | `small`(8) \| `medium`(12) \| `large`(18) \| `number` | `medium` |
| `align` | 交叉轴对齐 | `start` \| `center` \| `end` \| `baseline` | `center` |
| `wrap` | 横向排列时超出换行 | `boolean` | `true` |
| `block` | 撑满一行并把子项均分 | `boolean` | `false` |

::: warning 小程序端不提供 Space
`flex gap` 在部分小程序环境（尤其安卓端旧基础库）支持不全，用 `margin` 模拟又要求组件能遍历插槽子节点 ——
小程序拿不到。所以小程序端请用 Grid 宫格，或直接给元素写 `margin`。
:::

## Divider 分割线

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `direction` | 方向 | `horizontal` \| `vertical` | `horizontal` |
| `align` | 文字位置（仅横向） | `left` \| `center` \| `right` | `center` |
| `dashed` | 虚线 | `boolean` | `false` |

默认插槽是分割线上的文字，竖向分割线不接受文字。

::: tip 带文字的分割线是两段线拼的
不是「给文字加背景色遮住中间那条线」。后者在渐变背景（暗夜霓虹的卡片）上会露出一块方形色块。
小程序端因为伪元素支持有限，改成三个 `view` 拼：线 + 文字 + 线。
:::
