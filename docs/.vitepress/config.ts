import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitepress'

const abs = (p: string) => fileURLToPath(new URL(p, import.meta.url))

export default defineConfig({
  title: 'DF UI',
  description: '面向 Vue 3 的三端组件库：PC 后台 / 手机 H5 / uniapp，内置四套主题',
  lang: 'zh-CN',
  // 规划与会话记录是给自己看的过程文档，不进文档站
  srcExclude: ['planning/**', 'session/**'],
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/introduction' },
      { text: '组件', link: '/components/button' },
      { text: '主题', link: '/guide/theme' },
    ],
    sidebar: [
      {
        text: '指南',
        items: [
          { text: '这是什么', link: '/guide/introduction' },
          { text: '安装与使用', link: '/guide/install' },
          { text: '四套主题', link: '/guide/theme' },
          { text: '三端差异', link: '/guide/platforms' },
        ],
      },
      {
        text: '基础',
        items: [
          { text: 'Button 按钮', link: '/components/button' },
          { text: 'Space / Divider 排版', link: '/components/layout' },
        ],
      },
      {
        text: '表单',
        items: [
          { text: 'Input 输入框', link: '/components/input' },
          { text: 'Form 表单与校验', link: '/components/form' },
          { text: 'Checkbox / Radio / Switch', link: '/components/selection' },
        ],
      },
      {
        text: '数据展示',
        items: [
          { text: 'Skeleton 骨架屏', link: '/components/skeleton' },
          { text: 'Card / Tag / Badge / Avatar / Empty', link: '/components/display' },
        ],
      },
      {
        text: '反馈',
        items: [{ text: 'Toast / Popup / Dialog / Loading', link: '/components/feedback' }],
      },
    ],
    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    darkModeSwitchLabel: '外观',
    returnToTopLabel: '回到顶部',
    lastUpdated: { text: '最后更新' },
  },
  vite: {
    resolve: {
      // 文档站直接吃源码，改组件立刻能在文档里看到效果，不用先构建
      alias: [
        { find: '@df-ui/pc/style/components', replacement: abs('../../packages/pc/src/style/components.scss') },
        { find: '@df-ui/pc', replacement: abs('../../packages/pc/src/index.ts') },
        { find: '@df-ui/h5/style/scoped', replacement: abs('../../packages/h5/src/style/scoped.scss') },
        { find: '@df-ui/h5', replacement: abs('../../packages/h5/src/index.ts') },
        { find: '@df-ui/core', replacement: abs('../../packages/core/src/index.ts') },
        { find: '@df-ui/tokens/themes.css', replacement: abs('../../packages/tokens/dist/themes.css') },
        { find: '@df-ui/tokens', replacement: abs('../../packages/tokens/src/index.ts') },
      ],
    },
  },
})
