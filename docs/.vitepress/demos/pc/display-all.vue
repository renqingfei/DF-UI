<script setup lang="ts">
import { ref } from 'vue'

const tags = ref(['前端', 'Vue 3', '组件库'])

function removeTag(name: string) {
  tags.value = tags.value.filter((t) => t !== name)
}
</script>

<template>
  <p class="demo-note">Card：标题、附加操作、页脚</p>
  <div style="display: flex; gap: 16px; flex-wrap: wrap">
    <DfCard title="本月成交" style="width: 260px">
      <template #extra><a href="javascript:void(0)">详情</a></template>
      <div style="font-size: 30px; font-weight: 700">￥128,430</div>
      <div style="font-size: 13px; opacity: 0.6">较上月 +12.4%</div>
      <template #footer>数据每小时更新一次</template>
    </DfCard>

    <DfCard style="width: 260px" shadow="never">
      <DfSpace direction="vertical" size="small" align="start">
        <DfAvatar text="李四" size="large" />
        <div style="font-weight: 650">李四</div>
        <DfSpace size="small">
          <DfTag type="brand" round>会员</DfTag>
          <DfTag type="success" round>已认证</DfTag>
        </DfSpace>
      </DfSpace>
    </DfCard>
  </div>

  <DfDivider>Tag 六种语义 × 三种填充</DfDivider>
  <div class="demo-row">
    <DfTag>默认</DfTag>
    <DfTag type="brand">品牌</DfTag>
    <DfTag type="success">已完成</DfTag>
    <DfTag type="warning">待处理</DfTag>
    <DfTag type="danger">已超时</DfTag>
    <DfTag type="info">附注</DfTag>
  </div>
  <div class="demo-row">
    <DfTag type="brand" variant="soft">柔和</DfTag>
    <DfTag type="brand" variant="solid">实心</DfTag>
    <DfTag type="brand" variant="outline">描边</DfTag>
    <DfTag type="brand" round>胶囊</DfTag>
    <DfTag size="small">小号</DfTag>
    <DfTag size="large">大号</DfTag>
  </div>
  <div class="demo-row">
    <DfTag v-for="t in tags" :key="t" type="brand" closable @close="removeTag(t)">{{ t }}</DfTag>
    <span v-if="!tags.length" class="demo-note" style="margin: 0">都删完了，刷新页面恢复</span>
  </div>

  <DfDivider>Badge 徽标</DfDivider>
  <DfSpace size="large">
    <DfBadge :value="8">
      <DfButton variant="ghost">消息</DfButton>
    </DfBadge>
    <DfBadge :value="128" :max="99">
      <DfButton variant="ghost">通知</DfButton>
    </DfBadge>
    <DfBadge dot>
      <DfButton variant="ghost">动态</DfButton>
    </DfBadge>
    <DfBadge value="NEW" type="brand">
      <DfButton variant="ghost">功能</DfButton>
    </DfBadge>
    <DfBadge :value="0">
      <DfButton variant="ghost">0 不显示</DfButton>
    </DfBadge>
  </DfSpace>

  <DfDivider>Avatar 头像</DfDivider>
  <DfSpace size="large" align="center">
    <DfAvatar text="张三" size="small" />
    <DfAvatar text="李四" />
    <DfAvatar text="王五" size="large" />
    <DfAvatar text="Alice" shape="square" />
    <DfAvatar :size="72" text="赵六" />
    <DfAvatar src="/不存在的图.png" text="加载失败" />
  </DfSpace>
  <p class="demo-note">最后一个的图片故意写错，会自动退回文字占位</p>

  <DfDivider>Empty 空状态</DfDivider>
  <div style="display: flex; flex-wrap: wrap">
    <DfEmpty description="还没有订单" size="small" />
    <DfEmpty image="search" description="没搜到相关内容" size="small" />
    <DfEmpty image="network" description="网络不太好，刷新试试" size="small">
      <DfButton type="primary" size="small">重新加载</DfButton>
    </DfEmpty>
  </div>
</template>
