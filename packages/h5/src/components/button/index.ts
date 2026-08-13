import { withInstall } from '@df-ui/core'
import Button from './src/button.vue'

export const DfButton = withInstall(Button)
export default DfButton

// props 契约来自 @df-ui/core，这里转发一份，使用方从 @df-ui/h5 也能拿到类型
export {
  buttonProps,
  buttonEmits,
  buttonTypes,
  buttonVariants,
  buttonSizes,
  buttonShapes,
  type ButtonProps,
  type ButtonEmits,
  type ButtonType,
  type ButtonVariant,
  type ButtonSize,
  type ButtonShape,
} from '@df-ui/core'
