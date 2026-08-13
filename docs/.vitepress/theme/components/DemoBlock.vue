<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  /** 这个示例讲的是什么 */
  title?: string
  /** 一句话说明，可省 */
  desc?: string
  /** 示例源码，用 `import raw from './x.vue?raw'` 传进来 */
  code?: string
}>()

const open = ref(false)

/** 去掉源码里给示例本身写的注释头，读者只关心 template 与 script */
const shown = computed(() => (props.code ?? '').trim())
</script>

<template>
  <div class="demo">
    <div v-if="title" class="demo-head">
      <span class="demo-title">{{ title }}</span>
      <span v-if="desc" class="demo-desc">{{ desc }}</span>
    </div>

    <div class="demo-stage">
      <slot />
    </div>

    <div v-if="shown" class="demo-foot">
      <button class="demo-toggle" @click="open = !open">
        {{ open ? '收起代码' : '查看代码' }}
      </button>
    </div>

    <pre v-if="open && shown" class="demo-code"><code>{{ shown }}</code></pre>
  </div>
</template>
