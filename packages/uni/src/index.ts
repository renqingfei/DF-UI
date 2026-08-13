import type { App } from 'vue'
import { withInstall, setTheme } from '@df-ui/core'
import { DEFAULT_THEME, type DfThemeKey } from '@df-ui/tokens'
import { DfButton } from './components/df-button'
import { DfConfigProvider } from './components/df-config-provider'
import Input from './components/df-input/df-input.vue'
import Textarea from './components/df-textarea/df-textarea.vue'
import Form from './components/df-form/df-form.vue'
import FormItem from './components/df-form-item/df-form-item.vue'
import Checkbox from './components/df-checkbox/df-checkbox.vue'
import CheckboxGroup from './components/df-checkbox/df-checkbox-group.vue'
import Radio from './components/df-radio/df-radio.vue'
import RadioGroup from './components/df-radio/df-radio-group.vue'
import Switch from './components/df-switch/df-switch.vue'
import Skeleton from './components/df-skeleton/df-skeleton.vue'
import SkeletonItem from './components/df-skeleton/df-skeleton-item.vue'
import Card from './components/df-card/df-card.vue'
import Tag from './components/df-tag/df-tag.vue'
import Badge from './components/df-badge/df-badge.vue'
import Avatar from './components/df-avatar/df-avatar.vue'
import Empty from './components/df-empty/df-empty.vue'
import Divider from './components/df-divider/df-divider.vue'
import { installUniThemeAdapter } from './theme'

export const DfInput = withInstall(Input)
export const DfTextarea = withInstall(Textarea)
export const DfForm = withInstall(Form)
export const DfFormItem = withInstall(FormItem)
export const DfCheckbox = withInstall(Checkbox)
export const DfCheckboxGroup = withInstall(CheckboxGroup)
export const DfRadio = withInstall(Radio)
export const DfRadioGroup = withInstall(RadioGroup)
export const DfSwitch = withInstall(Switch)
export const DfSkeleton = withInstall(Skeleton)
export const DfSkeletonItem = withInstall(SkeletonItem)
export const DfCard = withInstall(Card)
export const DfTag = withInstall(Tag)
export const DfBadge = withInstall(Badge)
export const DfAvatar = withInstall(Avatar)
export const DfEmpty = withInstall(Empty)
export const DfDivider = withInstall(Divider)

export * from './components/df-button'
export { DfButton, DfConfigProvider }
export {
  installUniThemeAdapter,
  uniThemeAdapter,
  uniActiveTheme,
  uniThemeStyle,
  uniThemeClass,
} from './theme'

/**
 * 小程序端不提供 Space 间距组件。
 *
 * Space 依赖 flex gap，而 gap 在部分小程序环境里支持不全（尤其安卓端旧基础库），
 * 用 margin 模拟又要求组件能遍历插槽子节点 —— 小程序拿不到。
 * 小程序端请用 Grid 宫格，或直接给元素写 margin。
 */
const components = [
  DfButton,
  DfConfigProvider,
  DfInput,
  DfTextarea,
  DfForm,
  DfFormItem,
  DfCheckbox,
  DfCheckboxGroup,
  DfRadio,
  DfRadioGroup,
  DfSwitch,
  DfSkeleton,
  DfSkeletonItem,
  DfCard,
  DfTag,
  DfBadge,
  DfAvatar,
  DfEmpty,
  DfDivider,
]

export interface DfUIOptions {
  /** 初始主题，默认 clay（黏土软糖） */
  theme?: DfThemeKey | string
}

/**
 * 小程序端安装。
 *
 * 与 pc / h5 的区别只有一点：先把主题适配器换成不依赖 document 的版本。
 * 页面里仍需用 <df-config-provider> 包一层，CSS 变量才有落脚的地方。
 *
 * 如果走 uni_modules + easycom，组件会被自动注册，不需要调 install，
 * 但仍要在 App.vue 里调一次 installUniThemeAdapter()。
 */
export function install(app: App, options: DfUIOptions = {}): void {
  installUniThemeAdapter()
  setTheme(options.theme ?? DEFAULT_THEME)
  for (const c of components) {
    app.use(c)
  }
}

export default { install }
