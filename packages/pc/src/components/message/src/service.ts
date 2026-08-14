import { createApp, h, ref, TransitionGroup, type App, type Ref } from 'vue'
import { nextZIndex, type MessageOptions, type MessageType } from '@df-ui/core'
import MessageComponent from './message.vue'

/**
 * Message 的函数式调用：`Message.success('保存成功')`。
 *
 * 与 Toast 的区别在这里体现得最清楚：Toast 全局只留一条，后一条顶掉前一条；
 * Message **可以堆叠**，多条依次往下排。所以这里维护的是一个数组，不是单个状态。
 */

interface MessageItem extends MessageOptions {
  id: number
}

let app: App | null = null
let list: Ref<MessageItem[]> | null = null
let seed = 0

function ensureMounted(): Ref<MessageItem[]> | null {
  if (typeof document === 'undefined') return null
  if (list) return list

  list = ref<MessageItem[]>([])

  const host = document.createElement('div')
  host.className = 'df-message-host'
  host.style.zIndex = String(nextZIndex())
  document.body.appendChild(host)

  app = createApp({
    setup() {
      return () =>
        h(
          TransitionGroup,
          { name: 'df-message', tag: 'div', class: 'df-message-list' },
          () =>
            list!.value.map((item) =>
              h(MessageComponent, {
                key: item.id,
                content: item.content,
                type: item.type ?? 'info',
                duration: item.duration ?? 3000,
                closable: item.closable ?? false,
                onClose: () => close(item.id),
              }),
            ),
        )
    },
  })
  app.mount(host)

  return list
}

function show(options: MessageOptions | string) {
  const l = ensureMounted()
  if (!l) return -1

  const next = typeof options === 'string' ? { content: options } : options
  const id = ++seed
  l.value = [...l.value, { ...next, id }]
  return id
}

function close(id: number) {
  if (!list) return
  list.value = list.value.filter((item) => item.id !== id)
}

function closeAll() {
  if (list) list.value = []
}

function make(type: MessageType) {
  return (content: string, duration?: number) => show({ content, type, duration })
}

export const DfMessage = {
  show,
  close,
  closeAll,
  info: make('info'),
  success: make('success'),
  warning: make('warning'),
  error: make('error'),
}

/** 测试用：卸载全局实例 */
export function destroyMessage() {
  app?.unmount()
  app = null
  list = null
  document.querySelectorAll('.df-message-host').forEach((el) => el.remove())
}
