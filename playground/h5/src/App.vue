<script setup lang="ts">
import { ref } from 'vue'
import { setTheme, useTheme } from '@df-ui/core'
import { themeList } from '@df-ui/tokens'

const { themeKey } = useTheme()
const tapCount = ref(0)
const paying = ref(false)

function pay() {
  paying.value = true
  setTimeout(() => {
    paying.value = false
  }, 1600)
}
</script>

<template>
  <div class="mp">
    <div class="mp-nav">
      <span class="mp-nav-back">‹</span>
      <span class="mp-nav-title">H5 端 Button</span>
      <span class="mp-nav-dots">···</span>
    </div>

    <div class="mp-body">
      <div class="mp-themes">
        <button
          v-for="t in themeList"
          :key="t.key"
          class="mp-theme"
          :class="{ on: themeKey === t.key }"
          @click="setTheme(t.key)"
        >
          {{ t.name }}
        </button>
      </div>

      <p class="mp-tip">
        和 PC 端<b>同一份属性定义</b>、同一套主题令牌，但高度、圆角、按下反馈全部按手指重调过。
      </p>

      <div class="mp-sec">
        <div class="mp-sec-t">语义类型</div>
        <div class="mp-card">
          <div class="mp-row">
            <DfButton type="primary" @click="tapCount++">主要操作</DfButton>
            <DfButton @click="tapCount++">默认</DfButton>
            <DfButton type="success" @click="tapCount++">成功</DfButton>
          </div>
          <div class="mp-row">
            <DfButton type="warning" @click="tapCount++">警告</DfButton>
            <DfButton type="danger" @click="tapCount++">危险</DfButton>
          </div>
          <p class="mp-log">已点 {{ tapCount }} 次</p>
        </div>
      </div>

      <div class="mp-sec">
        <div class="mp-sec-t">填充方式</div>
        <div class="mp-card">
          <div class="mp-row">
            <DfButton type="primary" variant="solid">实心</DfButton>
            <DfButton type="primary" variant="soft">柔和</DfButton>
          </div>
          <div class="mp-row">
            <DfButton variant="ghost">幽灵</DfButton>
            <DfButton variant="text">文字按钮</DfButton>
          </div>
        </div>
      </div>

      <div class="mp-sec">
        <div class="mp-sec-t">尺寸与形状</div>
        <div class="mp-card">
          <div class="mp-row">
            <DfButton type="primary" size="small">小</DfButton>
            <DfButton type="primary">中</DfButton>
            <DfButton type="primary" size="large">大</DfButton>
          </div>
          <div class="mp-row">
            <DfButton type="primary" shape="round">圆角胶囊</DfButton>
            <DfButton type="primary" shape="circle">＋</DfButton>
            <DfButton shape="circle">✓</DfButton>
          </div>
        </div>
      </div>

      <div class="mp-sec">
        <div class="mp-sec-t">状态</div>
        <div class="mp-card">
          <div class="mp-row">
            <DfButton type="primary" loading>提交中</DfButton>
            <DfButton loading>加载中</DfButton>
          </div>
          <div class="mp-row">
            <DfButton type="primary" disabled>禁用</DfButton>
            <DfButton type="danger" disabled>禁用</DfButton>
          </div>
        </div>
      </div>

      <div class="mp-sec">
        <div class="mp-sec-t">列表里的常见用法</div>
        <div class="mp-card mp-card--flush">
          <div class="mp-item">
            <div class="mp-item-main">
              <div class="mp-item-name">无线蓝牙耳机</div>
              <div class="mp-item-sub">已发货 · 顺丰速运</div>
            </div>
            <DfButton size="small" variant="soft" type="primary">查看物流</DfButton>
          </div>
          <div class="mp-item">
            <div class="mp-item-main">
              <div class="mp-item-name">机械键盘 87 键</div>
              <div class="mp-item-sub">待付款 · 剩 23 分钟</div>
            </div>
            <DfButton size="small" type="danger" variant="soft">取消</DfButton>
          </div>
        </div>
      </div>
    </div>

    <div class="mp-actionbar">
      <DfButton variant="ghost" shape="circle">♡</DfButton>
      <DfButton type="primary" block :loading="paying" @click="pay">
        {{ paying ? '支付中' : '立即支付 ￥299' }}
      </DfButton>
    </div>
  </div>
</template>
