<script lang="ts">
export default { name: 'DfPopup' }
</script>

<script setup lang="ts">
/**
 * 弹出层：Dialog / ActionSheet / Drawer / 下拉面板的共同底座。
 *
 * 三件事必须做对，否则弹层就是 bug 温床：
 * 1. 层级从 core 的栈里领，不写死 —— 否则「弹窗里再开弹窗」会打架
 * 2. 打开时锁背景滚动，关闭时解锁；组件被卸载时也要解锁，否则整页永久锁死
 * 3. Teleport 到 body —— 否则父元素的 overflow / transform 会把弹层裁掉，
 *    这是最常见的「弹窗显示不全」原因
 */
import { onBeforeUnmount, onMounted } from 'vue'
import { popupEmits, popupProps, useOverlay } from '@df-ui/core'

const props = defineProps(popupProps)
const emit = defineEmits(popupEmits)

const { b, rendered, zIndex, classes, panelStyle, close, onOverlayClick } = useOverlay(props, emit)

function onKeydown(evt: KeyboardEvent) {
  if (evt.key === 'Escape' && props.visible && props.closeOnEsc) close()
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <div v-if="rendered" :class="classes" :style="{ zIndex }">
      <Transition :name="`df-fade`">
        <div v-if="visible && overlay" :class="b('overlay')" @click="onOverlayClick" />
      </Transition>

      <Transition :name="`df-popup-${position}`">
        <div
          v-if="visible"
          :class="b('panel')"
          :style="panelStyle"
          role="dialog"
          aria-modal="true"
        >
          <span
            v-if="closable"
            :class="b('close')"
            role="button"
            aria-label="关闭"
            @click="close"
            >✕</span
          >
          <slot />
        </div>
      </Transition>
    </div>
  </Teleport>
</template>
