import { withInstall } from '@df-ui/core'
import Dialog from './src/dialog.vue'

export const DfDialog = withInstall(Dialog)

export { dialogProps, dialogEmits, type DialogProps } from '@df-ui/core'
