import { computed, ref, type ComputedRef, type Ref } from 'vue'
import { bem } from '../bem'
import { useFormControl } from './use-form'
import type { SelectOption, SelectProps } from '../props/select'
import type { SelectionValue } from '../props/selection'

/**
 * Select 的界面无关逻辑，三端共用。
 *
 * 单选与多选的差别全部收在这里：对外只暴露 `selected`（一个数组）、
 * `displayText`、`pick()`。三端模板不用各自判断 multiple。
 */

export interface UseSelectReturn {
  b: ReturnType<typeof bem>
  classes: ComputedRef<string[]>
  disabled: ComputedRef<boolean>
  /** 面板是否展开 */
  opened: Ref<boolean>
  /** 已选中的值，单选时也是长度 1 的数组，模板统一处理 */
  selected: ComputedRef<SelectionValue[]>
  /** 输入框里显示的文字；没选时为空字符串 */
  displayText: ComputedRef<string>
  /** 是否显示清空按钮 */
  showClear: ComputedRef<boolean>
  isChecked(value: SelectionValue): boolean
  /** 多选到达上限后，未选中的项要禁用 */
  isLocked(value: SelectionValue): boolean
  open(): void
  close(): void
  toggleOpen(): void
  pick(option: SelectOption): void
  clear(): void
}

export interface SelectEmit {
  (event: 'update:modelValue', v: SelectionValue | SelectionValue[]): void
  (event: 'change', v: SelectionValue | SelectionValue[]): void
  (event: 'open'): void
  (event: 'close'): void
  (event: 'clear'): void
}

export function useSelect(props: SelectProps, emit: SelectEmit): UseSelectReturn {
  const b = bem('select')
  const { disabled, size, invalid, notifyChange, notifyBlur } = useFormControl(props)
  const opened = ref(false)

  const selected = computed<SelectionValue[]>(() => {
    const v = props.modelValue
    if (v === undefined || v === null || v === '') return []
    return Array.isArray(v) ? v : [v]
  })

  const labelOf = (value: SelectionValue) =>
    props.options.find((o) => o.value === value)?.label ?? String(value)

  function isChecked(value: SelectionValue) {
    return selected.value.includes(value)
  }

  function commit(next: SelectionValue | SelectionValue[]) {
    emit('update:modelValue', next)
    emit('change', next)
    notifyChange()
  }

  function close() {
    if (!opened.value) return
    opened.value = false
    emit('close')
    // 收起面板等同于「这一项操作完了」，触发一次 blur 时机的校验
    notifyBlur()
  }

  function open() {
    if (disabled.value || opened.value) return
    opened.value = true
    emit('open')
  }

  return {
    b,
    classes: computed(() => [
      b(),
      b.m(size.value),
      b.is('opened', opened.value),
      b.is('disabled', disabled.value),
      b.is('invalid', invalid.value),
      b.is('multiple', props.multiple),
      b.is('empty', selected.value.length === 0),
    ]),
    disabled,
    opened,
    selected,
    displayText: computed(() => selected.value.map(labelOf).join('、')),
    showClear: computed(
      () => Boolean(props.clearable) && !disabled.value && selected.value.length > 0,
    ),
    isChecked,
    isLocked(value) {
      if (!props.multiple || props.max === undefined) return false
      return !isChecked(value) && selected.value.length >= props.max
    },
    open,
    close,
    toggleOpen() {
      if (opened.value) close()
      else open()
    },
    pick(option) {
      if (disabled.value || option.disabled) return

      if (!props.multiple) {
        commit(option.value)
        // 单选选完就收，多选要留着继续点
        close()
        return
      }

      if (isChecked(option.value)) {
        commit(selected.value.filter((v) => v !== option.value))
        return
      }
      if (props.max !== undefined && selected.value.length >= props.max) return
      commit([...selected.value, option.value])
    },
    clear() {
      if (disabled.value) return
      commit(props.multiple ? [] : '')
      emit('clear')
    },
  }
}
