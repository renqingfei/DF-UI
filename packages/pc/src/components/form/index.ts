import { withInstall } from '@df-ui/core'
import Form from './src/form.vue'
import FormItem from './src/form-item.vue'

export const DfForm = withInstall(Form)
export const DfFormItem = withInstall(FormItem)

export {
  formProps,
  formEmits,
  formItemProps,
  labelPositions,
  type FormProps,
  type FormEmits,
  type FormItemProps,
  type FormRules,
  type LabelPosition,
} from '@df-ui/core'
