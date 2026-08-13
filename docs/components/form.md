# Form 表单

把一堆输入框管起来：统一校验、统一禁用、统一尺寸、一键重置。

<script setup>
import FormLogin from '../.vitepress/demos/pc/form-login.vue'
</script>

<ThemeSwitch />

<DemoBlock title="一个真能跑的注册表单" desc="直接点提交看必填校验；昵称输入 admin 看异步查重">
  <FormLogin />
</DemoBlock>

<<< @/.vitepress/demos/pc/form-login.vue

## 校验是怎么串起来的

三层，各管一件事：

| 层 | 职责 |
| --- | --- |
| `DfForm` | 拿着数据（`model`）和规则（`rules`），负责全量校验与重置 |
| `DfFormItem` | 认自己那一个字段（`prop`），负责显示红字与红星 |
| 控件（Input / Checkbox…） | 失焦或改值时喊一声，**完全不认识校验规则** |

好处是加新控件不用改校验代码：任何控件只要接进 FormItem，就自动获得校验能力。

## 校验规则

```ts
import type { FormRules } from '@df-ui/core'

const rules: FormRules = {
  phone: [
    { required: true, message: '请填写手机号' },
    { type: 'phone', message: '手机号格式不对' },
  ],
  age: [{ type: 'integer', min: 18, max: 120, message: '年龄要在 18 到 120 之间' }],
  code: [{ len: 6, message: '验证码是 6 位' }],
  nickname: [
    // 返回字符串就是错误提示；支持 async，用于查重之类
    { validator: async (v) => (await isTaken(v)) ? '这个昵称被占用了' : true },
  ],
}
```

| 规则字段 | 说明 |
| --- | --- |
| `required` | 必填。空字符串、纯空格、`null`、`undefined`、空数组都算空；数字 `0` 和 `false` 不算空 |
| `type` | `string` \| `number` \| `integer` \| `array` \| `email` \| `phone` \| `url` |
| `min` / `max` | 字符串按字数、数字按数值、数组按项数 |
| `len` | 长度必须恰好等于 |
| `pattern` | 正则 |
| `validator` | 自定义。返回 `true`/`undefined` 通过，返回字符串即错误提示，支持 `async` |
| `message` | 不通过时的提示，不写就用内置中文提示 |
| `trigger` | `blur` \| `change` \| `submit`，可传数组。不写则任何时机都校验 |

两条刻意的设计：

- **选填字段为空时跳过格式校验** —— 不填邮箱不该报「邮箱格式不正确」
- **一次只报第一条错误** —— 一次糊五条提示，用户一条也读不进去

## Form API

### 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `model` | 被校验的数据对象 | `object` | `{}` |
| `rules` | 字段名 → 规则数组 | `FormRules` | `{}` |
| `label-position` | 标签位置 | `top` \| `left` | `top` |
| `label-width` | 标签宽度，`left` 时生效 | `string \| number` | — |
| `size` | 统一控件尺寸，子项没单独设时继承 | `small` \| `medium` \| `large` | `medium` |
| `disabled` | 整个表单禁用 | `boolean` | `false` |
| `required-mark` | 必填项标签前加红星 | `boolean` | `true` |
| `show-message` | 显示错误文字 | `boolean` | `true` |

### 方法（通过 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `validate()` | 全量校验，返回 `Promise<boolean>` |
| `validateFields(props)` | 只校验点名的字段 |
| `resetFields()` | 恢复初始值并清掉所有错误 |
| `clearValidate()` | 只清错误，不动值 |
| `hasError` | 当前是否有任何一项在报错 |

### 事件

| 事件 | 说明 | 回调参数 |
| --- | --- | --- |
| `validate` | 某一项校验状态变化 | `(prop, valid, message)` |

## FormItem API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `prop` | 对应 `model` 里的字段名，不传则不参与校验 | `string` | — |
| `label` | 标签文字 | `string` | — |
| `rules` | 只作用于本项的规则，与 Form 上的合并 | `FormRule[]` | — |
| `required` | 手动标记必填（只影响红星，不产生校验） | `boolean` | 由规则自动推断 |
| `label-width` / `show-message` | 覆盖 Form 上的同名设置 | — | 继承 Form |

::: tip 错误提示的位置一直占着
报错文字那一行的高度是常留的。不这么做，一报错整个表单会往下抖一下 —— 这是最影响「廉价感」的细节之一。
:::
