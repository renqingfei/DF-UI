# 三端差异

DF UI 的原则是：**用法一致，表现各自最贴合平台**。这一页说清楚哪些一致、哪些不一致。

## 一定一致的

| 项 | 说明 |
| --- | --- |
| 属性名与取值 | `type="primary"` 在三端含义完全一样 |
| 事件名与参数结构 | 三端都抛 `click`，即使小程序底层是 `tap` |
| 插槽名 | `default` / `icon` 三端同名 |
| 类名结构 | 都是 `df-button df-button--primary is-loading` 这套 BEM |
| 主题令牌 | 同一份，改一处三端一起变 |
| 换肤 API | 三端都是 `setTheme('neon')` |

这些由 `__tests__/button-api-parity.test.ts` 逐项断言，不是口头约定。

## 允许不一致的

只允许三类差异，且必须写进文档：

### 1. 某端不提供某个组件

有些组件在某个端根本没有意义：

| 组件 | PC | H5 | uni |
| --- | :-: | :-: | :-: |
| Table 表格 | <span class="yes">✓</span> | <span class="no">—</span> | <span class="no">—</span> |
| List 列表 | <span class="no">—</span> | <span class="yes">✓</span> | <span class="yes">✓</span> |
| TabBar 底部导航 | <span class="no">—</span> | <span class="yes">✓</span> | <span class="yes">✓</span> |

手机上放不下一张宽表格，硬塞只会两头不讨好 —— 移动端用 List 代替。

### 2. 某端不支持某个属性

| 属性 | 情况 |
| --- | --- |
| `nativeType` | uni 端无效。uni 版按钮用 `<view>` 实现，需要表单提交请用原生 `<button form-type>` |

### 3. 视觉与交互表现不同

用法相同，长相和手感不同 —— 这是刻意的：

| 维度 | PC | H5 | uniapp |
| --- | --- | --- | --- |
| 底层标签 | `<button>` | `<button>` | `<view>` |
| 触发事件 | `@click` | `@click` | `@tap` |
| 控件高度来源 | `control-h-*` | `m-control-h-*`（≥ 44px） | 同 H5 |
| 悬停态 | 有 | 只在有指针设备时有 | 无 |
| 按下反馈 | CSS `:active` | CSS `:active`，更明显 | 小程序原生 `hover-class` |
| 主题落点 | `<html data-theme>` | 同 PC | `<df-config-provider>` 上的内联变量 |
| Select 选择器 | 下拉框 | 底部滚轮 | 底部滚轮 |

## 严禁的差异

- 同名属性在不同端含义不同
- 同名事件参数结构不同

这两条一旦破了，"学一次三端通用" 就是假的。

## 小程序端的额外妥协

小程序不是浏览器，有些事只能绕：

| 限制 | 怎么处理 |
| --- | --- |
| 没有 DOM，不能同步测量元素 | 依赖尺寸的组件（Tooltip、虚拟列表）走 core 的异步测量接口，各端各自实现 |
| 没有 Teleport，原生组件永远盖最上层 | 弹层统一走 `root-portal` / `cover-view` 封装 |
| 选择器支持有限（无通配符、无深层后代） | uni 端样式只用单类名选择器 |
| 低版本不支持 CSS 变量 | 每个 `var()` 都带写死兜底值，且兜底值必须与默认主题一致（有测试比对） |
| flex `gap` 支持不全 | uni 端用 `margin` 代替 |
| 包体积 2MB 限制 | 只打包用到的主题，不全塞进去 |

## uni 端的验证状态

::: warning 尚未真机验证
uni 端目前只有单元测试和源码约束测试（写法是否踩了小程序的坑）守着，
**还没有在微信开发者工具或真机上跑过**。

需要用 HBuilderX 或 uni CLI 起一个工程实测一轮，才能说这个端真的可用。
特别是这几项：小程序里 CSS 变量的实际生效范围、`hover-class` 的手感、
`view` 上 `@tap` 的响应延迟。
:::
