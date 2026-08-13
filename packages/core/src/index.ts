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
