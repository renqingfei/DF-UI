<script lang="ts">
export default { name: 'DfSelect' }
</script>

<script setup lang="ts">
/**
 * PC 端选择器：点一下往下展开面板。
 *
 * 面板用「相对触发器绝对定位」，不测量元素位置 ——
 * 测量方案要处理滚动、窗口缩放、父容器变化，还得在小程序端走异步接口；
 * 绝对定位一行 CSS 就够，代价是会被祖先的 overflow: hidden 裁掉。
 * 这个代价写进文档：需要在滚动容器里用下拉时，改用 Popup 版本。
 */
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { selectEmits, selectProps, useSelect } from '@df-ui/core'

const props = defineProps(selectProps)
const emit = defineEmits(selectEmits)

const {
  b,
  classes,
  disabled,
  opened,
  displayText,
  showClear,
  isChecked,
  isLocked,
  close,
  toggleOpen,
  pick,
  clear,
} = useSelect(props, emit)

const root = ref<HTMLElement | null>(null)

/** 点面板外面就收起 —— 下拉最基本的期望行为 */
function onDocumentClick(evt: MouseEvent) {
  if (!opened.value) return
  if (root.value && !root.value.contains(evt.target as Node)) close()
}

function onKeydown(evt: KeyboardEvent) {
  if (evt.key === 'Escape' && opened.value) close()
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div ref="root" :class="classes">
    <div
      :class="b('trigger')"
      role="combobox"
      :aria-expanded="opened"
      :aria-disabled="disabled || undefined"
      :tabindex="disabled ? undefined : 0"
      @click="toggleOpen"
      @keydown.enter.prevent="toggleOpen"
      @keydown.space.prevent="toggleOpen"
    >
      <span :class="b('text')">{{ displayText || placeholder }}</span>
      <span
        v-if="showClear"
        :class="b('clear')"
        role="button"
        aria-label="清空"
        @click.stop="clear"
        >✕</span
      >
      <span :class="b('arrow')" aria-hidden="true">▾</span>
    </div>

    <Transition name="df-select-drop">
      <div v-if="opened" :class="b('panel')" role="listbox">
        <slot>
          <div
            v-for="option in options"
            :key="String(option.value)"
            :class="[
              b('option'),
              isChecked(option.value) ? 'is-checked' : '',
              option.disabled || isLocked(option.value) ? 'is-disabled' : '',
            ]"
            role="option"
            :aria-selected="isChecked(option.value)"
            @click="pick(option)"
          >
            <span :class="b('option-text')">{{ option.label }}</span>
            <span v-if="isChecked(option.value)" :class="b('check')" aria-hidden="true">✓</span>
          </div>
          <div v-if="options.length === 0" :class="b('empty')">暂无选项</div>
        </slot>
      </div>
    </Transition>
  </div>
</template>
