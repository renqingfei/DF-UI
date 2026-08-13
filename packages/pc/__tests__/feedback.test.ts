import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { getZIndex, resetZIndex, scrollLockCount, setScrollLockAdapter } from '@df-ui/core'
import DfPopup from '../src/components/popup/src/popup.vue'
import DfDialog from '../src/components/dialog/src/dialog.vue'
import DfLoading from '../src/components/loading/src/loading.vue'
import DfToast from '../src/components/toast/src/toast.vue'
import { installWebScrollLock } from '../src/scroll-lock'

/** Popup 用 Teleport 到 body，所以断言要在 document 上找，不是在 wrapper 里 */
function panel() {
  return document.querySelector('.df-popup__panel')
}

function overlay() {
  return document.querySelector<HTMLElement>('.df-popup__overlay')
}

describe('Popup', () => {
  beforeEach(() => {
    resetZIndex()
    installWebScrollLock()
  })

  afterEach(() => {
    document.body.innerHTML = ''
    document.body.style.overflow = ''
  })

  it('visible 为 false 时不渲染面板', () => {
    mount(DfPopup, { props: { visible: false } })
    expect(panel()).toBeNull()
  })

  it('打开后 Teleport 到 body，并带 dialog 语义', async () => {
    const wrapper = mount(DfPopup, {
      props: { visible: true },
      slots: { default: '<p class="content">内容</p>' },
    })
    await nextTick()

    expect(panel()).not.toBeNull()
    expect(panel()?.getAttribute('aria-modal')).toBe('true')
    expect(document.querySelector('.content')).not.toBeNull()
    wrapper.unmount()
  })

  it('点遮罩关闭；关掉 closeOnOverlay 后只抛事件不关闭', async () => {
    const wrapper = mount(DfPopup, { props: { visible: true } })
    await nextTick()
    overlay()?.click()
    expect(wrapper.emitted('update:visible')?.[0]).toEqual([false])
    expect(wrapper.emitted('overlayClick')).toHaveLength(1)
    wrapper.unmount()

    const locked = mount(DfPopup, { props: { visible: true, closeOnOverlay: false } })
    await nextTick()
    overlay()?.click()
    expect(locked.emitted('update:visible')).toBeUndefined()
    expect(locked.emitted('overlayClick')).toHaveLength(1)
    locked.unmount()
  })

  it('按 Esc 关闭，closeOnEsc 为 false 时不关', async () => {
    const wrapper = mount(DfPopup, { props: { visible: true } })
    await nextTick()
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(wrapper.emitted('update:visible')?.[0]).toEqual([false])
    wrapper.unmount()

    const noEsc = mount(DfPopup, { props: { visible: true, closeOnEsc: false } })
    await nextTick()
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(noEsc.emitted('update:visible')).toBeUndefined()
    noEsc.unmount()
  })

  it('后开的弹层层级更高，弹窗里再开弹窗不会打架', async () => {
    const first = mount(DfPopup, { props: { visible: true } })
    await nextTick()
    const firstZ = getZIndex()

    const second = mount(DfPopup, { props: { visible: true } })
    await nextTick()
    expect(getZIndex()).toBeGreaterThan(firstZ)

    first.unmount()
    second.unmount()
  })

  it('打开锁滚动、关闭解锁；两层叠开时只有全关了才解锁', async () => {
    const a = mount(DfPopup, { props: { visible: true } })
    await nextTick()
    expect(document.body.style.overflow).toBe('hidden')
    expect(scrollLockCount.value).toBe(1)

    const b = mount(DfPopup, { props: { visible: true } })
    await nextTick()
    expect(scrollLockCount.value).toBe(2)

    await b.setProps({ visible: false })
    expect(scrollLockCount.value, '还有一层开着，不能解锁').toBe(1)
    expect(document.body.style.overflow).toBe('hidden')

    await a.setProps({ visible: false })
    expect(scrollLockCount.value).toBe(0)
    expect(document.body.style.overflow).toBe('')

    a.unmount()
    b.unmount()
  })

  it('组件被卸载时若还开着，必须把滚动解开', async () => {
    const wrapper = mount(DfPopup, { props: { visible: true } })
    await nextTick()
    expect(scrollLockCount.value).toBe(1)

    wrapper.unmount()
    expect(scrollLockCount.value, '否则整页会永久锁死').toBe(0)
    expect(document.body.style.overflow).toBe('')
  })

  it('五个方向各有修饰类，侧边抽屉给默认宽度', async () => {
    for (const position of ['center', 'bottom', 'top', 'left', 'right'] as const) {
      const wrapper = mount(DfPopup, { props: { visible: true, position } })
      await nextTick()
      expect(document.querySelector(`.df-popup--${position}`)).not.toBeNull()
      if (position === 'left' || position === 'right') {
        expect(panel()?.getAttribute('style')).toContain('320px')
      }
      wrapper.unmount()
      document.body.innerHTML = ''
    }
  })
})

