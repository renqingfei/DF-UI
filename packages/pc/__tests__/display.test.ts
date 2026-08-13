import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DfSkeleton from '../src/components/skeleton/src/skeleton.vue'
import DfCard from '../src/components/card/src/card.vue'
import DfTag from '../src/components/tag/src/tag.vue'
import DfBadge from '../src/components/badge/src/badge.vue'
import DfAvatar from '../src/components/avatar/src/avatar.vue'
import DfEmpty from '../src/components/empty/src/empty.vue'
import DfDivider from '../src/components/divider/src/divider.vue'
import DfSpace from '../src/components/space/src/space.vue'

describe('Skeleton', () => {
  it('loading 为 false 时显示真内容，不再有占位块', () => {
    const wrapper = mount(DfSkeleton, {
      props: { loading: false },
      slots: { default: '<p class="real">真数据</p>' },
    })
    expect(wrapper.find('.real').exists()).toBe(true)
    expect(wrapper.find('.df-skeleton-item').exists()).toBe(false)
  })

  it('默认版式按 rows 出行，末行收窄模仿真段落', () => {
    const wrapper = mount(DfSkeleton, { props: { rows: 3, title: false } })
    const items = wrapper.findAll('.df-skeleton-item')
    expect(items).toHaveLength(3)
    expect(items[2].attributes('style')).toContain('60%')
    expect(items[0].attributes('style')).toContain('100%')
  })

  it('只有一行时不收窄，否则孤零零一条短线很怪', () => {
    const wrapper = mount(DfSkeleton, { props: { rows: 1, title: false } })
    expect(wrapper.find('.df-skeleton-item').attributes('style')).toContain('100%')
  })

  it('list 版式按 count 重复，带头像时多一个圆形占位', () => {
    const wrapper = mount(DfSkeleton, {
      props: { template: 'list', count: 3, avatar: true },
    })
    expect(wrapper.findAll('.df-skeleton__row')).toHaveLength(3)
    expect(wrapper.findAll('.df-skeleton-item--circle')).toHaveLength(3)
  })

  it('三种动画对应三个修饰类', () => {
    expect(mount(DfSkeleton).classes()).toContain('df-skeleton--anim-shimmer')
    expect(mount(DfSkeleton, { props: { animation: 'pulse' } }).classes()).toContain(
      'df-skeleton--anim-pulse',
    )
    expect(mount(DfSkeleton, { props: { animation: 'none' } }).classes()).toContain(
      'df-skeleton--anim-none',
    )
  })

  it('custom 版式只渲染自己拼的形状', () => {
    const wrapper = mount(DfSkeleton, {
      props: { template: 'custom' },
      slots: { template: '<span class="mine" />' },
    })
    expect(wrapper.find('.mine').exists()).toBe(true)
    expect(wrapper.find('.df-skeleton-item').exists()).toBe(false)
  })

  it('标记 aria-busy，读屏软件知道内容还在加载', () => {
    expect(mount(DfSkeleton).attributes('aria-busy')).toBe('true')
  })
})

describe('Card', () => {
  it('给了 title 才渲染头部', () => {
    expect(mount(DfCard).find('.df-card__header').exists()).toBe(false)
    expect(mount(DfCard, { props: { title: '订单' } }).find('.df-card__title').text()).toBe('订单')
  })

  it('padding 传数字自动补 px', () => {
    const wrapper = mount(DfCard, { props: { padding: 0 } })
    expect(wrapper.find('.df-card__body').attributes('style')).toContain('padding: 0px')
  })

  it('footer 插槽给了才渲染', () => {
    const wrapper = mount(DfCard, { slots: { footer: '底部' } })
    expect(wrapper.find('.df-card__footer').text()).toBe('底部')
  })
})

describe('Tag', () => {
  it('closable 才有关闭叉，点击抛 close', async () => {
    expect(mount(DfTag).find('.df-tag__close').exists()).toBe(false)

    const wrapper = mount(DfTag, { props: { closable: true }, slots: { default: '标签' } })
    await wrapper.find('.df-tag__close').trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)
  })
})

