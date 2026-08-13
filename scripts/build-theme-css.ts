/**
 * 由主题令牌生成 CSS 变量文件。
 *
 * 产物：packages/tokens/dist/themes.css
 * 使用方 import '@df-ui/tokens/themes.css' 即可获得四套主题的全部变量。
 *
 * 用法：pnpm themes:css
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { allThemesCssText, themeList } from '../packages/tokens/src/index'

const here = dirname(fileURLToPath(import.meta.url))
const outFile = resolve(here, '../packages/tokens/dist/themes.css')

const header = `/**
 * DF UI 主题变量 —— 由 scripts/build-theme-css.ts 自动生成，请勿手改。
 * 共 ${themeList.length} 套主题：${themeList.map((t) => `${t.key}(${t.name})`).join(' / ')}
 * 默认主题同时挂在 :root 上，未设置 data-theme 时也有样式。
 */

`

mkdirSync(dirname(outFile), { recursive: true })
writeFileSync(outFile, header + allThemesCssText(), 'utf8')

console.log(`已生成 ${outFile}`)
console.log(`  ${themeList.length} 套主题，每套 ${Object.keys(themeList[0].tokens).length} 个变量`)