describe('Dialog', () => {
  beforeEach(() => {
    resetZIndex()
    installWebScrollLock()
  })

  afterEach(() => {
    document.body.innerHTML = ''
    document.body.style.overflow = ''
  })

  it('渲染标题、正文与两个按钮', async () => {
    const wrapper = mount(DfDialog, {
      props: { visible: true, title: '删除确认', content: '删了就找不回来了' },
    })
    await nextTick()

    expect(document.querySelector('.df-dialog__title')?.textContent).toBe('删除确认')
    expect(document.querySelector('.df-dialog__body')?.textContent?.trim()).toBe(
      '删了就找不回来了',
    )
    expect(document.querySelectorAll('.df-dialog__footer .df-button')).toHaveLength(2)
    wrapper.unmount()
  })

  it('showCancel 为 false 时只剩一个按钮', async () => {
    const wrapper = mount(DfDialog, { props: { visible: true, showCancel: false } })
    await nextTick()
    expect(document.querySelectorAll('.df-dialog__footer .df-button')).toHaveLength(1)
    wrapper.unmount()
  })

  it('点确定抛 confirm 并关闭，点取消抛 cancel 并关闭', async () => {
    const wrapper = mount(DfDialog, { props: { visible: true } })
    await nextTick()

    const buttons = document.querySelectorAll<HTMLElement>('.df-dialog__footer .df-button')
    buttons[1].click()
    await nextTick()
    expect(wrapper.emitted('confirm')).toHaveLength(1)
    const visibleEvents = wrapper.emitted('update:visible') ?? []
    expect(visibleEvents[visibleEvents.length - 1]).toEqual([false])

    buttons[0].click()
    await nextTick()
    expect(wrapper.emitted('cancel')).toHaveLength(1)
    wrapper.unmount()
  })

  it('beforeConfirm 返回 false 就不关窗', async () => {
    const beforeConfirm = vi.fn(() => false)
    const wrapper = mount(DfDialog, { props: { visible: true, beforeConfirm } })
    await nextTick()

    document.querySelectorAll<HTMLElement>('.df-dialog__footer .df-button')[1].click()
    await nextTick()
    await nextTick()

    expect(beforeConfirm).toHaveBeenCalled()
    expect(wrapper.emitted('confirm')).toBeUndefined()
    expect(wrapper.emitted('update:visible')).toBeUndefined()
    wrapper.unmount()
  })

  it('beforeConfirm 异步期间确定按钮转圈、取消按钮禁用', async () => {
    let release: (v: boolean) => void = () => {}
    const beforeConfirm = () =>
      new Promise<boolean>((r) => {
        release = r
      })

    const wrapper = mount(DfDialog, { props: { visible: true, beforeConfirm } })
    await nextTick()

    const buttons = document.querySelectorAll<HTMLElement>('.df-dialog__footer .df-button')
    buttons[1].click()
    await nextTick()

    expect(buttons[1].classList.contains('is-loading'), '确定按钮应在转圈').toBe(true)
    expect(buttons[0].classList.contains('is-disabled'), '取消按钮应禁用').toBe(true)

    release(true)
    await nextTick()
    await nextTick()
    expect(wrapper.emitted('confirm')).toHaveLength(1)
    wrapper.unmount()
  })

  it('beforeConfirm 抛异常等同于不关，且不卡在转圈', async () => {
    const wrapper = mount(DfDialog, {
      props: { visible: true, beforeConfirm: () => Promise.reject(new Error('500')) },
    })
    await nextTick()

    document.querySelectorAll<HTMLElement>('.df-dialog__footer .df-button')[1].click()
    await nextTick()
    await nextTick()

    expect(wrapper.emitted('update:visible')).toBeUndefined()
    const confirmBtn = document.querySelectorAll('.df-dialog__footer .df-button')[1]
    expect(confirmBtn.classList.contains('is-loading')).toBe(false)
    wrapper.unmount()
  })
})

