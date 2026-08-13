<script lang="ts">
export default { name: 'DfPopup' }
</script>

<script setup lang="ts">
/**
 * uniapp 端弹出层。
 *
 * 三处小程序特有的处理：
 * 1. **没有 Teleport**。弹层就在原地渲染，靠 position: fixed 脱离文档流。
 *    代价是它逃不出祖先元素的 transform —— 别把 Popup 放在带 transform 的容器里。
 * 2. **原生组件永远压在最上层**（video / map / camera / textarea / input）。
 *    如果页面上有这些，弹层会被它们盖住，得改用 cover-view 或 root-portal 包一层。
 *    这一条写进文档，不在组件里偷偷处理 —— 偷偷处理会让问题更难查。
 * 3. 遮罩上加 catchtouchmove 阻断滚动穿透：小程序没法像网页那样锁 body。
 */
import { popupEmits, popupProps, useOverlay } from '@df-ui/core'

const props = defineProps(popupProps)
const emit = defineEmits(popupEmits)

const { b, rendered, zIndex, classes, panelStyle, close, onOverlayClick } = useOverlay(props, emit)

/** 遮罩的 touchmove 要吃掉，否则手指在遮罩上滑会带动下面的页面 */
function blockScroll() {
  // 空实现即可，catchtouchmove 本身就阻断了冒泡
}
</script>

<template>
  <view v-if="rendered" :class="classes" :style="{ zIndex }">
    <view
      v-if="overlay"
      :class="[b('overlay'), visible ? b('overlay', 'show') : '']"
      @tap="onOverlayClick"
      @touchmove.stop.prevent="blockScroll"
    />
    <view :class="[b('panel'), visible ? b('panel', 'show') : '']" :style="panelStyle">
      <view v-if="closable" :class="b('close')" @tap="close">✕</view>
      <slot />
    </view>
  </view>
</template>

<style lang="scss">
.df-popup {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.df-popup__overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.45);
  opacity: 0;
  transition: opacity 0.26s ease;
}

.df-popup__overlay--show {
  opacity: 1;
}

.df-popup__panel {
  position: absolute;
  max-width: 100%;
  max-height: 100%;
  background-color: var(--df-color-surface, #ffffff);
  color: var(--df-color-text-1, #2c2f4a);
  overflow-y: auto;
  box-sizing: border-box;
  transition: transform 0.3s ease, opacity 0.26s ease;
}

.df-popup__close {
  position: absolute;
  top: 4px;
  right: 4px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  color: var(--df-color-text-3, #a5aacb);
  font-size: 15px;
}

/* —— 居中 —— */
.df-popup--center .df-popup__panel {
  top: 50%;
  left: 50%;
  width: 78%;
  max-height: 78%;
  transform: translate(-50%, -50%) scale(0.94);
  opacity: 0;
}

.df-popup--center .df-popup__panel--show {
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
}

/* —— 底部 —— */
.df-popup--bottom .df-popup__panel {
  left: 0;
  right: 0;
  bottom: 0;
  max-height: 85%;
  transform: translateY(100%);
}

.df-popup--bottom .df-popup__panel--show {
  transform: translateY(0);
}

/* —— 顶部 —— */
.df-popup--top .df-popup__panel {
  left: 0;
  right: 0;
  top: 0;
  max-height: 85%;
  transform: translateY(-100%);
}

.df-popup--top .df-popup__panel--show {
  transform: translateY(0);
}

/* —— 左右抽屉 —— */
.df-popup--left .df-popup__panel {
  left: 0;
  top: 0;
  bottom: 0;
  width: 78%;
  transform: translateX(-100%);
}

.df-popup--right .df-popup__panel {
  right: 0;
  top: 0;
  bottom: 0;
  width: 78%;
  transform: translateX(100%);
}

.df-popup--left .df-popup__panel--show,
.df-popup--right .df-popup__panel--show {
  transform: translateX(0);
}

/* —— 圆角：贴边那一侧不圆 —— */
.df-popup.is-round .df-popup__panel {
  border-radius: var(--df-radius-lg, 28px);
}

.df-popup.is-round.df-popup--bottom .df-popup__panel {
  border-radius: 22px 22px 0 0;
}

.df-popup.is-round.df-popup--top .df-popup__panel {
  border-radius: 0 0 22px 22px;
}

.df-popup.is-round.df-popup--left .df-popup__panel {
  border-radius: 0 var(--df-radius-lg, 28px) var(--df-radius-lg, 28px) 0;
}

.df-popup.is-round.df-popup--right .df-popup__panel {
  border-radius: var(--df-radius-lg, 28px) 0 0 var(--df-radius-lg, 28px);
}
</style>
