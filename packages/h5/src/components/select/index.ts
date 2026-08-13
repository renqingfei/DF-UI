import { withInstall } from '@df-ui/core'
import Select from './src/select.vue'

export const DfSelect = withInstall(Select)

export { selectProps, selectEmits, type SelectProps, type SelectOption } from '@df-ui/core'
