/**
 * 主题一致性校验。
 *
 * 四套主题必须实现完全相同的令牌 key —— 少一个 key，
 * 该主题下就有组件会失去样式。TypeScript 已经在编译期约束，
 * 这个脚本负责在 CI 里兜底（防止 as any 绕过），并检查值不为空。
 *
 * 用法：pnpm themes:validate
 */
import { themeList, type DfTheme } from '../packages/tokens/src/index'

interface Problem {
  theme: string
  kind: 'missing' | 'extra' | 'empty'
  token: string
}

function collectProblems(baseline: DfTheme, others: DfTheme[]): Problem[] {
  const baseKeys = new Set(Object.keys(baseline.tokens))
  const problems: Problem[] = []

  for (const theme of [baseline, ...others]) {
    const keys = new Set(Object.keys(theme.tokens))

    for (const key of baseKeys) {
      if (!keys.has(key)) problems.push({ theme: theme.key, kind: 'missing', token: key })
    }
    for (const key of keys) {
      if (!baseKeys.has(key)) problems.push({ theme: theme.key, kind: 'extra', token: key })
    }
    for (const [key, value] of Object.entries(theme.tokens)) {
      if (typeof value !== 'string' || value.trim() === '') {
        problems.push({ theme: theme.key, kind: 'empty', token: key })
      }
    }
  }

  return problems
}

const [baseline, ...others] = themeList
const problems = collectProblems(baseline, others)

const KIND_TEXT: Record<Problem['kind'], string> = {
  missing: '缺少令牌',
  extra: '多出基准之外的令牌',
  empty: '令牌值为空',
}

if (problems.length > 0) {
  console.error(`\n主题校验未通过，共 ${problems.length} 个问题（基准：${baseline.key}）：\n`)
  for (const p of problems) {
    console.error(`  [${p.theme}] ${KIND_TEXT[p.kind]}：${p.token}`)
  }
  console.error('')
  process.exit(1)
}

const tokenCount = Object.keys(baseline.tokens).length
console.log(
  `主题校验通过：${themeList.length} 套主题 × ${tokenCount} 个令牌，key 完全一致，无空值。`,
)
for (const t of themeList) {
  console.log(`  · ${t.key.padEnd(6)} ${t.name}（${t.scheme === 'dark' ? '暗色' : '浅色'}）`)
}
