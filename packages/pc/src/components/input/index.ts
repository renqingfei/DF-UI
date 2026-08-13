import { withInstall } from '@df-ui/core'
import Input from './src/input.vue'
import Textarea from './src/textarea.vue'

export const DfInput = withInstall(Input)
export const DfTextarea = withInstall(Textarea)

export {
  inputProps,
  inputEmits,
  inputSizes,
  inputTypes,
  textareaProps,
  textareaEmits,
  type InputProps,
  type InputEmits,
  type InputSize,
  type InputType,
  type TextareaProps,
  type TextareaEmits,
} from '@df-ui/core'
