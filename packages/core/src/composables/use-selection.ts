import { computed, inject, provide, ref, type ComputedRef, type InjectionKey, type Ref } from 'vue'
import { bem } from '../bem'
import { useFormControl } from './use-form'
import type {
  CheckboxGroupProps,
  CheckboxProps,
  RadioGroupProps,
  RadioProps,
  SelectionValue,
  SwitchProps,
} from '../props/selection'

/**
 * Checkbox / Radio / Switch 的界面无关逻辑，三端共用。
 *
 * 三个组件的共同难点都不在外观，而在「值从哪来」：
 * 单独用时值在自己的 modelValue 上，放进 Group 里时值由 Group 统一管。
 * 这里把两种情况统一成一个 checked + 一个 toggle，模板不用做分支。
 */

export interface CheckboxGroupContext {
  props: CheckboxGroupProps
  toggle(value: SelectionValue): void
  has(value: SelectionValue): boolean
  /** 达到 max 上限后，未选中的项要自动禁用 */
  isLocked(value: SelectionValue): boolean
}

export interface RadioGroupContext {
  props: RadioGroupProps
  pick(value: SelectionValue): void
  current: ComputedRef<SelectionValue | undefined>
}

export const checkboxGroupKey: InjectionKey<CheckboxGroupContext> = Symbol('df-checkbox-group')
export const radioGroupKey: InjectionKey<RadioGroupContext> = Symbol('df-radio-group')

/**
 * defineEmits 生成的类型是「多个单事件签名的交叉」而不是联合参数的函数，
 * 这里照同样的形状写，各端组件才能把 emit 直接传进来。
 */
export interface SelectionEmit {
  (event: 'update:modelValue', v: SelectionValue): void
  (event: 'change', v: SelectionValue): void
}

export interface SelectionListEmit {
  (event: 'update:modelValue', v: SelectionValue[]): void
  (event: 'change', v: SelectionValue[]): void
}

export function useCheckboxGroupProvide(
  props: CheckboxGroupProps,
  emit: SelectionListEmit,
) {
  const { notifyChange } = useFormControl(props)

  function has(value: SelectionValue) {
    return props.modelValue.includes(value)
  }

  provide(checkboxGroupKey, {
    props,
    has,
    isLocked(value) {
      const count = props.modelValue.length
      if (has(value)) return props.min !== undefined && count <= props.min
      return props.max !== undefined && count >= props.max
    },
    toggle(value) {
      const next = has(value)
        ? props.modelValue.filter((v) => v !== value)
        : [...props.modelValue, value]
      emit('update:modelValue', next)
      emit('change', next)
      notifyChange()
    },
  })

  const b = bem('checkbox-group')
  const { disabled, size } = useFormControl(props)

  return {
    classes: computed(() => [b(), b.m(size.value), b.is('disabled', disabled.value)]),
  }
}

export interface UseCheckboxReturn {
  b: ReturnType<typeof bem>
  classes: ComputedRef<string[]>
  checked: ComputedRef<boolean>
  disabled: ComputedRef<boolean>
  toggle(): void
}

export function useCheckbox(
  props: CheckboxProps,
  emit: SelectionEmit,
): UseCheckboxReturn {
  const b = bem('checkbox')
  const group = inject(checkboxGroupKey, null)
  const { disabled: ownDisabled, size, notifyChange } = useFormControl(props)

  const inGroup = computed(() => group !== null && props.value !== undefined)

  const checked = computed(() => {
    if (inGroup.value) return group!.has(props.value!)
    return props.modelValue === props.checkedValue
  })

  const disabled = computed(() => {
    if (ownDisabled.value) return true
    if (!inGroup.value) return false
    return Boolean(group!.props.disabled) || group!.isLocked(props.value!)
  })

  function toggle() {
    if (disabled.value) return
    if (inGroup.value) {
      group!.toggle(props.value!)
      return
    }
    const next = checked.value ? props.uncheckedValue : props.checkedValue
    emit('update:modelValue', next)
    emit('change', next)
    notifyChange()
  }

  return {
    b,
    classes: computed(() => [
      b(),
      b.m(inGroup.value ? (group!.props.size ?? size.value) : size.value),
      b.is('checked', checked.value),
      b.is('indeterminate', props.indeterminate && !checked.value),
      b.is('disabled', disabled.value),
    ]),
    checked,
    disabled,
    toggle,
  }
}

