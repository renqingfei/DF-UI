# Select 选择器

从一组选项里挑一个或多个。**用法三端一致，长相三端不同** —— 这是「允许的差异」里最典型的一例。

<script setup>
import SelectAll from '../.vitepress/demos/pc/select-all.vue'
</script>

<ThemeSwitch />

<DemoBlock title="单选 / 多选 / 限制数量 / 禁用" desc="点开面板，禁用项点不动；多选选完不会自动收起">
  <SelectAll />
</DemoBlock>

<<< @/.vitepress/demos/pc/select-all.vue

## 三端长相不同，属性一个字不差

| | PC | H5 / uniapp |
| --- | --- | --- |
| 展开方式 | 往下展开面板 | 从底部升起选择表 |
| 面板头部 | 无 | 「取消 / 标题 / 完成」一行 |
| 选项行高 | 34px（鼠标够准） | 52px（手指要够得着） |
| 收起方式 | 点外面、按 Esc、再点触发器 | 点取消 / 完成、点遮罩 |

手机上不做下拉面板是刻意的：屏幕矮，下拉容易被键盘或屏幕底边挤掉，而底部弹层离拇指最近。

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `model-value` / `v-model` | 单选是一个值，多选是数组 | `string \| number \| boolean \| array` | — |
| `options` | 选项列表 `{ label, value, disabled? }` | `SelectOption[]` | `[]` |
| `placeholder` | 没选时显示的文字 | `string` | `请选择` |
| `multiple` | 多选 | `boolean` | `false` |
| `max` | 多选时最多选几个，到上限后未选中项自动禁用 | `number` | — |
| `clearable` | 有值时显示清空按钮 | `boolean` | `false` |
| `disabled` | 禁用 | `boolean` | `false` |
| `size` | 尺寸，不传则继承所在 Form | `small` \| `medium` \| `large` | 继承 |
| `title` | **移动端**选择表的标题；PC 端忽略 | `string` | 取 `placeholder` |

事件：`update:model-value`、`change`、`open`、`close`、`clear`。

默认插槽可以自己写选项内容，替代 `options`。

两个细节：显示的是 `label` 不是 `value`（多选用顿号连接）；清空时**单选给空字符串、多选给空数组**，
不会给出一个类型不对的值让业务层去猜。

::: warning PC 端面板会被祖先的 overflow 裁掉
PC 端的下拉面板用「相对触发器绝对定位」，没有测量元素位置。
好处是不用处理滚动、窗口缩放、父容器变化，也不用在小程序端走异步测量接口；
代价是**放在 `overflow: hidden` 的容器里会被裁掉**。

遇到这种情况，改用 `<df-popup>` 自己拼一个，或者把容器的 `overflow` 放开。
:::

::: tip 小程序端没有用内置 picker
内置 `<picker>` 就是系统滚轮，样式完全不可控，四套主题在它身上无从体现，多选也做不了。
需要「系统原生滚轮」时业务直接用 uni 的 `<picker>` 即可，不必经过组件库。
:::
