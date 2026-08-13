<script lang="ts">
export default { name: 'DfCard' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { bem, cardProps, toCssLength } from '@df-ui/core'

const props = defineProps(cardProps)

const b = bem('card')

const classes = computed(() => [
  b(),
  b.m(`shadow-${props.shadow}`),
  b.is('divided', props.divided),
])

const bodyStyle = computed(() => {
  const padding = toCssLength(props.padding)
  return padding === undefined ? undefined : { padding }
})
</script>

<template>
  <div :class="classes">
    <div v-if="title || $slots.header || $slots.extra" :class="b('header')">
      <div :class="b('title')">
        <slot name="header">{{ title }}</slot>
      </div>
      <div v-if="$slots.extra" :class="b('extra')">
        <slot name="extra" />
      </div>
    </div>

    <div :class="b('body')" :style="bodyStyle">
      <slot />
    </div>

    <div v-if="$slots.footer" :class="b('footer')">
      <slot name="footer" />
    </div>
  </div>
</template>
