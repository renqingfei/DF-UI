<script lang="ts">
export default { name: 'DfSelect' }
</script>

<script setup lang="ts">
/**
 * H5 端选择器：点一下从底部升起一个选择面板。
 *
 * 和 PC 端属性完全一样，表现完全不同 —— 这是「允许的差异」里最典型的一类。
 * 手机上不做下拉面板：屏幕矮，下拉会被键盘或屏幕底边挤掉，
 * 而且底部弹层离拇指最近。
 */
import { selectEmits, selectProps, useSelect } from '@df-ui/core'
import DfPopup from '../../popup/src/popup.vue'

const props = defineProps(selectProps)
const emit = defineEmits(selectEmits)

const {
  b,
  classes,
  disabled,
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
  <div :class="classes">
    <div
      :class="b('trigger')"
      role="combobox"
      :aria-expanded="opened"
      :aria-disabled="disabled || undefined"
      @click="open"
    >
      <span :class="b('text')">{{ displayText || placeholder }}</span>
      <span v-if="showClear" :class="b('clear')" role="button" aria-label="清空" @click.stop="clear"
        >✕</span
      >
      <span :class="b('arrow')" aria-hidden="true">›</span>
    </div>

    <DfPopup
      :visible="opened"
      position="bottom"
      round
      @update:visible="(v) => (v ? open() : close())"
    >
      <div :class="b('sheet')">
        <div :class="b('sheet-head')">
          <span :class="b('sheet-cancel')" @click="close">取消</span>
          <span :class="b('sheet-title')">{{ title || placeholder }}</span>
          <span v-if="multiple" :class="b('sheet-done')" @click="close">完成</span>
          <span v-else :class="b('sheet-placeholder')" />
        </div>

        <div :class="b('sheet-body')" role="listbox">
          <slot>
            <div
              v-for="option in options"
              :key="String(option.value)"
              :class="[
                b('option'),
                isChecked(option.value) ? 'is-checked' : '',
                option.disabled || isLocked(option.value) ? 'is-disabled' : '',
              ]"
              role="option"
              :aria-selected="isChecked(option.value)"
              @click="pick(option)"
            >
              <span :class="b('option-text')">{{ option.label }}</span>
              <span v-if="isChecked(option.value)" :class="b('check')" aria-hidden="true">✓</span>
            </div>
            <div v-if="options.length === 0" :class="b('empty')">暂无选项</div>
          </slot>
        </div>
      </div>
    </DfPopup>
  </div>
</template>
