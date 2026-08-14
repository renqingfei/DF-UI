# Button 按钮

触发一个即时操作。DF UI 里最基础的组件，三端都有。

<script setup>
import ButtonType from '../.vitepress/demos/pc/button-type.vue'
import ButtonTypeRaw from '../.vitepress/demos/pc/button-type.vue?raw'
import ButtonVariant from '../.vitepress/demos/pc/button-variant.vue'
import ButtonVariantRaw from '../.vitepress/demos/pc/button-variant.vue?raw'
import ButtonSize from '../.vitepress/demos/pc/button-size.vue'
import ButtonSizeRaw from '../.vitepress/demos/pc/button-size.vue?raw'
import ButtonState from '../.vitepress/demos/pc/button-state.vue'
import ButtonStateRaw from '../.vitepress/demos/pc/button-state.vue?raw'
import ButtonIcon from '../.vitepress/demos/pc/button-icon.vue'
import ButtonIconRaw from '../.vitepress/demos/pc/button-icon.vue?raw'
import ButtonMobile from '../.vitepress/demos/h5/button-mobile.vue'
import ButtonMobileRaw from '../.vitepress/demos/h5/button-mobile.vue?raw'
</script>

<ThemeSwitch />

::: tip 上面这排主题按钮是活的
随便点，本页所有示例会整套换肤。**组件代码里一行颜色都没写**，颜色全部来自主题令牌。
:::

## 语义类型

用 `type` 表达这个按钮的分量。一个页面里 `primary` 最好只有一个，否则用户不知道该点哪个。

<DemoBlock title="type" desc="default / primary / success / warning / danger" :code="ButtonTypeRaw">
  <ButtonType />
</DemoBlock>

## 填充方式

同一个语义色，可以有四种轻重。`solid` 最重，`text` 最轻。

<DemoBlock title="variant" desc="solid / soft / ghost / text" :code="ButtonVariantRaw">
  <ButtonVariant />
</DemoBlock>

## 尺寸与形状

`size` 管高矮，`shape` 管圆润程度，`block` 让按钮撑满一行。

<DemoBlock title="size · shape · block" :code="ButtonSizeRaw">
  <ButtonSize />
</DemoBlock>

## 加载与禁用

`loading` 不只是转个圈，它会**同时禁掉点击** —— 这是防重复提交最省事的做法。

<DemoBlock title="loading · disabled" desc="点「点我保存」看看连点会不会重复提交" :code="ButtonStateRaw">
  <ButtonState />
</DemoBlock>

## 带图标

图标放 `#icon` 插槽，不必关心间距。

<DemoBlock title="#icon 插槽" :code="ButtonIconRaw">
  <ButtonIcon />
</DemoBlock>

## 在手机上长什么样

下面手机框里跑的是 **`@df-ui/h5`**，另一个包，但属性写法和上面完全一样。

<DemoBlock title="@df-ui/h5" desc="属性一模一样，尺寸与反馈按手指重调" :code="ButtonMobileRaw">
  <PhonePreview>
    <ButtonMobile />
  </PhonePreview>
</DemoBlock>

三端的差异只在体验层，不在用法层：

| | PC | H5 | uniapp |
| --- | --- | --- | --- |
| 最小高度 | 跟随主题（黏土 38px） | **≥ 44px**，手指点得准 | 同 H5 |
| 悬停态 | 有 | 只在接了鼠标的设备上有 | 无（小程序没有悬停概念） |
| 按下反馈 | 轻微下沉 | 更明显，且关掉系统灰色高亮块 | 小程序原生 `hover-class`，视图层直接处理 |
| 底层标签 | `<button>` | `<button>` | `<view>` |

## API

### 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `type` | 语义类型 | `default` \| `primary` \| `success` \| `warning` \| `danger` | `default` |
| `variant` | 填充方式 | `solid` \| `soft` \| `ghost` \| `text` | `solid` |
| `size` | 尺寸 | `small` \| `medium` \| `large` | `medium` |
| `shape` | 形状 | `default` \| `round` \| `circle` | `default` |
| `loading` | 加载态，同时禁用点击 | `boolean` | `false` |
| `disabled` | 禁用 | `boolean` | `false` |
| `block` | 撑满父容器宽度 | `boolean` | `false` |
| `nativeType` | 原生 button 的 type，表单里用 | `button` \| `submit` \| `reset` | `button` |

::: warning 平台差异
`nativeType` 在 **uniapp 端无效** —— uni 版用 `<view>` 实现（小程序原生 `button` 的样式几乎改不动）。
需要表单提交请直接用 uni 原生 `<button form-type="submit">`。
:::

### 事件

| 事件 | 说明 | 回调参数 |
| --- | --- | --- |
| `click` | 点击时触发；`loading` / `disabled` 状态下不会触发 | `(evt: MouseEvent)`，uniapp 端为 tap 事件对象 |

### 插槽

| 插槽 | 说明 |
| --- | --- |
| `default` | 按钮文字 |
| `icon` | 文字前的图标；`loading` 时会被 spinner 顶掉 |

### 组件级令牌

想只改按钮、不动其他组件，覆盖这些变量就行：

```css
.my-page .df-button {
  --df-button-radius: 4px;
  --df-button-font-size: 15px;
  --df-button-height: 40px;
}
```

| 变量 | 作用 |
| --- | --- |
| `--df-button-bg` / `--df-button-fg` | 底色 / 文字色 |
| `--df-button-height` | 高度 |
| `--df-button-padding` | 左右内边距 |
| `--df-button-radius` | 圆角 |
| `--df-button-font-size` | 字号 |
| `--df-button-shadow` | 投影 |
