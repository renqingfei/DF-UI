import { describe, it, expect, vi } from 'vitest'
import { validateRule, validateValue, rulesHaveRequired, ruleMatchesTrigger } from '../src/validate'

describe('校验引擎 · 必填', () => {
  it('空字符串、纯空格、null、undefined、空数组都算空', async () => {
    for (const value of ['', '   ', null, undefined, []]) {
      const r = await validateRule(value, { required: true })
      expect(r.valid, `${JSON.stringify(value)} 应该判为空`).toBe(false)
      expect(r.message).toBe('此项必填')
    }
  })

  it('数字 0 和 false 不算空', async () => {
    expect((await validateRule(0, { required: true })).valid).toBe(true)
    expect((await validateRule(false, { required: true })).valid).toBe(true)
  })

  it('自定义 message 覆盖内置提示', async () => {
    const r = await validateRule('', { required: true, message: '请填写收货人' })
    expect(r.message).toBe('请填写收货人')
  })
})

describe('校验引擎 · 选填字段为空时跳过格式校验', () => {
  it('不填邮箱不报错，填错才报错', async () => {
    expect((await validateRule('', { type: 'email' })).valid).toBe(true)
    expect((await validateRule('abc', { type: 'email' })).valid).toBe(false)
    expect((await validateRule('a@b.com', { type: 'email' })).valid).toBe(true)
  })
})

describe('校验引擎 · 格式', () => {
  it('手机号只认 1 开头的 11 位', async () => {
    expect((await validateRule('13800138000', { type: 'phone' })).valid).toBe(true)
    expect((await validateRule('12345678901', { type: 'phone' })).valid).toBe(false)
    expect((await validateRule('1380013800', { type: 'phone' })).valid).toBe(false)
    expect((await validateRule('138 0013 8000', { type: 'phone' })).valid).toBe(false)
  })

  it('网址必须带协议', async () => {
    expect((await validateRule('https://a.com', { type: 'url' })).valid).toBe(true)
    expect((await validateRule('a.com', { type: 'url' })).valid).toBe(false)
  })

  it('整数与数字分开判', async () => {
    expect((await validateRule(1.5, { type: 'number' })).valid).toBe(true)
    expect((await validateRule(1.5, { type: 'integer' })).valid).toBe(false)
    expect((await validateRule('3', { type: 'number' })).valid).toBe(false)
  })

  it('正则不通过时给出默认提示', async () => {
    const r = await validateRule('abc', { pattern: /^\d+$/ })
    expect(r.valid).toBe(false)
    expect(r.message).toBe('格式不正确')
  })
})

describe('校验引擎 · 长度与范围', () => {
  it('字符串按字数、数字按数值、数组按项数', async () => {
    expect((await validateRule('ab', { min: 3 })).message).toBe('至少 3 个字')
    expect((await validateRule(2, { min: 3 })).message).toBe('不能小于 3')
    expect((await validateRule([1], { min: 2 })).message).toBe('至少 2 项')
    expect((await validateRule('abcd', { max: 3 })).message).toBe('最多 3 个字')
  })

  it('len 要求长度恰好相等', async () => {
    expect((await validateRule('1234', { len: 4 })).valid).toBe(true)
    expect((await validateRule('123', { len: 4 })).valid).toBe(false)
  })
})

describe('校验引擎 · 自定义与异步', () => {
  it('validator 返回字符串就当错误提示', async () => {
    const r = await validateRule('admin', {
      validator: (v) => (v === 'admin' ? '这个用户名被占用了' : true),
    })
    expect(r.valid).toBe(false)
    expect(r.message).toBe('这个用户名被占用了')
  })

  it('validator 返回 false 用 message 兜底', async () => {
    const r = await validateRule('x', { validator: () => false })
    expect(r.message).toBe('校验未通过')
  })

  it('支持 async validator', async () => {
    const check = vi.fn(async (v: unknown) => (v === 'taken' ? '已被注册' : true))
    expect((await validateRule('free', { validator: check })).valid).toBe(true)
    expect((await validateRule('taken', { validator: check })).message).toBe('已被注册')
    expect(check).toHaveBeenCalledTimes(2)
  })
})

describe('校验引擎 · 多条规则与触发时机', () => {
  it('只返回第一条错误，不把一堆提示糊给用户', async () => {
    const r = await validateValue('', [
      { required: true, message: '先填手机号' },
      { type: 'phone', message: '手机号不对' },
    ])
    expect(r.message).toBe('先填手机号')
  })

  it('blur 规则在 change 时不跑，但 submit 时一律跑', async () => {
    const rule = { required: true, trigger: 'blur' as const }
    expect(ruleMatchesTrigger(rule, 'blur')).toBe(true)
    expect(ruleMatchesTrigger(rule, 'change')).toBe(false)
    expect(ruleMatchesTrigger(rule, 'submit')).toBe(true)

    expect((await validateValue('', [rule], 'change')).valid).toBe(true)
    expect((await validateValue('', [rule], 'submit')).valid).toBe(false)
  })

  it('没写 trigger 的规则任何时机都跑', async () => {
    expect(ruleMatchesTrigger({ required: true }, 'change')).toBe(true)
  })

  it('rulesHaveRequired 用于给标签挂星号', () => {
    expect(rulesHaveRequired([{ max: 3 }])).toBe(false)
    expect(rulesHaveRequired([{ max: 3 }, { required: true }])).toBe(true)
  })
})
