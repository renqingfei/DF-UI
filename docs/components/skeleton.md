# Skeleton 骨架屏

数据没回来时，先用灰色占位块把版式撑起来，别让用户盯着白屏。

<script setup>
import SkeletonAll from '../.vitepress/demos/pc/skeleton-all.vue'
</script>

<ThemeSwitch />

<DemoBlock title="五种预设版式 + 自由拼装" desc="点「模拟加载一次」，看骨架换成真内容的过程">
  <SkeletonAll />
</DemoBlock>

<<< @/.vitepress/demos/pc/skeleton-all.vue

## 用骨架屏的关键：形状要对得上

骨架屏做得好不好，不在于灰块画得多漂亮，而在于**它和真内容的位置对不对得上**。
对不上的话，切换那一瞬间页面会跳一下，比白屏更难受。

所以内置版式都是照常见页面结构定的，还有两个细节：

| 细节 | 为什么 |
| --- | --- |
| 末行自动收窄到 60% | 真段落的最后一行本来就不会占满，占满了反而假 |
| 只有一行时不收窄 | 孤零零一条短线看着很怪 |
| 动画只动 `background-position` 与 `opacity` | 不碰 layout 属性。骨架屏正好出现在页面最忙的时候，动画不能再抢主线程 |
| 尊重系统「减少动态效果」 | 系统开了这个开关就自动停动画，晃动对前庭敏感的人是负担 |

## 五种预设版式

| `template` | 长什么样 | 典型场景 |
| --- | --- | --- |
| `text` | 标题 + 若干行文本（默认） | 详情段落、说明区 |
| `list` | 头像 + 两行字，可按 `count` 重复 | 订单列表、消息列表 |
| `card` | 大图 + 标题 + 一行描述 | 商品卡、内容卡 |
| `article` | 大标题 + 封面图 + 多行正文 | 文章页 |
| `profile` | 大头像 + 姓名 + 一行副标题 | 个人中心头部 |
| `custom` | 只渲染 `#template` 插槽里自己拼的形状 | 特殊版式 |

自己拼的时候用 `DfSkeletonItem`：

```vue
<df-skeleton template="custom">
  <template #template>
    <df-skeleton-item variant="circle" width="64px" height="64px" />
    <df-skeleton-item width="30%" height="18px" />
    <df-skeleton-item variant="rect" width="80px" height="34px" />
  </template>
</df-skeleton>
```

## API

### Skeleton 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `loading` | `true` 显示骨架，`false` 显示默认插槽里的真内容 | `boolean` | `true` |
| `template` | 预设版式 | `text` \| `list` \| `card` \| `article` \| `profile` \| `custom` | `text` |
| `rows` | 文本行数 | `number` | `3` |
| `count` | 重复几条（`list` / `card` 版式） | `number` | `1` |
| `avatar` | 是否带头像占位 | `boolean` | `false` |
| `title` | 是否带标题占位 | `boolean` | `true` |
| `animation` | 动画 | `shimmer` \| `pulse` \| `none` | `shimmer` |
| `round` | 占位块用圆角还是直角 | `boolean` | `true` |

### 插槽

| 插槽 | 说明 |
| --- | --- |
| `default` | `loading` 为 `false` 时显示的真内容 |
| `template` | `template="custom"` 时自己拼的骨架形状 |

### SkeletonItem 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `variant` | 形状 | `text` \| `circle` \| `rect` \| `image` | `text` |
| `width` / `height` | 尺寸，数字自动补 `px` | `string \| number` | — |

::: tip 三端都能用
小程序端同样是纯 CSS 动画，不依赖任何 DOM 测量，所以在小程序里一样流畅。
唯一的区别是不用 `flex gap`（部分小程序支持不全），改用 `margin`。
:::