export function useRadioGroupProvide(
  props: RadioGroupProps,
  emit: SelectionEmit,
) {
  const { notifyChange, disabled, size } = useFormControl(props)
  const b = bem('radio-group')

  provide(radioGroupKey, {
    props,
    current: computed(() => props.modelValue),
    pick(value) {
      // 单选点已选中的项不做事，否则会白抛一次 change
      if (props.modelValue === value) return
      emit('update:modelValue', value)
      emit('change', value)
      notifyChange()
    },
  })

  return {
    classes: computed(() => [
      b(),
      b.m(props.variant),
      b.m(size.value),
      b.is('disabled', disabled.value),
    ]),
  }
}

export interface UseRadioReturn {
  b: ReturnType<typeof bem>
  classes: ComputedRef<string[]>
  checked: ComputedRef<boolean>
  disabled: ComputedRef<boolean>
  pick(): void
}

export function useRadio(
  props: RadioProps,
  emit: SelectionEmit,
): UseRadioReturn {
  const b = bem('radio')
  const group = inject(radioGroupKey, null)
  const { disabled: ownDisabled, size, notifyChange } = useFormControl(props)

  const inGroup = computed(() => group !== null && props.value !== undefined)

  const checked = computed(() =>
    inGroup.value ? group!.current.value === props.value : props.modelValue === props.value,
  )

  const disabled = computed(
    () => ownDisabled.value || (inGroup.value && Boolean(group!.props.disabled)),
  )

  function pick() {
    if (disabled.value || props.value === undefined) return
    if (inGroup.value) {
      group!.pick(props.value)
      return
    }
    if (props.modelValue === props.value) return
    emit('update:modelValue', props.value)
    emit('change', props.value)
    notifyChange()
  }

  return {
    b,
    classes: computed(() => [
      b(),
      b.m(inGroup.value ? (group!.props.variant ?? 'default') : 'default'),
      b.m(inGroup.value ? (group!.props.size ?? size.value) : size.value),
      b.is('checked', checked.value),
      b.is('disabled', disabled.value),
    ]),
    checked,
    disabled,
    pick,
  }
}

export interface UseSwitchReturn {
  b: ReturnType<typeof bem>
  classes: ComputedRef<string[]>
  checked: ComputedRef<boolean>
  disabled: ComputedRef<boolean>
  /** beforeChange 期间也算 loading */
  pending: Ref<boolean>
  toggle(): Promise<void>
}

export function useSwitch(
  props: SwitchProps,
  emit: SelectionEmit,
): UseSwitchReturn {
  const b = bem('switch')
  const { disabled: ownDisabled, size, notifyChange } = useFormControl(props)
  const pending = ref(false)

  const checked = computed(() => props.modelValue === props.checkedValue)
  const busy = computed(() => props.loading || pending.value)
  const disabled = computed(() => ownDisabled.value || busy.value)

  async function toggle() {
    if (disabled.value) return

    if (props.beforeChange) {
      pending.value = true
      try {
        // 钩子抛异常等同于「别切」——请求失败时开关不该动
        const allowed = await props.beforeChange()
        if (allowed === false) return
      } catch {
        return
      } finally {
        pending.value = false
      }
    }

    const next = checked.value ? props.uncheckedValue : props.checkedValue
    emit('update:modelValue', next)
    emit('change', next)
    notifyChange()
  }

  return {
    b,
    classes: computed(() => [
      b(),
      b.m(size.value),
      b.is('checked', checked.value),
      b.is('loading', busy.value),
      b.is('disabled', disabled.value),
    ]),
    checked,
    disabled,
    pending,
    toggle,
  }
}
