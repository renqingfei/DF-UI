<script lang="ts">
export default { name: 'DfDialog' }
</script>

<script setup lang="ts">
/**
 * uniapp 端对话框。
 *
 * 没有用 uni.showModal：它只能显示两个按钮和一段纯文字，
 * 改不了颜色、放不了自定义内容，四套主题在它身上完全失效。
 * 需要「系统原生弹窗」时业务直接调 uni.showModal 就好，不必经过组件库。
 */
import { computed } from 'vue'
import { dialogEmits, dialogProps, useAsyncConfirm } from '@df-ui/core'
import DfPopup from '../df-popup/df-popup.vue'
import DfButton from '../df-button/df-button.vue'

const props = defineProps(dialogProps)
const emit = defineEmits(dialogEmits)

const { pending, run } = useAsyncConfirm(props.beforeConfirm)

const popupWidth = computed(() => props.width ?? undefined)

function onVisible(v: boolean) {
  emit('update:visible', v)
}

function cancel() {
  if (pending.value) return
  emit('cancel')
  onVisible(false)
}

async function confirm() {
  const ok = await run()
  if (!ok) return
  emit('confirm')
  onVisible(false)
}
</script>

<template>
  <DfPopup
    :visible="visible"
    position="center"
    :overlay="overlay"
    :close-on-overlay="closeOnOverlay"
    :closable="closable && !pending"
    :lock-scroll="lockScroll"
    :width="popupWidth"
    @update:visible="onVisible"
    @open="emit('open')"
    @close="emit('close')"
  >
    <view class="df-dialog">
      <view v-if="title || $slots.title" class="df-dialog__title">
        <slot name="title"><text>{{ title }}</text></slot>
      </view>

      <view class="df-dialog__body">
        <slot><text>{{ content }}</text></slot>
      </view>

      <view class="df-dialog__footer">
        <slot name="footer">
          <DfButton v-if="showCancel" variant="ghost" :disabled="pending" block @click="cancel">
            {{ cancelText }}
          </DfButton>
          <DfButton :type="confirmType" :loading="pending" block @click="confirm">
            {{ confirmText }}
          </DfButton>
        </slot>
      </view>
    </view>
  </DfPopup>
</template>

<style lang="scss">
.df-dialog {
  display: flex;
  flex-direction: column;
  padding: 24px 22px 0;
}

.df-dialog__title {
  font-size: 17.5px;
  font-weight: 700;
  text-align: center;
}

.df-dialog__body {
  padding-top: 10px;
  color: var(--df-color-text-2, #8a90b8);
  font-size: 15px;
  line-height: 1.65;
  text-align: center;
}

/* 移动端两个按钮各占一半、平铺底部：拇指主要活动区在屏幕下半部分 */
.df-dialog__footer {
  display: flex;
  flex-direction: row;
  padding-top: 22px;
  padding-bottom: 20px;
}

.df-dialog__footer .df-button {
  flex: 1;
}

.df-dialog__footer .df-button + .df-button {
  margin-left: 12px;
}
</style>
