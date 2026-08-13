import { withInstall } from '@df-ui/core'
import Table from './src/table.vue'

export const DfTable = withInstall(Table)

export {
  tableProps,
  tableEmits,
  type TableProps,
  type TableColumn,
  type TableAlign,
  type SortOrder,
} from '@df-ui/core'
