<script setup lang="ts">
import { ref } from 'vue'

const saving = ref(false)
const saved = ref(0)

/** 真实场景：点了先转圈，请求回来才恢复 —— 期间重复点击不会再次触发 */
function save() {
  saving.value = true
  setTimeout(() => {
    saving.value = false
    saved.value++
  }, 1500)
}
</script>

<template>
  <div class="demo-row">
    <DfButton type="primary" :loading="saving" @click="save">
      {{ saving ? '保存中' : '点我保存' }}
    </DfButton>
    <DfButton loading>加载中</DfButton>
    <DfButton type="primary" disabled>禁用</DfButton>
    <DfButton type="danger" disabled>禁用</DfButton>
  </div>
  <p class="demo-note">
    已成功保存 {{ saved }} 次 —— 转圈期间连点也只会保存一次，loading 自动拦掉点击
  </p>
</template>
