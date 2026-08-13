<script setup lang="ts">
defineProps<{
  /** 手机框高度，默认 auto 由内容撑开 */
  height?: string
}>()
</script>

<template>
  <!--
    H5 组件的类名和 PC 端刻意保持一致，同页共存必须有一方让路：
    .df-h5-scope 就是那个让路的作用域，样式来自 @df-ui/h5/style/scoped。
  -->
  <div class="phone">
    <div class="phone-notch" />
    <div class="phone-screen df-h5-scope" :style="{ height }">
      <slot />
    </div>
  </div>
</template>
