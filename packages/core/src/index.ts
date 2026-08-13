export {
  setTheme,
  setThemeAdapter,
  getCurrentThemeKey,
  currentTheme,
  useTheme,
  type ThemeAdapter,
} from './theme'

export { withInstall, type SFCWithInstall } from './install'
export { DF_PREFIX, bem } from './bem'

// —— 三端共享的组件 API 契约 ——
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
} from './props/button'

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
} from './props/input'

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
} from './props/form'

export {
  checkboxProps,
  checkboxEmits,
  checkboxGroupProps,
  checkboxGroupEmits,
  radioProps,
  radioEmits,
  radioGroupProps,
  radioGroupEmits,
  radioVariants,
  switchProps,
  switchEmits,
  type CheckboxProps,
  type CheckboxGroupProps,
  type RadioProps,
  type RadioGroupProps,
  type RadioVariant,
  type SwitchProps,
  type SelectionValue,
} from './props/selection'

export {
  skeletonProps,
  skeletonItemProps,
  skeletonTemplates,
  skeletonAnimations,
  cardProps,
  cardShadows,
  tagProps,
  tagEmits,
  tagTypes,
  tagVariants,
  badgeProps,
  avatarProps,
  avatarEmits,
  emptyProps,
  emptyImages,
  dividerProps,
  spaceProps,
  displaySizes,
  type SkeletonProps,
  type SkeletonItemProps,
  type SkeletonTemplate,
  type SkeletonAnimation,
  type CardProps,
  type CardShadow,
  type TagProps,
  type TagType,
  type TagVariant,
  type BadgeProps,
  type AvatarProps,
  type EmptyProps,
  type EmptyImage,
  type DividerProps,
  type SpaceProps,
  type DisplaySize,
} from './props/display'

export {
  popupProps,
  popupEmits,
  popupPositions,
  dialogProps,
  dialogEmits,
  toastProps,
  toastEmits,
  toastTypes,
  toastPositions,
  loadingProps,
  type PopupProps,
  type PopupPosition,
  type DialogProps,
  type ToastProps,
  type ToastType,
  type ToastPosition,
  type ToastOptions,
  type LoadingProps,
} from './props/feedback'

// —— 浮层基建：层级栈与滚动锁定 ——
export {
  nextZIndex,
  getZIndex,
  resetZIndex,
  lockScroll,
  unlockScroll,
  setScrollLockAdapter,
  scrollLockCount,
  type ScrollLockAdapter,
} from './overlay'

// —— 表单校验引擎 ——
export {
  validateValue,
  validateRule,
  rulesHaveRequired,
  ruleMatchesTrigger,
  type FormRule,
  type RuleTrigger,
  type RuleType,
  type ValidateResult,
} from './validate'

// —— 三端共享的界面无关逻辑 ——
export { useButton, type UseButtonReturn } from './composables/use-button'
export { useInput, type UseInputReturn } from './composables/use-input'
export {
  useOverlay,
  useAsyncConfirm,
  type UseOverlayReturn,
  type UseAsyncConfirmReturn,
} from './composables/use-overlay'
export {
  useSpace,
  useBadge,
  useAvatar,
  useSkeletonItem,
  toCssLength,
  avatarPresetPx,
  type UseBadgeReturn,
  type UseAvatarReturn,
} from './composables/use-display'
export {
  useCheckbox,
  useCheckboxGroupProvide,
  useRadio,
  useRadioGroupProvide,
  useSwitch,
  checkboxGroupKey,
  radioGroupKey,
  type UseCheckboxReturn,
  type UseRadioReturn,
  type UseSwitchReturn,
  type CheckboxGroupContext,
  type RadioGroupContext,
} from './composables/use-selection'
export {
  useFormProvide,
  useFormItem,
  useFormControl,
  formContextKey,
  formItemContextKey,
  type FormContext,
  type FormItemContext,
  type FormFieldContext,
  type UseFormReturn,
  type UseFormItemReturn,
  type UseFormControlReturn,
} from './composables/use-form'
