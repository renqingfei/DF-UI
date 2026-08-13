<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormRules } from '@df-ui/core'

const formRef = ref()
const submitting = ref(false)
const result = ref('')

const model = reactive({
  phone: '',
  password: '',
  nickname: '',
  agree: false,
})

const rules: FormRules = {
  phone: [
    { required: true, message: '请填写手机号' },
    { type: 'phone', message: '手机号格式不对' },
  ],
  password: [
    { required: true, message: '请设置密码' },
    { min: 6, message: '密码至少 6 位' },
  ],
  nickname: [
    { max: 12, message: '昵称最多 12 个字' },
    // 异步校验：真实项目里这里是一个查重接口
    {
      validator: async (v) => {
        if (!v) return true
        await new Promise((r) => setTimeout(r, 400))
        return v === 'admin' ? '这个昵称被占用了' : true
      },
    },
  ],
  agree: [{ validator: (v) => v === true, message: '请先同意服务条款' }],
}

async function submit() {
  submitting.value = true
  const ok = await formRef.value.validate()
  submitting.value = false
  result.value = ok ? `校验通过，可以提交了：${model.phone}` : '有几项还没填对，看红字提示'
}

function reset() {
  formRef.value.resetFields()
  result.value = ''
}
</script>

<template>
  <DfForm ref="formRef" :model="model" :rules="rules" label-position="top" style="max-width: 380px">
    <DfFormItem prop="phone" label="手机号">
      <DfInput v-model="model.phone" type="tel" placeholder="11 位手机号" clearable />
    </DfFormItem>

    <DfFormItem prop="password" label="密码">
      <DfInput v-model="model.password" type="password" show-password placeholder="至少 6 位" />
    </DfFormItem>

    <DfFormItem prop="nickname" label="昵称">
      <DfInput v-model="model.nickname" placeholder="选填，试试输入 admin" />
    </DfFormItem>

    <DfFormItem prop="agree">
      <DfCheckbox v-model="model.agree" label="我已阅读并同意服务条款" />
    </DfFormItem>

    <DfSpace>
      <DfButton type="primary" :loading="submitting" @click="submit">提交</DfButton>
      <DfButton variant="ghost" @click="reset">重置</DfButton>
    </DfSpace>
  </DfForm>

  <p class="demo-note">{{ result || '直接点「提交」看看必填校验；昵称填 admin 看异步查重' }}</p>
</template>
