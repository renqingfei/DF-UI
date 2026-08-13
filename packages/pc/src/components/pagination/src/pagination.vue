<script lang="ts">
export default { name: 'DfPagination' }
</script>

<script setup lang="ts">
import { paginationEmits, paginationProps, usePagination } from '@df-ui/core'

const props = defineProps(paginationProps)
const emit = defineEmits(paginationEmits)

const { b, classes, pageCount, pages, canPrev, canNext, go, prev, next } = usePagination(
  props,
  emit,
)
</script>

<template>
  <div :class="classes" role="navigation" aria-label="分页">
    <span v-if="showTotal" :class="b('total')">共 {{ total }} 条</span>

    <button
      :class="[b('btn'), !canPrev ? 'is-disabled' : '']"
      type="button"
      aria-label="上一页"
      :disabled="!canPrev"
      @click="prev"
    >
      ‹
    </button>

    <template v-for="(page, i) in pages" :key="`${page}-${i}`">
      <span v-if="page === -1" :class="b('ellipsis')">···</span>
      <button
        v-else
        :class="[b('btn'), page === modelValue ? 'is-active' : '']"
        type="button"
        :aria-current="page === modelValue ? 'page' : undefined"
        :disabled="disabled"
        @click="go(page)"
      >
        {{ page }}
      </button>
    </template>

    <button
      :class="[b('btn'), !canNext ? 'is-disabled' : '']"
      type="button"
      aria-label="下一页"
      :disabled="!canNext"
      @click="next"
    >
      ›
    </button>

    <span :class="b('jump')">{{ modelValue }} / {{ pageCount }}</span>
  </div>
</template>
