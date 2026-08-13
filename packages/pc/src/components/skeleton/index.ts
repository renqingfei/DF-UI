import { withInstall } from '@df-ui/core'
import Skeleton from './src/skeleton.vue'
import SkeletonItem from './src/skeleton-item.vue'

export const DfSkeleton = withInstall(Skeleton)
export const DfSkeletonItem = withInstall(SkeletonItem)

export {
  skeletonProps,
  skeletonItemProps,
  skeletonTemplates,
  skeletonAnimations,
  type SkeletonProps,
  type SkeletonItemProps,
  type SkeletonTemplate,
  type SkeletonAnimation,
} from '@df-ui/core'
