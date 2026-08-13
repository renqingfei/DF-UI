<script lang="ts">
export default { name: 'DfDialog' }
</script>

<script setup lang="ts">
/**
 * 对话框。基于 Popup 的 center 形态，加上标题、正文、两个按钮。
 *
 * beforeConfirm 是这个组件真正的价值所在：点确定先请求，成功才关窗，
 * 期间确定按钮转圈、两个按钮都点不动。业务代码不用自己管这套状态。
 */
import { computed } from 'vue'
import { dialogEmits, dialogProps, useAsyncConfirm } from '@df-ui/core'
import DfPopup from '../../popup/src/popup.vue'
import DfButton from '../../button/src/button.vue'

const props = defineProps(dialogProps)
const emit = defineEmits(dialogEmits)

const { pending, run } = useAsyncConfirm(props.beforeConfirm)

const popupWidth = computed(() => props.width ?? 420)

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
    :close-on-esc="closeOnEsc && !pending"
    :closable="closable && !pending"
    :lock-scroll="lockScroll"
    :width="popupWidth"
    @update:visible="onVisible"
    @open="emit('open')"
    @close="emit('close')"
  >
    <div class="df-dialog">
      <div v-if="title || $slots.title" class="df-dialog__title">
        <slot name="title">{{ title }}</slot>
      </div>

      <div class="df-dialog__body">
        <slot>{{ content }}</slot>
      </div>

      <div class="df-dialog__footer">
        <slot name="footer">
          <DfButton v-if="showCancel" variant="ghost" :disabled="pending" @click="cancel">
            {{ cancelText }}
          </DfButton>
          <DfButton :type="confirmType" :loading="pending" @click="confirm">
            {{ confirmText }}
          </DfButton>
        </slot>
      </div>
    </div>
  </DfPopup>
</template>
