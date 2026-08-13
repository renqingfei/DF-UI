<script lang="ts">
export default { name: 'DfButton' }
</script>

<script setup lang="ts">
/**
 * H5 端 Button。
 *
 * 与 PC 端共用同一份 props 契约和同一个 useButton 逻辑，
 * 差异只在「触屏体验」这一层：
 * 1. 尺寸走 m-control-h-*，最小 44px，手指点得准
 * 2. 不做 hover 态（触屏上 hover 会黏住，点完还留着高亮）
 * 3. 按下反馈更明显，并关掉系统默认的点击高亮块
 * 4. 阻止双击缩放引起的 300ms 延迟感（touch-action）
 */
import { buttonEmits, buttonProps, useButton } from '@df-ui/core'

const props = defineProps(buttonProps)
const emit = defineEmits(buttonEmits)

const { b, classes, isDisabled } = useButton(props)

function onClick(evt: MouseEvent) {
  if (isDisabled.value) {
    evt.preventDefault()
    evt.stopPropagation()
    return
  }
  emit('click', evt)
}
</script>

<template>
  <button
    :class="classes"
    :type="nativeType"
    :disabled="isDisabled"
    :aria-busy="loading || undefined"
    @click="onClick"
  >
    <span v-if="loading" :class="b('spinner')" aria-hidden="true" />
    <span v-else-if="$slots.icon" :class="b('icon')">
      <slot name="icon" />
    </span>
    <span v-if="$slots.default" :class="b('content')">
      <slot />
    </span>
  </button>
</template>
