/**
 * 表单校验引擎。
 *
 * 三端共用，因此这里不许出现任何 DOM 操作 —— 输入是「值 + 规则」，
 * 输出是「过 / 不过 + 一句人话」。谁去展示那句人话，是各端界面层的事。
 *
 * 设计取舍：不引 async-validator 之类的库。表单校验的九成需求就是
 * 必填 / 长度 / 正则 / 自定义函数这几样，自己写一份约两百行，
 * 换来的是三端一致、体积可控、报错信息能写成中文人话。
 */

export type RuleTrigger = 'blur' | 'change' | 'submit'

/** 内置校验类型 */
export type RuleType = 'string' | 'number' | 'array' | 'email' | 'phone' | 'url' | 'integer'

export interface FormRule {
  /** 必填。空字符串、null、undefined、空数组都算空 */
  required?: boolean
  /** 值类型或格式 */
  type?: RuleType
  /** 字符串最短长度 / 数字最小值 / 数组最少项数 */
  min?: number
  /** 字符串最长长度 / 数字最大值 / 数组最多项数 */
  max?: number
  /** 字符串长度必须恰好等于 */
  len?: number
  /** 正则 */
  pattern?: RegExp
  /**
   * 自定义校验。返回 true / undefined 表示通过；
   * 返回字符串表示不通过，字符串就是错误提示；返回 false 用 message 兜底。
   * 支持 async，用于查重之类要请求服务端的场景。
   */
  validator?: (value: unknown) => boolean | string | void | Promise<boolean | string | void>
  /** 不通过时的提示。不写就用内置的中文提示 */
  message?: string
  /** 什么时候触发，默认 blur + change 都触发 */
  trigger?: RuleTrigger | RuleTrigger[]
}

export interface ValidateResult {
  valid: boolean
  /** 第一条错误提示；valid 为 true 时为空字符串 */
  message: string
}

const EMAIL_RE = /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/
// 中国大陆手机号：13-19 开头，共 11 位
const PHONE_RE = /^1[3-9]\d{9}$/
const URL_RE = /^(https?:\/\/)[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*)?$/

function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim() === ''
  if (Array.isArray(value)) return value.length === 0
  return false
}

/** 取长度：字符串按字符数，数组按项数，数字按数值本身 */
function sizeOf(value: unknown): number | null {
  if (typeof value === 'string') return value.length
  if (Array.isArray(value)) return value.length
  if (typeof value === 'number') return value
  return null
}

function sizeUnit(value: unknown): string {
  if (typeof value === 'number') return ''
  if (Array.isArray(value)) return '项'
  return '个字'
}

function checkType(value: unknown, type: RuleType): string {
  switch (type) {
    case 'number':
      return typeof value === 'number' && !Number.isNaN(value) ? '' : '请输入数字'
    case 'integer':
      return typeof value === 'number' && Number.isInteger(value) ? '' : '请输入整数'
    case 'array':
      return Array.isArray(value) ? '' : '请选择'
    case 'string':
      return typeof value === 'string' ? '' : '请输入文本'
    case 'email':
      return EMAIL_RE.test(String(value)) ? '' : '邮箱格式不正确'
    case 'phone':
      return PHONE_RE.test(String(value)) ? '' : '手机号格式不正确'
    case 'url':
      return URL_RE.test(String(value)) ? '' : '网址格式不正确，需要以 http:// 或 https:// 开头'
    default:
      return ''
  }
}

/** 规则是否应该在这次触发时机下执行 */
export function ruleMatchesTrigger(rule: FormRule, trigger: RuleTrigger): boolean {
  // submit 时无条件全跑，否则「没碰过的字段」永远校验不到
  if (trigger === 'submit') return true
  if (!rule.trigger) return true
  const triggers = Array.isArray(rule.trigger) ? rule.trigger : [rule.trigger]
  return triggers.includes(trigger)
}

/** 校验单条规则 */
export async function validateRule(value: unknown, rule: FormRule): Promise<ValidateResult> {
  const fail = (fallback: string): ValidateResult => ({
    valid: false,
    message: rule.message || fallback,
  })

  if (rule.required && isEmpty(value)) {
    return fail('此项必填')
  }

  // 非必填且为空：后面的格式校验一律跳过，否则「选填的邮箱」不填也会报错
  if (isEmpty(value)) {
    return { valid: true, message: '' }
  }

  if (rule.type) {
    const typeError = checkType(value, rule.type)
    if (typeError) return fail(typeError)
  }

  const size = sizeOf(value)
  const unit = sizeUnit(value)

  if (rule.len !== undefined && size !== null && size !== rule.len) {
    return fail(`请输入 ${rule.len} ${unit || '个字'}`)
  }

  if (rule.min !== undefined && size !== null && size < rule.min) {
    return fail(typeof value === 'number' ? `不能小于 ${rule.min}` : `至少 ${rule.min} ${unit}`)
  }

  if (rule.max !== undefined && size !== null && size > rule.max) {
    return fail(typeof value === 'number' ? `不能大于 ${rule.max}` : `最多 ${rule.max} ${unit}`)
  }

  if (rule.pattern && !rule.pattern.test(String(value))) {
    return fail('格式不正确')
  }

  if (rule.validator) {
    const result = await rule.validator(value)
    if (typeof result === 'string' && result) return { valid: false, message: result }
    if (result === false) return fail('校验未通过')
  }

  return { valid: true, message: '' }
}

/**
 * 用一组规则校验一个值，返回第一条错误。
 *
 * 只报第一条：一次给用户糊五条错误提示，他一条也读不进去。
 */
export async function validateValue(
  value: unknown,
  rules: FormRule[] = [],
  trigger: RuleTrigger = 'submit',
): Promise<ValidateResult> {
  for (const rule of rules) {
    if (!ruleMatchesTrigger(rule, trigger)) continue
    const result = await validateRule(value, rule)
    if (!result.valid) return result
  }
  return { valid: true, message: '' }
}

/** 一组规则里是否含必填，用于给标签自动挂星号 */
export function rulesHaveRequired(rules: FormRule[] = []): boolean {
  return rules.some((r) => r.required === true)
}
