<script setup lang="ts">
import { ref } from 'vue'
import type { SelectOption } from '@df-ui/core'

const cities: SelectOption[] = [
  { label: '北京', value: 'bj' },
  { label: '上海', value: 'sh' },
  { label: '广州', value: 'gz' },
  { label: '深圳', value: 'sz' },
  { label: '香港（暂不支持配送）', value: 'hk', disabled: true },
]

const tags: SelectOption[] = [
  { label: '前端', value: 'fe' },
  { label: '后端', value: 'be' },
  { label: '设计', value: 'ui' },
  { label: '产品', value: 'pm' },
  { label: '测试', value: 'qa' },
]

const city = ref('')
const picked = ref<string[]>(['fe'])
const limited = ref<string[]>([])
</script>

<template>
  <div style="display: grid; gap: 16px; max-width: 320px">
    <DfSelect v-model="city" :options="cities" placeholder="选择城市" clearable />
    <DfSelect v-model="picked" :options="tags" placeholder="选择标签" multiple clearable />
    <DfSelect
      v-model="limited"
      :options="tags"
      placeholder="最多选 2 个"
      multiple
      :max="2"
      title="选择标签"
    />
    <DfSelect :options="cities" placeholder="小尺寸" size="small" />
    <DfSelect :options="cities" placeholder="禁用状态" disabled />
    <DfSelect :options="[]" placeholder="没有选项时" />
  </div>

  <p class="demo-note">
    城市：{{ city || '未选' }}　标签：{{ picked.join('、') || '未选' }}　限选：{{
      limited.join('、') || '未选'
    }}
  </p>
</template>
