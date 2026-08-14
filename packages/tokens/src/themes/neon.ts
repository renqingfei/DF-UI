import type { DfTheme } from '../types'

/**
 * 01 暗夜霓虹
 *
 * 近黑底 + 荧光绿强调，关键元素带辉光。
 * 冷静锐利，适合开发者工具、数据平台、AI 产品。
 *
 * 特有规则：开关打开态、侧边栏选中项、进度条、图表最新数据点使用 shadow-glow。
 */
export const neon: DfTheme = {
  key: 'neon',
  name: '暗夜霓虹',
  scheme: 'dark',
  description: '近黑底配荧光强调色，关键元素发光，冷静锐利',
  tokens: {
    'color-bg': '#08090D',
    'color-surface': '#101219',
    'color-surface-2': '#161A24',
    'color-surface-3': '#1F2534',

    'color-text-1': '#EEF1F8',
    'color-text-2': '#8B93A7',
    'color-text-3': '#5D6478',

    'color-line': '#1E2230',

    'color-brand': '#00E5A0',
    'color-brand-fg': '#05100C',
    'color-brand-soft': 'rgba(0,229,160,.13)',
    'color-accent': '#7C5CFF',

    'color-ok': '#00E5A0',
    'color-ok-bg': 'rgba(0,229,160,.14)',
    'color-warn': '#FFB020',
    'color-warn-bg': 'rgba(255,176,32,.14)',
    'color-err': '#FF5C6C',
    'color-err-bg': 'rgba(255,92,108,.14)',

    'color-skeleton': '#171A23',
    'color-skeleton-shine': 'rgba(255,255,255,.07)',

    'radius-sm': '10px',
    'radius-md': '13px',
    'radius-lg': '16px',
    'radius-pill': '999px',

    'shadow-card': '0 0 0 1px rgba(0,229,160,.06), 0 8px 28px rgba(0,0,0,.5)',
    'shadow-btn': '0 0 22px rgba(0,229,160,.42), inset 0 1px 0 rgba(255,255,255,.22)',
    'shadow-ctrl': 'none',
    'shadow-well': 'inset 0 1px 3px rgba(0,0,0,.45)',
    'shadow-glow': '0 0 18px rgba(0,229,160,.42)',

    'surface-card-bg': 'linear-gradient(160deg,#12141C,#0C0E14)',

    'control-h-sm': '28px',
    'control-h-md': '36px',
    'control-h-lg': '44px',

    'font-family':
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif',
    'font-weight-title': '700',

    'motion-press': 'scale(.975)',
    'motion-duration': '300ms',
    'motion-easing': 'cubic-bezier(.32,.72,0,1)',

    'm-page-padding': '18px',
    'm-card-padding': '18px',
    'm-card-gap': '14px',
    'm-section-gap': '22px',
    'm-title-size': '29px',
    'm-stat-size': '40px',
    'm-list-row-padding': '14px',
    'm-tabbar-h': '68px',
    'm-navbar-h': '52px',
    'm-control-h-sm': '34px',
    'm-control-h-md': '44px',
    'm-control-h-lg': '48px',
  },
}
