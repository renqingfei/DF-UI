# Input 输入框

收集一行文本。多行文本用同一页里的 `DfTextarea`。

<script setup>
import InputAll from '../.vitepress/demos/pc/input-all.vue'
</script>

<ThemeSwitch />

<DemoBlock title="常用形态" desc="清空、密码显隐、字数统计、尺寸、前后缀、多行自动增高">
  <InputAll />
</DemoBlock>

<<< @/.vitepress/demos/pc/input-all.vue

## 几个不明显但重要的行为

| 行为 | 说明 |
| --- | --- |
| 数字 0 能正常显示 | `model-value="0"` 不会被当成空值 |
| 字数按码点算 | 一个 emoji 算一个字，不是两个 |
| `maxlength` 会真的截断 | 粘贴超长内容时立刻截到上限，而不是等提交才报错 |
| `trim` 在输入时就生效 | 不用等失焦，也不用业务层再 `.trim()` |
| 移动端字号锁死 16px | iOS Safari 聚焦更小字号的输入框会自动放大整页 |
| 移动端自动匹配键盘 | `type="tel"` 出数字键盘，`type="search"` 把回车键变成「搜索」 |

## Input API

### 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `model-value` / `v-model` | 绑定值 | `string \| number` | `''` |
| `type` | 输入类型，同时决定移动端键盘 | `text` \| `password` \| `number` \| `tel` \| `email` \| `url` \| `search` | `text` |
| `size` | 尺寸，不传则继承所在 Form | `small` \| `medium` \| `large` | 继承，默认 `medium` |
| `placeholder` | 占位提示 | `string` | — |
| `clearable` | 有内容时显示清空按钮 | `boolean` | `false` |
| `show-password` | 密码框显示明文切换 | `boolean` | `false` |
| `maxlength` | 最大字符数 | `number` | — |
| `show-count` | 显示字数统计，需配合 `maxlength` | `boolean` | `false` |
| `trim` | 输入时自动去首尾空格 | `boolean` | `false` |
| `disabled` / `readonly` | 禁用 / 只读 | `boolean` | `false` |
| `autofocus` | 自动聚焦（移动端部分浏览器会忽略） | `boolean` | `false` |
| `name` | 表单项名称 | `string` | — |

### 事件

| 事件 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:model-value` | 值变化 | `(value)` |
| `input` | 每次输入 | `(value)` |
| `change` | 值改变且失焦后 | `(value)` |
| `focus` / `blur` | 聚焦 / 失焦 | `(evt)` |
| `clear` | 点了清空按钮 | — |
| `confirm` | 回车 / 移动端确认键 | `(value)` |

### 插槽与方法

| 名称 | 说明 |
| --- | --- |
| `#prefix` / `#suffix` | 输入框内左侧 / 右侧内容 |
| `focus()` / `blur()` | 通过 ref 调用 |

## Textarea API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `model-value` / `v-model` | 绑定值 | `string \| number` | `''` |
| `rows` | 固定行数 | `number` | `3` |
| `autosize` | 随内容自动增高 | `boolean` | `false` |
| `max-rows` | 自动增高的上限行数 | `number` | `8` |
| `maxlength` / `show-count` | 同 Input | — | — |
| `disabled` / `readonly` / `trim` / `name` | 同 Input | — | — |

事件与 Input 一致。

::: warning 平台差异
uni 端用小程序内置 `<input>` / `<textarea>`，它们是**原生渲染**的：
- 永远盖在其他元素上层，别把弹层压在输入框上
- `placeholder` 颜色靠 `placeholder-class` 改，不是 `::placeholder`
- 小程序的 `textarea` 自带 `auto-height`，不需要我们量高度
:::
