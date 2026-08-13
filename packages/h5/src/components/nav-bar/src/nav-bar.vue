<script lang="ts">
export default { name: 'DfNavBar' }
</script>

<script setup lang="ts">
/**
 * 顶部标题栏。
 *
 * 标题居中、返回箭头在左、操作在右 —— 这是移动端二十年不变的版式，
 * 不要发明新的。返回箭头的可点区域撑到 44px，比看起来的箭头大得多。
 */
import { computed } from 'vue'
import { bem, navBarEmits, navBarProps } from '@df-ui/core'

const props = defineProps(navBarProps)
const emit = defineEmits(navBarEmits)

const b = bem('nav-bar')

const classes = computed(() => [
  b(),
  b.is('fixed', props.fixed),
  b.is('safe-area', props.safeArea),
  b.is('border', props.border),
])
</script>

<template>
  <div :class="classes">
    <div :class="b('left')">
      <slot name="left">
        <span v-if="showBack" :class="b('back')" role="button" aria-label="返回" @click="emit('back')">
          <span :class="b('back-icon')" aria-hidden="true">‹</span>
          <span v-if="backText" :class="b('back-text')">{{ backText }}</span>
        </span>
      </slot>
    </div>

    <div :class="b('title')">
      <slot name="title">{{ title }}</slot>
    </div>

    <div :class="b('right')">
      <slot name="right" />
    </div>
  </div>
</template>
