import { withInstall } from '@df-ui/core'
import Row from './src/row.vue'
import Col from './src/col.vue'

export const DfRow = withInstall(Row)
export const DfCol = withInstall(Col)

export { rowProps, colProps, type RowProps, type ColProps } from '@df-ui/core'
