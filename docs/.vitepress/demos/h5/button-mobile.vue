<script setup lang="ts">
/**
 * H5 端组件要局部 import。
 *
 * 原因：H5 与 PC 的组件名刻意保持一致（都是 DfButton），
 * 文档站里全局注册的是 PC 版，H5 版只能在这个示例文件里单独引进来。
 * 真实项目只装一个包，不会遇到这个问题。
 */
import { ref } from 'vue'
import { DfButton as H5Button } from '@df-ui/h5'

const paying = ref(false)

function pay() {
  paying.value = true
  setTimeout(() => {
    paying.value = false
  }, 1600)
}
</script>

<template>
  <div class="mdemo">
    <div class="mdemo-t">语义类型</div>
    <div class="demo-row">
      <H5Button type="primary">主要操作</H5Button>
      <H5Button>默认</H5Button>
    </div>
    <div class="demo-row">
      <H5Button type="success">成功</H5Button>
      <H5Button type="danger">危险</H5Button>
    </div>

    <div class="mdemo-t">尺寸</div>
    <div class="demo-row">
      <H5Button type="primary" size="small">小</H5Button>
      <H5Button type="primary">中</H5Button>
      <H5Button type="primary" size="large">大</H5Button>
    </div>

    <div class="mdemo-t">形状与填充</div>
    <div class="demo-row">
      <H5Button type="primary" shape="round">胶囊</H5Button>
      <H5Button type="primary" variant="soft">柔和</H5Button>
      <H5Button variant="text">文字按钮</H5Button>
    </div>

    <div class="mdemo-t">底部主操作</div>
    <div class="demo-row">
      <H5Button type="primary" block :loading="paying" @click="pay">
        {{ paying ? '支付中' : '立即支付 ￥299' }}
      </H5Button>
    </div>
  </div>
</template>

<style scoped>
.mdemo-t {
  margin: 18px 0 10px;
  font-size: 12.5px;
  color: var(--df-color-text-3);
}

.mdemo-t:first-child {
  margin-top: 0;
}
</style>
