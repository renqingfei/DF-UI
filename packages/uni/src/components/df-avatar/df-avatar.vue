<script lang="ts">
export default { name: 'DfAvatar' }
</script>

<script setup lang="ts">
/**
 * uniapp 端头像。图片用小程序的 <image>，
 * mode="aspectFill" 等价于网页的 object-fit: cover。
 */
import { avatarEmits, avatarProps, useAvatar } from '@df-ui/core'

const props = defineProps(avatarProps)
const emit = defineEmits(avatarEmits)

const { b, classes, style, showImage, initials, onError } = useAvatar(props, emit)
</script>

<template>
  <view :class="classes" :style="style">
    <image
      v-if="showImage"
      :class="b('img')"
      :src="src"
      mode="aspectFill"
      @error="onError"
    />
    <slot v-else>
      <text :class="b('text')">{{ initials }}</text>
    </slot>
  </view>
</template>

<style lang="scss">
.df-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: var(--df-color-brand-soft, #edebff);
  color: var(--df-color-brand, #7b6bff);
  font-size: 16px;
  font-weight: 600;
  overflow: hidden;
}

.df-avatar--square {
  border-radius: var(--df-radius-md, 24px);
}

.df-avatar--small {
  width: 32px;
  height: 32px;
  font-size: 13px;
}

.df-avatar--large {
  width: 64px;
  height: 64px;
  font-size: 23px;
}

.df-avatar__img {
  width: 100%;
  height: 100%;
}
</style>
