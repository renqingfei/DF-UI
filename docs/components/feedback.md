# Toast / Popup / Dialog / Loading

四个反馈类组件。它们都盖在页面之上，所以共用同一层「浮层基建」。

<script setup>
import FeedbackAll from '../.vitepress/demos/pc/feedback-all.vue'
</script>

<ThemeSwitch />

<DemoBlock title="全家桶" desc="每个按钮都能真点，弹层可以叠着开">
  <FeedbackAll />
</DemoBlock>

<<< @/.vitepress/demos/pc/feedback-all.vue

## 浮层基建做了三件事

弹层类组件最容易出的三种 bug，都在这一层一次性解决：

| 问题 | 处理方式 |
| --- | --- |
| **弹窗里再开弹窗，层级打架** | 层级号从一个全局栈里领，后开的永远盖在先开的上面。没人写死 `z-index` |
| **打开弹层后背景还能滚** | 打开时锁滚动、关闭时解锁。**用计数而不是布尔值**：两层叠开时关掉上面那层，不能把滚动解开 |
| **弹层被父元素裁掉一半** | Web 端 `Teleport` 到 body，绕开祖先元素的 `overflow` / `transform` |

还有一个容易被忽略的细节：锁滚动时滚动条消失，页面可用宽度突然变大，整页内容会往右抖一下。
所以锁的时候会把消失掉的滚动条宽度补成 `padding-right`。

## Toast 轻提示

函数式调用，不用在模板里放组件：

```ts
import { DfToast } from '@df-ui/pc'

DfToast.success('保存成功')
DfToast.error('网络异常，请重试')
DfToast.loading('上传中…') // 不自动消失
DfToast.close()

DfToast.show({ message: '顶部提示', position: 'top', duration: 3000 })
```

| 参数 | 说明 | 默认值 |
| --- | --- | --- |
| `message` | 提示文字 | — |
| `type` | `text` \| `success` \| `error` \| `warning` \| `loading` | `text` |
| `duration` | 毫秒，`0` 表示不自动消失 | `2000`（loading 类为 `0`） |
| `position` | `center` \| `top` \| `bottom` | `center` |
| `forbidClick` | 显示期间禁止点击穿透 | loading 类默认 `true` |

全局只挂一个实例，反复复用 —— 轻提示同一时刻只该有一条，后一条自然顶掉前一条。

::: warning 小程序端的 Toast 是转发给系统的
uni 端的 `DfToast` 直接调 `uni.showToast` / `uni.showLoading`，而不是自己画一个。
两个原因：小程序不允许运行时往页面插节点；而且系统 Toast **能盖在原生组件之上**，
自己用 `view` 画的会被 video / map / camera 压住。

代价是外观不受主题控制。这是刻意的取舍：轻提示只闪一下，
「一定能显示出来」比「配色统一」更重要。需要完全受控的外观时，用 `<df-popup position="top">` 自己拼。
:::

## Popup 弹出层

Dialog、ActionSheet、抽屉、下拉面板的共同底座。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `visible` / `v-model:visible` | 是否显示 | `boolean` | `false` |
| `position` | 从哪个方向出来 | `center` \| `bottom` \| `top` \| `left` \| `right` | `center` |
| `overlay` | 显示半透明遮罩 | `boolean` | `true` |
| `close-on-overlay` | 点遮罩关闭 | `boolean` | `true` |
| `close-on-esc` | 按 Esc 关闭（仅 Web 端） | `boolean` | `true` |
| `closable` | 右上角关闭叉 | `boolean` | `false` |
| `lock-scroll` | 打开时锁背景滚动 | `boolean` | `true` |
| `round` | 圆角（贴边那一侧自动不圆） | `boolean` | `true` |
| `width` / `height` | 按方向生效 | `string \| number` | 侧边抽屉默认 320px |
| `destroy-on-close` | 关闭后销毁内部内容 | `boolean` | `false` |

事件：`update:visible`、`open`、`close`、`overlayClick`。

## Dialog 对话框

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `visible` / `v-model:visible` | 是否显示 | `boolean` | `false` |
| `title` / `content` | 标题与正文，正文也可用默认插槽 | `string` | — |
| `confirm-text` / `cancel-text` | 按钮文字 | `string` | `确定` / `取消` |
| `show-cancel` | 显示取消按钮 | `boolean` | `true` |
| `confirm-type` | 确认按钮语义色，删除类用 `danger` | `primary` \| `danger` | `primary` |
| `before-confirm` | 确认前的钩子，返回 `false` 或 reject 就不关闭 | `() => boolean \| Promise<boolean>` | — |
| `closable` / `close-on-overlay` / `close-on-esc` / `lock-scroll` / `width` | 同 Popup | — | `closable` 默认 `true`，`close-on-overlay` 默认 `false` |

事件：`update:visible`、`confirm`、`cancel`、`open`、`close`。插槽：`default`、`#title`、`#footer`。

`before-confirm` 是这个组件真正值钱的地方：

```ts
async function doDelete() {
  const res = await api.remove(id)
  return res.ok // 返回 false 或抛异常，窗就不关
}
```

期间确定按钮自动转圈、取消按钮自动禁用、Esc 与关闭叉自动失效 —— 业务代码不用自己管这套状态。

::: tip PC 与移动端的按钮排布不同
PC 端两个按钮靠右排（鼠标从内容区往右下移动最顺）；
H5 与小程序端两个按钮**各占一半、平铺底部** —— 拇指主要活动区在屏幕下半部分，
靠右的小按钮既难点又容易误触。这也是 iOS / Android 系统弹窗的通行做法。
:::

## Loading 加载

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `loading` | 是否显示 | `boolean` | `true` |
| `text` | 转圈下方的文字 | `string` | — |
| `size` | 尺寸 | `small` \| `medium` \| `large` \| `number` | `medium` |
| `overlay` | 盖住父容器（父容器需非 static 定位） | `boolean` | `false` |
| `fullscreen` | 盖满整屏 | `boolean` | `false` |

遮罩底色用的是「页面底色 + 透明度」，不是写死的白色 —— 暗色主题下白遮罩会闪瞎眼。

::: warning 小程序端的弹层有两个硬限制
1. **没有 Teleport**，弹层就在原地渲染靠 `position: fixed` 脱离文档流 ——
   所以别把 Popup 放在带 `transform` 的容器里，它逃不出去
2. **原生组件永远压在最上层**（video / map / camera / input / textarea）。
   页面上有这些时弹层会被盖住，需要改用 `cover-view` 或 `root-portal` 包一层。
   这一条写进文档而不在组件里偷偷处理 —— 偷偷处理会让问题更难查
:::
