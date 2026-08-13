import { withInstall } from '@df-ui/core'
import Grid from './src/grid.vue'

export const DfGrid = withInstall(Grid)

export { gridProps, gridEmits, type GridProps, type GridItem } from '@df-ui/core'
