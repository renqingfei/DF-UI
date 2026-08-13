import { withInstall } from '@df-ui/core'
import Popup from './src/popup.vue'

export const DfPopup = withInstall(Popup)

export {
  popupProps,
  popupEmits,
  popupPositions,
  type PopupProps,
  type PopupPosition,
} from '@df-ui/core'
