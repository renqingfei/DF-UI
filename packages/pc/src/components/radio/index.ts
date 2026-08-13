import { withInstall } from '@df-ui/core'
import Radio from './src/radio.vue'
import RadioGroup from './src/radio-group.vue'

export const DfRadio = withInstall(Radio)
export const DfRadioGroup = withInstall(RadioGroup)

export {
  radioProps,
  radioEmits,
  radioGroupProps,
  radioGroupEmits,
  radioVariants,
  type RadioProps,
  type RadioGroupProps,
  type RadioVariant,
} from '@df-ui/core'
