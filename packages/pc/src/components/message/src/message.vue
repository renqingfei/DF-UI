<script lang="ts">
export default { name: 'DfMessage' }
</script>

<script setup lang="ts">
/**
 * 单条消息条。一般不直接用，走 DfMessage.success('...') 这种函数式调用。
 * 单独用的场景是「页面里常驻一条提示」，这时把 duration 设成 0。
 */
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { bem, messageEmits, messageProps } from '@df-ui/core'

const props = defineProps(messageProps)
const emit = defineEmits(messageEmits)

const b = bem('message')

const classes = computed(() => [b(), b.m(props.type)])

const icon = computed(
  () =>
    ({ info: 'i', success: '✓', warning: '!', error: '✕' })[props.type] ?? 'i',
)

let timer: ReturnType<typeof setTimeout> | undefined

onMounted(() => {
  if (props.duration > 0) {
    timer = setTimeout(() => emit('close'), props.duration)
  }
})

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
})
</script>

<template>
  <div :class="classes" role="alert">
    <span v-if="showIcon" :class="b('icon')" aria-hidden="true">{{ icon }}</span>
    <span :class="b('content')">
      <slot>{{ content }}</slot>
    </span>
    <span
      v-if="closable"
      :class="b('close')"
      role="button"
      aria-label="关闭"
      @click="emit('close')"
      >✕</span
    >
  </div>
</template>
