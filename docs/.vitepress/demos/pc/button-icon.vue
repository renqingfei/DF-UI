<template>
  <div class="demo-row">
    <DfButton type="primary">
      <template #icon>＋</template>
      新建订单
    </DfButton>
    <DfButton>
      <template #icon>⌕</template>
      搜索
    </DfButton>
    <DfButton type="danger" variant="soft">
      <template #icon>✕</template>
      删除
    </DfButton>
    <DfButton type="primary" shape="circle">
      <template #icon>↻</template>
    </DfButton>
  </div>
  <p class="demo-note">loading 时 spinner 会顶掉 icon 插槽，不会两个图标叠在一起</p>
</template>
