<script lang="ts">
export default { name: 'DfListItem' }
</script>

<script setup lang="ts">
/**
 * 列表行：移动端的信息骨干。
 *
 * 行高不低于 52px。这不是审美选择：列表行是手机上点击最频繁的元素，
 * 行矮一点，误触率就上去了。
 */
import { computed } from 'vue'
import { bem, listItemEmits, listItemProps } from '@df-ui/core'

const props = defineProps(listItemProps)
const emit = defineEmits(listItemEmits)

const b = bem('list-item')

const interactive = computed(() => (props.clickable || props.arrow) && !props.disabled)

const classes = computed(() => [
  b(),
  b.is('clickable', interactive.value),
  b.is('disabled', props.disabled),
])

function onClick() {
  if (props.disabled) return
  emit('click')
}
</script>

<template>
  <div :class="classes" @click="onClick">
    <div v-if="$slots.icon" :class="b('icon')">
      <slot name="icon" />
    </div>

    <div :class="b('main')">
      <div :class="b('title')">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="label || $slots.label" :class="b('label')">
        <slot name="label">{{ label }}</slot>
      </div>
    </div>

    <div v-if="value || $slots.value" :class="b('value')">
      <slot name="value">{{ value }}</slot>
    </div>

    <span v-if="arrow" :class="b('arrow')" aria-hidden="true">›</span>
  </div>
</template>
