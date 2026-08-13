import type { ExtractPropTypes, PropType } from 'vue'

/**
 * 数据展示类组件的 API 契约，三端共用。
 *
 * 这一批组件几乎没有交互逻辑，值在于「把同一种视觉语言固定下来」：
 * 卡片的圆角与投影、标签的六种语义色、空状态的插画位置，
 * 都由令牌决定，业务代码不必再各写一遍。
 */

export const displaySizes = ['small', 'medium', 'large'] as const
export type DisplaySize = (typeof displaySizes)[number]

const sizeProp = {
  type: String as PropType<DisplaySize>,
  default: 'medium',
  validator: (v: string) => displaySizes.includes(v as DisplaySize),
} as const

// —— Skeleton 骨架屏 ——

export const skeletonTemplates = ['custom', 'text', 'list', 'card', 'article', 'profile'] as const
export type SkeletonTemplate = (typeof skeletonTemplates)[number]

export const skeletonAnimations = ['shimmer', 'pulse', 'none'] as const
export type SkeletonAnimation = (typeof skeletonAnimations)[number]

export const skeletonProps = {
  /** true 显示骨架，false 显示默认插槽里的真内容 */
  loading: {
    type: Boolean,
    default: true,
  },
  /** 预设版式。custom 表示只用默认插槽里自己拼的形状 */
  template: {
    type: String as PropType<SkeletonTemplate>,
    default: 'text',
    validator: (v: string) => skeletonTemplates.includes(v as SkeletonTemplate),
  },
  /** 文本行数，text / article / list 版式生效 */
  rows: {
    type: Number,
    default: 3,
  },
  /** 是否带头像占位 */
  avatar: Boolean,
  /** 是否带标题占位 */
  title: {
    type: Boolean,
    default: true,
  },
  animation: {
    type: String as PropType<SkeletonAnimation>,
    default: 'shimmer',
    validator: (v: string) => skeletonAnimations.includes(v as SkeletonAnimation),
  },
  /** 占位块用圆角还是直角 */
  round: {
    type: Boolean,
    default: true,
  },
  /** list 版式重复几条 */
  count: {
    type: Number,
    default: 1,
  },
} as const

export type SkeletonProps = ExtractPropTypes<typeof skeletonProps>

/** 单个骨架占位块，用于自己拼版式 */
export const skeletonItemProps = {
  variant: {
    type: String as PropType<'text' | 'circle' | 'rect' | 'image'>,
    default: 'text',
  },
  width: [String, Number] as PropType<string | number>,
  height: [String, Number] as PropType<string | number>,
} as const

export type SkeletonItemProps = ExtractPropTypes<typeof skeletonItemProps>

// —— Card 卡片 ——

export const cardShadows = ['always', 'hover', 'never'] as const
export type CardShadow = (typeof cardShadows)[number]

export const cardProps = {
  title: String,
  /** 投影策略。hover 只在鼠标悬停时浮起，移动端等同于 never */
  shadow: {
    type: String as PropType<CardShadow>,
    default: 'always',
    validator: (v: string) => cardShadows.includes(v as CardShadow),
  },
  /** 内容区内边距，传 0 可做整块图片卡 */
  padding: [String, Number] as PropType<string | number>,
  /** 头部与内容之间是否画分隔线 */
  divided: {
    type: Boolean,
    default: true,
  },
} as const

export type CardProps = ExtractPropTypes<typeof cardProps>

// —— Tag 标签 ——

export const tagTypes = ['default', 'brand', 'success', 'warning', 'danger', 'info'] as const
export type TagType = (typeof tagTypes)[number]

export const tagVariants = ['soft', 'solid', 'outline'] as const
export type TagVariant = (typeof tagVariants)[number]

export const tagProps = {
  type: {
    type: String as PropType<TagType>,
    default: 'default',
    validator: (v: string) => tagTypes.includes(v as TagType),
  },
  variant: {
    type: String as PropType<TagVariant>,
    default: 'soft',
    validator: (v: string) => tagVariants.includes(v as TagVariant),
  },
  size: sizeProp,
  /** 显示关闭叉 */
  closable: Boolean,
  round: Boolean,
} as const

export type TagProps = ExtractPropTypes<typeof tagProps>

export const tagEmits = {
  close: () => true,
}

// —— Badge 徽标 ——

export const badgeProps = {
  /** 显示的数字或文字 */
  value: [String, Number] as PropType<string | number>,
  /** 超过 max 显示成 max+ */
  max: Number,
  /** 只显示一个小红点，不显示数字 */
  dot: Boolean,
  /** value 为 0 时是否还显示 */
  showZero: Boolean,
  type: {
    type: String as PropType<TagType>,
    default: 'danger',
    validator: (v: string) => tagTypes.includes(v as TagType),
  },
} as const

export type BadgeProps = ExtractPropTypes<typeof badgeProps>

// —— Avatar 头像 ——

export const avatarProps = {
  src: String,
  /** 预设档位或具体像素值 */
  size: {
    type: [String, Number] as PropType<DisplaySize | number>,
    default: 'medium',
  },
  shape: {
    type: String as PropType<'circle' | 'square'>,
    default: 'circle',
  },
  /** 图片加载失败或没给 src 时显示的文字，一般是姓名首字 */
  text: String,
  alt: String,
} as const

export type AvatarProps = ExtractPropTypes<typeof avatarProps>

export const avatarEmits = {
  /** 图片加载失败，已自动退回文字占位 */
  error: () => true,
}

// —— Empty 空状态 ——

export const emptyImages = ['box', 'search', 'network', 'none'] as const
export type EmptyImage = (typeof emptyImages)[number]

export const emptyProps = {
  /** 一句人话，别只写「暂无数据」 */
  description: {
    type: String,
    default: '暂无数据',
  },
  image: {
    type: String as PropType<EmptyImage>,
    default: 'box',
    validator: (v: string) => emptyImages.includes(v as EmptyImage),
  },
  size: sizeProp,
} as const

export type EmptyProps = ExtractPropTypes<typeof emptyProps>

// —— Divider 分割线 ——

export const dividerProps = {
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal',
  },
  /** 带文字时文字的位置 */
  align: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'center',
  },
  dashed: Boolean,
} as const

export type DividerProps = ExtractPropTypes<typeof dividerProps>

// —— Space 间距 ——

export const spaceProps = {
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal',
  },
  /** 预设档位或具体像素值 */
  size: {
    type: [String, Number] as PropType<DisplaySize | number>,
    default: 'medium',
  },
  align: {
    type: String as PropType<'start' | 'center' | 'end' | 'baseline'>,
    default: 'center',
  },
  /** 横向排列时超出是否换行 */
  wrap: {
    type: Boolean,
    default: true,
  },
  /** 撑满一行并把子项均分 */
  block: Boolean,
} as const

export type SpaceProps = ExtractPropTypes<typeof spaceProps>
