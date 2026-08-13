<script lang="ts">
export default { name: 'DfEmpty' }
</script>

<script setup lang="ts">
/**
 * uniapp 端空状态。
 *
 * 小程序不能直接写 <svg>，所以插画改用 view 拼几何形状 ——
 * 同样不引图片资源：空状态常出现在弱网下，这时候再去下一张插画很可能也失败。
 */
import { computed } from 'vue'
import { bem, emptyProps } from '@df-ui/core'

const props = defineProps(emptyProps)

const b = bem('empty')

const classes = computed(() => [b(), b.m(props.size)])
</script>

<template>
  <view :class="classes">
    <view v-if="image !== 'none'" :class="b('art')">
      <slot name="image">
        <view :class="[b('shape'), b('shape', image)]" />
      </slot>
    </view>

    <text v-if="description" :class="b('desc')">{{ description }}</text>

    <view v-if="$slots.default" :class="b('action')">
      <slot />
    </view>
  </view>
</template>

<style lang="scss">
.df-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
}

.df-empty__art {
  margin-bottom: 14px;
}

/* 用 view 拼的几何插画：空盒子 */
.df-empty__shape {
  width: 88px;
  height: 66px;
  border: 3px solid var(--df-color-text-3, #a5aacb);
  border-radius: 10px;
  opacity: 0.5;
}

.df-empty__shape--search {
  width: 66px;
  height: 66px;
  border-radius: 50%;
}

.df-empty__shape--network {
  height: 0;
  border-top-style: dashed;
  border-bottom-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  border-radius: 0;
}

.df-empty__desc {
  color: var(--df-color-text-2, #8a90b8);
  font-size: 14.5px;
  text-align: center;
}

.df-empty__action {
  margin-top: 14px;
}

.df-empty--small {
  padding: 24px 16px;
}

.df-empty--small .df-empty__shape {
  width: 64px;
  height: 48px;
}

.df-empty--large {
  padding: 56px 24px;
}

.df-empty--large .df-empty__shape {
  width: 116px;
  height: 88px;
}
</style>
