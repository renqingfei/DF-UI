<script setup lang="ts">
import { ref } from 'vue'

const single = ref(true)
const fruits = ref<string[]>(['apple'])
const limited = ref<string[]>([])
const gender = ref('m')
const range = ref('week')
const notify = ref(true)
const syncing = ref(false)
const synced = ref(0)

/** 异步确认：点了先转圈，服务端成功才真的切 */
async function confirmSync() {
  syncing.value = true
  await new Promise((r) => setTimeout(r, 900))
  syncing.value = false
  synced.value++
  return true
}
</script>

<template>
  <p class="demo-note">Checkbox 单独用 / 成组用 / 限制选择数量</p>
  <div class="demo-row">
    <DfCheckbox v-model="single" label="记住登录状态" />
  </div>

  <div class="demo-row">
    <DfCheckboxGroup v-model="fruits">
      <DfCheckbox value="apple" label="苹果" />
      <DfCheckbox value="banana" label="香蕉" />
      <DfCheckbox value="cherry" label="樱桃" />
    </DfCheckboxGroup>
  </div>
  <p class="demo-note">已选：{{ fruits.join('、') || '无' }}</p>

  <div class="demo-row">
    <DfCheckboxGroup v-model="limited" :max="2">
      <DfCheckbox value="a" label="选项 A" />
      <DfCheckbox value="b" label="选项 B" />
      <DfCheckbox value="c" label="选项 C" />
      <DfCheckbox value="d" label="选项 D" />
    </DfCheckboxGroup>
  </div>
  <p class="demo-note">最多选 2 个，选满后其余自动禁用</p>

  <DfDivider />

  <p class="demo-note">Radio 两种形态</p>
  <div class="demo-row">
    <DfRadioGroup v-model="gender">
      <DfRadio value="m" label="男" />
      <DfRadio value="f" label="女" />
      <DfRadio value="x" label="不便透露" />
    </DfRadioGroup>
  </div>

  <div class="demo-row">
    <DfRadioGroup v-model="range" variant="button">
      <DfRadio value="day" label="今天" />
      <DfRadio value="week" label="本周" />
      <DfRadio value="month" label="本月" />
    </DfRadioGroup>
  </div>
  <p class="demo-note">当前区间：{{ range }}</p>

  <DfDivider />

  <p class="demo-note">Switch：普通 / 带文字 / 异步确认</p>
  <div class="demo-row">
    <DfSwitch v-model="notify" />
    <DfSwitch v-model="notify" checked-text="开" unchecked-text="关" />
    <DfSwitch size="large" v-model="notify" />
    <DfSwitch disabled :model-value="true" />
  </div>

  <div class="demo-row">
    <DfSwitch :model-value="synced % 2 === 1" :before-change="confirmSync" />
    <span class="demo-note" style="margin: 0">
      {{ syncing ? '正在请求服务端…' : `已成功同步 ${synced} 次（请求成功才真的切）` }}
    </span>
  </div>
</template>
