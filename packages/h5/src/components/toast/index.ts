import { withInstall } from '@df-ui/core'
import Toast from './src/toast.vue'

export const DfToastComponent = withInstall(Toast)
export { DfToast, destroyToast } from './src/service'

export {
  toastProps,
  toastEmits,
  toastTypes,
  toastPositions,
  type ToastProps,
  type ToastType,
  type ToastPosition,
  type ToastOptions,
} from '@df-ui/core'