describe('Loading', () => {
  it('loading 为 false 时什么都不渲染', () => {
    expect(mount(DfLoading, { props: { loading: false } }).find('.df-loading').exists()).toBe(false)
  })

  it('文字、尺寸、遮罩各有对应类名', () => {
    const wrapper = mount(DfLoading, { props: { text: '加载中', size: 'large', overlay: true } })
    expect(wrapper.find('.df-loading__text').text()).toBe('加载中')
    expect(wrapper.classes()).toContain('df-loading--large')
    expect(wrapper.classes()).toContain('is-overlay')
  })

  it('size 传数字时写进组件级变量', () => {
    const wrapper = mount(DfLoading, { props: { size: 50 } })
    expect(wrapper.attributes('style')).toContain('--df-loading-size: 50px')
  })

  it('fullscreen 同时算作遮罩', () => {
    const wrapper = mount(DfLoading, { props: { fullscreen: true } })
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['is-fullscreen', 'is-overlay']))
  })
})

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    resetZIndex()
  })

  afterEach(() => {
    vi.useRealTimers()
    document.body.innerHTML = ''
  })

  it('到时间自动关闭', async () => {
    const wrapper = mount(DfToast, { props: { visible: true, message: '保存成功', duration: 1500 } })
    await nextTick()
    expect(document.querySelector('.df-toast')?.textContent?.trim()).toBe('保存成功')

    vi.advanceTimersByTime(1500)
    expect(wrapper.emitted('update:visible')?.[0]).toEqual([false])
    expect(wrapper.emitted('close')).toHaveLength(1)
    wrapper.unmount()
  })

  it('duration 为 0 时不自动关闭', async () => {
    const wrapper = mount(DfToast, { props: { visible: true, message: '上传中', duration: 0 } })
    await nextTick()
    vi.advanceTimersByTime(10000)
    expect(wrapper.emitted('update:visible')).toBeUndefined()
    wrapper.unmount()
  })

  it('四种类型各有图标或转圈', async () => {
    for (const type of ['success', 'error', 'warning'] as const) {
      const wrapper = mount(DfToast, { props: { visible: true, message: 'x', type } })
      await nextTick()
      expect(document.querySelector('.df-toast__icon')).not.toBeNull()
      wrapper.unmount()
      document.body.innerHTML = ''
    }

    const loading = mount(DfToast, { props: { visible: true, message: 'x', type: 'loading' } })
    await nextTick()
    expect(document.querySelector('.df-toast__spinner')).not.toBeNull()
    loading.unmount()
  })

  it('forbidClick 时才拦点击', async () => {
    const wrapper = mount(DfToast, { props: { visible: true, message: 'x', forbidClick: true } })
    await nextTick()
    expect(document.querySelector('.df-toast')?.classList.contains('is-forbid-click')).toBe(true)
    wrapper.unmount()
  })
})

describe('滚动锁定适配层', () => {
  it('可以换成自定义实现，小程序端就是靠这个接口', () => {
    const custom = { lock: vi.fn(), unlock: vi.fn() }
    setScrollLockAdapter(custom)

    const wrapper = mount(DfPopup, { props: { visible: true } })
    expect(custom.lock).toHaveBeenCalledTimes(1)

    wrapper.unmount()
    expect(custom.unlock).toHaveBeenCalledTimes(1)

    installWebScrollLock()
  })
})
