<template>
  <p class="demo-note">24 等分制。下面每个色块是一列，数字是它占的份数</p>

  <DfRow :gutter="12">
    <DfCol :span="24"><div class="cell">24</div></DfCol>
  </DfRow>

  <DfRow :gutter="12" style="margin-top: 12px">
    <DfCol :span="12"><div class="cell">12</div></DfCol>
    <DfCol :span="12"><div class="cell">12</div></DfCol>
  </DfRow>

  <DfRow :gutter="12" style="margin-top: 12px">
    <DfCol :span="8"><div class="cell">8</div></DfCol>
    <DfCol :span="8"><div class="cell">8</div></DfCol>
    <DfCol :span="8"><div class="cell">8</div></DfCol>
  </DfRow>

  <DfRow :gutter="12" style="margin-top: 12px">
    <DfCol :span="6" v-for="i in 4" :key="i"><div class="cell">6</div></DfCol>
  </DfRow>

  <p class="demo-note">offset 向右偏移</p>
  <DfRow :gutter="12">
    <DfCol :span="6"><div class="cell">6</div></DfCol>
    <DfCol :span="6" :offset="6"><div class="cell">6，偏移 6</div></DfCol>
  </DfRow>

  <p class="demo-note">
    响应式：把浏览器窗口拖窄看看 —— 下面这排在宽屏是四列，中屏两列，窄屏一列
  </p>
  <DfRow :gutter="12">
    <DfCol v-for="i in 4" :key="i" :span="24" :sm="24" :md="12" :lg="6">
      <div class="cell">卡片 {{ i }}</div>
    </DfCol>
  </DfRow>
</template>

<style scoped>
.cell {
  padding: 14px 10px;
  border-radius: var(--df-radius-sm);
  background: var(--df-color-brand-soft);
  color: var(--df-color-brand);
  font-size: 13px;
  font-weight: 650;
  text-align: center;
}

.demo-note {
  margin-top: 22px;
}
</style>
