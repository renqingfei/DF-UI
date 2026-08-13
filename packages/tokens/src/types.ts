/**
 * 设计令牌类型定义。
 *
 * 四套主题必须实现完全相同的 key —— 任何一个 key 缺失，都会导致该主题下
 * 某个组件失去样式。类型层面由 DfThemeTokens 约束，运行时由
 * scripts/validate-themes.ts 兜底（防止 as any 绕过）。
 *
 * key 采用 kebab-case，与 CSS 变量一一对应：'color-bg' → '--df-color-bg'
 */

export type ColorScheme = 'light' | 'dark'

export interface DfThemeTokens {
  // —— 背景与层次 ——
  'color-bg': string
  'color-surface': string
  'color-surface-2': string
  'color-surface-3': string

  // —— 文字 ——
  'color-text-1': string
  'color-text-2': string
  'color-text-3': string

  // —— 分隔线 ——
  'color-line': string

  // —— 品牌色 ——
  'color-brand': string
  'color-brand-fg': string
  'color-brand-soft': string
  'color-accent': string

  // —— 语义色 ——
  'color-ok': string
  'color-ok-bg': string
  'color-warn': string
  'color-warn-bg': string
  'color-err': string
  'color-err-bg': string

  // —— 骨架屏 ——
  'color-skeleton': string
  'color-skeleton-shine': string

  // —— 圆角 ——
  'radius-sm': string
  'radius-md': string
  'radius-lg': string
  'radius-pill': string

  // —— 阴影 ——
  /** 卡片投影 */
  'shadow-card': string
  /** 主按钮投影 */
  'shadow-btn': string
  /** 普通控件投影（黏土主题有凸起，其余为 none） */
  'shadow-ctrl': string
  /** 内凹投影，用于输入框、开关轨道、进度槽 */
  'shadow-well': string
  /** 辉光，仅暗夜霓虹主题非 none */
  'shadow-glow': string

  // —— 表面 ——
  /** 卡片背景，可为渐变（暗夜霓虹用渐变） */
  'surface-card-bg': string

  // —— 控件尺寸 ——
  'control-h-sm': string
  'control-h-md': string
  'control-h-lg': string

  // —— 字体 ——
  'font-family': string
  'font-weight-title': string

  // —— 动效 ——
  /** 按下反馈的 transform */
  'motion-press': string
  'motion-duration': string
  'motion-easing': string

  // —— 移动端专属尺寸 ——
  // 移动端不得复用桌面尺寸，见 docs/planning/06-主题体系规范.md 第六节
  'm-page-padding': string
  'm-card-padding': string
  'm-card-gap': string
  'm-section-gap': string
  'm-title-size': string
  'm-stat-size': string
  'm-list-row-padding': string
  'm-tabbar-h': string
  'm-navbar-h': string
  /**
   * 移动端控件高度，独立于桌面的 control-h-*。
   * 硬底线：m-control-h-md 不得低于 44px —— 低于这个值手指点不准，
   * 这是 iOS / Android 两家人机界面指南共同的最小可点区域。
   */
  'm-control-h-sm': string
  'm-control-h-md': string
  'm-control-h-lg': string
}

export type DfTokenName = keyof DfThemeTokens

export interface DfTheme {
  /** 英文标识，用于 data-theme 与 setTheme() */
  key: string
  /** 中文名，用于文档站与主题切换器 */
  name: string
  /** 明暗属性，影响 color-scheme 与部分组件的默认行为 */
  scheme: ColorScheme
  /** 一句话描述，用于文档站 */
  description: string
  tokens: DfThemeTokens
}

export type DfThemeKey = 'clay' | 'neon' | 'bento' | 'muted'
