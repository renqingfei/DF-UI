<script setup lang="ts">
import { ref, watch } from 'vue'
import { setTheme, useTheme } from '@df-ui/core'
import { themeList } from '@df-ui/tokens'

const { themeKey } = useTheme()
const clickCount = ref(0)

/** H5 预览跑在 5181 的独立工程里，用 iframe 嵌进来，主题跟着这边切 */
const H5_ORIGIN = 'http://localhost:5181'
const h5Frame = ref<HTMLIFrameElement | null>(null)

function syncThemeToH5() {
  h5Frame.value?.contentWindow?.postMessage(
    { source: 'df-ui-playground', theme: themeKey.value },
    H5_ORIGIN,
  )
}

watch(themeKey, syncThemeToH5)

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

    <div class="pg-sec">
      <h2>同一个组件在 H5 端长什么样</h2>
      <div class="pg-card pg-card--split">
        <div class="pg-phone">
          <iframe
            ref="h5Frame"
            class="pg-phone-screen"
            :src="`${H5_ORIGIN}/`"
            title="H5 端预览"
            @load="syncThemeToH5"
          />
        </div>
        <div class="pg-split-note">
          <p class="pg-label">@df-ui/h5</p>
          <p>
            这个手机框里跑的是<b>另一个包</b>，主题跟着上面一起切。
            属性写法和这一页完全一样，<code>type</code> / <code>size</code> /
            <code>loading</code> 一个不差 —— 差异只在触屏体验：
          </p>
          <ul>
            <li>按钮最矮 44px，手指点得准</li>
            <li>不做 hover（触屏上会黏住），改成按下即时反馈</li>
            <li>关掉了系统灰色高亮块与双击缩放的延迟</li>
            <li>整块按钮自动用大号高度，底部主操作直接顶满</li>
          </ul>
          <p class="pg-log">
            框里点不动、或者一片空白，就是 H5 预览工程没启动：<code>pnpm dev:h5</code>
          </p>
          <p class="pg-log">
            想在真手机上看：手机连同一个 Wi-Fi，浏览器打开
            <code>http://[电脑IP]:5181</code>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
