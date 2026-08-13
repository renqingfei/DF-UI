<script lang="ts">
export default { name: 'DfAvatar' }
</script>

<script setup lang="ts">
import { avatarEmits, avatarProps, useAvatar } from '@df-ui/core'

const props = defineProps(avatarProps)
const emit = defineEmits(avatarEmits)

const { b, classes, style, showImage, initials, onError } = useAvatar(props, emit)
</script>

<template>
  <span :class="classes" :style="style">
    <img v-if="showImage" :class="b('img')" :src="src" :alt="alt ?? text" @error="onError" />
    <slot v-else>
      <span :class="b('text')">{{ initials }}</span>
    </slot>
  </span>
</template>
