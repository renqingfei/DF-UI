import type { DfTheme } from '../types'

/**
 * 04 莫兰迪柔雾
 *
 * 整套降饱和：米灰、雾绿、藕棕。没有一处跳出来喊人。
 * 适合效率工具、笔记、生活方式类产品。
 *
 * 特有规则：语义色同样降饱和 —— 这套主题连报错都是安静的。
 */
export const muted: DfTheme = {
  key: 'muted',
  name: '莫兰迪柔雾',
  scheme: 'light',
  description: '整套低饱和暖灰，安静得像一间书房，最不容易审美疲劳',
  tokens: {
    'color-bg': '#E9E6E1',
    'color-surface': '#F6F4F1',
    'color-surface-2': '#EFECE7',
    'color-surface-3': '#E1DCD4',

    'color-text-1': '#3A3733',
    'color-text-2': '#8B857D',
    'color-text-3': '#A8A199',

    'color-line': '#DFDAD2',

    'color-brand': '#7C8B7A',
    'color-brand-fg': '#FBFAF8',
    'color-brand-soft': '#DDE3DA',
    'color-accent': '#B79E8A',

    'color-ok': '#5C6E59',
    'color-ok-bg': '#DDE3DA',
    'color-warn': '#A8834E',
    'color-warn-bg': '#EFE5D5',
    'color-err': '#A96A62',
    'color-err-bg': '#EFDCD9',

    'color-skeleton': '#E0DCD5',
    'color-skeleton-shine': 'rgba(255,255,255,.85)',

    'radius-sm': '11px',
    'radius-md': '14px',
    'radius-lg': '18px',
    'radius-pill': '999px',

    'shadow-card': '0 2px 10px rgba(90,80,70,.06)',
    'shadow-btn': 'none',
    'shadow-ctrl': 'none',
    'shadow-well': 'none',
    'shadow-glow': 'none',

    'surface-card-bg': '#F6F4F1',

    'control-h-sm': '26px',
    'control-h-md': '34px',
    'control-h-lg': '42px',

    'font-family':
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif',
    'font-weight-title': '600',

    'motion-press': 'scale(.98)',
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
    // 莫兰迪讲究安静宽松，移动端中号贴 44px 触控底线，仍比桌面高一档
    'm-control-h-sm': '34px',
    'm-control-h-md': '44px',
    'm-control-h-lg': '50px',
  },
}
