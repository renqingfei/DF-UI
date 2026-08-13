<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const password = ref('')
const phone = ref('13800138000')
const remark = ref('')
</script>

<template>
  <div class="demo-row">
    <DfInput v-model="name" placeholder="请输入姓名" clearable style="max-width: 260px" />
    <DfInput v-model="phone" type="tel" placeholder="手机号" style="max-width: 200px" />
  </div>

  <div class="demo-row">
    <DfInput
      v-model="password"
      type="password"
      show-password
      placeholder="密码"
      style="max-width: 260px"
    />
    <DfInput
      v-model="name"
      :maxlength="10"
      show-count
      placeholder="最多 10 个字"
      style="max-width: 260px"
    />
  </div>

  <div class="demo-row">
    <DfInput size="small" placeholder="小" style="max-width: 160px" />
    <DfInput placeholder="中" style="max-width: 160px" />
    <DfInput size="large" placeholder="大" style="max-width: 160px" />
  </div>

  <div class="demo-row">
    <DfInput disabled model-value="禁用状态" style="max-width: 200px" />
    <DfInput readonly model-value="只读状态" style="max-width: 200px" />
  </div>

  <div class="demo-row">
    <DfInput placeholder="带前后缀" style="max-width: 260px">
      <template #prefix>￥</template>
      <template #suffix>元</template>
    </DfInput>
  </div>

  <div class="demo-row" style="display: block; max-width: 420px">
    <DfTextarea
      v-model="remark"
      placeholder="随内容自动增高，最多 6 行"
      autosize
      :max-rows="6"
      :maxlength="200"
      show-count
    />
  </div>

  <p class="demo-note">输入的内容：{{ name || '（空）' }}</p>
</template>