describe('Badge', () => {
  it('超过 max 显示成 max+', () => {
    const wrapper = mount(DfBadge, { props: { value: 128, max: 99 } })
    expect(wrapper.find('.df-badge').text()).toBe('99+')
  })

  it('数字 0 默认不显示，未读 0 条不该挂红圈', () => {
    expect(mount(DfBadge, { props: { value: 0 } }).find('.df-badge').exists()).toBe(false)
    expect(mount(DfBadge, { props: { value: 0, showZero: true } }).find('.df-badge').text()).toBe(
      '0',
    )
  })

  it('dot 模式不显示数字', () => {
    const wrapper = mount(DfBadge, { props: { value: 5, dot: true } })
    expect(wrapper.find('.df-badge').text()).toBe('')
    expect(wrapper.find('.df-badge').classes()).toContain('is-dot')
  })

  it('文字型 value 原样显示', () => {
    expect(mount(DfBadge, { props: { value: 'NEW' } }).find('.df-badge').text()).toBe('NEW')
  })
})

describe('Avatar', () => {
  it('有 src 显示图片，加载失败自动退回文字', async () => {
    const wrapper = mount(DfAvatar, { props: { src: '/broken.png', text: '张三丰' } })
    expect(wrapper.find('img').exists()).toBe(true)

    await wrapper.find('img').trigger('error')
    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.find('.df-avatar__text').text()).toBe('三丰')
    expect(wrapper.emitted('error')).toHaveLength(1)
  })

  it('中文取后两字，英文取前两个字母大写', () => {
    expect(mount(DfAvatar, { props: { text: '欧阳锋' } }).text()).toBe('阳锋')
    expect(mount(DfAvatar, { props: { text: 'alice' } }).text()).toBe('AL')
  })

  it('size 传数字时字号跟着换算，大头像里的字不会小得可笑', () => {
    const wrapper = mount(DfAvatar, { props: { size: 100, text: '甲' } })
    const style = wrapper.attributes('style')
    expect(style).toContain('width: 100px')
    expect(style).toContain('font-size: 42px')
  })
})

describe('Empty', () => {
  it('默认有插画和一句提示', () => {
    const wrapper = mount(DfEmpty)
    expect(wrapper.find('.df-empty__art').exists()).toBe(true)
    expect(wrapper.find('.df-empty__desc').text()).toBe('暂无数据')
  })

  it('image 为 none 时不画插画', () => {
    expect(mount(DfEmpty, { props: { image: 'none' } }).find('.df-empty__art').exists()).toBe(false)
  })

  it('默认插槽当作操作区', () => {
    const wrapper = mount(DfEmpty, { slots: { default: '<button>去添加</button>' } })
    expect(wrapper.find('.df-empty__action').text()).toBe('去添加')
  })
})

describe('Divider', () => {
  it('有插槽才是带文字的分割线', () => {
    expect(mount(DfDivider).classes()).not.toContain('is-with-text')

    const wrapper = mount(DfDivider, { slots: { default: '或' } })
    expect(wrapper.classes()).toContain('is-with-text')
    expect(wrapper.find('.df-divider__text').text()).toBe('或')
  })

  it('竖向分割线不接受文字', () => {
    const wrapper = mount(DfDivider, {
      props: { direction: 'vertical' },
      slots: { default: '或' },
    })
    expect(wrapper.find('.df-divider__text').exists()).toBe(false)
  })
})

describe('Space', () => {
  it('预设档位换算成 gap', () => {
    expect(mount(DfSpace).attributes('style')).toContain('gap: 12px')
    expect(mount(DfSpace, { props: { size: 'small' } }).attributes('style')).toContain('gap: 8px')
    expect(mount(DfSpace, { props: { size: 'large' } }).attributes('style')).toContain('gap: 18px')
  })

  it('传数字时原样用', () => {
    expect(mount(DfSpace, { props: { size: 30 } }).attributes('style')).toContain('gap: 30px')
  })

  it('竖向排列时不换行', () => {
    const wrapper = mount(DfSpace, { props: { direction: 'vertical' } })
    expect(wrapper.classes()).toContain('df-space--vertical')
    expect(wrapper.classes()).not.toContain('is-wrap')
  })
})
