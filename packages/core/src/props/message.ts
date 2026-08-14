import type { ExtractPropTypes, PropType } from 'vue'

/**
 * Message 消息条的 API 契约。
 *
 * 与 Toast 的分工：Toast 一次只有一条、居中、盖住操作（用于「刚才那个动作的结果」）；
 * Message 从顶部滑入、可以堆叠、不挡操作（用于「系统想告诉你一件事」）。
 * 两者共用同一层浮层基建，但不是同一个东西，不要互相替代。
 */

export const messageTypes = ['info', 'success', 'warning', 'error'] as const
export type MessageType = (typeof messageTypes)[number]

export interface MessageOptions {
  content: string
  type?: MessageType
  /** 毫秒。传 0 表示不自动消失 */
  duration?: number
  /** 显示右侧关闭叉 */
  closable?: boolean
}

export const messageProps = {
  content: String,
  type: {
    type: String as PropType<MessageType>,
    default: 'info',
    validator: (v: string) => messageTypes.includes(v as MessageType),
  },
  duration: {
    type: Number,
    default: 3000,
  },
  closable: Boolean,
  showIcon: {
    type: Boolean,
    default: true,
  },
} as const

export type MessageProps = ExtractPropTypes<typeof messageProps>

export const messageEmits = {
  close: () => true,
}
