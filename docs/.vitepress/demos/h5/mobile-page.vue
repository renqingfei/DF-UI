<script setup lang="ts">
/**
 * 移动端专属组件都要局部 import：文档站全局注册的是 PC 版组件，
 * 而这几个组件只有 h5 / uni 端有。
 */
import { ref } from 'vue'
import type { GridItem } from '@df-ui/core'
import {
  DfNavBar,
  DfGrid,
  DfList,
  DfListItem,
  DfActionBar,
  DfTabBar,
  DfButton as H5Button,
  DfTag as H5Tag,
  DfAvatar as H5Avatar,
} from '@df-ui/h5'

const tab = ref('home')
const log = ref('')

const entries = [
  { label: '扫一扫', icon: '⌗', name: 'scan' },
  { label: '付款码', icon: '▤', name: 'pay', badge: 2 },
  { label: '卡包', icon: '◫', name: 'card', badge: true },
  { label: '账单', icon: '☰', name: 'bill' },
  { label: '会员', icon: '◈', name: 'vip' },
  { label: '客服', icon: '☏', name: 'help' },
  { label: '设置', icon: '⚙', name: 'set' },
  { label: '敬请期待', icon: '⋯', name: 'soon', disabled: true },
]

const tabs = [
  { label: '首页', name: 'home', icon: '⌂' },
  { label: '分类', name: 'cate', icon: '☷' },
  { label: '消息', name: 'msg', icon: '✉', badge: 5 },
  { label: '我的', name: 'me', icon: '☺' },
]
</script>

<template>
  <div class="mp-shell">
    <DfNavBar title="个人中心" back-text="返回" border @back="log = '点了返回'" />

    <div class="mp-scroll">
      <div class="mp-user">
        <H5Avatar text="张三丰" size="large" />
        <div>
          <div class="mp-user-name">
            张三丰
            <H5Tag type="brand" size="small" round>年度会员</H5Tag>
          </div>
          <div class="mp-user-sub">138****8000</div>
        </div>
      </div>

      <DfGrid
        :items="entries"
        :columns="4"
        border
        @item-click="(item: GridItem) => (log = `点了${item.label}`)"
      />

      <div class="mp-gap" />

      <DfList>
        <DfListItem title="我的订单" value="全部 12 笔" arrow @click="log = '进订单页'" />
        <DfListItem title="收货地址" label="默认：上海市浦东新区" arrow @click="log = '进地址页'" />
        <DfListItem title="优惠券" value="3 张可用" arrow />
        <DfListItem title="当前版本" value="v1.0.0" />
        <DfListItem title="注销账号" arrow disabled />
      </DfList>

      <p class="mp-log">{{ log || '上面每一处都能点，点了这里会有反馈' }}</p>
    </div>

    <DfActionBar :fixed="false">
      <H5Button variant="ghost" shape="circle">♡</H5Button>
      <H5Button type="primary" block @click="log = '点了主操作'">立即续费</H5Button>
    </DfActionBar>

    <DfTabBar v-model="tab" :items="tabs" :fixed="false" />
  </div>
</template>

<style scoped>
.mp-shell {
  display: flex;
  flex-direction: column;
  height: 620px;
  margin: -18px -16px -22px;
}

.mp-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 14px;
  scrollbar-width: none;
}

.mp-scroll::-webkit-scrollbar {
  display: none;
}

.mp-user {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 4px 4px 18px;
}

.mp-user-name {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 17px;
  font-weight: 650;
}

.mp-user-sub {
  color: var(--df-color-text-3);
  font-size: 13px;
}

.mp-gap {
  height: 14px;
}

.mp-log {
  margin: 16px 4px 0;
  color: var(--df-color-text-3);
  font-size: 12.5px;
}
</style>
