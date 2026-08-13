import type { App, Plugin } from 'vue'

export type SFCWithInstall<T> = T & Plugin

/**
 * 给组件挂上 install，使其既能全局注册，也能按需引入。
 * 组件名取自 component.name，因此每个组件必须显式声明 name。
 */
export function withInstall<T extends { name?: string }>(component: T): SFCWithInstall<T> {
  const target = component as SFCWithInstall<T>
  target.install = (app: App) => {
    const name = component.name
    if (!name) {
      throw new Error('[df-ui] 组件缺少 name，无法注册。请在组件中显式声明 name。')
    }
    app.component(name, target as never)
  }
  return target
}
