# DF UI

一套面向 Vue 3 的三端组件库：**PC 后台**、**手机 H5**、**uniapp（小程序 / App）**。

三端共享同一套设计令牌、同一套逻辑内核、同一套组件 API，各自保留最贴合平台习惯的界面表现。

---

## 这是什么

| | 说明 |
| --- | --- |
| 定位 | 自研 UI 组件库，对标 Element Plus（PC）+ Vant（H5）+ uview（uniapp），三者合一 |
| 技术栈 | Vue 3 + TypeScript + Vite + Vitest + pnpm workspace（monorepo） |
| 发布形态 | `@df-ui/pc`、`@df-ui/h5`、`@df-ui/uni` 三个 npm 包 |
| 内置主题 | **四套**：暗夜霓虹 / 黏土软糖（默认）/ 便当格 / 莫兰迪柔雾，运行时一行代码切换 |
| 当前阶段 | 第一批 30 个组件里已完成 22 个（三端齐全），285 个测试全绿 |

---

## 快速开始

```bash
pnpm install

pnpm dev              # 同时起 PC(5180) 与 H5(5181) 两个预览工程
pnpm dev:pc           # 只起 PC 预览
pnpm dev:h5           # 只起 H5 预览（手机连同一 Wi-Fi 可直接访问，看真机手感）

pnpm docs:dev         # 文档站（组件示例 + API 表 + 主题切换）
pnpm docs:build       # 构建文档站静态产物

pnpm test             # 全部单元测试（含三端 API 一致性校验）
pnpm typecheck        # 类型检查
pnpm themes:validate  # 四套主题令牌一致性校验
pnpm themes:css       # 由令牌生成 themes.css
```

PC 预览页最下方嵌了一个手机框，里面跑的是 H5 包，**主题跟着一起切**，可以直接对照两端差异。

---

## 仓库结构

```
DF_UI/
├─ packages/
│  ├─ tokens/        设计令牌：四套主题各 50 个令牌，唯一的颜色/尺寸真相源
│  ├─ core/          逻辑内核 + 三端共享的组件 API 契约（0 界面代码、0 DOM 依赖）
│  ├─ pc/            @df-ui/pc    PC 后台版
│  ├─ h5/            @df-ui/h5    手机网页版
│  └─ uni/           @df-ui/uni   uniapp 版（源码分发，不打包）
├─ playground/
│  ├─ pc/            PC 预览工程（端口 5180）
│  └─ h5/            H5 预览工程（端口 5181）
├─ docs/             VitePress 文档站
│  ├─ .vitepress/    站点配置、自定义主题、示例源文件
│  ├─ guide/         指南（介绍、安装、主题、三端差异）
│  ├─ components/    组件文档（示例 + API 表）
│  ├─ planning/      规划文档（不进文档站，只在仓库里看）
│  └─ session/       开发会话记录（不进文档站）
├─ preview/          早期静态风格预览页（不依赖构建，双击即开，留档备查）
├─ scripts/          令牌校验、主题 CSS 生成
└─ __tests__/        跨端一致性测试
```

---

## 三端是怎么复用的

| 层 | 复用程度 | 放在哪 |
| --- | --- | --- |
| 设计令牌（颜色 / 圆角 / 阴影 / 尺寸） | 100% 共享 | `packages/tokens` |
| 组件 API 契约（props / emits / 枚举） | **100% 共享，物理上无法走偏** | `packages/core/src/props/` |
| 界面无关逻辑（类名推导、状态判定） | 约 90% 共享 | `packages/core/src/composables/` |
| 界面模板与样式 | 各写各的 | `packages/{pc,h5,uni}` |

三端 API 一致性由 `__tests__/api-parity.test.ts` 守门：一张登记表列出每个组件的三端实现，
逐项断言「三端拿到的是同一个 props 对象」「同属性生成同类名」。谁在自己端里私自重新声明一遍
props，或者少接一个属性，测试立刻红。加新组件时把它登记进表就行，不用另写测试。

