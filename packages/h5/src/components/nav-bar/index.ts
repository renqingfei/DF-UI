import { withInstall } from '@df-ui/core'
import NavBar from './src/nav-bar.vue'

export const DfNavBar = withInstall(NavBar)

export { navBarProps, navBarEmits, type NavBarProps } from '@df-ui/core'
