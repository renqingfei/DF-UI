import type { DfTheme } from '../types'

/**
 * 03 便当格
 *
 * 零边框零阴影，纯靠色块与留白分区，数字放到最大。
 * 极度克制，适合数据看板、后台管理、官网。
 *
 * 特有规则：品牌色是黑色，强调靠 color-accent（橙）。
 * 全站橙色出现频率控制在 5% 以内，只用于最新数据、选中态、返回箭头。
 */
export const bento: DfTheme = {
  key: 'bento',
  name: '便当格',
  scheme: 'light',
  description: '零边框零阴影，靠色块与留白分区，数字最大化',
  tokens: {
    'color-bg': '#F4F4F5',
    'color-surface': '#FFFFFF',
    'color-surface-2': '#EDEDF0',
    'color-surface-3': '#E1E1E5',

    'color-text-1': '#111114',
    'color-text-2': '#71717A',
    'color-text-3': '#A1A1AA',

    'color-line': '#E7E7EA',

    'color-brand': '#111114',
    'color-brand-fg': '#FFFFFF',
    'color-brand-soft': '#E7E7EA',
    'color-accent': '#FF4D2D',

    'color-ok': '#15803D',
    'color-ok-bg': '#DCFCE7',
    'color-warn': '#C2410C',
    'color-warn-bg': '#FFEDD5',
    'color-err': '#DC2626',
    'color-err-bg': '#FEE2E2',

    'color-skeleton': '#E4E4E7',
    'color-skeleton-shine': 'rgba(255,255,255,.9)',

    'radius-sm': '12px',
    'radius-md': '16px',
    'radius-lg': '20px',
    'radius-pill': '999px',

    // 便当格不用阴影分层，只有浮层例外
    'shadow-card': 'none',
    'shadow-btn': 'none',
    'shadow-ctrl': 'none',
    'shadow-well': 'none',
    'shadow-glow': 'none',

    'surface-card-bg': '#FFFFFF',

    'control-h-sm': '32px',
    'control-h-md': '42px',
    'control-h-lg': '50px',

    'font-family':
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif',
    'font-weight-title': '800',

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
    'm-control-h-sm': '38px',
    'm-control-h-md': '46px',
    'm-control-h-lg': '54px',
  },
}
