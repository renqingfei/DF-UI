# Checkbox / Radio / Switch

三个选择类控件。它们共用一套「值从哪来」的逻辑，所以放在一页里说。

<script setup>
import SelectionAll from '../.vitepress/demos/pc/selection-all.vue'
</script>

<ThemeSwitch />

<DemoBlock title="全家桶" desc="成组选择、限制数量、分段控件、异步确认的开关">
  <SelectionAll />
</DemoBlock>

<<< @/.vitepress/demos/pc/selection-all.vue

## 单独用 vs 成组用

同一个组件两种用法，不用换标签：

```vue
<!-- 单独用：值就是自己的 v-model -->
<df-checkbox v-model="agree" label="我已阅读并同意" />

<!-- 成组用：值由 group 统一管，每一项用 value 标明自己代表什么 -->
<df-checkbox-group v-model="picked">
  <df-checkbox value="apple" label="苹果" />
  <df-checkbox value="banana" label="香蕉" />
</df-checkbox-group>
```

## 后端给 1/0 也不用转

三个组件都支持自定义选中值：

```vue
<df-switch v-model="status" checked-value="Y" unchecked-value="N" />
<df-checkbox v-model="enabled" :checked-value="1" :unchecked-value="0" />
```

## Switch 的异步确认

「点了先转圈，服务端成功才真的切」—— 这是开关最常见的真实需求：

```vue
<df-switch :model-value="on" :before-change="save" />
```

```ts
async function save() {
  const res = await api.toggle()
  return res.ok // 返回 false 或抛异常，开关就不动
}
```

期间开关自动进入 `loading` 并禁止重复点击；钩子抛异常等同于「别切」，而且不会卡在 loading 上。

## Checkbox API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `model-value` / `v-model` | 单独使用时的选中状态 | `boolean \| string \| number` | — |
| `value` | 在 Group 里代表这一项的值 | `string \| number \| boolean` | — |
| `label` | 右侧文字，也可用默认插槽 | `string` | — |
| `checked-value` / `unchecked-value` | 自定义选中 / 未选中的值 | `boolean \| string \| number` | `true` / `false` |
| `indeterminate` | 半选态，用于「全选」父节点 | `boolean` | `false` |
| `disabled` | 禁用 | `boolean` | `false` |
| `size` | 尺寸，不传则继承 Form | `small` \| `medium` \| `large` | 继承 |

事件：`update:model-value`、`change`。

## CheckboxGroup API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `model-value` / `v-model` | 已选值数组 | `array` | `[]` |
| `max` | 最多选几个，选满后未选中项自动禁用 | `number` | — |
| `min` | 最少选几个，到下限后已选项不能取消 | `number` | — |
| `disabled` / `size` | 传导给组内每一项 | — | — |

## Radio / RadioGroup API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 这一项代表的值 | `string \| number \| boolean` | — |
| `label` | 右侧文字 | `string` | — |
| `variant`（Group） | `default` 圆点，`button` 分段控件 | `default` \| `button` | `default` |
| `disabled` / `size` | 同上 | — | — |

点已选中的项不会重复抛 `change`。

## Switch API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `model-value` / `v-model` | 当前值 | `boolean \| string \| number` | `false` |
| `checked-value` / `unchecked-value` | 自定义开 / 关的值 | — | `true` / `false` |
| `checked-text` / `unchecked-text` | 轨道内文字 | `string` | — |
| `loading` | 加载中，禁止操作 | `boolean` | `false` |
| `before-change` | 切换前的确认钩子，返回 `false` 或 reject 就不切 | `() => boolean \| Promise<boolean>` | — |
| `disabled` / `size` | 同上 | — | — |

::: warning 平台差异
uni 端**没有**使用小程序内置的 `<checkbox>` / `<switch>`：内置控件只能改 `color`，
尺寸、圆角都动不了，四套主题会立刻破功。所以小程序版是用 `view` 自己画的，
按下反馈交给小程序原生的 `hover-class`。
:::

::: tip 移动端的可点区域
H5 与 uni 端，勾选框整行的可点高度不低于 44px，勾选框本身从 17px 放大到 21px，
开关按 iOS 系统比例（51×31）。手机上没有鼠标指针辅助瞄准，控件小一点就变成「点三次才中一次」。
:::
