export const DF_PREFIX = 'df'

/**
 * 生成 BEM 类名工具。
 *
 * const b = bem('button')
 * b()            → 'df-button'
 * b('icon')      → 'df-button__icon'
 * b('', 'round') → 'df-button--round'
 * b.is('active') → 'is-active'
 */
export function bem(block: string) {
  const base = `${DF_PREFIX}-${block}`

  const fn = (element = '', modifier = ''): string => {
    let cls = base
    if (element) cls += `__${element}`
    if (modifier) cls += `--${modifier}`
    return cls
  }

  fn.is = (state: string, condition: boolean | undefined = true) =>
    condition ? `is-${state}` : ''

  fn.m = (modifier: string) => `${base}--${modifier}`

  return fn
}
