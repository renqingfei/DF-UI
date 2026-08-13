import { withInstall } from '@df-ui/core'
import TabBar from './src/tabbar.vue'

export const DfTabBar = withInstall(TabBar)

export { tabBarProps, tabBarEmits, type TabBarProps, type TabBarItem } from '@df-ui/core'