## 已完成的组件

| 分组 | 组件 |
| --- | --- |
| 基础 | Button、Space（无 uni 版）、Divider |
| 表单 | Input、Textarea、Form + FormItem（含校验引擎）、Checkbox + Group、Radio + Group、Switch |
| 数据展示 | Skeleton + SkeletonItem、Card、Tag、Badge、Avatar、Empty |
| 反馈 | Popup、Dialog、Toast、Loading（含层级栈与滚动锁定基建） |
| 选择 | Select / Picker（PC 下拉面板 / 移动端底部选择表） |
| 导航 | Tabs（三形态）、TabBar 底部导航（仅移动端） |

还没做的：NavBar / Pagination / Menu、Table / List / Grid、Icon、Message。
每一项卡在哪、按什么顺序做，详见 `docs/session/会话-2026-08-13.md` 的「下一步」。

---

## 文档索引

| 文档 | 内容 |
| --- | --- |
| [01-架构方案](docs/planning/01-架构方案.md) | 为什么这么分包、三端如何复用、构建与发布方案 |
| [02-组件清单-第一批](docs/planning/02-组件清单-第一批.md) | 30 个首批组件的用途、三端支持、API 设计 |
| [03-组件清单-第二批](docs/planning/03-组件清单-第二批.md) | 20 个进阶组件的用途、三端支持、API 设计 |
| [04-设计风格与主题规范](docs/planning/04-设计风格与主题规范.md) | 通用主题体系：色阶推导、中性色、尺寸/动效/层级令牌 |
| [05-液态玻璃设计规范](docs/planning/05-液态玻璃设计规范.md) | 已否决方案，留档备查 |
| [06-主题体系规范](docs/planning/06-主题体系规范.md) | **定稿**：四套主题完整令牌表、各自特有规则、移动端尺寸规范 |

---

## 视觉风格

**四套内置主题，不合成、不互相覆盖**，配色与原始方向一致：

| 主题 key | 名字 | 气质 | 适合 |
| --- | --- | --- | --- |
| `neon` | 暗夜霓虹 | 近黑底 + 荧光绿，关键元素发光 | 开发工具、数据平台、AI 产品 |
| `clay` | 黏土软糖（**默认**） | 圆润厚实，控件有捏出来的凹凸感 | 面向普通用户的 App / 小程序 |
| `bento` | 便当格 | 零边框零阴影，靠色块与留白分区 | 后台管理、数据看板、官网 |
| `muted` | 莫兰迪柔雾 | 低饱和暖灰，安静不刺眼 | 内容类、效率工具 |

切换方式三端一致：

```ts
import { setTheme } from '@df-ui/core'
setTheme('neon')
```

---

## 环境要求

| 工具 | 版本 | 本机现状 |
| --- | --- | --- |
| Node.js | >= 18（推荐 20+） | v22.22.0 |
| pnpm | >= 8 | 10.33.0 |
| TypeScript | 5.x（vue-tsc 尚不支持 TS 7） | 5.9.3 |

---

## 开发路线

| 阶段 | 内容 | 状态 |
| --- | --- | --- |
| 0 | 需求收敛、架构方案、组件清单、视觉风格定稿 | 已完成 |
| 1 | 搭地基：monorepo、四套主题令牌、测试与校验管线 | 已完成 |
| 2 | Button 打通三端全链路，作为后续组件的模板 | 已完成 |
| 3 | VitePress 文档站：示例容器、API 表、主题切换、手机框预览 | 已完成 |
| 4 | 第一批余下 29 个组件（PC / H5 / uni 三端） | 待开始 |
| 5 | 库构建管线（各包 vite.config + d.ts 产物） | 待开始 |
| 6 | 第二批 20 个进阶组件 | 待开始 |
| 7 | 无障碍、按需引入、changesets 发版、npm 发布 | 待开始 |


