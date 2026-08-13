import type { DfTheme } from '../types'

/**
 * 02 黏土软糖 —— 默认主题
 *
 * 控件像捏出来的软胶：外凸阴影 + 内高光，输入类控件内凹。
 * 圆润有触感，适合 C 端 App、教育、健康类产品。
 */
export const clay: DfTheme = {
  key: 'clay',
  name: '黏土软糖',
  scheme: 'light',
  description: '圆润饱满、有捏感的软胶质地，亲和力最强',
  tokens: {
    'color-bg': '#EEF1FF',
    'color-surface': '#FFFFFF',
    'color-surface-2': '#F2F4FF',
    'color-surface-3': '#E4E9FF',

    'color-text-1': '#2C2F4A',
    'color-text-2': '#8A90B8',
    'color-text-3': '#A5AACB',

    'color-line': '#E6EAFB',

    'color-brand': '#7B6BFF',
    'color-brand-fg': '#FFFFFF',
    'color-brand-soft': '#EDEBFF',
    'color-accent': '#FF8FB1',

    'color-ok': '#12A05E',
    'color-ok-bg': '#D9FBE8',
    'color-warn': '#D98A1F',
    'color-warn-bg': '#FFF1D9',
    'color-err': '#EF5A76',
    'color-err-bg': '#FFE4EA',

    'color-skeleton': '#E4E8FB',
    'color-skeleton-shine': 'rgba(255,255,255,.95)',

    'radius-sm': '16px',
    'radius-md': '24px',
    'radius-lg': '28px',
    'radius-pill': '999px',

    'shadow-card':
      '0 14px 32px rgba(93,89,168,.16), inset 0 -4px 8px rgba(150,150,210,.09), inset 0 3px 5px rgba(255,255,255,.9)',
    'shadow-btn':
      '0 8px 18px rgba(123,107,255,.40), inset 0 -3px 6px rgba(0,0,0,.14), inset 0 2px 4px rgba(255,255,255,.40)',
    'shadow-ctrl':
      '0 6px 14px rgba(93,89,168,.13), inset 0 -2px 5px rgba(150,150,210,.12), inset 0 2px 4px rgba(255,255,255,.9)',
    'shadow-well':
      'inset 3px 3px 7px rgba(150,155,205,.26), inset -2px -2px 6px rgba(255,255,255,.95)',
    'shadow-glow': 'none',

    'surface-card-bg': '#FFFFFF',

    'control-h-sm': '32px',
    'control-h-md': '44px',
    'control-h-lg': '52px',

    'font-family':
      '-apple-system, BlinkMacSystemFont, "Segoe UI Rounded", "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif',
    'font-weight-title': '750',

    'motion-press': 'scale(.96)',
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
  },
}
