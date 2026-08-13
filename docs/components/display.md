# Card / Tag / Badge / Avatar / Empty

五个数据展示组件。都几乎没有交互逻辑，价值在于把同一套视觉语言固定下来。

<script setup>
import DisplayAll from '../.vitepress/demos/pc/display-all.vue'
</script>

<ThemeSwitch />

<DemoBlock title="全家桶" desc="切主题看看：圆角、投影、语义色会整套跟着变">
  <DisplayAll />
</DemoBlock>

<<< @/.vitepress/demos/pc/display-all.vue

## Card 卡片

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `title` | 标题，也可用 `#header` 插槽 | `string` | — |
| `shadow` | 投影策略。`hover` 只在鼠标悬停时浮起，移动端等同 `never` | `always` \| `hover` \| `never` | `always` |
| `padding` | 内容区内边距，传 `0` 可做整块图片卡 | `string \| number` | — |
| `divided` | 头部与内容之间画分隔线 | `boolean` | `true` |

插槽：`default`、`#header`、`#extra`（头部右侧）、`#footer`。

::: tip 卡片底色用的是 surface-card-bg
不是 `color-surface`。因为暗夜霓虹主题的卡片是**渐变**的，只有这个令牌能表达；
其余三套主题里它就是一个纯色。
:::

## Tag 标签

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `type` | 语义 | `default` \| `brand` \| `success` \| `warning` \| `danger` \| `info` | `default` |
| `variant` | 填充 | `soft` \| `solid` \| `outline` | `soft` |
| `size` | 尺寸 | `small` \| `medium` \| `large` | `medium` |
| `closable` | 显示关闭叉 | `boolean` | `false` |
| `round` | 胶囊形 | `boolean` | `false` |

事件：`close`。移动端关闭叉的可点区域会自动撑到 30px。

## Badge 徽标

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 显示的数字或文字 | `string \| number` | — |
| `max` | 超过就显示成 `max+` | `number` | — |
| `dot` | 只显示小圆点，不显示数字 | `boolean` | `false` |
| `show-zero` | `value` 为 `0` 时是否仍显示 | `boolean` | `false` |
| `type` | 颜色 | 同 Tag 的 `type` | `danger` |

默认 `0` 不显示 —— 未读 0 条不该挂个红圈。徽标外圈描了一层页面底色，压在深色图标上也分得清边界。

## Avatar 头像

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `src` | 图片地址 | `string` | — |
| `text` | 图片失败或没给 `src` 时的文字占位 | `string` | — |
| `size` | 预设档位或具体像素 | `small` \| `medium` \| `large` \| `number` | `medium` |
| `shape` | 形状 | `circle` \| `square` | `circle` |
| `alt` | 图片替代文字 | `string` | — |

事件：`error`（图片加载失败，已自动退回文字占位）。

两个细节：**中文取后两字**（姓名习惯，「欧阳锋」显示「阳锋」），英文取前两个字母大写；
`size` 传数字时字号按 0.42 倍换算，大头像里的字不会小得可笑。

## Empty 空状态

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `description` | 提示文字 | `string` | `暂无数据` |
| `image` | 内置插画 | `box` \| `search` \| `network` \| `none` | `box` |
| `size` | 尺寸 | `small` \| `medium` \| `large` | `medium` |

插槽：`default`（操作区，一般放个按钮）、`#image`、`#description`。

::: tip 插画不引图片资源
用 CSS 与内联 SVG 画的。空状态经常出现在**弱网**场景，这时候再去加载一张插画图很可能也失败 ——
那就成了「空状态自己也空了」。小程序端不能写 `<svg>`，改用 `view` 拼几何形状。
:::
