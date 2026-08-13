import { withInstall } from '@df-ui/core'
import List from './src/list.vue'
import ListItem from './src/list-item.vue'

export const DfList = withInstall(List)
export const DfListItem = withInstall(ListItem)

export { listProps, listItemProps, listItemEmits, type ListProps, type ListItemProps } from '@df-ui/core'
