<script setup lang="ts">
import { ref } from 'vue'
import { setTheme, useTheme } from '@df-ui/core'
import { themeList } from '@df-ui/tokens'

const { themeKey } = useTheme()
const clickCount = ref(0)

const swatch: Record<string, string> = {
  neon: 'linear-gradient(140deg,#00E5A0 48%,#0C0E14 52%)',
  clay: 'linear-gradient(140deg,#7B6BFF 48%,#EEF1FF 52%)',
  bento: 'linear-gradient(140deg,#111114 48%,#FF4D2D 52%)',
  muted: 'linear-gradient(140deg,#7C8B7A 48%,#E9E6E1 52%)',
}
</script>

<template>
  <div class="pg">
    <div class="pg-bar">
      <div class="pg-logo"><i>D</i>DF UI</div>
      <div class="pg-themes">
        <button
          v-for="t in themeList"
          :key="t.key"
          class="pg-theme"
          :class="{ on: themeKey === t.key }"
          @click="setTheme(t.key)"
        >
          <span class="sw" :style="{ background: swatch[t.key] }" />
          {{ t.name }}
        </button>
      </div>
    </div>

    <h1 class="pg-h1">Button 按钮</h1>
    <p class="pg-sub">
      这是真组件，不是静态图。上面切主题，下面所有按钮实时变 —— 组件代码没有一行涉及颜色。
    </p>

    <div class="pg-sec">
      <h2>语义类型</h2>
      <div class="pg-card">
        <p class="pg-label">type</p>
        <div class="pg-row">
          <DfButton type="primary" @click="clickCount++">主要操作</DfButton>
          <DfButton @click="clickCount++">默认</DfButton>
          <DfButton type="success" @click="clickCount++">成功</DfButton>
          <DfButton type="warning" @click="clickCount++">警告</DfButton>
          <DfButton type="danger" @click="clickCount++">危险</DfButton>
        </div>
        <p class="pg-log">已点击 {{ clickCount }} 次（验证 click 事件真的抛出来了）</p>
      </div>
    </div>

    <div class="pg-sec">
      <h2>填充方式</h2>
      <div class="pg-card">
        <p class="pg-label">variant</p>
        <div class="pg-row">
          <DfButton type="primary" variant="solid">实心 solid</DfButton>
          <DfButton type="primary" variant="soft">柔和 soft</DfButton>
          <DfButton variant="ghost">幽灵 ghost</DfButton>
          <DfButton variant="text">文字 text</DfButton>
        </div>
      </div>
    </div>

    <div class="pg-sec">
      <h2>尺寸与形状</h2>
      <div class="pg-card">
        <p class="pg-label">size · shape</p>
        <div class="pg-row">
          <DfButton type="primary" size="small">小</DfButton>
          <DfButton type="primary">中</DfButton>
          <DfButton type="primary" size="large">大</DfButton>
        </div>
        <div class="pg-row">
          <DfButton type="primary" shape="round">圆角</DfButton>
          <DfButton type="primary" shape="circle">＋</DfButton>
          <DfButton shape="circle">✓</DfButton>
        </div>
        <div class="pg-row">
          <DfButton type="primary" block size="large">块级按钮 block</DfButton>
        </div>
      </div>
    </div>

    <div class="pg-sec">
      <h2>状态</h2>
      <div class="pg-card">
        <p class="pg-label">loading · disabled</p>
        <div class="pg-row">
          <DfButton type="primary" loading>提交中</DfButton>
          <DfButton loading>加载中</DfButton>
          <DfButton type="primary" disabled>禁用</DfButton>
          <DfButton disabled>禁用</DfButton>
          <DfButton type="danger" disabled>禁用</DfButton>
        </div>
        <p class="pg-log">loading 与 disabled 状态下点击不会触发事件（上面的计数不会变）</p>
      </div>
    </div>

    <div class="pg-sec">
      <h2>带图标</h2>
      <div class="pg-card">
        <p class="pg-label">#icon 插槽</p>
        <div class="pg-row">
          <DfButton type="primary"><template #icon>＋</template>新建订单</DfButton>
          <DfButton><template #icon>⌕</template>搜索</DfButton>
          <DfButton type="danger" variant="soft"><template #icon>✕</template>删除</DfButton>
        </div>
      </div>
    </div>
  </div>
</template>
