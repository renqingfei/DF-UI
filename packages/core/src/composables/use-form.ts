import {
  computed,
  inject,
  onBeforeUnmount,
  provide,
  ref,
  type ComputedRef,
  type InjectionKey,
} from 'vue'
import {
  rulesHaveRequired,
  validateValue,
  type FormRule,
  type RuleTrigger,
  type ValidateResult,
} from '../validate'
import type { FormItemProps, FormProps } from '../props/form'

/**
 * Form 的三层联动逻辑，三端共用。
 *
 * 结构是两级 provide：
 *   Form      →  提供 model / rules / 全局禁用与尺寸，收集下面所有 FormItem
 *   FormItem  →  提供「我这项失焦了 / 值变了」两个回调，以及当前是否报错
 *   控件      →  失焦或改值时喊一声，由 FormItem 决定要不要校验
 *
 * 控件（Input / Select / Checkbox…）完全不认识校验规则，
 * 它只负责喊，这样加新控件不用改校验代码。
 */

export interface FormFieldContext {
  prop?: string
  validate(trigger: RuleTrigger): Promise<ValidateResult>
  reset(): void
  clear(): void
}

export interface FormContext {
  props: FormProps
  addField(field: FormFieldContext): void
  removeField(field: FormFieldContext): void
}

export interface FormItemContext {
  /** 控件失焦时调用 */
  onBlur(): void
  /** 控件值变化时调用 */
  onChange(): void
  hasError: ComputedRef<boolean>
}

export const formContextKey: InjectionKey<FormContext> = Symbol('df-form')
export const formItemContextKey: InjectionKey<FormItemContext> = Symbol('df-form-item')

/** 深拷贝一份初始值用于 resetFields。Date / File 之类会被拍平，表单场景够用 */
function snapshot<T>(value: T): T {
  return JSON.parse(JSON.stringify(value ?? {})) as T
}

export interface UseFormReturn {
  /** 全量校验，任一项不过就返回 false */
  validate(): Promise<boolean>
  /** 只校验指定字段 */
  validateFields(props: string[]): Promise<boolean>
  /** 恢复到初始值并清掉所有错误 */
  resetFields(): void
  /** 只清错误，不动值 */
  clearValidate(): void
  /** 当前是否有任何一项在报错 */
  hasError: ComputedRef<boolean>
}

export function useFormProvide(
  props: FormProps,
  emit: (event: 'validate', prop: string, valid: boolean, message: string) => void,
): UseFormReturn {
  const fields = ref<FormFieldContext[]>([])
  const errorProps = ref<Set<string>>(new Set())
  const initial = snapshot(props.model)

  function track(prop: string | undefined, result: ValidateResult) {
    if (!prop) return
    if (result.valid) errorProps.value.delete(prop)
    else errorProps.value.add(prop)
    // Set 的增删不会触发依赖，手动换一个新引用
    errorProps.value = new Set(errorProps.value)
    emit('validate', prop, result.valid, result.message)
  }

  provide(formContextKey, {
    props,
    addField(field) {
      fields.value.push(field)
    },
    removeField(field) {
      const i = fields.value.indexOf(field)
      if (i > -1) fields.value.splice(i, 1)
      if (field.prop) {
        errorProps.value.delete(field.prop)
        errorProps.value = new Set(errorProps.value)
      }
    },
  })

  async function runAll(targets: FormFieldContext[]): Promise<boolean> {
    // 并行跑，别串行 —— 有异步校验（查重之类）时串行会慢成累加
    const results = await Promise.all(
      targets.map(async (f) => {
        const result = await f.validate('submit')
        track(f.prop, result)
        return result.valid
      }),
    )
    return results.every(Boolean)
  }

  return {
    validate: () => runAll(fields.value.filter((f) => f.prop)),
    validateFields: (names) =>
      runAll(fields.value.filter((f) => f.prop && names.includes(f.prop))),
    resetFields() {
      const fresh = snapshot(initial)
      for (const key of Object.keys(props.model)) {
        props.model[key] = (fresh as Record<string, unknown>)[key]
      }
      for (const f of fields.value) f.reset()
      errorProps.value = new Set()
    },
    clearValidate() {
      for (const f of fields.value) f.clear()
      errorProps.value = new Set()
    },
    hasError: computed(() => errorProps.value.size > 0),
  }
}

