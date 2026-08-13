<script lang="ts">
export default { name: 'DfToast' }
</script>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { bem, nextZIndex, toastEmits, toastProps } from '@df-ui/core'

const props = defineProps(toastProps)
const emit = defineEmits(toastEmits)

const b = bem('toast')

const classes = computed(() => [
  b(),
  b.m(props.position),
  b.m(props.type),
  b.is('forbid-click', props.forbidClick),
])

let timer: ReturnType<typeof setTimeout> | undefined

function clear() {
  if (timer) {
    clearTimeout(timer)
    timer = undefined
  }
}

watch(
  () => [props.visible, props.duration, props.message] as const,
  ([visible, duration]) => {
    clear()
    // duration 为 0 表示不自动消失，loading 类提示几乎都要用这个
    if (visible && Number(duration) > 0) {
      timer = setTimeout(() => {
        emit('update:visible', false)
        emit('close')
      }, Number(duration))
    }
  },
  { immediate: true },
)

onBeforeUnmount(clear)

/**
 * 每次显示时领一个新层级：轻提示必须盖在弹窗之上，
 * 否则「弹窗里点保存 → 提示成功」时提示会被弹窗压住。
 *
 * 不能写在 computed 里 —— nextZIndex() 会写它自己依赖的 ref，
 * 在 computed 里调用等于「自己改自己的依赖」，Vue 会死循环。
 */
const zIndex = ref(nextZIndex())

watch(
  () => props.visible,
  (visible) => {
    if (visible) zIndex.value = nextZIndex()
  },
)
</script>

<template>
  <Teleport to="body">
    <Transition name="df-toast">
      <div v-if="visible" :class="classes" :style="{ zIndex }" role="status" aria-live="polite">
        <span v-if="type === 'loading'" :class="b('spinner')" aria-hidden="true" />
        <span v-else-if="type !== 'text'" :class="b('icon')" aria-hidden="true">
          {{ type === 'success' ? '✓' : type === 'error' ? '✕' : '!' }}
        </span>
        <span :class="b('text')">
          <slot>{{ message }}</slot>
        </span>
      </div>
    </Transition>
  </Teleport>
</template>
