<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
const animation = ref<'shimmer' | 'pulse' | 'none'>('shimmer')

/** 模拟一次真实请求：转 1.2 秒后骨架换成真内容 */
function reload() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1200)
}
</script>

<template>
  <div class="demo-row">
    <DfButton type="primary" @click="reload">模拟加载一次</DfButton>
    <DfRadioGroup v-model="animation" variant="button">
      <DfRadio value="shimmer" label="闪光" />
      <DfRadio value="pulse" label="呼吸" />
      <DfRadio value="none" label="静止" />
    </DfRadioGroup>
    <DfSwitch v-model="loading" checked-text="骨架" unchecked-text="内容" />
  </div>

  <DfDivider>文本版式</DfDivider>
  <DfSkeleton :loading="loading" :animation="animation" :rows="3">
    <p style="margin: 0">
      这是加载完成后的真内容。骨架屏的形状要和真内容对得上，切换时页面才不会跳。
    </p>
  </DfSkeleton>

  <DfDivider>头像 + 两行字</DfDivider>
  <DfSkeleton :loading="loading" :animation="animation" avatar>
    <div style="display: flex; align-items: center; gap: 12px">
      <DfAvatar text="张三" />
      <div>
        <div style="font-weight: 650">张三</div>
        <div style="font-size: 13px; opacity: 0.6">上海市浦东新区 · 3 分钟前</div>
      </div>
    </div>
  </DfSkeleton>

  <DfDivider>列表版式（重复 3 条）</DfDivider>
  <DfSkeleton :loading="loading" :animation="animation" template="list" :count="3" avatar>
    <div style="display: flex; flex-direction: column; gap: 14px">
      <div v-for="i in 3" :key="i" style="display: flex; align-items: center; gap: 12px">
        <DfAvatar :text="`商品${i}`" />
        <div>
          <div style="font-weight: 650">订单 #{{ 1000 + i }}</div>
          <div style="font-size: 13px; opacity: 0.6">已发货 · 顺丰速运</div>
        </div>
      </div>
    </div>
  </DfSkeleton>

  <DfDivider>卡片版式</DfDivider>
  <DfSkeleton :loading="loading" :animation="animation" template="card" />

  <DfDivider>文章版式</DfDivider>
  <DfSkeleton :loading="loading" :animation="animation" template="article" :rows="4" />

  <DfDivider>自己拼形状</DfDivider>
  <DfSkeleton :loading="loading" :animation="animation" template="custom">
    <template #template>
      <div style="display: flex; gap: 14px; align-items: center">
        <DfSkeletonItem variant="circle" width="64px" height="64px" />
        <div style="flex: 1; display: flex; flex-direction: column; gap: 10px">
          <DfSkeletonItem width="30%" height="18px" />
          <DfSkeletonItem width="70%" />
          <DfSkeletonItem width="50%" />
        </div>
        <DfSkeletonItem variant="rect" width="80px" height="34px" />
      </div>
    </template>
  </DfSkeleton>
</template>
