import { withInstall } from '@df-ui/core'
import Checkbox from './src/checkbox.vue'
import CheckboxGroup from './src/checkbox-group.vue'

export const DfCheckbox = withInstall(Checkbox)
export const DfCheckboxGroup = withInstall(CheckboxGroup)

export {
  checkboxProps,
  checkboxEmits,
  checkboxGroupProps,
  checkboxGroupEmits,
  type CheckboxProps,
  type CheckboxGroupProps,
} from '@df-ui/core'