export interface UseFormItemReturn {
  /** 合并后的规则：Form 上按 prop 配的 + FormItem 自己的 */
  rules: ComputedRef<FormRule[]>
  /** 是否显示必填红星 */
  isRequired: ComputedRef<boolean>
  /** 当前错误提示，空字符串表示没错 */
  error: ComputedRef<string>
  showMessage: ComputedRef<boolean>
  labelPosition: ComputedRef<string>
  labelWidth: ComputedRef<string | undefined>
  validate(trigger: RuleTrigger): Promise<ValidateResult>
}

export function useFormItem(props: FormItemProps): UseFormItemReturn {
  const form = inject(formContextKey, null)
  const error = ref('')

  const rules = computed<FormRule[]>(() => {
    const fromForm = (props.prop && form?.props.rules?.[props.prop]) || []
    return [...fromForm, ...(props.rules ?? [])]
  })

  const currentValue = computed(() => (props.prop ? form?.props.model?.[props.prop] : undefined))

  async function validate(trigger: RuleTrigger): Promise<ValidateResult> {
    if (!props.prop || rules.value.length === 0) {
      error.value = ''
      return { valid: true, message: '' }
    }
    const result = await validateValue(currentValue.value, rules.value, trigger)
    error.value = result.message
    return result
  }

  const field: FormFieldContext = {
    prop: props.prop,
    validate,
    reset() {
      error.value = ''
    },
    clear() {
      error.value = ''
    },
  }

  form?.addField(field)
  onBeforeUnmount(() => form?.removeField(field))

  const hasError = computed(() => error.value !== '')

  provide(formItemContextKey, {
    onBlur: () => void validate('blur'),
    onChange: () => void validate('change'),
    hasError,
  })

  return {
    rules,
    isRequired: computed(() => props.required ?? rulesHaveRequired(rules.value)),
    error: computed(() => error.value),
    showMessage: computed(() => props.showMessage ?? form?.props.showMessage ?? true),
    labelPosition: computed(() => form?.props.labelPosition ?? 'top'),
    labelWidth: computed(() => {
      const w = props.labelWidth ?? form?.props.labelWidth
      return w === undefined ? undefined : typeof w === 'number' ? `${w}px` : w
    }),
    validate,
  }
}

export interface UseFormControlReturn {
  /** 控件自己的 disabled 或 Form 的整体 disabled */
  disabled: ComputedRef<boolean>
  /** 控件自己的 size，没设就继承 Form 的 */
  size: ComputedRef<string>
  /** 所在 FormItem 是否在报错，用于给控件描红边 */
  invalid: ComputedRef<boolean>
  /** 失焦时喊一声 */
  notifyBlur(): void
  /** 值变化时喊一声 */
  notifyChange(): void
}

/**
 * 供各种表单控件调用：接上 Form 的整体禁用/尺寸，并在失焦、改值时通知 FormItem。
 * 控件在表单外单独使用时，这些 inject 全为空，行为退化成「只看自己的 props」。
 */
export function useFormControl(props: { disabled?: boolean; size?: string }): UseFormControlReturn {
  const form = inject(formContextKey, null)
  const item = inject(formItemContextKey, null)

  return {
    disabled: computed(() => Boolean(props.disabled || form?.props.disabled)),
    size: computed(() => props.size ?? form?.props.size ?? 'medium'),
    invalid: computed(() => Boolean(item?.hasError.value)),
    notifyBlur: () => item?.onBlur(),
    notifyChange: () => item?.onChange(),
  }
}
