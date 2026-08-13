import { computed, ref, type ComputedRef, type Ref } from 'vue'
import { bem } from '../bem'
import { useFormControl } from './use-form'
import type { InputType } from '../props/input'

/** Input 与 Textarea 的公共部分，故意写成结构类型，两边都能直接把自己的 props 传进来 */
export interface InputLikeProps {
  modelValue?: string | number
  type?: InputType
  size?: string
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  trim?: boolean
  maxlength?: number
}

export interface UseInputOptions {
  /** BEM 块名，Input 与 Textarea 共用这套逻辑但类名不同 */
  block?: string
}

export interface UseInputReturn {
  b: ReturnType<typeof bem>
  classes: ComputedRef<string[]>
  disabled: ComputedRef<boolean>
  size: ComputedRef<string>
  /** 所在 FormItem 是否在报错 */
  invalid: ComputedRef<boolean>
  /** 当前值转成字符串，供输入框显示 */
  text: ComputedRef<string>
  /** 已输入字符数，用于字数统计 */
  count: ComputedRef<number>
  /** 是否该显示清空按钮 */
  showClear: ComputedRef<boolean>
  /** 密码是否处于明文状态 */
  revealed: Ref<boolean>
  focused: Ref<boolean>
  /** 实际给到原生 input 的 type（密码明文时变 text） */
  nativeType: ComputedRef<string>
  /** 处理原始输入值：按 trim 与 maxlength 规整 */
  normalize(raw: string): string
}

/**
 * Input / Textarea 的界面无关逻辑，三端共用。
 *
 * 输入框的坑几乎都在这几件事上：受控值与显示值的同步、trim 的时机、
 * 字数按什么算、清空按钮什么时候出现、密码明文切换。都在这里一次处理干净，
 * 三端的模板只管把它们接到自己平台的输入元素上。
 */
export function useInput(props: InputLikeProps, options: UseInputOptions = {}): UseInputReturn {
  const b = bem(options.block ?? 'input')
  const { disabled, size, invalid } = useFormControl(props)
  const revealed = ref(false)
  const focused = ref(false)

  const text = computed(() => {
    const v = props.modelValue
    return v === null || v === undefined ? '' : String(v)
  })

  const classes = computed(() => [
    b(),
    b.m(size.value),
    b.is('disabled', disabled.value),
    b.is('readonly', props.readonly),
    b.is('focused', focused.value),
    b.is('invalid', invalid.value),
  ])

  return {
    b,
    classes,
    disabled,
    size,
    invalid,
    text,
    // 用 Array.from 而不是 .length：带 emoji 的内容按码点算才符合用户直觉
    count: computed(() => Array.from(text.value).length),
    showClear: computed(
      () => Boolean(props.clearable) && !disabled.value && !props.readonly && text.value.length > 0,
    ),
    revealed,
    focused,
    nativeType: computed(() => {
      const type = props.type ?? 'text'
      if (type !== 'password') return type
      return revealed.value ? 'text' : 'password'
    }),
    normalize(raw: string) {
      let next = props.trim ? raw.trim() : raw
      if (props.maxlength !== undefined) {
        const chars = Array.from(next)
        if (chars.length > props.maxlength) next = chars.slice(0, props.maxlength).join('')
      }
      return next
    },
  }
}
