<script setup lang="ts">
import { ref } from 'vue'
import { DfToast } from '@df-ui/pc'

const sheet = ref(false)
const drawer = ref(false)
const confirm = ref(false)
const asyncConfirm = ref(false)
const inlineLoading = ref(true)
const deleted = ref(0)

/** 点确定先请求，成功才关窗 —— 期间确定按钮转圈、取消按钮点不动 */
async function doDelete() {
  await new Promise((r) => setTimeout(r, 1200))
  deleted.value++
  DfToast.success('已删除')
  return true
}

function showLoadingToast() {
  DfToast.loading('上传中…')
  setTimeout(() => DfToast.success('上传完成'), 1600)
}
</script>

<template>
  <p class="demo-note">Toast 轻提示（函数式调用，同一时刻只显示一条）</p>
  <div class="demo-row">
    <DfButton @click="DfToast.text('这是一条普通提示')">普通</DfButton>
    <DfButton type="success" @click="DfToast.success('保存成功')">成功</DfButton>
    <DfButton type="danger" @click="DfToast.error('网络异常，请重试')">失败</DfButton>
    <DfButton type="warning" @click="DfToast.warning('库存不足')">警告</DfButton>
    <DfButton variant="soft" type="primary" @click="showLoadingToast">加载中 → 成功</DfButton>
    <DfButton variant="ghost" @click="DfToast.show({ message: '顶部提示', position: 'top' })">
      顶部
    </DfButton>
  </div>

  <DfDivider>Popup 弹出层：五个方向</DfDivider>
  <div class="demo-row">
    <DfButton type="primary" @click="sheet = true">底部弹出</DfButton>
    <DfButton @click="drawer = true">右侧抽屉</DfButton>
  </div>

  <DfPopup v-model:visible="sheet" position="bottom" closable :height="260">
    <div style="padding: 24px">
      <h3 style="margin: 0 0 12px">底部弹出层</h3>
      <p style="margin: 0 0 16px; opacity: 0.7">
        移动端最常用的形态。点遮罩、按 Esc、点右上角叉都能关。
      </p>
      <DfButton type="primary" block @click="sheet = false">知道了</DfButton>
    </div>
  </DfPopup>

  <DfPopup v-model:visible="drawer" position="right" closable :width="360">
    <div style="padding: 24px">
      <h3 style="margin: 0 0 12px">右侧抽屉</h3>
      <DfSpace direction="vertical" align="start" style="width: 100%">
        <DfInput placeholder="筛选条件一" />
        <DfInput placeholder="筛选条件二" />
        <DfButton type="primary" block @click="drawer = false">应用筛选</DfButton>
      </DfSpace>
    </div>
  </DfPopup>

  <DfDivider>Dialog 对话框</DfDivider>
  <div class="demo-row">
    <DfButton @click="confirm = true">普通确认</DfButton>
    <DfButton type="danger" @click="asyncConfirm = true">删除（异步确认）</DfButton>
  </div>
  <p class="demo-note">已删除 {{ deleted }} 次</p>

  <DfDialog
    v-model:visible="confirm"
    title="要离开吗？"
    content="当前编辑的内容还没保存，离开后会丢失。"
    confirm-text="确认离开"
    cancel-text="留在此页"
  />

  <DfDialog
    v-model:visible="asyncConfirm"
    title="删除这条订单？"
    content="删除后无法恢复。点确定后会真的请求一次，成功才关窗。"
    confirm-text="删除"
    confirm-type="danger"
    :before-confirm="doDelete"
  />

  <DfDivider>Loading 加载</DfDivider>
  <div class="demo-row">
    <DfLoading size="small" />
    <DfLoading />
    <DfLoading size="large" text="加载中" />
  </div>

  <div
    style="position: relative; margin-top: 14px; padding: 20px; border-radius: 12px; background: var(--df-color-surface-2)"
  >
    <p style="margin: 0">这块内容被遮罩盖住了，父容器必须是非 static 定位。</p>
    <p style="margin: 8px 0 0; opacity: 0.6">用开关切一下试试。</p>
    <DfLoading :loading="inlineLoading" overlay text="正在计算" />
  </div>
  <div class="demo-row" style="margin-top: 12px">
    <DfSwitch v-model="inlineLoading" checked-text="遮罩中" unchecked-text="已完成" />
  </div>
</template>
