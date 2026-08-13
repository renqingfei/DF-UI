<script lang="ts">
export default { name: 'DfSelect' }
</script>

<script setup lang="ts">
/**
 * uniapp 端选择器：底部选择表，与 H5 端同一形态。
 *
 * 没用小程序内置 <picker>：内置 picker 的样式完全不可控（就是系统滚轮），
 * 四套主题在它身上无从体现，多选也做不了。
 * 需要「系统原生滚轮」时业务直接用 uni 的 <picker> 即可。
 */
import { selectEmits, selectProps, useSelect } from '@df-ui/core'
import DfPopup from '../df-popup/df-popup.vue'

const props = defineProps(selectProps)
const emit = defineEmits(selectEmits)

const {
  b,
  classes,
  opened,
  displayText,
  showClear,
  isChecked,
  isLocked,
  close,
  open,
  pick,
  clear,
} = useSelect(props, emit)
</script>

<template>
  <view :class="classes">
    <view :class="b('trigger')" @tap="open">
      <text :class="b('text')">{{ displayText || placeholder }}</text>
      <view v-if="showClear" :class="b('clear')" @tap.stop="clear">✕</view>
      <text :class="b('arrow')">›</text>
    </view>

    <DfPopup
      :visible="opened"
      position="bottom"
      round
      @update:visible="(v) => (v ? open() : close())"
    >
      <view :class="b('sheet')">
        <view :class="b('sheet-head')">
          <text :class="b('sheet-cancel')" @tap="close">取消</text>
          <text :class="b('sheet-title')">{{ title || placeholder }}</text>
          <text v-if="multiple" :class="b('sheet-done')" @tap="close">完成</text>
          <text v-else :class="b('sheet-placeholder')" />
        </view>

        <scroll-view :class="b('sheet-body')" scroll-y>
          <slot>
            <view
              v-for="option in options"
              :key="String(option.value)"
              :class="[
                b('option'),
                isChecked(option.value) ? 'is-checked' : '',
                option.disabled || isLocked(option.value) ? 'is-disabled' : '',
              ]"
              hover-class="df-select__option--pressed"
              @tap="pick(option)"
            >
              <text :class="b('option-text')">{{ option.label }}</text>
              <text v-if="isChecked(option.value)" :class="b('check')">✓</text>
            </view>
            <view v-if="options.length === 0" :class="b('empty')">
              <text>暂无选项</text>
            </view>
          </slot>
        </scroll-view>
      </view>
    </DfPopup>
  </view>
</template>

<style lang="scss">
.df-select {
  display: block;
  width: 100%;
}

.df-select__trigger {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: var(--df-m-control-h-md, 48px);
  padding-left: 14px;
  padding-right: 14px;
  border-radius: var(--df-radius-md, 24px);
  background-color: var(--df-color-surface-2, #f2f4ff);
  color: var(--df-color-text-1, #2c2f4a);
  box-sizing: border-box;
}

.df-select--small .df-select__trigger {
  height: var(--df-m-control-h-sm, 40px);
}

.df-select--large .df-select__trigger {
  height: var(--df-m-control-h-lg, 56px);
}

.df-select.is-empty .df-select__text {
  color: var(--df-color-text-3, #a5aacb);
}

.df-select.is-disabled {
  opacity: 0.55;
}

.df-select__text {
  flex: 1;
  min-width: 0;
  font-size: 16px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.df-select__clear {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin-right: -12px;
  color: var(--df-color-text-3, #a5aacb);
  font-size: 13px;
}

.df-select__arrow {
  color: var(--df-color-text-3, #a5aacb);
  font-size: 20px;
}

/* —— 底部选择表 —— */
.df-select__sheet {
  display: flex;
  flex-direction: column;
  max-height: 70vh;
}

.df-select__sheet-head {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 52px;
  padding-left: 6px;
  padding-right: 6px;
  border-bottom: 1px solid var(--df-color-line, #e6eafb);
}

.df-select__sheet-title {
  font-size: 16px;
  font-weight: 600;
}

.df-select__sheet-cancel,
.df-select__sheet-done,
.df-select__sheet-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 64px;
  height: 44px;
  font-size: 15px;
}

.df-select__sheet-cancel {
  color: var(--df-color-text-2, #8a90b8);
}

.df-select__sheet-done {
  color: var(--df-color-brand, #7b6bff);
  font-weight: 600;
}

.df-select__sheet-body {
  flex: 1;
  max-height: 56vh;
}

.df-select__option {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 52px;
  padding-left: 18px;
  padding-right: 18px;
  border-top: 1px solid var(--df-color-line, #e6eafb);
  font-size: 16px;
}

.df-select__option--pressed {
  background-color: var(--df-color-surface-2, #f2f4ff);
}

.df-select__option.is-checked {
  color: var(--df-color-brand, #7b6bff);
  font-weight: 600;
}

.df-select__option.is-disabled {
  opacity: 0.4;
}

.df-select__option-text {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.df-select__check {
  font-size: 15px;
}

.df-select__empty {
  padding: 40px 18px;
  text-align: center;
  color: var(--df-color-text-3, #a5aacb);
  font-size: 14px;
}
</style>
