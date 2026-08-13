<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div class="demo-row">
    <DfButton type="primary" @click="count++">主要操作</DfButton>
    <DfButton @click="count++">默认</DfButton>
    <DfButton type="success" @click="count++">成功</DfButton>
    <DfButton type="warning" @click="count++">警告</DfButton>
    <DfButton type="danger" @click="count++">危险</DfButton>
  </div>
  <p class="demo-note">已点击 {{ count }} 次</p>
</template>
